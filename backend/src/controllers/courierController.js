const db = require('../config/db')

exports.createCourier = async (req, res) => {
    const { accountId, name, contact } = req.body
    try {
        const [result] = await db.query(
            'INSERT INTO COURIER (AccountID, Name, Contact) VALUES (?, ?, ?)',
            [accountId, name, contact]
        )
        res.status(201).json({ id: result.insertId })
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getCourierById = async (req, res) => {
    const { id } = req.params
    try {
        const [courier] = await db.query(`
                SELECT c.*, a.Login
                FROM COURIER c
                JOIN ACCOUNT a ON c.AccountID = a.AccountID
                WHERE c.CourierID = ?
            `, [id])
        if (!courier[0]) return res.status(404).json({ error: 'Курьер не найден' })
        res.json(courier[0])
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}