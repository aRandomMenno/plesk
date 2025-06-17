function boom() {
    let width = parseInt(document.getElementById('input').value);
    let tree = document.getElementById('result');

    if (width >= 500) {
        alert('The width must be less than 500');
        return;
    }

    tree.innerHTML = '';
    let totalPositions = 0;
    let ballProbability = 0.05;
    let kerstBalCount = 0;
    for (let i = 1; i <= width; i += 2) {
        let row = '';
        let spaces = (width - i) / 2;
        for (let s = 0; s < spaces; s++) {
            row += '&nbsp;';
        }
        for (let j = 0; j < i; j++) {
            if (Math.random() < ballProbability) {
                row += '<ks>0</ks>';
                kerstBalCount++;
            } else {
                row += '#';
            }
            totalPositions++;
        }
        tree.innerHTML += row + '<br>';
    }

    let trunkWidth = Math.max(1, Math.floor(width / 5));
    let trunkHeight = Math.max(1, Math.floor(width / 10));
    let trunkSpaces = Math.max(1, Math.floor((width - trunkWidth) / 2));

    for (let t = 0; t < trunkHeight; t++) {
        let trunkRow = '<span class="stam">';
        for (let s = 0; s < trunkSpaces; s++) {
            trunkRow += '&nbsp;';
        }
        for (let j = 0; j < trunkWidth; j++) {
            trunkRow += '#';
        }
        tree.innerHTML += trunkRow + '</span><br>';
    }

    let allBallsProbability = Math.pow(ballProbability, totalPositions);
    console.log(`The probability that the entire tree is made of balls is: ${allBallsProbability}`);

    if (kerstBalCount === totalPositions) {
        console.log("All leaves are Christmas balls!");
    }
}

function repeat() {
    setInterval(() => { boom() }, 2000);
}
