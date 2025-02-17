const API_URL = "http://localhost:3000";

// Função para carregar as votações existentes
async function carregarVotacoes() {
  const response = await fetch(`${API_URL}/votacoes`);
  const votacoes = await response.json();

  const lista = document.getElementById("lista-votacoes");
  lista.innerHTML = "";

  votacoes.forEach((votacao) => {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `
            <strong>${votacao.nome_votacao}</strong> - ${votacao.descricao_votacao} 
            <br> Início: ${votacao.data_inicio_votacao} | Fim: ${votacao.data_fim_votacao}
            <br>
            <button onclick="editarVotacao(${votacao.id_votacao})" class="btn btn-warning btn-sm">Editar</button>
            <button onclick="deletarVotacao(${votacao.id_votacao})" class="btn btn-danger btn-sm">Deletar</button>
        `;
    lista.appendChild(item);
  });
}

// Função para carregar os dados da votação no formulário para edição
async function editarVotacao(id_votacao) {
  const response = await fetch(`${API_URL}/votacoes/${id_votacao}`);
  const votacao = await response.json();

  document.getElementById("id_votacao").value = id_votacao;
  document.getElementById("nome_votacao").value = votacao.nome_votacao;
  document.getElementById("descricao_votacao").value =
    votacao.descricao_votacao;
  document.getElementById("data_inicio_votacao").value =
    votacao.data_inicio_votacao.split("T")[0];
  document.getElementById("data_fim_votacao").value =
    votacao.data_fim_votacao.split("T")[0];
  document.getElementById("botao-salvar").textContent = "Salvar Alterações";
  document
    .getElementById("botao-salvar")
    .setAttribute("onclick", "salvarAlteracoes()");
}

// Função para salvar as alterações da votação
async function salvarAlteracoes() {
  const id_votacao = document.getElementById("id_votacao").value;
  const nome_votacao = document.getElementById("nome_votacao").value;
  const descricao_votacao = document.getElementById("descricao_votacao").value;
  const data_inicio_votacao = document.getElementById(
    "data_inicio_votacao"
  ).value;
  const data_fim_votacao = document.getElementById("data_fim_votacao").value;

  if (
    !nome_votacao ||
    !descricao_votacao ||
    !data_inicio_votacao ||
    !data_fim_votacao
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  const response = await fetch(`${API_URL}/votacoes/${id_votacao}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome_votacao,
      descricao_votacao,
      data_inicio_votacao,
      data_fim_votacao,
    }),
  });

  if (response.ok) {
    alert("Votação atualizada com sucesso!");
    document.getElementById("botao-salvar").textContent = "Criar";
    document
      .getElementById("botao-salvar")
      .setAttribute("onclick", "salvarVotacao()");
    limparFormulario();
    carregarVotacoes();
  } else {
    const error = await response.json();
    alert("Erro ao atualizar votação: " + error.error);
  }
}

// Função para limpar o formulário
function limparFormulario() {
  document.getElementById("id_votacao").value = "";
  document.getElementById("nome_votacao").value = "";
  document.getElementById("descricao_votacao").value = "";
  document.getElementById("data_inicio_votacao").value = "";
  document.getElementById("data_fim_votacao").value = "";
}

// Carregar votações ao carregar a página
window.onload = carregarVotacoes;
