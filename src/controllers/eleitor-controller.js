// src/controllers/eleitor.controller.js
const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class EleitorController {
  async login(req, res) {
    const { email } = req.body;
    
    try {
      const result = await pool.query(
        'SELECT * FROM eleitores WHERE email_eleitor = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Eleitor não encontrado' });
      }

      const eleitor = result.rows[0];
      const token = jwt.sign(
        { id: eleitor.id_eleitor, isAdmin: false },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({ token, eleitor });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  async register(req, res) {
    const { nome, email } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO eleitores (nome_eleitor, email_eleitor) VALUES ($1, $2) RETURNING *',
        [nome, email]
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar eleitor' });
    }
  }
}

module.exports = new EleitorController();