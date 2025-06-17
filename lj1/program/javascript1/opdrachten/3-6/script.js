
let zin_0 = `de zee die bruist `;
let zin_1 = `je stortte je in m'n zee en we waren gelukkig `;
let zin_2 = `zinnen van de zee `;
let zin_3 = `maar wat zo'n zin zee `;
let zin_4 = `dat zegt de zee mij niet `;
let zin_5 = `een zalig gevoel `;
let zin_6 = `de zee die ruist `;
let zin_7 = `dat betekent `;
let zin_8 = `m'n hart was een rustige zee `;
let zin_9 = `de zee ruist zinnen `;

function lengte() {
    document.getElementById(`lengte`).innerHTML += zin_0 + zin_0.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_1 + zin_1.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_2 + zin_2.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_3 + zin_3.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_4 + zin_4.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_5 + zin_5.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_6 + zin_6.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_7 + zin_7.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_8 + zin_8.length + `<br>`;
    document.getElementById(`lengte`).innerHTML += zin_9 + zin_9.length;
}

function alternateCase(str) {
    let result = '';
    let charCount = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result += charCount % 2 === 1 ? str[i].toLowerCase() : str[i].toUpperCase();
            charCount++;
        } else {
            result += str[i];
        }
    }
    return result;
}

function gedicht() {
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_0) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_6) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_9) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_2) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_3) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_5) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_8) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_1) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_5) + `<br>`;
    document.getElementById(`gedicht`).innerHTML += alternateCase(zin_7);
}

lengte();
gedicht();
