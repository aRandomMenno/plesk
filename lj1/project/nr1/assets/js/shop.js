document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bestellen').addEventListener('click', function (event) {
        // verkrijg de waardes van de input velden
        const prijs_ticket = 30;
        let naam = document.getElementById('naam').value;
        let land = document.getElementById('land').value;
        let stad = document.getElementById('stad').value;
        let postcode = document.getElementById('postcode').value;
        let huisnummer = parseInt(document.getElementById('huisnummer').value);
        let huisnummer_toevoeging = document.getElementById('huisnummer_toevoeging').value;
        let aantal_tickets = parseInt(document.getElementById('aantal_tickets').value);
        let album = document.getElementById('album').value;

        let opmerkingen = document.getElementById('opmerkingen').value;
        let prijs = 0;
        let korting_gekregen = false;

        // Validatie
        // DE REGEX VOOR DE POSTCODES IS VAN HET INTERNET "GESTOLEN" IK WEET NIET HOE DEZE WERKT
        // DIT IS ALLEEN OM TE ZORGEN DAT DE POSTCODES ER ECHT UITZIEN ALS POSTCODES
        // IK KAN MIJN BEST DOEN OM HET UIT TE LEGGEN MAAR DAN IS HET HOOGSTWAARSCHIJNLIJK INCORRECT
        let postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
        if (naam == '') {
            alert('Er moet wel een naam ingevuld worden!');
            return;
        } else if (land == '') {
            alert('Er moet wel een land ingevuld worden!');
            return;
        } else if (stad == '') {
            alert('Er moet wel een stad ingevuld worden!');
            return;
        } else if (postcode == '' || !postcodeRegex.test(postcode)) {
            alert('Er moet wel een geldige Nederlandse postcode ingevuld worden!');
            return;
        } else if (isNaN(huisnummer)) {
            alert('Het huisnummer moet wel een getal zijn!');
            return;
        } else if (isNaN(aantal_tickets)) {
            alert('Het aantal tickets moet wel een getal zijn!');
            return;
        }


        // Prijs berekeningen
        if (album != 'none') {
            if (aantal_tickets >= 1) {
                prijs = aantal_tickets * prijs_ticket;
                prijs += 25;
                let korting = 0.1 * prijs;
                prijs -= korting;
                korting_gekregen = true;
                album = album.replace('_', ' ');
            } else if (aantal_tickets == 0) {
                prijs = 25;
            } else if (aantal_tickets < 0) {
                alert('tickets kunnen niet geretourneerd worden!');
                prijs = 25;
            }
        } else if (album == 'none') {
            if (aantal_tickets >= 1) {
                prijs = aantal_tickets * prijs_ticket;
                album = 'geen album gekocht';
            } else {
                alert('Het is geen optie om niks te kopen, waarvoor ben je hier? XD')
            }
        } else {
            alert('Er is iets mis gegaan!');
        }

        // voeg de informatie samen in een bericht
        let bestel_info = document.getElementById('bestel_info');
        let bestel_info_bericht = '';

        let bestel_info_title = `<h2>Bestelling:</h2>`;
        let bestel_info_naam = `<p>naam: ${naam}<br>`;
        let bestel_info_address = `bezorgadres: ${land}, ${stad}, ${postcode}, ${huisnummer}<br>`;
        let bestel_info_tickets = `aantal tickets: ${aantal_tickets}<br>`;
        let bestel_info_album = `album: ${album}<br>`;
        let bestel_info_prijs = `totale prijs: €${prijs}<br>`;
        if (korting_gekregen) {
            bestel_info_prijs += `gekregen korting: 10%<br>`;
        }

        // Check voor opmerkingen
        if (opmerkingen == '') {
            opmerkingen = 'geen opmerkingen';
            bestel_info_bericht = bestel_info_title.concat(bestel_info_naam, bestel_info_address, bestel_info_tickets, bestel_info_album, bestel_info_prijs);
        } else {
            let bestel_info_opmerkingen = `<h2>opmerkingen:</h2><p>${opmerkingen}</p>`;
            bestel_info_bericht = bestel_info_title.concat(bestel_info_naam, bestel_info_address, bestel_info_tickets, bestel_info_album, bestel_info_prijs, bestel_info_opmerkingen);
        }

        // Check voor korting
        if (korting_gekregen == true) {
            bestel_info_bericht += `<p>winkel opmerking: 10% korting! <br> U heeft een album en concert ticket gekocht.</p>`;
        }

        // Zet de informatie in de pagina!
        bestel_info.innerHTML = bestel_info_bericht;

        document.getElementById('naam').value = '';
        document.getElementById('land').value = '';
        document.getElementById('stad').value = '';
        document.getElementById('postcode').value = '';
        document.getElementById('huisnummer').value = '';
        document.getElementById('huisnummer_toevoeging').value = '';
        document.getElementById('aantal_tickets').value = '';
        document.getElementById('album').value = 'none';
        document.getElementById('opmerkingen').value = '';

        alert('Bedankt voor uw bestelling! Informatie bovenaan de pagina.');
    });
});