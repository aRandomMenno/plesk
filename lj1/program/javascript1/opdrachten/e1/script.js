document.getElementById('button').addEventListener('click', stelDiagnose);
const symptomen = ['hoofdpijn', 'buikpijn', 'keelpijn', 'verkouden', 'koorts', 'moe', 'misselijk', 'duizelig', 'jeuk', 'braken', 'spierpijn', 'diarree', 'vermoeid', 'benauwd', 'hoesten', 'verward', 'pijn', 'bloed', 'slijm', 'kortademig', 'vermagerd', 'verminderde eetlust', 'verminderde reuk', 'verminderde smaak'];
document.getElementById('symptomen_lijst').innerHTML = symptomen.join(', ');

function stelDiagnose() {
    const naam = document.getElementById('naam').value;
    const leeftijd = parseInt(document.getElementById('leeftijd').value);
    const symptoom1 = document.getElementById('symptoom1').value.toLowerCase();
    const symptoom2 = document.getElementById('symptoom2').value.toLowerCase();
    const symptoom3 = document.getElementById('symptoom3').value.toLowerCase();
    const symptoom4 = document.getElementById('symptoom4').value.toLowerCase();

    const userSymptoms = [symptoom1, symptoom2, symptoom3, symptoom4];
    const matchingSymptoms = userSymptoms.filter(symptoom => symptomen.includes(symptoom));

    console.log(matchingSymptoms); 

    if (!naam || isNaN(leeftijd) || !symptoom1 || leeftijd < 0 || leeftijd > 100) {
        alert('Vul uw naam, leeftijd en minimaal 1 symptoom in, leeftijd kan ook niet lager dan 0 zijn of hoger dan 100.');
        return;
    }

    let waarschuwing = '';
    if (leeftijd < 18) {
        if (matchingSymptoms.length >= 3) {
            waarschuwing = `Waarschuwing: ${naam}, u heeft de volgende symptomen ${matchingSymptoms.join(', ')}. <br> Ga langs de huisarts om u te laten controleren.`;
        } else {
            waarschuwing = `${naam}, U moet thuis uitzieken met de symptomen ${matchingSymptoms.join(', ')} en drink voldoende water!`;
        }
    } else {
        if (matchingSymptoms.length >= 2) {
            waarschuwing = `Waarschuwing: ${naam}, u heeft de volgende symptomen ${matchingSymptoms.join(', ')}. <br> Ga langs de huisarts om u te laten controleren.`;
        } else {
            waarschuwing = `${naam}, U moet thuis uitzieken met de symptomen ${matchingSymptoms.join(', ')} <br> drink voldoende water!`;
        }
    }

    document.getElementById('diagnose').innerHTML = waarschuwing;
}