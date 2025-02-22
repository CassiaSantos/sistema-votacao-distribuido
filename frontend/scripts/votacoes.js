const API_URL = "http://localhost:3001";

// Função para carregar votações disponíveis
async function carregarVotacoes() {
    const response = await fetch(`${API_URL}/votacoes`);
    const votacoes = await response.json();

    const lista = document.getElementById("lista-votacoes");
    lista.innerHTML = "";

    votacoes.forEach(votacao => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
            <strong>${votacao.nome_votacao}</strong> - ${votacao.descricao_votacao} 
            <br> 📅 Início: ${votacao.data_inicio_votacao}
            <br> ⏳ Fim: ${votacao.data_fim_votacao}
            <br>
            <button onclick="redirecionarParaVotar(${votacao.id_votacao})" class="btn btn-primary">Votar</button>
        `;
        lista.appendChild(item);
    });
}

// Função para redirecionar para a votação escolhida
function redirecionarParaVotar(id_votacao) {
    window.location.href = `/frontend/pages/votar.html?id_votacao=${id_votacao}`;
}

// Carregar votações ao abrir a página
window.onload = carregarVotacoes;