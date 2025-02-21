const supabase = require('../config/db');

// Criar uma votação
exports.criarVotacao = async (req, res) => {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;

    // Validar se a data de início é menor que a de fim
    if (new Date(data_inicio_votacao) >= new Date(data_fim_votacao)) {
        return res.status(400).json({ error: "A data de início deve ser menor que a data de encerramento!" });
    }

    const { data, error } = await supabase
        .from('votacoes')
        .insert([{ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao }])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data[0]);
};

// Listar todas as votações
exports.listarVotacoes = async (req, res) => {
    const { data, error } = await supabase.from('votacoes').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

// Obter uma votação por ID
exports.obterVotacao = async (req, res) => {
    const { id_votacao } = req.params;

    const { data, error } = await supabase
        .from('votacoes')
        .select('*')
        .eq('id_votacao', id_votacao)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

// Atualizar uma votação
exports.atualizarVotacao = async (req, res) => {
    const { id_votacao } = req.params;
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao } = req.body;

    const { data, error } = await supabase
        .from('votacoes')
        .update({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
        .eq('id_votacao', id_votacao)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
};

// Deletar uma votação
exports.deletarVotacao = async (req, res) => {
    const { id_votacao } = req.params;

    const { error } = await supabase
        .from('votacoes')
        .delete()
        .eq('id_votacao', id_votacao);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Votação deletada com sucesso!' });
};