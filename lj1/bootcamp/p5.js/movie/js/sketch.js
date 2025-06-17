const width = 1920;
const height = 1080;
let count = 0;
let x = 170;
let y = 420;
let explode_timer = 0;
const explode_time = (Math.floor(Math.random() * (60 - 30 + 1)) + 30) * 50;
let explosion_counter = 0;
let direction = 1;
let currentScene = 'forest';

function setup() {
    createCanvas(width, height);
    noCursor();
    angleMode(DEGREES);
}

function mouse(x, y) {
    noStroke();
    fill('#ff00ff');
    ellipse(x, y, 20, 20);
}

function draw() {
    if (explode_timer <= explode_time) {
        if (count === 2) {
            drawCurrentScene();
            x += 3 * direction;
            drawCharacter(x, y, direction);
            count = 0;
        }
        if (x >= width - 140) {
            direction = -1;
        } else if (x <= 140) {
            direction = 1;
        }

        drawCurrentScene();
        drawCharacter(x, y, direction);
        mouse(mouseX, mouseY);

        count++;
        explode_timer++;
    } else {
        if (explosion_counter <= 2000) {
            for (let i = 0; i < 10; i++) {
                const randX = Math.floor(Math.random() * width);
                const randY = Math.floor(Math.random() * height);
                const sizeE = random(10, 100);
                fill(random(255), random(255), random(255));
                noStroke();
                ellipse(randX, randY, sizeE, sizeE);
                explosion_counter++;
            }
        } else {
            explosion_counter = 0;
            count = 0;
            explode_timer = 0;
            switchScene();
        }
    }
}

function switchScene() {
    if (currentScene === 'forest') {
        currentScene = 'castle';
    } else if (currentScene === 'castle') {
        currentScene = 'city';
    } else {
        currentScene = 'forest';
    }
}

function drawCurrentScene() {
    if (currentScene === 'forest') {
        drawForest();
    } else if (currentScene === 'castle') {
        drawCastle();
    } else if (currentScene === 'city') {
        drawCity();
    }
}

function drawCharacter(x, y, direction) {
    push();
    translate(x, y);
    scale(direction, 1);
    translate(-x, -y);

    const headColor = color('#c4e7ff');
    const strokeColor = color('#383a3b');
    const bodyColor = color('#ff6fa6');

    fill(headColor);
    stroke(strokeColor);
    strokeWeight(6);
    circle(x, y, 90);

    drawArm(x - 95, y + 115, 105, headColor);
    drawArm(x - 25, y + 70, 140, bodyColor);
    drawArm(x + 85, y + 130, 75, headColor);
    drawArm(x + 55, y + 50, 70, bodyColor);

    drawLeg(x - 20, y + 235, 95, bodyColor);
    drawLeg(x - 27, y + 315, 95, headColor);
    drawLeg(x + 50, y + 230, 85, bodyColor);
    drawLeg(x + 58, y + 315, 85, headColor);

    fill(bodyColor);
    strokeWeight(6);
    rect(x - 60, y + 45, 120, 200, 20);

    fill(strokeColor);
    noStroke();
    ellipse(x - 20, y - 15, 15, 15);
    ellipse(x + 20, y - 15, 15, 15);

    strokeWeight(3);
    stroke(strokeColor);
    line(x - 15, y + 20, x + 15, y + 20);

    pop();
}

function drawArm(x, y, angle, color) {
    fill(color);
    push();
    translate(x, y);
    rotate(angle);
    rect(0, 0, 110, 30, 20);
    pop();
}

function drawLeg(x, y, angle, color) {
    fill(color);
    push();
    translate(x, y);
    rotate(angle);
    rect(0, 0, 100, 30, 20);
    pop();
}

