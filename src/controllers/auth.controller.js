const supabase = require('../config/db');

// Login de eleitor
exports.fazerLogin = async (req, res) => {
    const { nome_eleitor, email_eleitor } = req.body;

    const { data, error } = await supabase
        .from('eleitores')
        .select('*')
        .eq('nome_eleitor', nome_eleitor)
        .eq('email_eleitor', email_eleitor)
        .single();

    if (error || !data) {
        return res.status(400).json({ error: "Nome ou e-mail inválidos!" });
    }

    res.json({ message: "Login bem-sucedido!", eleitor: data });
};

// Cadastro de eleitor
exports.cadastrarEleitor = async (req, res) => {
    const { nome_eleitor, email_eleitor } = req.body;

    const { data, error } = await supabase
        .from('eleitores')
        .insert([{ nome_eleitor, email_eleitor }])
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data[0]);
};