const maanden = [
    'januari', 'februari', 'maart',
    'april', 'mei', 'juni', 'juli',
    'augustus', 'september', 'oktober',
    'november', 'december'
];

function returnMaand(int) {
    if (isNaN(int)) {
        return 'failed';
    }
    if (int < 1 || int > 12) {
        return 'failed';
    }
    return maanden[int - 1];
}

function displayResult(testNumber, result) {
    const resultsDiv = document.getElementById('results');
    const resultElement = document.createElement('p');
    resultElement.style.color = '#000';
    resultElement.textContent = `Test ${testNumber}: ${result}`;
    resultsDiv.appendChild(resultElement);
}

document.addEventListener('DOMContentLoaded', () => {
    displayResult(1, returnMaand('a'));
    displayResult(2, returnMaand(1));
    displayResult(3, returnMaand(4));
    displayResult(4, returnMaand(8));
    displayResult(5, returnMaand(12));
    displayResult(6, returnMaand(13));
    displayResult(7, returnMaand(0));
    displayResult(8, returnMaand(typeof 0));
    displayResult(9, returnMaand(true));
})

