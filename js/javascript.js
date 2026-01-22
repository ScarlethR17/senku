document.addEventListener('DOMContentLoaded', function() {
    // Duplicar las tarjetas para crear loop infinito
    const galleryRows = document.querySelectorAll('.gallery-row');
    
    galleryRows.forEach(row => {
        const cards = Array.from(row.children);
        
        // Duplicar todas las tarjetas para efecto infinito
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row.appendChild(clone);
        });
    });
    
    // Efecto parallax en scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
    
    // Efecto de inclinación 3D en las tarjetas al mover el mouse
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1) translateY(-20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0)';
        });
    });
    
    // Animación de entrada para la biografía
    const bioBox = document.querySelector('.bio-box');
    
    if (bioBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(bioBox);
    }
    
    // Prevenir errores de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Imagen no encontrada:', this.src);
        });
    });
});

// Añadir animación fadeInUp
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
