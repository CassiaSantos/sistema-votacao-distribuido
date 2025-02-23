const express = require('express');
const router = express.Router();
const votosController = require('../controllers/votos.controller.js');

router.post('/', votosController.registrarVoto);
router.get('/:id_votacao', votosController.listarVotos);

module.exports = router;