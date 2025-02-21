const express = require('express');
const router = express.Router();
const opcoesController = require('../controllers/opcoes.controller');

router.post('/', opcoesController.criarOpcao);
router.get('/:id_votacao', opcoesController.listarOpcoes);

module.exports = router;