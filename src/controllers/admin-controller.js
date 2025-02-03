// src/controllers/admin.controller.js

const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminController {
  async login(req, res) {
    const { email, senha } = req.body;
    
    try {
      const result = await pool.query(
        'SELECT * FROM administradores WHERE email_admin = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      const admin = result.rows[0];
      const validPassword = await bcrypt.compare(senha, admin.senha_admin);

      if (!validPassword) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const token = jwt.sign(
        { id: admin.id_admin, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({ token, admin: { ...admin, senha_admin: undefined } });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
}

module.exports = new AdminController();