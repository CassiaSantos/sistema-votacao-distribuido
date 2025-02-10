// src/routes/votacao-routes.js
const express = require('express');
const router = express.Router();
const VotacaoController = require('../controllers/votacao-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');

router.post('/', [authMiddleware, adminMiddleware], VotacaoController.create);
router.get('/active', authMiddleware, VotacaoController.getActive);
router.get('/:id_votacao/results', authMiddleware, VotacaoController.getResults);

module.exports = router;