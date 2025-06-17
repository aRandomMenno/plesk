
function checkLeeftijd() {
    let leeftijd = window.prompt("Wat is je leeftijd? ");

    if (isNaN(leeftijd)) {
        document.getElementById('resultaat').textContent = leeftijd + " Is geen nummer!";
        return;
    } else if (leeftijd < 0 || leeftijd > 110) {
        document.getElementById('resultaat').textContent = leeftijd + " Is te hoog of te laag!";
        return;
    }

    let resultaat;
    if (leeftijd <= 1) {
        resultaat = "baby";
    } else if (leeftijd <= 3) {
        resultaat = "peuter";
    } else if (leeftijd <= 6) {
        resultaat = "kleuter";
    } else if (leeftijd <= 12) {
        resultaat = "kind";
    } else if (leeftijd <= 16) {
        resultaat = "puber";
    } else if (leeftijd <= 21) {
        resultaat = "adolescent";
    } else if (leeftijd <= 65) {
        resultaat = "volwassene";
    } else {
        resultaat = "bejaarde";
    }

    document.getElementById('resultaat').innerHTML = `Je bent een ${resultaat}.`;
}

checkLeeftijd()
