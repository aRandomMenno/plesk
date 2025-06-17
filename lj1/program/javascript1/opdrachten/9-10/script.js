
function bereken() {
    const prijs = parseFloat(document.getElementById('prijs').value);
    const aantal = parseInt(document.getElementById('aantal').value);

    if (isNaN(prijs) || isNaN(aantal) || prijs <= 0 || aantal <= 0) {
        alert('Voer geldige nummers in voor prijs en aantal.');
        return;
    } else {
        const totaalPrijs = prijs * aantal;
        document.getElementById('totaal').innerHTML = `Totaal prijs: €${totaalPrijs.toFixed(2)}`;
    }   
}
