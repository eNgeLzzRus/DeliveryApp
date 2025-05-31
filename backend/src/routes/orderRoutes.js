const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

// POST /api/orders
router.post('/', orderController.createOrder)
router.get('/:id', orderController.getOrderById)
router.get('/discount', orderController.getDiscount)

module.exports = router