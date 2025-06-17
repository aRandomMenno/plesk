// =---------------------------------------------=
// = Author: Menno Van Zoelen                    =
// = Github: https://github.com/aRandomMenno     =
// =---------------------------------------------= 

let stripeHeight;
let rects = [];
let messageFrames = 0;
let y = 2;

let customFont;

function preload() {
    customFont = loadFont('./font/kode-mono.ttf');
}

class Rect {
    constructor(y) {
        this.y = y;
        this.color = color(random(255), random(255), random(255));
        this.speed = Math.ceil(Math.random() * 8);

        if (this.speed > 2) {
            this.speed = 1;
        }
    }

    move() {
        this.y += this.speed;
    }

    isOffScreen() {
        return this.y > height;
    }

    draw() {
        fill(this.color);
        rect(0, this.y, width, stripeHeight);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    noCursor();
    stripeHeight = height / 8;
}

function draw() {
    background('#fff');

    if (frameCount % 50 == 0) {
        rects.push(new Rect(-stripeHeight));
    }

    for (let i = 0; i < rects.length; i++) {
        rects[i].move();
        rects[i].draw();
        if (rects[i].isOffScreen()) {
            rects.splice(i, 1);
            i--;
        }
    }

    displayMessage();
}

function displayMessage() {
    fill('#ffffffcc');
    rect((windowWidth - (windowWidth - 128)) / 2, height / 1.1 - 100, windowWidth - 128, 200, 48);

    let totalFrames = 33 * 50;
    let fadeFrames = 3 * 50;
    let messageDuration = totalFrames - fadeFrames;
    let currentMessage = Math.floor(messageFrames / totalFrames) % 2;
    let localFrame = messageFrames % totalFrames;

    if (localFrame < messageDuration) {
        let textSizeValue = 52;
        if (localFrame < fadeFrames) {
            textSizeValue = map(localFrame, 0, fadeFrames, 0, 52);
        } else if (localFrame > messageDuration - fadeFrames) {
            textSizeValue = map(localFrame, messageDuration - fadeFrames, messageDuration, 52, 0);
        }

        fill(0);
        textSize(textSizeValue);
        textAlign(CENTER, CENTER);
        textFont(customFont);
        textStyle(BOLD);
        text(currentMessage === 0 ? 'Welkom op het \n Grafisch Lyceum Rotterdam!' : 'Welkom bij de opleiding \n Creative Software Developer!', width / 2, height / 1.1);
    }
    messageFrames++;
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    stripeHeight = height / 8;
}
