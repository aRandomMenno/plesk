function setup() {
    createCanvas(400, 400);
    noStroke(); // Remove outlines for a cleaner look
}

function draw() {
    background(220);

    // Robot Head
    fill(200); // Light gray
    rect(150, 50, 100, 100, 10); // Rounded rectangle

    // Robot Eyes
    fill(0); // Black
    ellipse(175, 85, 20, 20); // Left eye
    ellipse(225, 85, 20, 20); // Right eye

    // Robot Mouth
    fill(255, 0, 0); // Red
    rect(175, 120, 50, 10);

    // Robot Antenna
    stroke(0); // Black outline
    strokeWeight(3);
    line(200, 50, 200, 20); // Antenna stem
    fill(255, 255, 0); // Yellow
    ellipse(200, 20, 15, 15); // Antenna tip

    // Robot Body
    noStroke();
    fill(150); // Dark gray
    rect(130, 160, 140, 150);

    // Robot Arms
    rect(90, 180, 40, 100); // Left arm
    rect(270, 180, 40, 100); // Right arm

    // Robot Legs
    rect(150, 320, 30, 50); // Left leg
    rect(220, 320, 30, 50); // Right leg
}
