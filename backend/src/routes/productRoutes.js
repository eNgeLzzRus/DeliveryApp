const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// GET /api/products
router.get('/', productController.getAllProducts)
// GET /api/products/pizza
router.get('/:type', productController.getProductsByType)
router.get('/types', productController.getAllProductTypes)
router.get('/recommended/:id', productController.getRecommendedProducts)

module.exports = router