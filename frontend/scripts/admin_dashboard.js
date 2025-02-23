async function carregarVotacoes() {
    try {
        const response = await fetch("http://localhost:3001/resultado_votacao"); // Pegando os resultados
        const resultados = await response.json();

        console.log(resultados); // Veja no console se os dados estão corretos

        const tabela = document.getElementById("tabela-votacoes");
        tabela.innerHTML = "";

        resultados.forEach(resultado => {
            // Ajuste para capturar os novos campos corretamente
            const idVotacao = resultado.id_votacao ?? 'Não informado';
            const nomeVotacao = resultado.nome_votacao ?? 'Não informado';
            const opcaoVoto = resultado.descricao_opcao_voto ?? 'Sem opção';
            const totalVotos = resultado.total_votos ?? 0;

            const linha = `<tr>
                <td>${idVotacao}</td>
                <td>${nomeVotacao}</td>
                <td>${opcaoVoto} - ${totalVotos} votos</td>
            </tr>`;
            tabela.innerHTML += linha;
        });
    } catch (error) {
        console.error("Erro ao carregar resultados das votações:", error);
    }
}

document.addEventListener("DOMContentLoaded", carregarVotacoes);


// async function carregarVotacoes() {
//     try {
//         const response = await fetch("http://localhost:3001/votacoes");
//         const votacoes = await response.json();
        
//         const tabela = document.getElementById("tabela-votacoes");
//         tabela.innerHTML = "";

//         votacoes.forEach(votacao => {
//             const linha = `<tr>
//                 <td>${votacao.id_votacao}</td>
//                 <td>${votacao.nome_votacao}</td>
//                 <td>${votacao.total_votos || 'Aguardando resultado'}</td>
//             </tr>`;
//             tabela.innerHTML += linha;
//             console.log(votacoes); // Para verificar o formato dos dados

//         });
//     } catch (error) {
//         console.error("Erro ao carregar votações:", error);
//     }
// }

// carregarVotacoes();

// async function carregarVotacoes() {
//     try {
//         const response = await fetch("http://localhost:3001/resultado_votacao"); // Pegando os resultados
//         const resultados = await response.json();
        
//         const tabela = document.getElementById("tabela-votacoes");
//         tabela.innerHTML = "";

//         resultados.forEach(resultado => {
//             const linha = `<tr>
//                 <td>${resultado.id_votacao}</td>
//                 <td>${resultado.nome_votacao}</td>
//                 <td>${resultado.descricao_opcao_voto} - ${resultado.total_votos} votos</td>
//             </tr>`;
//             tabela.innerHTML += linha;
//         });
//     } catch (error) {
//         console.error("Erro ao carregar resultados das votações:", error);
//     }
// }

// async function carregarVotacoes() {
//     try {
//         const response = await fetch("http://localhost:3001/resultado_votacao"); // Pegando os resultados
//         const resultados = await response.json();

//         console.log(resultados); // Adicione isso para ver os dados no console

//         const tabela = document.getElementById("tabela-votacoes");
//         tabela.innerHTML = "";

//         resultados.forEach(resultado => {
//             // Certifique-se de que os campos estão corretos
//             const idVotacao = resultado.id_votacao ?? 'Não informado';
//             const nomeVotacao = resultado.nome_votacao ?? 'Não informado';
//             const opcaoVoto = resultado.descricao_opcao_voto ?? 'Sem opção';
//             const totalVotos = resultado.total_votos ?? 0;

//             const linha = `<tr>
//                 <td>${idVotacao}</td>
//                 <td>${nomeVotacao}</td>
//                 <td>${opcaoVoto} - ${totalVotos} votos</td>
//             </tr>`;
//             tabela.innerHTML += linha;
//         });
//     } catch (error) {
//         console.error("Erro ao carregar resultados das votações:", error);
//     }
// }

document.addEventListener("DOMContentLoaded", carregarVotacoes);


// document.addEventListener("DOMContentLoaded", carregarVotacoes);


// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const response = await fetch("http://localhost:3001/votacoes");
//         const votacoes = await response.json();

//         const tabela = document.getElementById("tabela-votacoes");
//         tabela.innerHTML = ""; // Limpa a tabela antes de popular

//         votacoes.forEach(votacao => {
//             const row = `
//                 <tr>
//                     <td>${votacao.id || "N/A"}</td>
//                     <td>${votacao.nome || "N/A"}</td>
//                     <td>${votacao.resultado || "Aguardando resultado"}</td>
//                 </tr>
//             `;
//             tabela.innerHTML += row;
//         });
//     } catch (error) {
//         console.error("Erro ao carregar votações:", error);
//     }
// });