document.addEventListener("DOMContentLoaded", function() {
    let speelkaarten = [
        "harten",
        "klaver",
        "ruiten",
        "schoppen"
    ];

    let cijfers = [
        "aas",
        "twee",
        "drie",
        "vier",
        "vijf",
        "zes",
        "zeven",
        "acht",
        "negen",
        "tien",
        "boer",
        "vrouw",
        "heer"
    ];

    const insertpoint = document.getElementById('body');

    // Gebruik vervolgens twee loops om de naam van elke speelkaart te maken. 
    // Maak binnen deze loop 52 <img>-tags waarmee je de plaatjes van de kaarten
    // in de HTML-pagina laat zien. 

    for (let i = 0; i < speelkaarten.length; i++) {
        for (let j = 0; j < cijfers.length; j++) {
            let kaart = document.createElement("img");
            kaart.src = `./kaarten/${speelkaarten[i]}${cijfers[j]}.png`;
            kaart.classList.add("kaart");
            if (insertpoint) {
                insertpoint.appendChild(kaart);
            } else {
                console.error("Element with id 'body' not found.");
            }
        }
        insertpoint.innerHTML += "<br>";
    }
});