// Importando módulos necessários
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Inicia o app
const app = express();
//trata resposta da requisição para formato jSON:
app.use(express.json());
//libera o uso da API pelo Front-end:
app.use(cors());

// Criar uma nova votação
app.post('/votacoes', async (req, res) => {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;
    
    const { data, error } = await supabase
        .from('votacoes')
        .insert([{ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
});

// Listar todas as votações
app.get('/votacoes', async (req, res) => {
    const { data, error } = await supabase.from('votacoes').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Obter uma votação por ID
app.get('/votacoes/:id_votacao', async (req, res) => {
    const { id_votacao } = req.params;

    const { data, error } = await supabase
        .from('votacoes')
        .select('*')
        .eq('id_votacao', id_votacao)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Atualizar uma votação existente
app.put('/votacoes/:id_votacao', async (req, res) => {
    const { id_votacao } = req.params;
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;
    
    const { data, error } = await supabase
        .from('votacoes')
        .update({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
        .eq('id_votacao', id_votacao)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
});

// Deletar uma votação
app.delete('/votacoes/:id_votacao', async (req, res) => {
    const { id_votacao } = req.params;
    
    const { error } = await supabase
        .from('votacoes')
        .delete()
        .eq('id_votacao', id_votacao);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Votação deletada com sucesso!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));