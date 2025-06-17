function getNumbers() {
    let input = document.getElementById('numbers').value;
    console.log(input);
    let array = input.split(',').map(Number);
    console.log(array);
    return array;
}

function magic() {
    let numbersArray = getNumbers();
    let highest = findHighest(numbersArray);
    let lowest = findLowest(numbersArray);
    let length = numbersArray.length;
    let average = findAverage(numbersArray);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>aantal getallen: ${length}</p>
        <p>hoogste getal: ${highest}</p>
        <p>laagste getal: ${lowest}</p>
        <p>gemiddelde: ${average.toFixed(2)}</p>
    `;
}

function findHighest(array) {
    let highest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > highest) {
            highest = array[i];
        }
    }
    return highest;
}

function findLowest(array) {
    let lowest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < lowest) {
            lowest = array[i];
        }
    }
    return lowest;
}

function findAverage(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total / array.length;
}