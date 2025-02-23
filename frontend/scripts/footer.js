document.addEventListener("DOMContentLoaded", function () {
    const footer = `
        <footer style="
            background: var(--secondary-color); 
            color: white; 
            text-align: center; 
            padding: 15px; 
            position: absolute; 
            bottom: 0; 
            width: 90vw;">
            
            <p>&copy; ${new Date().getFullYear()} DedideAí - Todos os direitos reservados</p>
        </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footer);
});