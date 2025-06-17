let globaleVariabele = 5; // globale variabele

function test() {
    let lokaleVariabele = 10; // lokale variabele
    console.log(lokaleVariabele);
    console.log(globaleVariabele);
}

console.log(lokaleVariabele); // ReferenceError: lokaleVariabele is not defined