document.addEventListener("DOMContentLoaded", function () {
    const navbar = `
        <nav class="navbar navbar-expand-lg" style="background: var(--primary-color);">
            <div class="container">
                <a class="navbar-brand text-white fw-bold" href="#">DecideAí</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="votacoes.html">Votações</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="admin_login.html">Admin</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
});