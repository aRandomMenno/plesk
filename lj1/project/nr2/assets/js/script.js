let aantalTickets = 0;
let prijsTicket = 15;
let prijsTicketKorting = 10;
let korting;

function betalen() {
    const ticketForm = document.getElementById('ticketForm');
    const success = document.getElementById('success');

    const dagDeel = document.getElementById('dagDeel').value;
    aantalTickets = parseInt(document.getElementById('aantalTickets').value);
    const kortingsKaart = document.getElementById('kortingsKaart').checked;
    const voornaam = document.getElementById('voornaam').value;
    const tussenvoegsel = document.getElementById('tussenvoegsel').value;
    const achternaam = document.getElementById('achternaam').value;
    const email = document.getElementById('email').value;
    const telefoonNummer = document.getElementById('telefoonNummer').value;
    const betaalmethode = document.getElementById('betaalmethode').value;
    const datum = document.getElementById('datum').value;

    if (!dagDeel) {
        alert('Selecteer een dagdeel voor je bezoek.');
        return;
    }

    if (isNaN(aantalTickets)) {
        alert('Aantal tickets moet een nummer zijn');
        return;
    }

    if (aantalTickets < 1 || aantalTickets > 10) {
        alert('Aantal tickets moet tussen 1 en 10 zijn.');
        return;
    }

    if (!voornaam || !achternaam || !email || !betaalmethode) {
        alert('Vul alle verplichte velden in, voornaam, achternaam, email en betaalmethode!');
        return;
    }

    if (!datum) {
        alert('Selecteer een datum voor je bezoek.');
        return;
    }

    let totaalPrijs = kortingsKaart ? aantalTickets * prijsTicketKorting : aantalTickets * prijsTicket;

    ticketForm.style.display = 'none';
    success.style.display = 'flex';

    displayTickets(voornaam, tussenvoegsel, achternaam, dagDeel, datum, totaalPrijs, kortingsKaart)
}

function displayTickets(voornaam, tussenvoegsel, achternaam, dagDeel, datum, totaalPrijs, kortingsKaart) {
    const successDiv = document.getElementById('success')
    let info = document.createElement('div');
    info.classList.add('info')
    info.innerHTML = `Beste ${voornaam} ${tussenvoegsel} ${achternaam}, bedankt voor uw bestelling. U heeft ${aantalTickets} tickets voor &euro;${totaalPrijs} gekocht. <br>Uw bezoek is gepland op ${datum}, in de ${dagDeel}.`;
    successDiv.appendChild(info)
    for (let i = 1; i <= aantalTickets; i++) {
        let ticket = document.createElement('div');
        ticket.classList.add('ticket')
        if (i == aantalTickets) {
            ticket.id = "last";
        }
        let ticketQR = document.createElement('canvas');
        
        const data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let qrCode = '';
        for (let j = 0; j < 32; j++) {
            qrCode += data.charAt(Math.floor(Math.random() * data.length));
        }
        let qr = new QRious({
            element: ticketQR,
            value: qrCode,
            size: 192
        });

        let ticketTekst = document.createElement('p');
        ticketTekst.innerHTML = `ticket nr: ${i} <br>Naam: ${voornaam} ${tussenvoegsel} ${achternaam} <br>Datum: ${datum} <br>Prijs: &euro;${kortingsKaart ? prijsTicketKorting : prijsTicket}`;
        ticket.appendChild(ticketQR);
        ticket.appendChild(ticketTekst);
        successDiv.appendChild(ticket);
    }
}
