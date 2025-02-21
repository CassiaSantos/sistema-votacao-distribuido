const supabase = require('../config/db');

// Registrar um voto
exports.registrarVoto = async (req, res) => {
    const { id_votacao, id_opcao_voto, id_eleitor } = req.body;

    // Verificar se o eleitor já votou nesta votação
    const { data: votoExistente } = await supabase
        .from('votos')
        .select('*')
        .eq('id_votacao', id_votacao)
        .eq('id_eleitor', id_eleitor)
        .single();

    if (votoExistente) {
        return res.status(400).json({ error: "Você já votou nesta votação!" });
    }

    // Registrar o voto
    const { data, error } = await supabase
        .from('votos')
        .insert([{ id_votacao, id_opcao_voto, id_eleitor, data_hora_voto: new Date() }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "Voto registrado com sucesso!" });
};

// Listar votos de uma votação (para exibir resultados)
exports.listarVotos = async (req, res) => {
    const { id_votacao } = req.params;

    const { data, error } = await supabase
        .from('votos')
        .select('id_opcao_voto, count(*)')
        .eq('id_votacao', id_votacao)
        .group('id_opcao_voto');

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(data);
};