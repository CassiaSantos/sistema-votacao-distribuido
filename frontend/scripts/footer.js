document.addEventListener("DOMContentLoaded", function () {
    const footer = `
        <footer style="
            background: var(--secondary-color); 
            color: white; 
            text-align: center; 
            padding: 15px 0; 
            position: relative;
            bottom: 0; 
            width: 100%;
            margin: auto;">
            
            <p>&copy; ${new Date().getFullYear()} DedideAí - Todos os direitos reservados</p>
        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footer);
});