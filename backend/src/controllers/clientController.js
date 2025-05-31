const db = require('../config/db')

exports.createClient = async (req, res) => {
    const { accountId, address } = req.body
    try {
        const [result] = await db.query(
            'INSERT INTO CLIENT (AccountID, Address) VALUES (?, ?)',
            [accountId, address]
        )
        res.status(201).json({ id: result.insertId })
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getClientById = async (req, res) => {
    const { id } = req.params
    try {
        const [client] = await db.query(`
                SELECT c.*, a.Login
                FROM CLIENT c
                JOIN ACCOUNT a ON c.AccountID = a.AccountID
                WHERE c.ClientID = ?
            `, [id])
        if (!client[0]) return res.status(404).json({ error: 'Клиент не найден' })
        res.json(client[0])
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}