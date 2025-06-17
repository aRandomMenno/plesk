document.addEventListener('DOMContentLoaded', function () {
    let submit = document.getElementById('submit')
    submit.addEventListener('click', function () {
        let tafel = parseInt(document.getElementById('aantal').value);
        let result = document.getElementById('result')
        result.innerText = '';

        for (let t = 1; t < 11; t++) {
            let antwoord = t * tafel;
            result.innerHTML += `${t} * ${tafel} = ${antwoord} <br>`;
        }
    });
});