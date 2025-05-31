const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// CORS настройки
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json())

// Статические ресурсы — важно! Путь должен быть правильным
app.use('/images/categories', express.static(path.join(__dirname, 'public/images/categories')))
app.use('/images/products', express.static(path.join(__dirname, 'public/images/products')))

// Роуты
const accountRoutes = require('./routes/accountRoutes')
const clientRoutes = require('./routes/clientRoutes')
const courierRoutes = require('./routes/courierRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use('/api/accounts', accountRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/couriers', courierRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Обработка 404 для API
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'API route not found' })
    }
    next()
})

// Запуск сервера
app.listen(3001, () => {
    console.log('Server started on port 3001')
})