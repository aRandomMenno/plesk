let a = 11;

function f1(b) {
    b = b + a;
    c = a + b;
    document.getElementById('output').innerText += a + ", " + b + ", " + c + "\n";
}

function f2(b) {
    document.getElementById('output').innerText += a + ", " + b + "\n";
}

f1(1); // Uitvoer: 11, 12, 11
f2(8); // Uitvoer: 13, 8
document.getElementById('output').innerText += "\n";

//Welke functie met welke parameter moet ik aanroepen om het volgende antwoord te krijgen:
// Uitvoer: 12, 0
f2(0); 
// !!! onmogelijk met alleen deze functies en parameters !!!

//Welke functie met welke parameter moet ik aanroepen om het volgende antwoord te krijgen:
// Uitvoer: 12, 14, 24
f1(2); 
// !!! onmogelijk met alleen deze functies en parameters !!!

//Welke functie met welke parameter moet ik aanroepen om het volgende antwoord te krijgen:
// Uitvoer: 13, 16, 39
f1(3); 
// !!! onmogelijk met alleen deze functies en parameters !!!

//Welke functie met welke parameter moet ik aanroepen om het volgende antwoord te krijgen:
// Uitvoer: 14, 7
f2(7); 
// !!! onmogelijk met alleen deze functies en parameters !!!
