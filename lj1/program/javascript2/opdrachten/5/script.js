document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');

    for (let c = 0; c < 10; c++) {
        ctx.fillStyle = `rgb(${80 + c * 8}, ${40 + c * 15}, ${20 + c * 20})`;
        ctx.beginPath();
        ctx.arc(25 + c * 80, 70, 10 + c * 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    document.getElementById('container').appendChild(canvas);
});