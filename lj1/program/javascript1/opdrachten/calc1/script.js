
// Function to change the operation
let operation = '+';
function changeOp(op) { 
    operation = op;
}

function calculate() {
    // Get values of input fields
    const num1 = parseFloat(document.getElementById('1').value);
    const num2 = parseFloat(document.getElementById('2').value);

    // Check if input is a number
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').innerText = 'Result: You need to input some numbers!';
        return;
    }

    // Calculate result based on operation
    let result = 'Result: ';
    switch (operation) {
        case '+':
            result += num1 + num2;
            break;
        case '-':
            result += num1 - num2;
            break;
        case '*':
            result += num1 * num2;
            break;
        case '/':
            result += num1 / num2;
            break;
        default:
            result = 'Result: Invalid operation';
    }

    // Display result
    document.getElementById('result').innerText = result;
}