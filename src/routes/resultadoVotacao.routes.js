const express = require("express");
const router = express.Router();
const { getResultadosVotacao } = require("../controllers/resultadoVotacao.controller.js");

// Definição da rota usando o controller
router.get("/", getResultadosVotacao);

module.exports = router;