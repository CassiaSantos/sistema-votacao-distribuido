// src/config/database.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting_system',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;