const supabase = require("../config/db.js");

const getResultadosVotacao = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("resultado_votacao") // Certifique-se que o nome está correto
            .select("*");

        if (error) {
            console.error("Erro ao buscar resultados da votação:", error);
            return res.status(500).json({ erro: "Erro ao buscar resultados" });
        }

        res.json(data);
    } catch (err) {
        console.error("Erro no servidor:", err);
        res.status(500).json({ erro: "Erro no servidor" });
    }
};

module.exports = { getResultadosVotacao };