
let breedte = window.prompt("Wat is de breedte? ", 10);
let lengte = window.prompt("Wat is lengte? ", 10)
let oppervlakte = breedte * lengte;

document.getElementById('opp').innerHTML = `De oppervlakte is: ${oppervlakte} cm3`;
