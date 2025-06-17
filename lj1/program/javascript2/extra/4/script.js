const maanden = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
const weekdagen = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

function showDate() {
    const today = new Date();
    const day = weekdagen[today.getDay()];
    const date = today.getDate();
    const month = maanden[today.getMonth()];
    const year = today.getFullYear();
    document.getElementById('date').innerHTML = `${day} ${date} ${month} ${year}`;
}

function showGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 6) {
        greeting = 'goedenacht';
    } else if (hours < 12) {
        greeting = 'goedemorgen';
    } else if (hours < 18) {
        greeting = 'goedemiddag';
    } else {
        greeting = 'goedenavond';
    }

    document.getElementById('greet').innerHTML = `${greeting}, het is nu ${now.toLocaleTimeString()}`;
}