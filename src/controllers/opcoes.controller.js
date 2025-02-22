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

    console.log("Buscando opções para a votação:", id_votacao); // Debug

    const { data, error } = await supabase
        .from('opcoes_voto')
        .select('*')
        .eq('id_votacao', id_votacao);

    if (error) {
        console.error("Erro ao buscar opções de voto:", error);
        return res.status(400).json({ error: error.message });
    }

    console.log("Opções encontradas:", data); // Debug

    res.json(data);
};

// Atualizar uma opção de voto
exports.atualizarOpcao = async (req, res) => {
    const { id_opcao_voto } = req.params;
    const { descricao_opcao_voto } = req.body;

    const { data, error } = await supabase
        .from('opcoes_voto')
        .update({ descricao_opcao_voto })
        .eq('id_opcao_voto', id_opcao_voto);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

// Deletar uma opção de voto
exports.deletarOpcao = async (req, res) => {
    const { id_opcao_voto } = req.params;

    const { error } = await supabase
        .from('opcoes_voto')
        .delete()
        .eq('id_opcao_voto', id_opcao_voto);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Opção de voto deletada com sucesso!" });
};