const db = require('../config/db')

// controllers/orderController.js
exports.createOrder = async (req, res) => {
    console.log('Create order request:', req.body);
    const { clientId, products, promoCodeId } = req.body;
    
    if (!Array.isArray(products) || products.length === 0) {
        console.log('No products error');
        return res.status(400).json({ error: 'Не указаны продукты' });
    }

    try {
        // Формируем строки с ID продуктов и количествами
        const productIds = products.map(p => p.productId).join(',');
        const quantities = products.map(p => p.amount).join(',');

        console.log('Calling CreateOrderWithProducts with:', {
            clientId,
            productIds,
            quantities,
            promoCodeId: promoCodeId || null
        });

        const [result] = await db.query(
            'CALL CreateOrderWithProducts(?, ?, ?, ?, @p_order_id)',
            [clientId, productIds, quantities, promoCodeId || null]
        );

        const [[{ orderId }]] = await db.query('SELECT @p_order_id AS orderId');
        console.log('Order created with ID:', orderId);
        res.json({ orderId: orderId });

    } catch (err) {
        console.error('Order creation error:', err);
        res.status(500).json({ 
            error: 'Ошибка при создании заказа',
            details: err.message 
        });
    }
}

exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM ORDERS WHERE OrdID = ?', [id])
        if (!rows.length) {
            return res.status(404).json({ error: 'Заказ не найден' })
        }

        // Если нужна связь с товарами
        const [products] = await db.query(`
            SELECT p.Name AS ProductName, oi.Amount, p.Price
            FROM ORD_PRODUCT oi
            JOIN PRODUCT p ON oi.ProductID = p.ProductID
            WHERE oi.OrdID = ?
        `, [id])

        res.json({
            ...rows[0],
            products
        })

    } catch (err) {
        console.error("Ошибка получения заказа:", err)
        res.status(500).json({ error: "Ошибка сервера" })
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

exports.getOrdersByClientId = async (req, res) => {
    const { clientId } = req.params
    try {
        const [orders] = await db.query(`
            SELECT 
                o.OrdID,
                o.DateStamp AS Date,
                o.Price AS TotalPrice,
                s.Name AS StatusName
            FROM ORD o
            JOIN STATUS s ON o.StatusID = s.StatusID
            WHERE o.ClientID = ?
            ORDER BY o.DateStamp DESC
        `, [clientId])
        
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}