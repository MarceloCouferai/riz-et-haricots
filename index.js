// MENU HAMBURGUER
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");
const optionHamburger = document.querySelectorAll(".option-hamburger");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});


optionHamburger.forEach(option => {
    option.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


//ADICIONAR CARDS

const entradas = document.querySelector(".entradas")
const principais = document.querySelector(".principais");
const sobremesas = document.querySelector(".sobremesas");
fetch('./produtos.json').then((response) =>{ //pegar arquivo e retornar
    response.json().then((dados) =>{ //converte em um objeto
        dados.pratoEntrada.map((prato) => { //mapeia dados baseado em pratoEntrada
            entradas.innerHTML += `
                <div data-aos="flip-up" class="container-card">
                    <img class="img-card" src="./assets/images/${prato.imagem}" alt="">
                    <div class="info-card">
                    <div>
                        <h3 class="card-title">${prato.nome}</h3>
                        <p class="card-content">${prato.descricao}</p>
                        </div>
                        <p class="card-price">R$ ${prato.preco}</p>
                    </div>
                <div/>
            `
        });
        dados.pratoPrincipal.map((prato) =>{
            principais.innerHTML += `
                <div data-aos="flip-up"  class="container-card">
                    <img class="img-card" src="./assets/images/${prato.imagem}" alt="">

                    <div class="info-card">
                        <h3 class="card-title">${prato.nome}</h3>
                        <p class="card-content">${prato.descricao}</p>
                        <p class="card-price">R$ ${prato.preco}</p>
                    </div>
                <div/>
            `
        });
        dados.Sobremesa.map((prato) =>{
            sobremesas.innerHTML += `
                <div data-aos="flip-up" class="container-card">
                    <img class="img-card" src="./assets/images/${prato.imagem}" alt="">
                    <div class="info-card">
                        <h3 class="card-title">${prato.nome}</h3>
                        <p class="card-content">${prato.descricao}</p>
                        <p class="card-price">R$ ${prato.preco}</p>
                    </div>
                <div/>
            `
        })
    })
})

// Animações
AOS.init();