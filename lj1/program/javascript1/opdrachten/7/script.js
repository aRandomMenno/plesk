
function inhoud() {
    let lengte = window.prompt(`Wat is de lengte van het object?`)
    let breedte = window.prompt(`Wat is de breedte van het object?`);
    let hoogte = window.prompt(`Wat is de hoogte van het object?`);

    let inhoud = lengte * breedte * hoogte;
    document.getElementById(`resultaat`).innerHTML = `Inhoud object: ` + inhoud + ` cm3.`;
}

inhoud()
