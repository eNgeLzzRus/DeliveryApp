const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

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

// controllers/accountController.js
exports.login = async (req, res) => {
    const { login, password } = req.body;

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET не задан" });
    }

    try {
        const [accounts] = await db.query('SELECT * FROM ACCOUNT WHERE Login = ?', [login]);
        if (!accounts[0]) {
            return res.status(404).json({ error: 'Аккаунт не найден' });
        }

        const isValidPassword = await bcrypt.compare(password, accounts[0].Password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Неверный пароль' });
        }

        const token = jwt.sign(
            { id: accounts[0].AccountID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, userId: accounts[0].AccountID });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};

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

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Токен отсутствует' })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Неверный токен' })
        req.userId = decoded.id
        next()
    })
}

// controllers/accountController.js
exports.getAccountProfile = async (req, res) => {
    const accountId = req.userId
    try {
        const [account] = await db.query('SELECT * FROM ACCOUNT WHERE AccountID = ?', [accountId])
        if (!account[0]) return res.status(404).json({ error: 'Аккаунт не найден' })
        res.json(account[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}