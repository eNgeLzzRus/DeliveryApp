const express = require('express')
const router = express.Router()
const courierController = require('../controllers/courierController')

router.post('/', courierController.createCourier)
router.get('/:id', courierController.getCourierById)

module.exports = router