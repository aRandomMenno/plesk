const leeftijd = 15;

if (typeof leeftijd !== 'number') {
    console.log("Leeftijd is geen getal.");
}
else if (leeftijd >= 18 && leeftijd <= 99) {
    console.log("Volwassene.");
}
else if (leeftijd <= 17) {
    console.log("Geen volwassene.");
}