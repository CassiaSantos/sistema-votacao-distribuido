// src/controllers/votacao.controller.js
const { pool, executeQuery } = require('../config/database');

class VotacaoController {
  async create(req, res) {
    const { nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao, opcoes } = req.body;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const votacaoResult = await client.query(
        'INSERT INTO votacoes (nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao]
      );

      const votacao = votacaoResult.rows[0];

      for (const opcao of opcoes) {
        await client.query(
          'INSERT INTO opcoes_voto (id_votacao, descricao_opcao_voto) VALUES ($1, $2)',
          [votacao.id_votacao, opcao]
        );
      }

      await client.query('COMMIT');
      return res.status(201).json(votacao);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Create Votação Error:', error);
      return res.status(500).json({ error: 'Erro ao criar votação' });
    } finally {
      client.release();
    }
  }

  async getActive(req, res) {
    try {
      const result = await executeQuery(`
        SELECT v.*, 
          json_agg(json_build_object(
            'id_opcao_voto', ov.id_opcao_voto,
            'descricao_opcao_voto', ov.descricao_opcao_voto
          )) as opcoes
        FROM votacoes v
        LEFT JOIN opcoes_voto ov ON ov.id_votacao = v.id_votacao
        WHERE CURRENT_TIMESTAMP BETWEEN v.data_inicio_votacao AND v.data_fim_votacao
        GROUP BY v.id_votacao
      `);
      return res.json(result.rows);

    } catch (error) {
      console.error('Get Active Votações Error:', error);
      return res.status(500).json({ error: 'Erro ao buscar votações ativas' });
    }
  }

  async getResults(req, res) {
    const { id_votacao } = req.params;
    try {
      const result = await executeQuery(
        'SELECT * FROM resultado_votacao WHERE id_votacao = $1',
        [id_votacao]
      );

      return res.json(result.rows);
    } catch (error) {
      console.error('Get Results Error:', error);
      return res.status(500).json({ error: 'Erro ao buscar resultados' });
    }
  }
}

module.exports = new VotacaoController();