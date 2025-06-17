// ! Appels
let prijsAppels = 0; let aantalAppels = 0;
// @ Peren
let prijsPeren = 0; let aantalPeren = 0;
// % Bananen
let prijsBananen = 0; let aantalBananen = 0;
// * Totaal prijs
let totaalPrijs = 0;

function shop(product, pm, aantal) {
    if (product !== 'appel' && product !== 'peer' && product !== 'banaan' && product !== 'totaal') {
        console.error(`${product} staat niet op onze producten lijst`);
        alert(`${product} staat niet op onze producten lijst`);
        stop;
    }
    if (product === 'totaal' && pm === '*' && aantal === 0) {
        totaalPrijs = (aantalAppels * 1) + (aantalPeren * 2) + (aantalBananen * 3);
        document.getElementById('totaalPrijs').value = totaalPrijs;
    }
    else if (pm === '#') {
        let aantalProduct = parseInt(document.getElementById(`totaal_${product}`).value);
        if (isNaN(aantalProduct)) {
            console.error("Huh? that's not a number!");
            document.getElementById(`totaal_${product}`).value = '';
            stop;
        }
        else {
            if (product === 'appel') {
                aantalAppels = aantalProduct;
                prijsAppels = aantalProduct * 1;
                document.getElementById('totaalPrijs_appel').value = prijsAppels;
            }
            else if (product === 'peer') {
                aantalPeren = aantalProduct;
                prijsPeren = aantalProduct * 2;
                document.getElementById('totaalPrijs_peer').value = prijsPeren;
            }
            else if (product === 'banaan') {
                aantalBananen = aantalProduct;
                prijsBanaantalBananen = aantalProduct * 3;
                document.getElementById('totaalPrijs_banaan').value = prijsBanaantalBananen;
            }
        }
    }
    else if (aantal === 1) {
        if (pm !== '-' || pm !== '+') {
            console.error('PM param incorrect!')
            stop;
        } 
        switch (product) {
            case 'appel':
                if (pm === '+') {
                    aantalAppels += 1;
                    document.getElementById('totaal_appel').value = aantalAppels;
                    document.getElementById('totaalPrijs_appel').value = aantalAppels * 1;
                }
                else if (pm === '-') {
                    if (aantalAppels <= 0) {
                        break;
                    }
                    aantalAppels -= 1;
                    document.getElementById('totaal_appel').value = aantalAppels;
                    document.getElementById('totaalPrijs_appel').value = aantalAppels * 1;
                }
                break;

            case 'peer':
                if (pm === '+') {
                    aantalPeren += 1;
                    document.getElementById('totaal_peer').value = aantalPeren;
                    document.getElementById('totaalPrijs_peer').value = aantalPeren * 2;
                }
                else if (pm === '-') {
                    if (aantalPeren <= 0) {
                        break;
                    }
                    aantalPeren -= 1;
                    document.getElementById('totaal_peer').value = aantalPeren;
                    document.getElementById('totaalPrijs_peer').value = aantalPeren * 2;
                }
                break;

            case 'banaan':
                if (pm === '+') {
                    aantalBananen += 1;
                    document.getElementById('totaal_banaan').value = aantalBananen;
                    document.getElementById('totaalPrijs_banaan').value = aantalBananen * 3;
                }
                else if (pm === '-') {
                    if (aantalBananen <= 0) {
                        break;
                    }
                    aantalBananen -= 1;
                    document.getElementById('totaal_banaan').value = aantalBananen;
                    document.getElementById('totaalPrijs_banaan').value = aantalBananen * 3;
                }
                break;
        }
    }
    else if (aantal <= -1) {
        console.error('WTF DONT DO THAT, THAT HURTS!!!');
        stop;
    }
}