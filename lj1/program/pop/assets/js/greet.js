const hours = new Date().getHours();
let greet = '';
if (hours > 0 && hours < 6) {
    greet = 'Goedenacht';
}
else if (hours >= 6 && hours < 12) {
    greet = 'Goedemorgen';
}
else if (hours >= 12 && hours < 18) {
    greet = 'Goedemiddag';
}
else if (hours >= 18 && hours < 24) {
    greet = 'Goedenavond';
}
document.addEventListener('DOMContentLoaded', function() { 
    if (greet === '') {
        stop;
        console.error('[error] Could not determine time of day.');
    }
    document.getElementById('greet').innerHTML = `${greet}, beste lezer!`;
});