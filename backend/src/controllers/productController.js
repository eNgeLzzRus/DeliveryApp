const db = require('../config/db')

// controllers/productController.js

exports.getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query(`
            SELECT 
                p.ProductID AS _id,
                p.Name AS name,
                p.Price AS price,
                p.Description AS description,
                p.Image AS image,
                pt.Product_typeID AS productTypeId,
                pt.Name AS productTypeName,
                pt.Image AS productTypeImage
            FROM PRODUCT p
            LEFT JOIN PRODUCT_TYPE pt ON p.Product_typeID = pt.Product_typeID
        `)

        // Делаем ручное маппинг, чтобы структура была правильной
        const formattedProducts = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            productType: {
                _id: product.productTypeId,
                name: product.productTypeName || "Прочее",
                image: product.productTypeImage
            }
        }))

        res.json(formattedProducts)
    } catch (err) {
        console.error('Ошибка загрузки товаров:', err)
        res.status(500).json({ error: err.message })
    }
}

exports.getProductsByType = async (req, res) => {
    const { type } = req.params
    try {
        const [products] = await db.query(`
                SELECT p.*
                FROM PRODUCT p
                JOIN PRODUCT_TYPE pt ON p.Product_typeID = pt.Product_typeID
                WHERE pt.Name = ?
            `, [type])
            res.json(products)
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.createProduct = async (req, res) => {
    const { name, price, description, image, typeId } = req.body
    try {
        const [result] = await db.query(
            'INSERT INTO PRODUCT (Name, Price, Description, Image, Product_typeID) VALUES (?, ?, ?, ?, ?)',
            [name, price, description, image, typeId]
        )
        res.status(201).json({ id: result.insertId })
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getAllProductTypes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT Product_typeID AS _id, Name AS name, Image AS image FROM PRODUCT_TYPE')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// controllers/productController.js

exports.getRecommendedProducts = async (req, res) => {
    const { id } = req.params;

    console.log('🔍 Запрос на рекомендации для клиента:', id);

    if (!id) {
        return res.status(400).json({ error: 'Не указан clientId' });
    }

    try {
        const [rows] = await db.query(`
            SELECT 
                p.ProductID as _id,
                p.Name as name,
                p.Price as price,
                p.Description as description,
                p.Image as image,
                pt.Product_typeID as 'productType._id',
                pt.Name as 'productType.name',
                pt.Image as 'productType.image',
                CASE 
                    WHEN user_orders.ClientID IS NOT NULL THEN 'user_ordered'
                    ELSE 'popular'
                END as recommendation_type,
                COUNT(op.OrdID) as order_count
            FROM PRODUCT p
            JOIN PRODUCT_TYPE pt ON p.Product_typeID = pt.Product_typeID
            LEFT JOIN ORD_PRODUCT op ON p.ProductID = op.ProductID
            LEFT JOIN (
                SELECT DISTINCT p.ProductID, c.ClientID
                FROM PRODUCT p
                JOIN ORD_PRODUCT op ON p.ProductID = op.ProductID
                JOIN ORD o ON op.OrdID = o.OrdID
                JOIN CLIENT c ON o.ClientID = c.ClientID
                WHERE c.ClientID = ?
            ) as user_orders ON p.ProductID = user_orders.ProductID
            GROUP BY p.ProductID
            ORDER BY 
                CASE 
                    WHEN user_orders.ClientID IS NOT NULL THEN 0 
                    ELSE 1 
                END,
                COUNT(op.OrdID) DESC
            LIMIT 24;
        `, [id]);

        // Добавляем флаги isPopular и isOrdered
        const productsWithFlags = rows.map((product, index) => ({
            ...product,
            isOrdered: product.recommendation_type === 'user_ordered',
            isPopular: !product.isOrdered && index < 10, // первые 10 после "заказанных"
        }));

        return res.json(productsWithFlags);
    } catch (error) {
        console.error('Ошибка при получении рекомендаций:', error);
        return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }

    
};