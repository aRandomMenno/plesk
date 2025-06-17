document.addEventListener('DOMContentLoaded', function() {
    const switchElement = document.querySelector('.switch');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize theme based on saved preference or device preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkTheme)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        switchElement.classList.add('on');
    }
    
    switchElement.addEventListener('click', function() {
        // Toggle switch appearance
        this.classList.toggle('on');
        
        // Play sound effect
        new Audio('sounds/pop.mp3').play();
        
        // Toggle theme
        if (this.classList.contains('on')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            
            // Add a fun animation to show theme change
            animateThemeChange('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            
            // Add a fun animation to show theme change
            animateThemeChange('light');
        }
    });
    
    function animateThemeChange(theme) {
        // Create a temporary overlay for transition effect
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.zIndex = '9999';
        
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => {
            overlay.style.opacity = '0.3';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 500);
            }, 300);
        }, 10);
    }
});