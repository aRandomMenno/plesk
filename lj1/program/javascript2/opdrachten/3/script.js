document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function() {
        let aantal = parseInt(document.getElementById('aantal').value);
        let result = document.getElementById('result');

        if (aantal <= 0) {
            document.getElementById('result').innerText = 'Ik kan je niet een negatief aantal keer feliciteren, of 0 keer.';
        } 
        else if (aantal >= 100) {
            document.getElementById('result').innerText = 'Ik kan je niet meer dan 100 keer feliciteren, anders zou ik de hele dag bezig zijn.';
        }
        else if (aantal > 0 && aantal < 100) {
            let text = ``;
            for (let i = 1; i <= aantal; i++) {
            text += `Ik feliciteer je ${i}x! <br>`;
            }
            result.innerHTML = text;
        }
    });
});