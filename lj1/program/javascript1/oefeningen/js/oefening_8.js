
let naam;
let woonplaats;
let banksaldo;

naam = window.prompt("Wat is je naam? ");
woonplaats = window.prompt("Wat is je woonplaats? ");
banksaldo = window.prompt("Wat is je banksaldo? Je mag ook wat verzinnen ;)");

document.getElementById('groet').innerHTML += naam + `!`;
document.getElementById('woon').innerHTML += woonplaats;
document.getElementById('saldo').innerHTML += banksaldo + ` euro.`;
