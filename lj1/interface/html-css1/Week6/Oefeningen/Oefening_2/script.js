async function playAudio(id) {
    let audio = document.getElementById(id);
    if (audio) {
        try {
            await audio.play();
        } catch (err) {
            console.error('Error playing audio:', err);
        }
    } else {
        console.error('Audio element not found');
    }
}

function pauseAudio(id) {
    let audio = document.getElementById(id);
    if (audio) {
        if (!audio.paused) {
            audio.pause();
        } else {
            console.warn('Audio is already paused');
        }
    } else {
        console.error('Audio element not found');
    }
}