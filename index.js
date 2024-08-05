const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");
const optionHamburger = document.querySelector(".option-hamburger")

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

optionHamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

AOS.init();