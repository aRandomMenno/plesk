
let datum = new Date();
let minuut = datum.getMinutes();

if (minuut <= 15) {
    window.alert("Het is het eerst kwartier van het uur.")
} else if (minuut <= 30) {
    window.alert("Het is het tweede kwartier van het uur.")
} else if (minuut <= 45) {
    window.alert("Het is het derde kwartier van het uur.")
} else if (minuut >= 46) {
    window.alert("Het is het laatste kwartier van het uur.")
}
