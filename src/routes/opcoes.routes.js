const express = require('express');
const router = express.Router();
const opcoesController = require('../controllers/opcoes.controller');

router.post('/', opcoesController.criarOpcao);
router.get('/:id_votacao', opcoesController.listarOpcoes);
router.put('/:id_opcao_voto', opcoesController.atualizarOpcao);
router.delete('/:id_opcao_voto', opcoesController.deletarOpcao);

module.exports = router;