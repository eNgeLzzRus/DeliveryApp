const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// 1. Пути с проверкой существования папок
const dbDir = path.join(__dirname);
const dbPath = path.join(dbDir, 'delivery.db'); // Явно указываем имя файла
const migrationsDir = path.join(__dirname, '../migrations');

// 2. Проверяем/создаём папки
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(migrationsDir)) {
  console.error('❌ Папка migrations не существует!');
  process.exit(1);
}

// 3. Подключение с таймаутом
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Ошибка подключения:', err.message);
    return;
  }
  console.log('✅ БД подключена:', dbPath);

  // 4. Применяем миграции
  applyMigrations(db);
});

function applyMigrations(db) {
  console.log('🔍 Ищем миграции...');
  
  fs.readdir(migrationsDir, (err, files) => {
    if (err) {
      console.error('❌ Ошибка чтения папки migrations:', err);
      db.close();
      return;
    }

    const sqlFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort()
      .map(file => path.join(migrationsDir, file));

    if (sqlFiles.length === 0) {
      console.error('❌ Нет .sql файлов в /migrations!');
      db.close();
      return;
    }

    console.log('📋 Миграции для применения:', sqlFiles);

    // 5. Последовательное выполнение
    let currentIndex = 0;
    
    const runNextMigration = () => {
      if (currentIndex >= sqlFiles.length) {
        console.log('✨ Все миграции применены!');
        db.close();
        return;
      }

      const filePath = sqlFiles[currentIndex];
      const sql = fs.readFileSync(filePath, 'utf8');

      console.log(`🔄 Применяем ${path.basename(filePath)}...`);
      
      db.exec(sql, (err) => {
        if (err) {
          console.error(`❌ Ошибка в ${path.basename(filePath)}:`, err.message);
          db.close();
          process.exit(1);
        }

        console.log(`✅ ${path.basename(filePath)} успешно!`);
        currentIndex++;
        runNextMigration();
      });
    };

    runNextMigration();
  });
}