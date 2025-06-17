function rollDices() {
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let worpen_per_dobbelsteen = parseInt(document.getElementById('input').value);
    let aantal_dobbelstenen = parseInt(document.getElementById('aantal_dobbelstenen').value);
    if (worpen_per_dobbelsteen * aantal_dobbelstenen > 1000000) {
        alert('Het aantal worpen in totaal mag niet meer dan 1.000.000 zijn.');
        return;
    }
    if (aantal_dobbelstenen <= 0) {
        alert('Het aantal dobbelstenen moet groter zijn dan 0');
        return;
    }
    if (worpen_per_dobbelsteen <= 0) {
        alert('Het aantal worpen per dobbelsteen moet groter zijn dan 0');
        return;
    }

    let total = 0;
    let diceThrows = [];
    let throwCounts = {};

    for (let i = 0; i < worpen_per_dobbelsteen; i++) {
        let sum = 0;
        for (let j = 0; j < aantal_dobbelstenen; j++) {
            sum += Math.floor(Math.random() * 6) + 1;
        }
        diceThrows.push(sum);
        total += sum;
        throwCounts[sum] = (throwCounts[sum] || 0) + 1;
    }

    let minSum = aantal_dobbelstenen;
    let maxSum = aantal_dobbelstenen * 6;
    for (let i = minSum; i <= maxSum; i++) {
        if (i < 10) {
            let div = document.createElement('div');
            div.className = 'worpen';
            div.innerHTML = `aantal keer ${i}: &nbsp;<progress id="${i}" value="${throwCounts[i] || 0}" max="${worpen_per_dobbelsteen * 0.35}"></progress> <span id="w-${i}">${throwCounts[i] || 0}</span>`;
            resultDiv.appendChild(div);
        } else {
            let div = document.createElement('div');
            div.className = 'worpen';
            div.innerHTML = `aantal keer ${i}: <progress id="${i}" value="${throwCounts[i] || 0}" max="${worpen_per_dobbelsteen * 0.35}"></progress> <span id="w-${i}">${throwCounts[i] || 0}</span>`;
            resultDiv.appendChild(div);
        }
    }

    diceThrows.sort((a, b) => a - b);
    let median;
    if (diceThrows.length % 2 === 0) {
        median = (diceThrows[diceThrows.length / 2 - 1] + diceThrows[diceThrows.length / 2]) / 2;
    } else {
        median = diceThrows[Math.floor(diceThrows.length / 2)];
    }

    let average = total / diceThrows.length;

    let statsDiv = document.createElement('div');
    statsDiv.className = 'stats';
    statsDiv.innerHTML = `
        <p>Totaal: ${total}</p>
        <p>Gemiddelde: ${average.toFixed(2)}</p>
        <p>Mediaan: ${median}</p>
    `;
    resultDiv.appendChild(statsDiv);
}