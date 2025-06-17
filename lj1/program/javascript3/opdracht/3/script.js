
const sounds = [
    './sounds/classic_hurt.mp3',
    './sounds/mario-bros-mamma-mia.mp3',
    './sounds/vine-boom.mp3',
    './sounds/xp-start-up.mp3'
]

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keypress', (event) => {
        if (event.key === 'a') {
            const audio = new Audio(sounds[0]);
            audio.play();
        }
        else if (event.key === 's') {
            const audio = new Audio(sounds[1]);
            audio.play();
        }
        else if (event.key === 'd') {
            const audio = new Audio(sounds[2]);
            audio.play();
        }
        else if (event.key === 'f') {
            const audio = new Audio(sounds[3]);
            audio.play();
        }
    })
})

// function hey() {
//     const audio = new Audio(sounds[0]);
//     audio.play();
//     for (let i = 0; i < Infinity; i++) {
//         setInterval(hey, 1)
//         setInterval(hey, 1)
//         setInterval(hey, 1)
//         setInterval(hey, 1)
//         setInterval(hey, 1)
//     }
// }

// setInterval(hey, 1)
