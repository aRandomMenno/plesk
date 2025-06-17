let a = 1;
function foo(){
    return 2;
}

console.log(a);
console.log(foo());

// De fout was dat de variable en functie pas werden gemaakt nadat ze aangeroepen waren. Dit is opgelost door de functie en variable boven de console logs te zetten.