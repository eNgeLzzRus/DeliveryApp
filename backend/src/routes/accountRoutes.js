const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')

const { verifyToken } = require('../controllers/accountController')

router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.get('/:id', accountController.getAccount)
router.get('/profile', verifyToken, accountController.getAccountProfile)

module.exports = router