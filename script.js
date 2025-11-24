let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar os cards iniciais
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

// Função que filtra os dados com base no termo de busca
function iniciarBusca() {
    // Pega o valor do campo de busca e converte para minúsculas para busca case-insensitive
    let termoBusca = campoBusca.value.toLowerCase();

    // Filtra o array 'dados'
    let dadosFiltrados = dados.filter(dado => {
        // Verifica se o nome da linguagem (em minúsculas) inclui o termo buscado
        return dado.nome.toLowerCase().includes(termoBusca);
    });

    // Renderiza os cards com os dados filtrados
    renderizarCards(dadosFiltrados);
}

// Função que renderiza os cards na tela
function renderizarCards(dados) {
    // Limpa o container de cards antes de adicionar os novos
    cardContainer.innerHTML = "";

    for (let dado of dados){
        let article = document.createElement("article");
        article.innerHTML = `
        <div class="coluna-esquerda">
            <h2>${dado.nome}</h2>
            <a href="${dado.link}" target="_blank">Leia mais</a>
        </div>
        <div class="coluna-direita">
            <img src="${dado.imagem_url}" alt="Foto de ${dado.nome}">
            <div>
                <p><strong>Atuação:</strong> ${dado.atuacao}</p>
                <p>${dado.descricao}</p>
                <p class="teorias-titulo"><strong>Principais Teorias:</strong></p>
                <ul class="teorias-lista">${dado.principais_teorias.map(teoria => `<li>${teoria}</li>`).join('')}</ul>
            </div>
        </div>
        `
        cardContainer.appendChild(article);
    }
}

// Chama a função para carregar os dados assim que o script for executado
carregarDados();