// scripts/createAdmin.js
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// Configuração específica para o Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões com Supabase
  }
});

async function createInitialAdmin() {
  const client = await pool.connect();
  
  // Dados do administrador - você pode alterar conforme necessário
  const adminData = {
    nome: 'Admin Padrão',
    email: 'admin@sistema.com',
    senha: 'SuaSenhaSegura123!' // Altere para uma senha forte
  };

  try {
    // Verifica se já existe um admin com este email
    const checkEmail = await client.query(
      'SELECT email_admin FROM administradores WHERE email_admin = $1',
      [adminData.email]
    );

    if (checkEmail.rows.length > 0) {
      console.log('Um administrador com este email já existe!');
      return;
    }

    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(adminData.senha, 10);
    
    // Insere o novo administrador
    const result = await client.query(
      'INSERT INTO administradores (nome_admin, email_admin, senha_admin) VALUES ($1, $2, $3) RETURNING id_admin, nome_admin, email_admin',
      [adminData.nome, adminData.email, hashedPassword]
    );
    
    console.log('Administrador criado com sucesso:', result.rows[0]);

  } catch (error) {
    console.error('Erro ao criar administrador:', error.message);
    if (error.code === '42P01') {
      console.error('Tabela administradores não existe. Certifique-se de que o esquema do banco foi criado.');
    }
  } finally {
    await client.release();
    await pool.end(); // Fecha o pool de conexões
  }
}

// Executa a função
createInitialAdmin()
  .catch(console.error)
  .finally(() => {
    console.log('Script finalizado');
  });