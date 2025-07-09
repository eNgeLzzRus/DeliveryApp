const db = require('../config/db')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { login, password } = req.body
    try {
        // Вызываем процедуру RegisterClient
        await db.query('CALL RegisterClient(?, ?)', [login, password])
        res.status(201).json({ message: 'Клиент успешно зарегистрирован' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
    const { login, password } = req.body
    console.log('Полученные данные:', { login, password }) // Логируем входящие данные
    try {
        const [account] = await db.query('SELECT * FROM ACCOUNT WHERE Login = ?', [login])
        console.log('Результат запроса:', account) // Логируем результат запроса
        if (!account[0]) return res.status(404).json({ error: 'Аккаунт не найден' })

        if (account[0].Password !== password) return res.status(401).json({ error: 'Неверный пароль' })

        const token = jwt.sign(
            { id: account[0].AccountID },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        console.log('Сгенерированный токен:', token) // Логируем токен
        res.json({ token })
    } catch (err) {
        console.error('Ошибка при авторизации:', err) // Логируем ошибку
        res.status(500).json({ error: err.message })
    }
}

exports.getAccount = async (req, res) => {
    const { id } = req.params
    try {
        const [account] = await db.query('SELECT * FROM ACCOUNT WHERE AccountID = ?', [id])
        if (!account[0]) return res.status(404).json({ error: 'Аккаунт не найден' })
        res.json(account[0])
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getAllAccounts = async (req, res) => {
    try  {
        const [accounts] = await db.query('SELECT * FROM ACCOUNT')
        res.json(accounts)
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updatePassword = async (req, res) => {
    const { id } = req.params
    const { newPassword } = req.body
    try {
        await db.query('UPDATE ACCOUNT SET Password = ? WHERE AccountID = ?', [newPassword, id])
        res.json({ message: 'Пароль обновлён' })
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.verifyTokenMiddleware = (req, res) => {
    const token = req.body.token || req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ isValid: false, error: 'Токен не предоставлен' })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ isValid: false, error: 'Неверный или истекший токен' })
        }

        try {
            // Проверяем, существует ли пользователь в базе
            const [rows] = await db.query('SELECT * FROM ACCOUNT WHERE AccountID = ?', [decoded.id])
            if (!rows[0]) {
                return res.status(404).json({ isValid: false, error: 'Пользователь не найден' })
            }

            return res.json({ isValid: true, user: rows[0] })
        } catch (dbErr) {
            return res.status(500).json({ isValid: false, error: 'Ошибка проверки пользователя' })
        }
    })
}

// controllers/accountController.js
exports.getAccountProfile = async (req, res) => {
    try {
        const [account] = await db.query('SELECT * FROM ACCOUNT WHERE AccountID = ?', [req.userId])
        if (!account[0]) return res.status(404).json({ error: 'Аккаунт не найден' })
        res.json(account[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}