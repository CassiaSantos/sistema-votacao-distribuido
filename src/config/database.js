// src/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para conexões com Supabase
    }
});

// Teste de conexão
pool.connect((err, client, release) => {
  if (err) {
      return console.error('Erro ao conectar ao banco:', err.stack);
  }
  console.log('Conectado com sucesso ao banco de dados');
});

// Função helper para executar queries
const query = async (text, params) => {
  try {
      const result = await pool.query(text, params);
      return result;
  } catch (error) {
      console.error('Erro ao executar query:', error.stack);
      throw error;
  }
};

module.exports = {
  pool,
  query
};