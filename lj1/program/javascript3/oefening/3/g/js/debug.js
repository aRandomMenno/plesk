window.addEventListener("load", function () {
    let starWars = document.getElementById("starWars");
    let veld = document.getElementById("outputVeld");

    starWars.addEventListener("mouseover", function () {
        veld.innerHTML = "Klik op de afbeelding om naar de site te gaan.";
    });
    starWars.addEventListener("click", function () {
        window.open("https://www.starwars.com/");
    });
    starWars.addEventListener("mouseout", function () {
        veld.innerHTML = "";
    });
});