function a() {
  console.log("Functie a melding!");
}

let b = function () {
    console.log("Functie b melding! maar deze is anoniem.");
}

const c = () => { 
    console.log("Functie c melding! maar deze is ook anoniem. En een arrow functie.");
}

a();
b();
c();