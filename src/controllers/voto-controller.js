// src/controllers/voto.controller.js
const { executeQuery } = require('../config/database');

class VotoController {
  async create(req, res) {
    const { id_votacao, id_opcao_voto } = req.body;
    const id_eleitor = req.user.id;
    try {
      const result = await executeQuery(
        'INSERT INTO votos (id_votacao, id_opcao_voto, id_eleitor) VALUES ($1, $2, $3) RETURNING *',
        [id_votacao, id_opcao_voto, id_eleitor]
      );
      return res.status(201).json(result.rows[0]);

    } catch (error) {
      console.error('Create Voto Error:', error);
      if (error.constraint === 'unique_eleitor_votacao') {
        return res.status(400).json({ error: 'Eleitor já votou nesta votação' });
      }
        return res.status(500).json({ error: 'Erro ao registrar voto' });
    }
  }
}

module.exports = new VotoController();