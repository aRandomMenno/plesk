function bereken() {
    let a = document.getElementById("veld1").value;
    let b = document.getElementById("veld2").value;
    let c = parseFloat(a) + parseFloat(b);
    console.log(c);
    if (isNaN(c)) {
        window.alert("Niet alle getallen zijn nummers!");
        console.error("Niet alle getallen zijn nummers!");
        c = 0;
        stop;
    }
    document.getElementById("uitvoerVeld").value = c;
}