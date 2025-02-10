// src/routes/voto-routes.js
const express = require('express');
const router = express.Router();
const VotoController = require('../controllers/voto-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, VotoController.create);

module.exports = router;