document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function() {
        let age = document.getElementById('age').value;
        let result = document.getElementById('result');

        if (isNaN(age) || age < 1 || age > 130) {
            result.innerHTML = '<br> Please enter a valid age, more than 0, less than 130!';
        } else {
            let messages = [];
            result.innerHTML = 'In de console word je gefeliciteerd!';
            for (let i = 1; i <= age; i++) {
                messages.push(`Happy Birthday! times: ${i}`);
            }
            console.log(messages.join('\n'));
        }
    });
});
