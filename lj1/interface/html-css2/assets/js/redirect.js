function redirect(week, kind, num) {
    if (week < 1 || week > 7) {
        console.error('Invalid week');
        return;
    }

    const basePaths = {
        0: 'oefening',
        1: 'opdracht',
    };

    if (basePaths.hasOwnProperty(kind)) {
        window.open(`./week-${week}/${basePaths[kind]}/${num}/index.html`, '_blank');
    }
    else {
        console.error('Invalid kind');
    }
}