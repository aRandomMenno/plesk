const uit = ["Lions", "Tigers", "Bears", "Wolves", "Eagles"];
const thuis = ["Sharks", "Panthers", "Hawks", "Dragons", "Raptors"];
const games = document.getElementById('result');

function mogelijkeGames() {
    games.innerText = `Mogelijke games: \n\n`;

    for (let i = 0; i < thuis.length; i++) {
        for (let j = 0; j < uit.length; j++) {
            games.innerText += `${thuis[i]} vs ${uit[j]} \n`;
        }
        games.innerText += `\n`;
    }
}
