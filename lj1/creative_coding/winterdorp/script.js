document.addEventListener("DOMContentLoaded", function () {
    const smokeElements = document.querySelectorAll("#smoke ellipse");
    const chimneyX = 501 + 21.5; const chimneyY = 248;
    smokeElements.forEach((smoke, index) => { animateSmoke(smoke, chimneyX, chimneyY, index * 1500)});
    function animateSmoke(smoke, startX, startY, delay) {
        let x = startX; let y = startY;
        function moveSmoke() {
            x += 1; y -= 0.75;
            if (x > 1920 || y < 0) {
                x = startX; y = startY;
            }
            smoke.setAttribute("cx", x);
            smoke.setAttribute("cy", y);
            requestAnimationFrame(moveSmoke);
        }
        setTimeout(moveSmoke, delay);
    }

    const snowElements = document.querySelectorAll("#snowflakes circle");
    snowElements.forEach((snow, index) => { animateSnow(snow, index * 1200) });
    function animateSnow(snow, delay) {
        let x = Math.random() * 1920; let y = -10;
        let speed = Math.random() * 2 + 1;
    
        function moveSnow() {
            y += speed;
            if (y > 1080) {
                x = Math.random() * 1920; y = -10;
            }
            snow.setAttribute("cx", x);
            snow.setAttribute("cy", y);
            requestAnimationFrame(moveSnow);
        }
        setTimeout(moveSnow, delay);
    }

    const baubles = [document.querySelector("#bauble-0"), document.querySelector("#bauble-1"), document.querySelector("#bauble-2"), document.querySelector("#bauble-3")];
    baubles.forEach((bauble, index) => { colourBauble(bauble, index * 1000) });

    function colourBauble(bauble, delay) {
        const colours = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
        let colourIndex = 0;
        function changeColour() {
            bauble.setAttribute("fill", colours[colourIndex]);
            colourIndex = (colourIndex + 1) % colours.length;
            setTimeout(changeColour, 1000);
        }
        setTimeout(changeColour, delay);
    }
});