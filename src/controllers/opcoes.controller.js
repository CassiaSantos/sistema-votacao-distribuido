const supabase = require('../config/db');

// Criar uma opção de voto
exports.criarOpcao = async (req, res) => {
    const { id_votacao, descricao_opcao_voto } = req.body;

    const { data, error } = await supabase
        .from('opcoes_voto')
        .insert([{ id_votacao, descricao_opcao_voto }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
};

// Listar opções de uma votação
exports.listarOpcoes = async (req, res) => {
    const { id_votacao } = req.params;

    const { data, error } = await supabase
        .from('opcoes_voto')
        .select('*')
        .eq('id_votacao', id_votacao);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};