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