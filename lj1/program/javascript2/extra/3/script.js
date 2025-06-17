function makeRect() {
    let length = parseInt(document.getElementById('lengte').value);
    let width = parseInt(document.getElementById('breedte').value);
    const rect = document.getElementById('result');

    if (isNaN(length) || isNaN(width)) {
        alert('Please enter valid numbers for length and width.');
        return;
    }

    let product = length * width;

    if (product <= 32768) {
        rect.innerText = '';
        let row = '*'.repeat(length) + '\n';
        let fullRect = row.repeat(width);
        let chars = fullRect.split('');
        rect.innerText = ' '.repeat(chars.length);

        let index = 0;
        function addChar() {
            if (index < chars.length) {
                rect.innerText = rect.innerText.substring(0, index) + chars[index] + rect.innerText.substring(index + 1);
                index++;
                setTimeout(addChar, interval());
            }
        }
        addChar();
    } else {
        alert('Er zouden meer dan 32768 characters worden aangemaakt. We voorkomen dit.');
    }
}

function interval() {
    return 10 + Math.random() * 10;
}

function makeStar() {
    let size = parseInt(document.getElementById('size').value);
    const result = document.getElementById('result');

    if (isNaN(size) || size < 1) {
        alert('Please enter a valid number for size.');
        return;
    }

    let star = '';
    let mid = Math.floor(size / 2);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === mid || j === mid || i + j === mid || i + j === size - 1 + mid) {
                star += '*';
            } else {
                star += ' ';
            }
        }
        star += '\n';
    }

    result.innerText = star;
}