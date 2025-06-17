document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    const numbers = {
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9"
    };

    const operators = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/",
        square: "^",
        root: "√", // Wortel wordt hier afgehandeld
    };

    // Voeg nummers toe
    Object.keys(numbers).forEach(id => {
        document.getElementById(id).addEventListener("click", () => {
            output.value += numbers[id];
        });
    });

    // Voeg operatoren toe
    Object.keys(operators).forEach(id => {
        document.getElementById(id).addEventListener("click", () => {
            output.value += operators[id];
        });
    });

    // Verwijder de aparte event listener voor root
    // Het wortelsymbool wordt al afgehandeld via het operators-object

    // Bereken resultaat
    document.getElementById("equal").addEventListener("click", () => {
        try {
            let expression = output.value;

            // Vervang het machtsymbool (^) door de juiste berekening
            expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
                return `Math.pow(${base}, ${exponent})`;
            });

            // Vervang het wortelsymbool (√) door de juiste berekening
            expression = expression.replace(/√(\d+)/g, (match, number) => {
                return `Math.sqrt(${number})`;
            });

            // Bereken de uitdrukking
            output.value = eval(expression);
        } catch (e) {
            output.value = "Error";
        }
    });

    // Komma
    document.getElementById("comma").addEventListener("click", () => {
        output.value += ".";
    });

    // Clear knop
    document.getElementById("clear").addEventListener("click", () => {
        output.value = "";
    });

    // Backspace knop
    document.getElementById("backSpace").addEventListener("click", () => {
        output.value = output.value.slice(0, -1);
    });
});