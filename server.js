// src/server.js
require('dotenv').config();
const app = require('./src/app');
const process = require('process');

// Configurações do servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Promise rejeitada não tratada:', error);
  process.exit(1);
});

// Graceful shutdown
function shutdown() {
  console.log('Recebido sinal de encerramento');
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
}

// Inicia o servidor
const server = app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Configura timeout do servidor
// server.timeout = 30000; // 30 segundos

// Tratamento de sinais de encerramento
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = server;