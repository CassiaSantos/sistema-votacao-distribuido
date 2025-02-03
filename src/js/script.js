let currentVotacao = null;
let selectedOption = null;
let currentEleitor = null;
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

// Simulated API endpoints (to be replaced with actual API calls)
const API_URL = 'http://your-api-url';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailEleitor').value;
    
    try {
        // In real implementation, this would be an API call
        const response = await fetch(`${API_URL}/eleitores?email=${email}`);
        const eleitor = await response.json();
        
        if (eleitor) {
            currentEleitor = eleitor;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('votingSection').style.display = 'block';
            loadActiveVotacao();
        }
    } catch (error) {
        alert('Erro ao fazer login. Tente novamente.');
    }
});

        
async function loadActiveVotacao() {
    try {
        // In real implementation, this would be an API call
        const response = await fetch(`${API_URL}/votacoes/active`);
        const votacao = await response.json();
        
        if (votacao) {
            currentVotacao = votacao;
            displayVotacao(votacao);
        }
    } catch (error) {
        alert('Erro ao carregar votação ativa.');
    }
}

function displayVotacao(votacao) {
    document.getElementById('votingTitle').textContent = votacao.nome_votacao;
    document.getElementById('votingDescription').textContent = votacao.descricao_votacao;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    votacao.opcoes.forEach(opcao => {
        const optionCard = document.createElement('div');
        optionCard.className = 'col-md-4 mb-4';
        optionCard.innerHTML = `
            <div class="card option-card h-100" data-option-id="${opcao.id_opcao_voto}">
                <div class="card-body">
                    <h5 class="card-title">${opcao.descricao_opcao_voto}</h5>
                </div>
            </div>
        `;
        optionsContainer.appendChild(optionCard);
        
        optionCard.addEventListener('click', () => selectOption(opcao));
    });
}

function selectOption(opcao) {
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const selectedCard = document.querySelector(`[data-option-id="${opcao.id_opcao_voto}"]`);
    selectedCard.classList.add('selected');
    
    selectedOption = opcao;
    document.getElementById('submitVote').style.display = 'block';
    document.getElementById('selectedOptionText').textContent = opcao.descricao_opcao_voto;
}

document.getElementById('submitVote').addEventListener('click', () => {
    if (selectedOption) {
        confirmationModal.show();
    }
});

document.getElementById('confirmVoteBtn').addEventListener('click', async () => {
    try {
        // In real implementation, this would be an API call
        const response = await fetch(`${API_URL}/votos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_votacao: currentVotacao.id_votacao,
                id_opcao_voto: selectedOption.id_opcao_voto,
                id_eleitor: currentEleitor.id_eleitor,
                data_hora_voto: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            confirmationModal.hide();
            alert('Voto registrado com sucesso!');
            window.location.reload();
        }
    } catch (error) {
        alert('Erro ao registrar voto. Tente novamente.');
    }
});