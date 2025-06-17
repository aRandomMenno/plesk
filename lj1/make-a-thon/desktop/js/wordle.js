var height = 6;
var width = 5;

var row = 0;
var col = 0;
var gameOver = false;

// Woordenlijst en hints per woord
var woordenLijst = [
    { woord: "APPEL", hint: "Een stuk fruit, vaak rood of groen" },
    { woord: "BROOD", hint: "Eet je vaak als ontbijt of lunch" },
    { woord: "PLANT", hint: "Iets groens dat je water moet geven" },
    { woord: "VLOER", hint: "Je loopt er elke dag op" },
    { woord: "SPOED", hint: "Als iets heel snel moet gebeuren" },
    { woord: "GEEST", hint: "Onzichtbaar en vaak griezelig" },
    { woord: "KLANK", hint: "Je hoort het, maar ziet het niet" },
    { woord: "STOEL", hint: "Je zit erop" },
    { woord: "FIETS", hint: "Populair vervoermiddel in Nederland" },
    { woord: "SQUID", hint: "Engels woord voor inktvis (of een Netflix-serie)" }
];

var woordObject = {};
var word = "";
var score = 0;
var level = 1;

window.onload = function() {
    voegScoreEnLevelToe();
    kiesNieuwWoord();
    buildBoard();
    updateStatus();
    document.addEventListener("keyup", handleKeyPress);
};

// Voeg score en level toe aan een apart div
function voegScoreEnLevelToe() {
    let scoreLevelDiv = document.getElementById("score-level");

    let scoreP = document.createElement("p");
    scoreP.id = "score";
    scoreLevelDiv.appendChild(scoreP);

    let levelP = document.createElement("p");
    levelP.id = "level";
    scoreLevelDiv.appendChild(levelP);
}

function kiesNieuwWoord() {
    woordObject = woordenLijst[Math.floor(Math.random() * woordenLijst.length)];
    word = woordObject.woord;
    console.log("Geheime woord:", word); // Voor debuggen
}

function buildBoard() {
    document.getElementById("board").innerHTML = "";
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}

function updateStatus() {
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("level").innerText = `Level: ${level}`;
    document.getElementById("answer").innerText = ""; // Reset het antwoord na elke level-up
}

function handleKeyPress(e) {
    if (gameOver) return;

    if (e.code.startsWith("Key") && e.code.length === 4) {
        if (col < width) {
            let tile = document.getElementById(`${row}-${col}`);
            tile.innerText = e.code[3];
            col++;
        }
    } else if (e.code === "Backspace") {
        if (col > 0) {
            col--;
            let tile = document.getElementById(`${row}-${col}`);
            tile.innerText = "";
        }
    } else if (e.code === "Enter") {
        if (checkRowFilled()) {
            update();
        } else {
            const messageDiv = document.getElementById("message");
            messageDiv.innerText = "Vul alle letters in!";
            messageDiv.style.display = "block";
            setTimeout(() => {
                messageDiv.style.display = "none";
            }, 2000);
        }
    }

    // HINT tonen bij rijen 4, 5 en 6 (index 3, 4, 5)
    if (row >= 3 && row < height && !gameOver) {
        document.getElementById("answer").innerText = `Hint: ${woordObject.hint}`;
    }
}

function checkRowFilled() {
    for (let c = 0; c < width; c++) {
        if (document.getElementById(`${row}-${c}`).innerText === "") return false;
    }
    return true;
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let tile = document.getElementById(`${row}-${c}`);
        let letter = tile.innerText;
        if (word[c] === letter) {
            tile.classList.add("correct");
            correct++;
        } else if (word.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (correct === width) {
        score++;
        level++;
        gameOver = true;
        updateStatus();
        showMessage("Goed gedaan! Volgend woord!");
        setTimeout(() => {
            volgendeLevel();
        }, 2000);
    } else {
        row++;
        col = 0;
        if (row === height) {
            gameOver = true;
            document.getElementById("answer").innerText = `Het woord was: ${word}`;
            setTimeout(() => {
                volgendeLevel();
            }, 3000); // 3 seconden om het goede antwoord te bekijken
        }
    }
}

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
    messageDiv.style.display = "block";
}

function hideMessage() {
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "none";
}

function volgendeLevel() {
    row = 0;
    col = 0;
    gameOver = false;
    kiesNieuwWoord();
    buildBoard();
    updateStatus();
    hideMessage();
}
