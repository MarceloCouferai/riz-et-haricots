const categorias = document.querySelector("#qtd-categorias");
const pratos = document.querySelector("#qtd-pratos")

fetch('../../produtos.json').then((response) => {
    response.json().then((dados) =>{
    const qtdCategoria = Object.keys(dados).length;

    const qtdSobremesas = Object.keys(dados.Sobremesa).length;
    const qtdPrincipal = Object.keys(dados.pratoPrincipal).length;
    const qtdEntradas = Object.keys(dados.pratoEntrada).length;

    const qtdPratos = qtdSobremesas + qtdPrincipal + qtdEntradas;
    
    // const qtdPratos = 
    categorias.innerHTML = `<h2>${qtdCategoria}</h2>`
    pratos.innerHTML = `<h2>${qtdPratos}</h2>`
    })
})

//grafico

// window.onload = function(){
//     const data = [
//         { year: 2010, count: 10 },
//         { year: 2011, count: 20 },
//       ];
    
//       new Chart(
//         document.getElementById('acquisitions'),
//         {
//           type: 'bar',
//           data: {
//             labels: data.map(row => row.year),
//             datasets: [
//               {
//                 label: 'Pratos por Categoria',
//                 data: data.map(row => row.count)
//               }
//             ]
//           }
//         }
//     );
// }
