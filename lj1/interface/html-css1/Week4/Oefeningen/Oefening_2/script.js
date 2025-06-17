let divs = document.getElementsByClassName("tekst");
let images = document.getElementsByClassName("img");

for (let i = 0; i < divs.length; i++) {
    divs[i].onmouseover = function() {
        divs[i].style.backgroundColor = "lightblue";
        console.log(`muis over de tekst... tekst "${divs[i].id}"`);
    }
    divs[i].onmouseout = function() {
        divs[i].style.backgroundColor = "white";
    }
}

for (let i = 0; i < images.length; i++) {
    images[i].onmouseover = function() {
        images[i].style.border = "2px solid red";
        console.log(`muis over de afbeelding... afbeelding "${images[i].id}"`);
    }
    images[i].onmouseout = function() {
        images[i].style.border = "2px solid black";
    }
}