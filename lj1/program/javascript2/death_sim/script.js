document.addEventListener('DOMContentLoaded', function () {
    let result = document.getElementById('result');
    let death_chance = Math.floor(Math.random() * 0.005 + 1);
    let age = 0;
    let alive = true;

    while (alive) {
        age++;
        death_chance = death_chance * (Math.random() * 0.0015 + 1);

        if (Math.random() * 77 < death_chance) {
            result.innerText += `You died at the age of ${age}! \n`;
            alive = false;
        } else {
            result.innerText += `You survied another year, you now are ${age} years old. \n`;
        }
    }
});

// Find the average age...
// document.addEventListener('DOMContentLoaded', function () {
//     let result = document.getElementById('result');
//     let totalAge = 0;
//     let simulations = 1000000;

//     for (let i = 0; i < simulations; i++) {
//         let death_chance = Math.floor(Math.random() * 0.005 + 1);
//         let age = 0;
//         let alive = true;

//         while (alive) {
//             age++;
//             death_chance = death_chance * (Math.random() * 0.0015 + 1);

//             if (Math.random() * 81 < death_chance) {
//                 totalAge += age;
//                 alive = false;
//             }
//         }
//     }

//     let averageAge = totalAge / simulations;
//     result.innerText = `The average age after ${simulations} simulations is ${averageAge.toFixed(2)} years.`;
// });