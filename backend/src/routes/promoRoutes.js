const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

router.get('/check', promoController.checkPromo);

module.exports = router;