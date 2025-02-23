const express = require('express');
const router = express.Router();
const votacoesController = require('../controllers/votacoes.controller.js');

router.post('/', votacoesController.criarVotacao);
router.get('/', votacoesController.listarVotacoes);
router.get('/:id_votacao', votacoesController.obterVotacao);
router.put('/:id_votacao', votacoesController.atualizarVotacao);
router.delete('/:id_votacao', votacoesController.deletarVotacao);

module.exports = router;