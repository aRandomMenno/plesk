let schilderijen = {
    "Arabian Moucharabieh": "./assets/images/arabian_moucharabieh.jpeg",
    "Composition": "./assets/images/composition.jpeg",
    "Composition 2": "./assets/images/composition_2.jpeg",
    "Composition 3": "./assets/images/composition_3.jpeg",
    "Cross A": "./assets/images/cross_a.jpeg",
    "Flame": "./assets/images/flame.jpeg",
    "Flamme": "./assets/images/flamme.jpeg",
    "Soleil-Oblique": "./assets/images/soleil-oblique.jpeg",
    "Time Square": "./assets/images/time_square.jpeg",
    "Untitled": "./assets/images/untitled.jpeg"
};

document.addEventListener('DOMContentLoaded', () => {
    displayPaintings(schilderijen);
});

function getMain() {
    return document.querySelector('main');
}

function displayPaintings(paintingsDict) {
    const main = getMain();
    for (const name in paintingsDict) {
        if (paintingsDict.hasOwnProperty(name)) {
            let src = paintingsDict[name];
            let painting = document.createElement('div');
            painting.classList.add('artistic');
            painting.innerHTML = `<img src="${src}" alt="" id="p${name}"><p>${name}</p>`;
            main.appendChild(painting);
        }
    }
}