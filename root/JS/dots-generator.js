document.addEventListener('DOMContentLoaded', () => {
    const dotsContainer = document.getElementById('dots-container');
    
    if (!dotsContainer) return;
    
    // Konfiguration
    const config = {
        dotSize: 6,
        spacing: {
            desktop: 35,
            tablet: 25,
            mobile: 20
        },
        mouseRadius: 100,
        maxMovement: 20,
        maxScale: 1.5,
        transitionDuration: 0.2
    };
    
    // Responsive Spacing ermitteln
    function getSpacing() {
        if (window.innerWidth <= 480) return config.spacing.mobile;
        if (window.innerWidth <= 768) return config.spacing.tablet;
        return config.spacing.desktop;
    }
    
    // Dots Array für Performance
    const dots = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInHero = false;
    let animationFrameId = null;
    
    // Dot-Grid generieren
    function generateDots() {
        dotsContainer.innerHTML = '';
        dots.length = 0;
        
        const spacing = getSpacing();
        const cols = Math.ceil(window.innerWidth / spacing);
        const rows = Math.ceil(window.innerHeight / spacing);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                
                const left = col * spacing;
                const top = row * spacing;
                
                // Ursprüngliche Position speichern
                dot.originalX = left;
                dot.originalY = top;
                dot.currentX = left;
                dot.currentY = top;
                
                dot.style.left = `${left}px`;
                dot.style.top = `${top}px`;
                
                // Hover-Effekte hinzufügen
                dot.addEventListener('mouseenter', () => {
                    dot.style.animation = 'wiggle 0.5s ease-in-out';
                });
                
                dot.addEventListener('animationend', () => {
                    dot.style.animation = '';
                });
                
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }
    }
    
    // Mouse-Tracking
    function handleMouseMove(e) {
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();
        
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseInHero = true;
        
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateDots);
        }
    }
    
    function handleMouseLeave() {
        isMouseInHero = false;
        resetDots();
    }
    
    // Dots basierend auf Mausposition aktualisieren
    function updateDots() {
        if (!isMouseInHero) {
            animationFrameId = null;
            return;
        }
        
        dots.forEach(dot => {
            const dotCenterX = dot.originalX + config.dotSize / 2;
            const dotCenterY = dot.originalY + config.dotSize / 2;
            
            // Distanz zur Maus berechnen
            const distanceX = mouseX - dotCenterX;
            const distanceY = mouseY - dotCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < config.mouseRadius) {
                // Stärke basierend auf Distanz (näher = stärker)
                const strength = (config.mouseRadius - distance) / config.mouseRadius;
                
                // Bewegung berechnen
                const moveX = (distanceX / distance) * strength * config.maxMovement;
                const moveY = (distanceY / distance) * strength * config.maxMovement;
                
                // Skalierung und Opacity
                const scale = 1 + (strength * (config.maxScale - 1));
                const opacity = 0.4 + (strength * 0.6);
                
                // Transform anwenden
                dot.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
                dot.style.opacity = opacity;
                
                // Aktuelle Position speichern
                dot.currentX = dot.originalX + moveX;
                dot.currentY = dot.originalY + moveY;
            } else {
                // Zurück zur ursprünglichen Position
                dot.style.transform = 'translate(0px, 0px) scale(1)';
                dot.style.opacity = 0.4;
                dot.currentX = dot.originalX;
                dot.currentY = dot.originalY;
            }
        });
        
        animationFrameId = requestAnimationFrame(updateDots);
    }
    
    // Dots zurücksetzen
    function resetDots() {
        dots.forEach(dot => {
            dot.style.transform = 'translate(0px, 0px) scale(1)';
            dot.style.opacity = 0.4;
            dot.currentX = dot.originalX;
            dot.currentY = dot.originalY;
        });
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    // Event Listeners
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Window Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            generateDots();
        }, 100);
    });
    
    // Initial Dots generieren
    generateDots();
    
    // Performance Monitoring (optional)
    if (process.env.NODE_ENV === 'development') {
        console.log(`Generated ${dots.length} dots with spacing ${getSpacing()}px`);
    }
});