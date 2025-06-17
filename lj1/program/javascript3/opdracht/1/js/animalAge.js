const leeftijden = { hond: 5.5, gecko: 11, olifant: 1.6, vlieg: 1216 }
const leeftijdVeld = document.getElementById('mijnLeeftijd');
const outputVeld = document.getElementById('uitvoerVeld');
const resultaatPlaatje = document.getElementById('resultaatImg');

function checkLeeftijd(dier) {
    if (leeftijden[dier]) {
        let leeftijdGok = parseFloat(document.getElementById('mijnLeeftijd').value);
        if (leeftijdGok === leeftijden[dier]) {
            outputVeld.style.color = 'green';
            outputVeld.innerText = 'Gefeliciteerd, je hebt het goed geraden!';
            resultaatPlaatje.src = 'images/ok.gif';
        }
        else {
            outputVeld.style.color = 'red';
            outputVeld.innerText = 'Dat is helaas niet goed!';
            if (leeftijdGok < leeftijden[dier]) {
                resultaatPlaatje.src = 'images/arrow-up.gif';
                outputVeld.innerText += 'Het is antwoord is hoger!';
            }
            else {
                resultaatPlaatje.src = 'images/arrow-down.gif';
                outputVeld.innerText += 'Het is antwoord is lager!';
            }
        }
    } else {
        console.error('Dit dier staat niet in de lijst');
        stop;
    }
}