function drawForest() {
    // Make the grass
    background('#2ec410');

    // Make the sky
    fill('#87CEEB');
    rect(0, 0, width, height / 1.7);

    // Make the sun
    fill('#FFD700');
    noStroke();
    ellipse(width - 100, 100, 100, 100);

    // Make trees
    // tree number 1
    fill('#8B4513');
    rect(250, 500, 50, 200);
    fill('#228B22');
    ellipse(275, 500, 150, 150);

    // tree number 2
    fill('#8B4513');
    rect(600, 500, 50, 250);
    fill('#228B22');
    ellipse(625, 450, 150, 150);

    // tree number 3
    fill('#8B4513');
    rect(950, 625, 50, 100);
    fill('#228B22');
    ellipse(975, 600, 150, 150);

    // tree number 4
    fill('#8B4513');
    rect(1300, 500, 50, 200);
    fill('#228B22');
    ellipse(1325, 500, 150, 150);

    // tree number 5
    fill('#8B4513');
    rect(1650, 500, 50, 200);
    fill('#228B22');
    ellipse(1675, 500, 150, 150);

    // cloud
    fill('#ffffff');
    ellipse(200, 100, 100, 100);
    ellipse(250, 50, 100, 100);
    ellipse(250, 120, 100, 100);
    ellipse(350, 75, 200, 200);
    ellipse(425, 125, 100, 100);
    ellipse(425, 50, 100, 100);
}

function drawCastle() {
    // Make the grass
    background('#2ec410');

    // Make the sky
    fill('#87CEEB');
    rect(0, 0, width, height / 1.7);

    // Make the sun
    fill('#FFD700');
    noStroke();
    ellipse(width - 100, 100, 100, 100);

    // Draw the castle
    fill('#2F4F4F');
    stroke('#000000');
    strokeWeight(4);

    // Main castle body
    rect(600, 300, 720, 400);

    // Left tower
    rect(500, 200, 100, 500);
    rect(500, 150, 100, 50);

    // Right tower
    rect(1220, 200, 100, 500);
    rect(1220, 150, 100, 50);

    // Draw the battlements
    for (let i = 0; i < 7; i++) {
        rect(610 + i * 90, 250, 60, 50);
    }

    // Draw the door
    fill('#654321');
    rect(850, 500, 140, 200);

    noStroke();
    // Draw windows
    fill('#000000');
    for (let i = 0; i < 3; i++) {
        rect(700 + i * 200, 350, 50, 100);
    }

    // cloud
    fill('#ffffff');
    ellipse(200, 100, 100, 100);
    ellipse(250, 50, 100, 100);
    ellipse(250, 120, 100, 100);
    ellipse(350, 75, 200, 200);
    ellipse(425, 125, 100, 100);
    ellipse(425, 50, 100, 100);
}

function drawCity() {
    // Make the street
    background('#4b4b4b');

    // Make the sky
    fill('#87CEEB');
    rect(0, 0, width, height / 1.7);

    // Make the sun
    fill('#FFD700');
    noStroke();
    ellipse(width - 100, 100, 100, 100);

    // Draw buildings
    fill('#696969');
    stroke('#000000');
    strokeWeight(4);

    // Building 1
    rect(100, 300, 200, 400);
    rect(150, 200, 100, 100);

    // Building 2
    rect(800, 150, 200, 500);
    rect(850, 50, 100, 100);

    // Building 3
    rect(1550, 400, 200, 350);
    rect(1600, 300, 100, 100);

    // Windows
    // Building 1
    fill('#37f2ffb2');
    for (let i = 0; i < 3; i++) {
        rect(150, 550 - i * 100, 100, 50);
    }
    // Building 2
    for (let i = 0; i < 4; i++) {
        rect(850, 550 - i * 100, 100, 50);
    }
    // Building 3
    for (let i = 0; i < 3; i++) {
        rect(1600, 650 - i * 100, 100, 50);
    }

    noStroke();

    // cloud
    fill('#ffffff');
    ellipse(200, 100, 100, 100);
    ellipse(250, 50, 100, 100);
    ellipse(250, 120, 100, 100);
    ellipse(350, 75, 200, 200);
    ellipse(425, 125, 100, 100);
    ellipse(425, 50, 100, 100);
}