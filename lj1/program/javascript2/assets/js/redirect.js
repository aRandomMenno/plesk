function redirect(kind, num) {
    const basePaths = {
        oefening: './oefeningen/',
        opdracht: './opdrachten/',
        extra: './extra/'
    };

    if (basePaths[kind]) {
        window.open(`${basePaths[kind]}${num}/index.html`, '_blank');
    }
}
