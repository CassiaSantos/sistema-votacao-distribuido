document.addEventListener("DOMContentLoaded", function () {
    const navbar = `
        <nav class="navbar navbar-expand-lg" style="background: var(--primary-color); height:6rem;">
            <div class="container">
                <img style="max-width: 2rem; margin: 1rem;"
                src="https://github.com/CassiaSantos/sistema-votacao-distribuido/blob/main/frontend/img/voto_computer.png?raw=true"  alt="Logo" class="logo"> <!--Imagem vinda de https://cdn-icons-png.flaticon.com/-->
                <a class="navbar-brand text-white fw-bold" href="#">DecideAí</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="../../index.html">Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbar);
});