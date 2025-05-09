document.addEventListener('DOMContentLoaded', function() {
    console.log("ParkEase script.js INICIADO y DOMContentLoaded DISPARADO!");
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && nav && menuIcon) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) { // Lower threshold for subtle shadow
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    
    const animatedElements = document.querySelectorAll('[data-animate]');
    console.log("Elementos con [data-animate] encontrados:", animatedElements.length, animatedElements); 
    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of element visible
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            console.log("Observer Callback SE EJECUTÓ. Número de entradas:", entries.length);
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    console.log("CLASE .is-visible FUE AÑADIDA a:", entry.target);
                    // Optional: Add main animation class based on existing classes (e.g., fade-in-up)
                    // This ensures CSS transitions/animations trigger correctly.
                    // Example: if entry.target.classList.contains('fade-in-up') -> no extra action needed
                    // if only data-animate and fade-in (defined by .is-visible) -> also fine

                    observerInstance.unobserve(entry.target); // Animate only once
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Inline script for reservation_confirm.html handles its specific logic.
});