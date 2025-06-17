document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    const logo = document.createElement('img');
    logo.className = 'loading-logo';
    logo.src = '/assets/logo.png';
    logo.alt = 'LeafLoom Logo';
    
    loadingScreen.appendChild(spinner);
    loadingScreen.appendChild(logo);
    document.body.appendChild(loadingScreen);

    setTimeout(function() {
        loadingScreen.classList.add('fade-out');
        setTimeout(function() {
            loadingScreen.remove();
            document.body.classList.add('page-transition-enter');
        }, 300)
    }, 400);
});
