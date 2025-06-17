function plus(a, b) {
    if (isNaN(a) || isNaN(b)) {
        console.error(`Invalid value's presented, A and or B are not numbers`);
        stop;
    }
    return a + b;
}

function min(a, b) {
    if (isNaN(a) || isNaN(b)) {
        console.error(`Invalid value's presented, A and or B are not numbers`);
        stop;
    }
    return a - b;
}

console.log(plus(4, 55))
console.log(min(55, 11))