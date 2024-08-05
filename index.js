// MENU HAMBURGUER
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");
const optionHamburger = document.querySelector(".option-hamburger");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

optionHamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});


//ADICIONAR CARDS

const card = document.querySelector(".card")

fetch('./produtos.json').then((response) =>{
    response.json().then((dados) =>{
        dados.pratoEntrada.map((prato) => {
            
            card.innerHTML += `
                <img data-aos="flip-up" class="img-card" src="./assets/images/prato1.jpg" alt="">
                <div class="info-card">
                    <h3 class="card-title">${prato.nome}</h3>
                    <p class="card-content">${prato.descricao}</p>
                    <p class="card-price">R$ ${prato.preco}</p>
                </div>
            `
        })
    })
})

// Animações
AOS.init();