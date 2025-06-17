function greet() {
    const greet = document.getElementById('greet');
    let time = new Date();
    let hours = time.getHours();
    let greeting;

    if (hours <= 6) {
        greeting = "Goedenacht";
    } else if (hours < 12) {
        greeting = "Goedemorgen";
    } else if (hours < 18) {
        greeting = "Goedemiddag";
    } else {
        greeting = "Goedenavond";
    }

    greet.innerText = `${greeting} beste lezer, welkom op mijn schoolwebsite!`;
}

window.onload = () => {
    greet();
}