const API_URL = "http://localhost:3001";

function mostrarLogin() {
    document.getElementById("form-container").innerHTML = `
        <h2>Login</h2>
        <div class="mb-3">
            <input type="text" id="nome_eleitor" class="form-control" placeholder="Nome Completo">
        </div>
        <div class="mb-3">
            <input type="email" id="email_eleitor" class="form-control" placeholder="E-mail">
        </div>
        <button class="btn btn-success" onclick="fazerLogin()">Entrar</button>
    `;
}

function mostrarCadastro() {
    document.getElementById("form-container").innerHTML = `
        <h2>Cadastro</h2>
        <div class="mb-3">
            <input type="text" id="novo_nome" class="form-control" placeholder="Nome Completo">
        </div>
        <div class="mb-3">
            <input type="email" id="novo_email" class="form-control" placeholder="E-mail">
        </div>
        <button class="btn btn-primary" onclick="cadastrarEleitor()">Cadastrar</button>
    `;
}

// Função para fazer login
async function fazerLogin() {
    const nome_eleitor = document.getElementById("nome_eleitor").value;
    const email_eleitor = document.getElementById("email_eleitor").value;

    if (!nome_eleitor || !email_eleitor) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_eleitor, email_eleitor })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Login bem-sucedido!");

            localStorage.setItem("id_eleitor", result.eleitor.id_eleitor); // Armazena o ID do eleitor
            window.location.href = "/frontend/pages/escolher_votacao.html"; // Redireciona para escolha de votação


            window.location.href = "/frontend/pages/escolher_votacao.html"; // Redireciona para a página principal
        } else {
            alert("Erro no login: " + result.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API.");
    }
}

// Função para cadastrar eleitor
async function cadastrarEleitor() {
    const nome_eleitor = document.getElementById("novo_nome").value;
    const email_eleitor = document.getElementById("novo_email").value;

    if (!nome_eleitor || !email_eleitor) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_eleitor, email_eleitor })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            mostrarLogin(); // Após cadastro, exibe o formulário de login
        } else {
            alert("Erro no cadastro: " + result.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API.");
    }
}