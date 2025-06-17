const element = document.getElementById('result');
const colours = [
    '#fff', '#f00', '#0f0', '#00f',
    '#000', '#ff0', '#f0f', '#0ff',
    'pink', '#fff0'
];
let index = 0;

function changeColour() {
    index++;
    if (index >= colours.length) {
        index = 0;
    }
    element.style.background = colours[index];
}

setInterval(changeColour, 2500);
