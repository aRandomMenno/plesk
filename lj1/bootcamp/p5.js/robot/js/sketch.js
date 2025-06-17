let width = 1920
let height = 1080
let backgroundColour = '#004a7c'

function setup() {
    createCanvas(width, height);
    background(backgroundColour);
    noCursor();
}

function mouse() {
    fill(255, 0, 0);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
    // Basics
    background(backgroundColour);
    angleMode(DEGREES);

    // Head, circle
    let c = color('#c4e7ff');
    let sc = color('#383a3b');
    fill(c);
    stroke(sc);
    strokeWeight(6);
    circle(300, 300, 90);

    // Left arm, bottom
    c = color('#c4e7ff'); fill(c); push(); translate(205, 415); rotate(105); rect(0, 0, 110, 30, 20); pop();
    // Left arm, top
    c = color('#ff6fa6'); fill(c); push(); translate(275, 370); rotate(140); rect(0, 0, 110, 30, 20); pop();
    // Right arm, bottom
    c = color('#c4e7ff'); fill(c); push(); translate(385, 430); rotate(75); rect(0, 0, 110, 30, 20); pop();
    // Right arm, top
    c = color('#ff6fa6'); fill(c); push(); translate(355, 350); rotate(70); rect(0, 0, 110, 30, 20); pop();
    // Left leg, top
    c = color('#ff6fa6'); fill(c); push(); translate(280, 535); rotate(95); rect(0, 0, 100, 30, 20); pop();
    // Left leg, bottom
    c = color('#c4e7ff'); fill(c); push(); translate(273, 615); rotate(95); rect(0, 0, 100, 30, 20); pop();
    // Right leg, top
    c = color('#ff6fa6'); fill(c); push(); translate(350, 530); rotate(85); rect(0, 0, 100, 30, 20); pop();
    // Right leg, bottom
    c = color('#c4e7ff'); fill(c); push(); translate(358, 615); rotate(85); rect(0, 0, 100, 30, 20); pop();
    // Body, rect
    c = color('#ff6fa6'); fill(c); strokeWeight(6); rect(240, 345, 120, 200, 20);
    // Eyes
    c = color('#383a3b'); fill(c); noStroke(); ellipse(280, 285, 15, 15); ellipse(320, 285, 15, 15);
    // Mouth
    strokeWeight(3); stroke(sc); line(285, 320, 315, 320);


    // Misc
    mouse();
}
