const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

console.log(hamburger);
console.log(nav);

AOS.init();