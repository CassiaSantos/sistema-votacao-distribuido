async function carregarResultados() {
    try {
        const response = await fetch("http://localhost:3001/resultado_votacao");
        const resultados = await response.json();

        const container = document.getElementById("container-votacoes");
        container.innerHTML = "";

        // Agrupar os resultados por votação
        const votacoesMap = new Map();

        resultados.forEach(resultado => {
            if (!votacoesMap.has(resultado.id_votacao)) {
                votacoesMap.set(resultado.id_votacao, {
                    nome: resultado.nome_votacao,
                    opcoes: []
                });
            }
            votacoesMap.get(resultado.id_votacao).opcoes.push({
                descricao: resultado.descricao_opcao_voto || "Sem opção",
                total: resultado.total_votos || 0
            });
        });

        // Criar uma tabela para cada votação
        votacoesMap.forEach((dados, idVotacao) => {
            const tabelaHTML = `
                <div class="votacao-container">
                    <h3>(ID: ${idVotacao}) - ${dados.nome}</h3>
                    <table class="tabela-votacao">
                        <thead>
                            <tr>
                                <th>Opção de Voto</th>
                                <th>Total de Votos</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dados.opcoes.map(opcao => `
                                <tr>
                                    <td>${opcao.descricao}</td>
                                    <td>${opcao.total} votos</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            container.innerHTML += tabelaHTML;
        });

    } catch (error) {
        console.error("Erro ao carregar resultados:", error);
    }
}

carregarResultados();