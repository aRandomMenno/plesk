document.addEventListener('DOMContentLoaded', () => {
    const bio = document.getElementById('bio');
    bio.addEventListener('input', function () {
        const wordCount = countWords(this.value);
        const bioError = document.getElementById('bioError');
        if (wordCount < 100) {
            bioError.textContent = `${wordCount}/100 woorden`;
        } else {
            bioError.textContent = `${wordCount} woorden ✓`;
            bioError.style.color = 'green';
        }
    });
});

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}