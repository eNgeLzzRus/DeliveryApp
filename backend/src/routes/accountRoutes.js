const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')


router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.get('/:id', accountController.getAccount)
router.get('/profile', accountController.getAccountProfile)
router.post('/verify-token', accountController.verifyTokenMiddleware)

module.exports = router