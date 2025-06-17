const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const levelText = document.querySelector("#levelText");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn"); // Startknop toegevoegd
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodPositions = [];
let score = 0;
let level = 1;
let speed = 200;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", () => {
    if (!running) {
        gameStart();
    }
});

function gameStart() {
    running = true;
    scoreText.textContent = `Score: ${score}`;
    levelText.textContent = `Level: ${level}`;
    createFood(level);
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkgameOver();
            nextTick();
        }, speed);
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood(amount) {
    foodPositions = [];
    for (let i = 0; i < amount; i++) {
        let foodX, foodY;
        do {
            foodX = randomFood(0, gameWidth - unitSize);
            foodY = randomFood(0, gameHeight - unitSize);
        } while (foodPositions.some(pos => pos.x === foodX && pos.y === foodY));
        foodPositions.push({ x: foodX, y: foodY });
    }
}

function randomFood(min, max) {
    return Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
}

function drawFood() {
    ctx.fillStyle = foodColor;
    foodPositions.forEach(food => {
        ctx.fillRect(food.x, food.y, unitSize, unitSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    let ateFood = false;
    foodPositions = foodPositions.filter(food => {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 1;
            scoreText.textContent = `Score: ${score}`;
            ateFood = true;
            return false;
        }
        return true;
    });

    if (ateFood) {
        if (foodPositions.length === 0) {
            levelUp();
        }
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const left = 37; // Pijltje links
    const up = 38; // Pijltje omhoog
    const right = 39; // Pijltje rechts
    const down = 40; // Pijltje omlaag
    const w = 87; // W-toets
    const a = 65; // A-toets
    const s = 83; // S-toets
    const d = 68; // D-toets

    const goingUp = yVelocity == -unitSize;
    const goingDown = yVelocity == unitSize;
    const goingRight = xVelocity == unitSize;
    const goingLeft = xVelocity == -unitSize;

    switch (true) {
        case ((keyPressed == left || keyPressed == a) && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case ((keyPressed == up || keyPressed == w) && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case ((keyPressed == right || keyPressed == d) && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case ((keyPressed == down || keyPressed == s) && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkgameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= gameWidth):
        case (snake[0].y < 0):
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    score = 0;
    level = 1;
    speed = 200;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    running = false; // Stop het spel
    clearBoard(); // Wis het bord
    scoreText.textContent = `Score: ${score}`;
    levelText.textContent = `Level: ${level}`;
}

function levelUp() {
    level += 1;
    speed = Math.max(50, speed - 20);
    createFood(level);
    levelText.textContent = `Level: ${level}`;
}