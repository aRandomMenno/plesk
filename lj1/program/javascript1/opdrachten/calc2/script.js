const PI = Math.PI;
let memory = [];
let storedValue = NaN;
let operator = '';

function appendNumber(num) {
    let display = document.getElementById('display');
    display.value += num;
}

function appendComma() {
    let display = document.getElementById('display');

    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function changeOperator(op) {
    let display = document.getElementById('display');
    let displayValue = parseFloat(display.value);

    if (!isNaN(displayValue)) {
        if (!isNaN(storedValue)) {
            calculate();
            storedValue = parseFloat(display.value);
        } else {
            storedValue = displayValue;
        }
        display.value = '';
        operator = op;
    } else if (!isNaN(storedValue)) {
        operator = op;
    }
}

function calculate() {
    let display = document.getElementById('display');
    let displayValue = parseFloat(display.value);
    let result;

    if (!isNaN(displayValue) && !isNaN(storedValue)) {
        switch (operator) {
            case '+':
                result = storedValue + displayValue;
                break;
            case '-':
                result = storedValue - displayValue;
                break;
            case '*':
                result = storedValue * displayValue;
                break;
            case '/':
                result = storedValue / displayValue;
                if (result === Infinity) {
                    result = 0;
                }
                break;
            case '%':
                result = storedValue % displayValue;
                break;
            case '^':
                result = Math.pow(storedValue, displayValue);
                break;
            default:
                result = displayValue;
                break;
        }
        display.value = result;
        storedValue = NaN;
        operator = '';
    }
}

function clearDisplay() {
    let display = document.getElementById('display');
    display.value = '';
}

function clearAll() {
    let display = document.getElementById('display');
    display.value = '';
    storedValue = NaN;
}

function memoryAdd() {
    let display = document.getElementById('display');
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory.push(value);
        updateMemoryDisplay();
    }
}

function memorySubtract() {
    let display = document.getElementById('display');
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        memory.push(-value);
        updateMemoryDisplay();
    }
}

function memoryRecall() {
    if (memory.length > 0) {
        let display = document.getElementById('display');
        display.value = memory[memory.length - 1];
    }
}

function memoryClear() {
    memory = [];
    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    let memoryDisplay = document.getElementById('memoryDisplay');
    memoryDisplay.innerHTML = `Memory: ` + memory.slice(-5).join(', ');
}

document.addEventListener('keydown', function (event) {
    let display = document.getElementById('display');
    if (!isNaN(event.key)) {
        // Do nothing
    } else if (event.key === '.') {
        event.preventDefault();
        if (!display.value.includes('.')) {
            display.value += event.key;
        }
    } else if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
        event.preventDefault();
        changeOperator(event.key);
    }
});

function appendPI() {
    let display = document.getElementById('display');
    display.value += PI;
}

function sqrRoot() {
    let display = document.getElementById('display');
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        display.value = Math.sqrt(value);
    }
}

function power() {
    let display = document.getElementById('display');
    let value = parseFloat(display.value);
    if (!isNaN(value)) {
        display.value = Math.pow(value, 2);
    }
}
