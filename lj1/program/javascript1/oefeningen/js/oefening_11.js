
"use strict";
function controleer() {
    let naam = document.getElementById("naam").value;
    let woonplaats = document.getElementById("woonplaats").value;
    if (naam == "" || woonplaats == "") {
        document.getElementById("uitvoer").innerHTML = "Een van de twee of allebei de invoervelden zijn leeg!";
    } else {
        document.getElementById("uitvoer").innerHTML = "Hallo, " + naam + "<br> leuke woonplaats: " + woonplaats;
    }
}

