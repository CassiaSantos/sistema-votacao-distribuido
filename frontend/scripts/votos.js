const API_URL = "http://localhost:3001";

// ID temporário do eleitor (enquanto não há login)
const id_eleitor = 1; // ⚠ Aqui será o ID do eleitor autenticado no futuro!

// Capturar ID da votação da URL
const urlParams = new URLSearchParams(window.location.search);
const id_votacao = urlParams.get("id_votacao");
document.getElementById("id_votacao").value = id_votacao;

// Função para carregar opções de voto
async function carregarOpcoes() {
    const response = await fetch(`${API_URL}/opcoes/${id_votacao}`);
    const opcoes = await response.json();

    const lista = document.getElementById("lista-opcoes");
    lista.innerHTML = "";

    opcoes.forEach(opcao => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
            <input type="radio" name="opcao_voto" value="${opcao.id_opcao_voto}"> ${opcao.descricao_opcao_voto}
        `;
        lista.appendChild(item);
    });
}

// Função para votar
async function votar() {
    const opcaoSelecionada = document.querySelector('input[name="opcao_voto"]:checked');

    if (!opcaoSelecionada) {
        alert("Selecione uma opção para votar!");
        return;
    }

    const id_opcao_voto = opcaoSelecionada.value;

    try {
        const response = await fetch(`${API_URL}/votos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_votacao, id_opcao_voto, id_eleitor })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        alert("Voto registrado com sucesso!");
    } catch (error) {
        alert("Erro ao votar: " + error.message);
    }
}

// Carregar opções ao abrir a página
window.onload = carregarOpcoes;