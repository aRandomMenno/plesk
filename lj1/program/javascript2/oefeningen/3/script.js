document.addEventListener('DOMContentLoaded', function () {
    const games = [
        'Terraria',
        'Minecraft',
        'Noita',
        'Watch Dogs 2'
    ]
    let gamesOl = document.createElement('ol');

    games.forEach(game => {
        let li = document.createElement('li');
        li.textContent = game;
        gamesOl.appendChild(li);
    });

    document.getElementById('result').appendChild(gamesOl);
});

