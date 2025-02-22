const API_URL = "http://localhost:3001";
const id_eleitor = localStorage.getItem("id_eleitor");
const urlParams = new URLSearchParams(window.location.search);
const id_votacao = urlParams.get("id_votacao");

document.getElementById("id_votacao").value = id_votacao;

// Função para carregar opções de voto da votação escolhida
async function carregarOpcoes() {
    console.log("ID da votação recebida:", id_votacao); // Debug para ver se o ID está correto

    if (!id_votacao) {
        alert("Erro: Nenhuma votação foi selecionada!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/opcoes/${id_votacao}`);
        
        if (!response.ok) {
            throw new Error("Erro ao carregar opções de voto.");
        }

        const opcoes = await response.json();
        console.log("Opções carregadas:", opcoes); // Debug para ver se a API retornou algo

        const lista = document.getElementById("lista-opcoes");
        lista.innerHTML = "";

        if (opcoes.length === 0) {
            lista.innerHTML = "<p>Não há opções de voto disponíveis para esta votação.</p>";
            return;
        }

        opcoes.forEach(opcao => {
            const item = document.createElement("li");
            item.classList.add("list-group-item");
            item.innerHTML = `
                <input type="radio" name="opcao_voto" value="${opcao.id_opcao_voto}"> ${opcao.descricao_opcao_voto}
            `;
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao carregar opções:", error);
        alert("Erro ao carregar opções de voto.");
    }
}

//funcao para votar
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

        const result = await response.json();
        
        if (response.ok) {
            alert("Voto registrado com sucesso!");
            window.location.href = "obrigada_por_votar.html";
        } else {
            alert("Erro ao votar: " + result.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API.");
    }
}

// Chamar a função ao carregar a página
window.onload = carregarOpcoes;