const supabase = require('../config/db');

exports.fazerLoginAdmin = async (req, res) => {
    const { email_admin, senha_admin } = req.body;

    if (!email_admin || !senha_admin) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    // Buscar administrador no banco
    const { data, error } = await supabase
        .from("administradores")
        .select("id_admin, email_admin, senha_admin")
        .eq("email_admin", email_admin)
        .single();

    if (error || !data) {
        return res.status(401).json({ error: "E-mail ou senha inválidos!" });
    }

    //ponto a ser melhorado:
    if (senha_admin !== data.senha_admin) {
        return res.status(401).json({ error: "E-mail ou senha inválidos!" });
    }

    res.json({ message: "Login bem-sucedido!" });
};