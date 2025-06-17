let width = 1920
let height = 1080
let backgroundColour = '#004a7c'

function setup() {
    createCanvas(width, height)
}

function randomCircle() {
    background(backgroundColour)

    let x = Math.floor(Math.random() * 1920)
    let y = Math.floor(Math.random() * 1080)

    fill(color('#fff'))
    circle(x, y, 50)
    counter_0 = 0
}

// function moveSquare() {
//     let x = x * 1.01
//     let y = y * 1.01

//     fill(color('#f0f'))
//     rect(x, y, 50)
// }

let counter_0 = 0
let counter_1 = 0
function draw() {
    if (counter_0 == '50') {
        randomCircle()
        // moveSquare()
    }
    counter_0++
}
