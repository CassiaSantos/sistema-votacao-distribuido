const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

router.post('/login', authController.fazerLogin);
router.post('/register', authController.cadastrarEleitor);

module.exports = router;