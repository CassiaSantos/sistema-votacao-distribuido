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