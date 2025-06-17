function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}

function draw() {
    background(255);
    fill(255, 0, 0);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20);
}