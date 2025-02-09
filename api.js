//  src\config\database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function para executar queries
const executeQuery = async (text, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { pool, executeQuery };

// ######################################
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

// #########################################################
// src/controllers/eleitor.controller.js
const { executeQuery } = require('../config/database');
const jwt = require('jsonwebtoken');

class EleitorController {
  async login(req, res) {
    const { email } = req.body;
        
    try {
      const result = await executeQuery(
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
      console.error('Login Error:', error);
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  async register(req, res) {
    const { nome, email } = req.body;

    try {
      const result = await executeQuery(
        'INSERT INTO eleitores (nome_eleitor, email_eleitor) VALUES ($1, $2) RETURNING *',
        [nome, email]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Register Error:', error);
      return res.status(500).json({ error: 'Erro ao registrar eleitor' });
    }
  }
}

module.exports = new EleitorController();

//##################################################
// src/controllers/votacao.controller.js
const { pool, executeQuery } = require('../config/database');

class VotacaoController {
  async create(req, res) {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao, opcoes } = req.body;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const votacaoResult = await client.query(
        'INSERT INTO votacoes (nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao]
      );

      const votacao = votacaoResult.rows[0];

      for (const opcao of opcoes) {
        await client.query(
          'INSERT INTO opcoes_voto (id_votacao, descricao_opcao_voto) VALUES ($1, $2)',
          [votacao.id_votacao, opcao]
        );
      }

      await client.query('COMMIT');
      return res.status(201).json(votacao);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Create Votação Error:', error);
      return res.status(500).json({ error: 'Erro ao criar votação' });
    } finally {
      client.release();
    }
  }

  async getActive(req, res) {
    try {
      const result = await executeQuery(`
        SELECT v.*, 
          json_agg(json_build_object(
            'id_opcao_voto', ov.id_opcao_voto,
            'descricao_opcao_voto', ov.descricao_opcao_voto
          )) as opcoes
        FROM votacoes v
        LEFT JOIN opcoes_voto ov ON ov.id_votacao = v.id_votacao
        WHERE CURRENT_TIMESTAMP BETWEEN v.data_inicio_votacao AND v.data_fim_votacao
        GROUP BY v.id_votacao
      `);
      return res.json(result.rows);

    } catch (error) {
      console.error('Get Active Votações Error:', error);
      return res.status(500).json({ error: 'Erro ao buscar votações ativas' });
    }
  }

  async getResults(req, res) {
    const { id_votacao } = req.params;
    try {
      const result = await executeQuery(
        'SELECT * FROM resultado_votacao WHERE id_votacao = $1',
        [id_votacao]
      );

      return res.json(result.rows);
    } catch (error) {
      console.error('Get Results Error:', error);
      return res.status(500).json({ error: 'Erro ao buscar resultados' });
    }
  }
}

module.exports = new VotacaoController();

//####################################################
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

//################################################
// src/middlewares/admin.middleware.js

const adminMiddleware = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};

module.exports = adminMiddleware;

//################################################
// src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;

// src/app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const eleitorRoutes = require('./routes/eleitor-routes');
const adminRoutes = require('./routes/admin-routes');
const votacaoRoutes = require('./routes/votacao-routes');
const votoRoutes = require('./routes/voto-routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/eleitores', eleitorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/votacoes', votacaoRoutes);
app.use('/api/votos', votoRoutes);

module.exports = app;

//################################################
// src/server.js

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//#######################################################
// .env
Conexão com o banco de dados:
DATABASE_URL=postgresql://postgres:C@ssia123@db.alwsagaswwgwqxadwain.supabase.co:5432/postgres

PORT=3000
JWT_SECRET=jwt_secret_here