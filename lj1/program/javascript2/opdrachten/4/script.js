document.addEventListener('DOMContentLoaded', function () {
    const insertPoint = document.getElementById('container');

    for (let i = 1; i < 11; i++) {
        let div = document.createElement('div');
        div.innerHTML = `dit is div nummer ${i}`;
        div.id = `div_${i}`;
        div.className = 'coloured_div';
        let color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        div.style.backgroundColor = color;
        insertPoint.appendChild(div);
    }

    function colorEverything() {
        for (let i = 1; i < 11; i++) {
            let div = document.getElementById(`div_${i}`);
            let color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
            div.style.backgroundColor = color;
        }
    }

    colorEverything();
    setInterval(colorEverything, 2500);
});
