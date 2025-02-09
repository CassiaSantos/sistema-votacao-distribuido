// src/routes/admin-routes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.post('/login', AdminController.login);

module.exports = router;