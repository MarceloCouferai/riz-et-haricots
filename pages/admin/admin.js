const categorias = document.querySelector("#qtd-categorias");
const pratos = document.querySelector("#qtd-pratos")

document.addEventListener("DOMContentLoaded", function() {

    paginator({
        table: document.getElementById("table"),
        box: document.getElementById("paginator"),
        rows_per_page: 7
   }, true);

});

fetch('../../produtos.json').then((response) => {
    response.json().then((dados) => {
        const qtdCategoria = Object.keys(dados).length;

        const qtdSobremesas = Object.keys(dados.Sobremesa).length;
        const qtdPrincipal = Object.keys(dados.pratoPrincipal).length;
        const qtdEntradas = Object.keys(dados.pratoEntrada).length;

        const qtdPratos = qtdSobremesas + qtdPrincipal + qtdEntradas;

        categorias.innerHTML = `<h2>${qtdCategoria}</h2>`
        pratos.innerHTML = `<h2>${qtdPratos}</h2>`
    })
})


const mainPgInicial = document.getElementById("main-pginicial");
const mainCardapio = document.getElementById("main-cardapio");

const pgInicial = document.getElementById("pg-inicial");
const pgCardapio = document.getElementById("pg-cardapio")

pgCardapio.addEventListener("click", () => {
    event.preventDefault();
    mainPgInicial.style.display = "none";
    mainCardapio.style.display = "flex";
});

pgInicial.addEventListener("click", () => {
    event.preventDefault();
    mainCardapio.style.display = "none";
    mainPgInicial.style.display = "flex";
});


const celula = document.querySelector(".info-table");

fetch('../../produtos.json').then((response) =>{ //pegar arquivo e retornar
    response.json().then((dados) =>{ //converte em um objeto
        dados.pratoEntrada.map((prato) => { //mapeia dados baseado em pratoEntrada
            celula.innerHTML += `
                <tr>
                <td>${prato.nome}</td>
                <td>${prato.preco}</td>
                <td class="td-justify">${prato.descricao}</td>
                <td>${prato.imagem}</td>
                <td>${prato.categoria}</td>
                <td><i class="fa-solid fa-trash"></i></td>
                </tr>
            `
        });
        dados.pratoPrincipal.map((prato) => { //mapeia dados baseado em pratoEntrada
            celula.innerHTML += `
                <tr>
                <td>${prato.nome}</td>
                <td>${prato.preco}</td>
                <td class="td-justify">${prato.descricao}</td>
                <td>${prato.imagem}</td>
                <td>${prato.categoria}</td>
                <td><i class="fa-solid fa-trash"></i></td>
                </tr>
            `
        });
        dados.Sobremesa.map((prato) => { //mapeia dados baseado em pratoEntrada
            celula.innerHTML += `
                <tr>
                <td>${prato.nome}</td>
                <td>${prato.preco}</td>
                <td class="td-justify">${prato.descricao}</td>
                <td>${prato.imagem}</td>
                <td>${prato.categoria}</td>
                <td><i class="fa-solid fa-trash"></i></td>
                </tr>
            `
        })      
    })
})