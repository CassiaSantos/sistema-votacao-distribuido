// Importando módulos necessários
const express = require('express');
const router = express.Router()
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//inicia o app:
const app = express();
//trata resposta da requisição para formato jSON:
app.use(express.json());
//libera o uso da API pelo Front-end:
app.use(cors());


// Configura rota POST /votacoes (Criar uma nova votação)
router.post('/votacoes', async (req, res) => {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;
    
    const { data, error } = await supabase
        .from('votacoes')
        .insert([{ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao }]);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Configura rota GET /votacoes (Listar todas as votações)
router.get('/votacoes', async (req, res) => {
    const { data, error } = await supabase.from('votacoes').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Configura rota POST /votos (Registrar um voto com restrição de 1 voto por eleitor)
router.post('/votos', async (req, res) => {
    const { id_votacao, id_opcao_voto, id_eleitor } = req.body;
    
    // Verificar se o eleitor já votou nessa votação
    const { data: votoExistente } = await supabase
        .from('votos')
        .select('*')
        .eq('id_votacao', id_votacao)
        .eq('id_eleitor', id_eleitor)
        .single();
    
    if (votoExistente) {
        return res.status(400).json({ error: 'Eleitor já votou nesta votação' });
    }
    
    // Registrar o voto
    const { data, error } = await supabase
        .from('votos')
        .insert([{ id_votacao, id_opcao_voto, id_eleitor, data_hora_voto: new Date() }]);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Configura rota GET /resultados/:id_votacao (Consultar resultados de uma votação)
router.get('/resultados/:id_votacao', async (req, res) => {
    const { id_votacao } = req.params;
    
    const { data, error } = await supabase
        .from('votos')
        .select('id_opcao_voto, count(*)')
        .eq('id_votacao', id_votacao)
        .group('id_opcao_voto');
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// Configura uso das rotas
app.use(router);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));