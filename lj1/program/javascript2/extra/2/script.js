document.addEventListener('DOMContentLoaded', function () {
    let willekeurig_getal = Math.floor(Math.random() * 100) + 1;
    console.log(willekeurig_getal)
    let p = true;
    while (p) {
        let getal = parseInt(window.prompt('Wat denk je dat het getal is? 1-100'));

        if (getal < 1) {
            window.alert('Het getal moet wel 0 of hoger zijn!');
        } else if (getal > 100) {
            window.alert('Het getal moet lager zijn dan 101!');
        } else if (getal == willekeurig_getal) {
            window.alert('Je hebt het getal geraden! Goed gedaan!');
            p = false;
        } else if (getal < willekeurig_getal) {
            window.alert('Je getal is te laag.');
        } else if (getal > willekeurig_getal) {
            window.alert('Je getal is te hoog.');
        }
    }
});