// src/routes/eleitor-routes.js
const express = require('express');
const router = express.Router();
const EleitorController = require('../controllers/eleitor-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/login', EleitorController.login);
router.post('/register', EleitorController.register);

module.exports = router;