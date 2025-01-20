const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'sistema_votacao',
  password: 'senha',
  port: 5432,
});

// Configuração do Express
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rotas da API

// Rota: Obter todos os eleitores
app.get('/eleitores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eleitores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Criar um novo eleitor
app.post('/eleitores', async (req, res) => {
  const { nome, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO eleitores (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Obter todas as votações
app.get('/votacoes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM votacoes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Criar uma nova votação
app.post('/votacoes', async (req, res) => {
  const { nome, descricao, data_inicio, data_fim } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO votacoes (nome, descricao, data_inicio, data_fim) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, descricao, data_inicio, data_fim]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Registrar um voto
app.post('/votos', async (req, res) => {
  const { id_votacao, id_opcao, id_eleitor } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO votos (id_votacao, id_opcao, id_eleitor) VALUES ($1, $2, $3) RETURNING *',
      [id_votacao, id_opcao, id_eleitor]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota: Consultar resultados de uma votação
app.get('/resultados/:id_votacao', async (req, res) => {
  const { id_votacao } = req.params;
  try {
    const result = await pool.query(
      `SELECT o.descricao AS opcao, COUNT(v.id) AS votos
       FROM votos v
       JOIN opcoes_voto o ON v.id_opcao = o.id
       WHERE v.id_votacao = $1
       GROUP BY o.descricao`,
      [id_votacao]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
