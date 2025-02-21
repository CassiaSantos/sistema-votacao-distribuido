const API_URL = "http://localhost:3001";

// Capturar ID da votação da URL
const urlParams = new URLSearchParams(window.location.search);
const id_votacao = urlParams.get("id_votacao");
document.getElementById("id_votacao").value = id_votacao;

// Função para cadastrar uma nova opção de voto
async function cadastrarOpcao() {
    const descricao_opcao_voto = document.getElementById("descricao_opcao_voto").value;
    const id_votacao = document.getElementById("id_votacao").value; // Garante que o ID seja capturado

    if (!descricao_opcao_voto) {
        alert("Preencha a descrição da opção de voto!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/opcoes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_votacao, descricao_opcao_voto })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Erro: ${response.status} - ${errorData}`);
        }

        alert("Opção de voto cadastrada com sucesso!");
        carregarOpcoes();
    } catch (error) {
        console.error("Erro ao cadastrar opção de voto:", error);
        alert("Erro ao cadastrar opção de voto! Verifique o console para mais detalhes.");
    }
}

// Função para carregar opções já cadastradas
async function carregarOpcoes() {
    const response = await fetch(`${API_URL}/opcoes/${id_votacao}`);
    const opcoes = await response.json();

    const lista = document.getElementById("lista-opcoes");
    lista.innerHTML = "";

    opcoes.forEach(opcao => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.textContent = opcao.descricao_opcao_voto;
        lista.appendChild(item);
    });
}

// Carregar opções ao carregar a página
window.onload = carregarOpcoes;