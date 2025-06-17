function bereken() {
    const out = document.getElementById('ad');
    const merk = document.getElementById('merk').value.trim().toLowerCase();
    const type = document.getElementById('type').value.trim().toLowerCase();
    const verbruik = Number(document.getElementById('verbruik').value);
    const afstand = Number(document.getElementById('afstand').value);
    const gemSnelheid = Number(document.getElementById('gemSnelheid').value);

    console.debug({ merk, type, verbruik, afstand, gemSnelheid });

    if (!merk) {
        out.innerText = 'Auto merk moet worden ingevuld';
        console.warn('Auto merk moet worden ingevuld');
        return;
    }
    if (!type) {
        out.innerText = 'Auto type moet worden ingevuld';
        console.warn('Auto type moet worden ingevuld');
        return;
    }
    if (verbruik <= 0) {
        out.innerText = 'Verbruik moet een getal >0 zijn';
        console.warn('Verbruik moet een getal >0 zijn');
        return;
    }
    if (afstand <= 0) {
        out.innerText = 'Afstand moet een getal >0 zijn';
        console.warn('Afstand moet een getal >0 zijn');
        return;
    }
    if (gemSnelheid <= 0) {
        out.innerText = 'Gemiddelde snelheid moet een getal >0 zijn';
        console.warn('Gemiddelde snelheid moet een getal >0 zijn');
        return;
    }

    try {
        const brandstofVerbruik = (afstand * verbruik) / 100;
        const tijd = (afstand / gemSnelheid) * 60;
        out.innerHTML = `Met uw ${merk} ${type} zal u ${brandstofVerbruik.toFixed(2)} liter brandstof gebruiken als u ${afstand} km gaat rijden.<br>En u zult er ${tijd.toFixed(2)} minuten over doen met een gemiddelde snelheid van ${gemSnelheid} km/u.`;
    } catch (error) {
        console.error(error);
        alert('Er is een fout opgetreden');
    }
}
