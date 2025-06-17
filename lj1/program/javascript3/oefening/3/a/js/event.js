function knopKlik() {
    console.log('Joepie! Je hebt op de knop gedrukt');
}

function tekstveldFocus() {
    document.getElementById('textfield').style.backgroundColor = 'yellow'
}

function plaatjeDubbelklik() {
    document.getElementById('uitvoerveld').innerHTML = 'antwoord: Zelda';
}

function plaatjeMouseOver() {
    document.querySelector('html').style.backgroundColor = 'red';
}

function plaatjeMouseOut() {
    document.querySelector('html').style.backgroundColor = 'white';
}

function loaded() {
    console.log("De body is helemaal geladen!")
}