const API_URL = "http://localhost:3000";

// Função para criar ou atualizar uma votação
async function salvarVotacao() {
    const nome_votacao = document.getElementById("nome_votacao").value;
    const descricao_votacao = document.getElementById("descricao_votacao").value;
    const data_inicio_votacao = document.getElementById("data_inicio_votacao").value;
    const data_fim_votacao = document.getElementById("data_fim_votacao").value;

    if (!nome_votacao || !descricao_votacao || !data_inicio_votacao || !data_fim_votacao) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/votacoes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
        });

        if (response.ok) {
            alert("Votação criada com sucesso!");
            carregarVotacoes();
        } else {
            const error = await response.json();
            alert("Erro ao criar votação: " + error.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API: " + error.message);
    }
}

// Função para carregar as votações existentes
async function carregarVotacoes() {
    try {
        const response = await fetch(`${API_URL}/votacoes`);
        const votacoes = await response.json();

        const lista = document.getElementById("lista-votacoes");
        lista.innerHTML = "";

        votacoes.forEach(votacao => {
            const item = document.createElement("li");
            item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

            item.innerHTML = `
                <div>
                    <strong>${votacao.nome_votacao}</strong> - ${votacao.descricao_votacao}
                    <br> 🗓️ Início: ${new Date(votacao.data_inicio_votacao).toLocaleDateString()} | Fim: ${new Date(votacao.data_fim_votacao).toLocaleDateString()}
                </div>
                <div>
                    <button onclick="editarVotacao(${votacao.id_votacao})" class="btn btn-warning btn-sm">Editar</button>
                    <button onclick="deletarVotacao(${votacao.id_votacao})" class="btn btn-danger btn-sm">Deletar</button>

                </div>
            `;
            lista.appendChild(item);
        });
    } catch (error) {
        alert("Erro ao carregar votações: " + error.message);
    }
}

// Função para editar uma votação
async function editarVotacao(id) {
    const nome_votacao = prompt("Novo nome da votação:");
    if (!nome_votacao) return;

    const descricao_votacao = prompt("Nova descrição da votação:");
    if (!descricao_votacao) return;

    const data_inicio_votacao = prompt("Nova data de início (YYYY-MM-DD):");
    if (!data_inicio_votacao) return;

    const data_fim_votacao = prompt("Nova data de fim (YYYY-MM-DD):");
    if (!data_fim_votacao) return;

    try {
        const response = await fetch(`${API_URL}/votacoes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_votacao, descricao_votacao, data_inicio_votacao, data_fim_votacao })
        });

        if (response.ok) {
            alert("Votação editada com sucesso!");
            carregarVotacoes();
        } else {
            const error = await response.json();
            alert("Erro ao editar votação: " + error.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API: " + error.message);
    }
}

// Função para deletar uma votação
async function deletarVotacao(id) {
    if (!confirm("Tem certeza que deseja deletar esta votação?")) return;

    try {
        const response = await fetch(`${API_URL}/votacoes/${id}`, { method: "DELETE" });

        if (response.ok) {
            alert("Votação deletada com sucesso!");
            carregarVotacoes();
        } else {
            const error = await response.json();
            alert("Erro ao deletar votação: " + error.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API: " + error.message);
    }
}

// Carregar votações ao carregar a página
window.onload = carregarVotacoes;