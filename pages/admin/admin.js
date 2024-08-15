const categorias = document.querySelector("#qtd-categorias");
const pratos = document.querySelector("#qtd-pratos")

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
    mainCardapio.style.display = "block";
});

pgInicial.addEventListener("click", () => {
    event.preventDefault();
    mainCardapio.style.display = "none";
    mainPgInicial.style.display = "flex";
});