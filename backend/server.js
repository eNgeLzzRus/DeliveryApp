const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express();
const PORT = 3000;

const JWT_SECRET = '234saf43vefvbv43v9fivnvf4n0ijdv'
const SALT_ROUNDS = 10

// =============================================
// Настройка Swagger
// =============================================
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API для сайта доставки',
      version: '1.0.0',
      description: 'Документация к API сайта доставки еды'
    },
    servers: [{url: 'http://localhost:3000'}]
  },
  apis: ['./server.js']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// =============================================
// Настройка базы данных
// =============================================
const dbPath = path.resolve(__dirname, 'db', 'database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err.message);
    process.exit(1);
  }
  console.log('✅ БД подключена:', dbPath);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS пользователь (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user' // 'user' или 'admin'
  )`);
});

// Проверяем существование таблиц при запуске
const checkTables = () => {
  const requiredTables = ['продукт', 'баннеры', 'заказ', 'клиент', 'пользователь'];
  db.serialize(() => {
    requiredTables.forEach(table => {
      db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`, (err, row) => {
        if (err || !row) {
          console.error(`❌ Таблица "${table}" не найдена!`);
        }
      });
    });
  });
};
checkTables();

// =============================================
// Мидлварc
// =============================================
app.use(express.json()); // Для парсинга JSON
app.use(express.urlencoded({ extended: true })); // Для форм

// Логгирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Обработка CORS (если фронт на другом домене)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// =============================================
// Роуты API
// =============================================

// -------------------------------
// Продукты
// -------------------------------
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM продукт', [], (err, rows) => {
    if (err) {
      console.error('Ошибка при запросе продуктов:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(rows);
  });
});

app.post('/api/products', (req, res) => {
  const { название, стоимость, описание } = req.body;

  if (!название || !стоимость) {
    return res.status(400).json({ error: 'Название и стоимость обязательны' });
  }

  db.run(
    'INSERT INTO продукт (название, стоимость, описание) VALUES (?, ?, ?)',
    [название, стоимость, описание],
    function(err) {
      if (err) {
        console.error('Ошибка при добавлении продукта:', err);
        return res.status(500).json({ error: 'Не удалось добавить продукт' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// -------------------------------
// Заказы
// -------------------------------
app.post('/api/orders', (req, res) => {
  const { clientId, products, total } = req.body;

  if (!clientId || !products || !total) {
    return res.status(400).json({ error: 'Неверные данные заказа' });
  }

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // 1. Создаем заказ
    db.run(
      'INSERT INTO заказы (client_id, total) VALUES (?, ?)',
      [clientId, total],
      function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: 'Ошибка создания заказа' });
        }

        const orderId = this.lastID;

        // 2. Добавляем товары в заказ
        const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)');
        products.forEach(product => {
          stmt.run(orderId, product.id, product.quantity);
        });
        stmt.finalize();

        db.run('COMMIT');
        res.status(201).json({ orderId });
      }
    );
  });
});

// =============================================
// Роуты авторизации
// =============================================

// Регистрация
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны!' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    db.run(
      'INSERT INTO пользователь (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Пользователь уже существует' })
        }
        res.status(201).json({ id: this.lastID })
      }
    )
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})

// Логин
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  db.get(
    'SELECT * FROM пользователь WHERE email = ?',
    [email],
    async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Неверный email или пароль' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ error: 'Неверный email или пароль' })
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.json({ token })
    }
  )
})

// ========================
// Защищенные роуты
// ========================

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Требуется авторизация' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Неверный токен' })
    }
    req.user = decoded
    next()
  })
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ запрещён' })
  }
  next()
}

// =============================================
// Обработка ошибок
// =============================================
app.use((err, req, res, next) => {
  console.error('⚠️ Ошибка:', err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Не найдено' });
});

// =============================================
// Запуск сервера
// =============================================
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

// Корректное закрытие БД при завершении
process.on('SIGINT', () => {
  db.close();
  process.exit();
});