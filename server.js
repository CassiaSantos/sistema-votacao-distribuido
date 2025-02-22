const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Importar rotas
const votacoesRoutes = require('./src/routes/votacoes.routes.js');
app.use('/votacoes', votacoesRoutes);
const opcoesRoutes = require('./src/routes/opcoes.routes.js');
app.use('/opcoes', opcoesRoutes);
const votosRoutes = require('./src/routes/votos.routes');
app.use('/votos', votosRoutes);
const authRoutes = require('./src/routes/auth.routes');
app.use('/auth', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));