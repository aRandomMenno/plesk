let northAmerica = ['USA', 'Canada', 'Mexico', 'Aruba'];
let southAmerica = ['Brazil', 'Colombia', 'Argentina', 'Peru'];
let africa = ['Nigeria', 'Ethiopia', 'Egypt', 'Tanzania'];
let europe = ['Germany', 'Spain', 'Netherlands', 'Ukraine'];
let asia = ['India', 'Indonesia', 'Pakistan', 'Japan'];
let oceania = ['Australia', 'Papua New Guinea', 'New Zealand', 'Hawaii'];
let world = [northAmerica, southAmerica, africa, europe, asia, oceania];

function display() {
    for (let i = 0; i < world.length; i++) {
        let cont = i + 1;
        let continent = document.getElementById('continent-' + cont);
        let text = '<h3>' + document.getElementById('continent-' + cont).innerText + '</h3>';
        for (let j = 0; j < world[i].length; j++) {
            text += world[i][j] + '<br>';
        }
        continent.innerHTML = text;
    }
}

document.addEventListener('DOMContentLoaded', display());