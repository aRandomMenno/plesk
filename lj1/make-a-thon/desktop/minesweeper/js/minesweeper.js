const board = document.getElementById("grid");
const rows = 12;
const cols = 12;
const totalMines = 25;
const smiley = document.getElementById("smiley");
const minesLeftDisplay = document.getElementById("mines-left");
const counterDisplay = document.getElementById("counter");

let mines = [];
let revealed = 0;
let gameOver = false;
let minesLeft = totalMines;
let firstClick = true;

function initializeGame() {
    createBoard();
    updateMinesLeft();

    const smileyImg = document.createElement("img");
    smileyImg.src = "icons/smile.png";
    smileyImg.alt = "smile";
    smileyImg.style.width = "100%";

    smiley.textContent = "";
    smiley.appendChild(smileyImg);
}

function createBoard() {
    board.innerHTML = "";
    revealed = 0;
    gameOver = false;
    firstClick = true;
    minesLeft = totalMines;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);
            cell.addEventListener("click", handleCellClick);
            cell.addEventListener("contextmenu", handleRightClick);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function placeMines(firstRow, firstCol) {
    mines = [];
    let minesPlaced = 0;

    while (minesPlaced < totalMines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        const key = `${row},${col}`;

        if (!mines.includes(key) && !(row === firstRow && col === firstCol)) {
            mines.push(key);
            minesPlaced++;
        }
    }
}

function countNeighborMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (mines.includes(`${newRow},${newCol}`)) {
                    count++;
                }
            }
        }
    }
    return count;
}

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const row = parseInt(cell.getAttribute("data-row"));
    const col = parseInt(cell.getAttribute("data-col"));

    if (cell.classList.contains("flagged")) return;

    if (firstClick) {
        firstClick = false;
        placeMines(row, col);
    }

    if (mines.includes(`${row},${col}`)) {
        gameOver = true;
        revealMines();

        const dead = document.createElement("img");
        dead.src = "icons/dead.png";
        dead.alt = "dead";
        dead.style.width = "100%";

        smiley.textContent = "";
        smiley.appendChild(dead);
        return;
    }

    revealCell(row, col);

    if (revealed === rows * cols - totalMines) {
        gameOver = true;
        const won = document.createElement("img");
        won.src = "icons/win.png";
        won.alt = "win";
        won.style.width = "100%";
        mineImg.style.height = "100%";

        smiley.textContent = "";
        smiley.appendChild(won);
    }
}

function handleRightClick(event) {
    event.preventDefault();
    if (gameOver) return;

    const cell = event.target;
    if (cell.classList.contains("revealed")) return;

    if (cell.classList.contains("flagged")) {
        cell.classList.remove("flagged");
        minesLeft++;
    } else {
        cell.classList.add("flagged");
        minesLeft--;
    }

    updateMinesLeft();
}

function revealCell(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if (cell.classList.contains("revealed") || cell.classList.contains("flagged")) {
        return;
    }

    cell.classList.add("revealed");
    revealed++;

    const neighborMines = countNeighborMines(row, col);

    if (neighborMines > 0) {
        cell.textContent = neighborMines;
        cell.setAttribute("data-neighbors", neighborMines);
    } else {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

function revealMines() {
    mines.forEach(key => {
        const [row, col] = key.split(",");
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add("revealed");
        cell.classList.add("mine");
        
        const mineImg = document.createElement("img");
        mineImg.src = "icons/mine.png";
        mineImg.alt = "Mine";
        mineImg.style.width = "100%";
        mineImg.style.height = "100%";
        
        cell.textContent = "";
        cell.appendChild(mineImg);
    });
}

function updateMinesLeft() {
    minesLeftDisplay.textContent = minesLeft.toString().padStart(3, "0");
}

smiley.addEventListener("click", initializeGame);

initializeGame();