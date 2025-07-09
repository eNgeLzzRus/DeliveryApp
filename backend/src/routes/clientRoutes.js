const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')

router.post('/', clientController.createClient)
router.get('/:id', clientController.getClientById)
router.get('/account/:accountId', clientController.getClientByAccountId)

module.exports = router