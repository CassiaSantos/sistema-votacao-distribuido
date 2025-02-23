const API_URL = "http://localhost:3001";

async function fazerLoginAdmin() {
    const email_admin = document.getElementById("email_admin").value;
    const senha_admin = document.getElementById("senha_admin").value;

    if (!email_admin || !senha_admin) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email_admin, senha_admin })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Login bem-sucedido!");
            window.location.href = "admin_dashboard.html"; // Redireciona para a dashboard
        } else {
            alert("Erro no login: " + result.error);
        }
    } catch (error) {
        alert("Erro ao conectar à API.");
    }
}