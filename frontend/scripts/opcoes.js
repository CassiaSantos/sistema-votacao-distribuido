const API_URL = "http://localhost:3001";

// Capturar ID da votação da URL
const urlParams = new URLSearchParams(window.location.search);
const id_votacao = urlParams.get("id_votacao");
document.getElementById("id_votacao").value = id_votacao;

// Função para salvar uma opção de voto (criar ou atualizar)
async function salvarOpcao() {
    const descricao_opcao_voto = document.getElementById("descricao_opcao_voto").value;
    const id_opcao_voto = document.getElementById("id_opcao_voto").value; // Se estiver preenchido, é edição

    if (!descricao_opcao_voto) {
        alert("Preencha a descrição da opção de voto!");
        return;
    }

    let metodo = id_opcao_voto ? "PUT" : "POST";
    let url = id_opcao_voto ? `${API_URL}/opcoes/${id_opcao_voto}` : `${API_URL}/opcoes`;

    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_votacao, descricao_opcao_voto })
    });

    if (response.ok) {
        alert(id_opcao_voto ? "Opção de voto atualizada com sucesso!" : "Opção de voto cadastrada com sucesso!");
        limparFormulario();
        carregarOpcoes();
    } else {
        const error = await response.json();
        alert("Erro ao salvar opção de voto: " + error.error);
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
        item.innerHTML = `
            ${opcao.descricao_opcao_voto}
            <button onclick="editarOpcao(${opcao.id_opcao_voto}, '${opcao.descricao_opcao_voto}')" class="btn btn-warning btn-sm mx-2">✏️ Editar</button>
            <button onclick="deletarOpcao(${opcao.id_opcao_voto})" class="btn btn-danger btn-sm">🗑️ Deletar</button>
        `;
        lista.appendChild(item);
    });
}

// Função para carregar os dados da opção no formulário para edição
function editarOpcao(id_opcao_voto, descricao) {
    document.getElementById("id_opcao_voto").value = id_opcao_voto;
    document.getElementById("descricao_opcao_voto").value = descricao;
    document.getElementById("botao-salvar").textContent = "Salvar Alterações";
}

// Função para deletar uma opção de voto
async function deletarOpcao(id_opcao_voto) {
    if (!confirm("Tem certeza que deseja deletar esta opção de voto?")) return;

    const response = await fetch(`${API_URL}/opcoes/${id_opcao_voto}`, { method: "DELETE" });

    if (response.ok) {
        alert("Opção de voto deletada com sucesso!");
        carregarOpcoes();
    } else {
        const error = await response.json();
        alert("Erro ao deletar opção de voto: " + error.error);
    }
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("id_opcao_voto").value = "";
    document.getElementById("descricao_opcao_voto").value = "";
    document.getElementById("botao-salvar").textContent = "Adicionar Opção";
}

// Carregar opções ao carregar a página
window.onload = carregarOpcoes;