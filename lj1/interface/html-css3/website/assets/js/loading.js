window.addEventListener("DOMContentLoaded", () => { 
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.querySelector('.page').style.display = 'grid';
        }, 300);
    }, 5000); 
});