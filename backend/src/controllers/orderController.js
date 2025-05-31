const db = require('../config/db')

// controllers/orderController.js
exports.createOrder = async (req, res) => {
    const { clientId, products } = req.body

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Не указаны продукты' })
    }

    const productIds = products.map(p => p.productId).join(',')
    const quantities = products.map(p => p.amount).join(',')

    try {
        const [result] = await db.query(
            'CALL CreateOrderWithProducts(?, ?, ?, @p_order_id)',
            [clientId, productIds, quantities]
        )

        // Получаем ID созданного заказа из OUT параметра
        const [[{ orderId }]] = await db.query('SELECT @p_order_id AS orderId')

        res.json({ orderId: orderId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Ошибка при создании заказа' })
    }
}

exports.getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const [order] = await db.query(`
                SELECT o.*, s.Name as StatusName
                FROM ORD o
                JOIN STATUS s ON o.StatusID = s.StatusID
                WHERE o.OrdID = ?
            `, [id])
        if (!order[0]) return res.status(404).json({ error: 'Заказ не найден' })
        res.json(order[0])
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getDiscount = async (req, res) => {
    const { clientId, orderAmount } = req.query
    try {
        const [[{ discount }]] = await db.query(
            'SELECT CalculateDiscount(?, ?) AS discount',
            [clientId, orderAmount]
        )
        res.json({ discount })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}