const API_URL = "http://localhost:3000";

// Função para criar uma nova votação
async function criarVotacao() {
    const nome_votacao = document.getElementById("nome_votacao").value;
    const descricao_votacao = document.getElementById("descricao_votacao").value;
    const data_inicio_votacao = document.getElementById("data_inicio_votacao").value;
    const data_fim_votacao = document.getElementById("data_fim_votacao").value;

    if (!nome_votacao || !descricao_votacao || !data_inicio_votacao || !data_fim_votacao) {
        alert("Preencha todos os campos!");
        return;
    }

    const response = await fetch(`${API_URL}/votacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
    });

    if (response.ok) {
        alert("Votação criada com sucesso!");
        carregarVotacoes(); // Atualiza a lista de votações
    } else {
        const error = await response.json();
        alert("Erro ao criar votação: " + error.error);
    }
}

// Função para carregar as votações existentes
async function carregarVotacoes() {
    const response = await fetch(`${API_URL}/votacoes`);
    const votacoes = await response.json();

    const lista = document.getElementById("lista-votacoes");
    lista.innerHTML = ""; // Limpa a lista antes de carregar

    votacoes.forEach(votacao => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `<strong>${votacao.nome_votacao}</strong> - ${votacao.descricao_votacao} 
                          <br> Início: ${votacao.data_inicio_votacao} | Fim: ${votacao.data_fim_votacao}`;
        lista.appendChild(item);
    });
}

// Carregar votações ao carregar a página
window.onload = carregarVotacoes;