document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            if (name && email && message) {
                alert("Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.");
                contactForm.reset();
            } else {
                alert("Vul alle verplichte velden in.");
            }
        });
    }
    
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(28, 40, 38, 0.98)";
        } else {
            navbar.style.background = "rgba(28, 40, 38, 0.95)";
        }
    });
    
    const featureCards = document.querySelectorAll(".feature-card");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);
    
    featureCards.forEach(function(card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });
});