// Importando módulos necessários
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Inicia o app
const app = express();
//trata resposta da requisição para formato jSON:
app.use(express.json());
//libera o uso da API pelo Front-end:
app.use(cors());

// Criar uma nova votação
router.post('/votacoes', async (req, res) => {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;
    
    const { data, error } = await supabase
        .from('votacoes')
        .insert([{ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao }]);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Listar todas as votações
router.get('/votacoes', async (req, res) => {
    const { data, error } = await supabase.from('votacoes').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Editar uma votação (Atualizar)
router.put('/votacoes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;
    
    const { data, error } = await supabase
        .from('votacoes')
        .update({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
        .eq('id', id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Deletar uma votação
router.delete('/votacoes/:id', async (req, res) => {
    const { id } = req.params;
    
    const { error } = await supabase.from('votacoes').delete().eq('id', id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Votação deletada com sucesso!' });
});

// Configura uso das rotas
app.use(router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));