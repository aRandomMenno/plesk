function redirect(week, kind, num) {
    if (kind == 'oef') {
        kind = 'Oefeningen';
        // window.open(`../../Week${week}/${kind}/Oefening_${num}/`, '_blank');
        window.location.href = `./Week${week}/${kind}/Oefening_${num}/index.html`;
    } 
    
    else if (kind == 'opdr') {
        kind = 'Opdrachten';
        // window.open(`../../Week${week}/${kind}/Opdracht_${num}/`, '_blank');
        window.location.href = `./Week${week}/${kind}/Opdracht_${num}/index.html`;
    }
}
