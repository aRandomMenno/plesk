document.addEventListener('DOMContentLoaded', function() {
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    const navItems = document.querySelector('.nav-items').cloneNode(true);
    navOverlay.appendChild(navItems);
    
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});