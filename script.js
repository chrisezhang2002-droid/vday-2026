// Valentine's Day Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Floating hearts animation
    createFloatingHearts();
    
    // Initialize interactive elements
    initializeMessageCards();
    initializeCounters();
    initializePopup();
    initializeScrollEffects();
    initializePhotoGallery();
    
    // Start journey button
    const startButton = document.getElementById('startJourney');
    if (startButton) {
        startButton.addEventListener('click', function() {
            document.getElementById('messages').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const hearts = ['💕', '💖', '💝', '💗', '💘', '❤️', '💜', '💙'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.opacity = Math.random() * 0.8 + 0.2;
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }
    
    // Create hearts every 800ms
    setInterval(createHeart, 800);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Initialize message cards flip effect
function initializeMessageCards() {
    const messageCards = document.querySelectorAll('.message-card');
    
    messageCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Add sparkle effect
            createSparkleEffect(this);
        });
    });
}

// Create sparkle effect
function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1001';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

// Add sparkle animation to CSS dynamically
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg) translateY(-100px);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize counters animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
        
        animated = true;
    }
    
    // Trigger animation when section is visible
    const counterSection = document.querySelector('.love-counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    });
    
    if (counterSection) {
        observer.observe(counterSection);
    }
}

// Initialize popup functionality
function initializePopup() {
    const popup = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    
    // Show popup after 3 seconds
    setTimeout(() => {
        if (popup) {
            popup.classList.add('active');
        }
    }, 3000);
    
    // Close popup handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
        }
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Update header background on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.message-card, .photo-item, .counter-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
}

// Initialize photo gallery interactions
function initializePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
            
            // You could add a lightbox here for full-size images
            createHeartBurst(this);
        });
        
        // Mouse enter/leave effects
        item.addEventListener('mouseenter', function() {
            createFloatingEmoji(this, ['🥰', '😍', '💕', '✨']);
        });
    });
}

// Create heart burst effect
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1001';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.setProperty('--endX', endX + 'px');
        heart.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
}

// Create floating emoji effect
function createFloatingEmoji(element, emojis) {
    const rect = element.getBoundingClientRect();
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = (rect.left + Math.random() * rect.width) + 'px';
    emoji.style.top = rect.bottom + 'px';
    emoji.style.fontSize = '20px';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '1001';
    emoji.style.animation = 'floatEmoji 2s ease-out forwards';
    
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        if (emoji.parentNode) {
            emoji.parentNode.removeChild(emoji);
        }
    }, 2000);
}

// Add additional animations to CSS
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translate(calc(var(--endX) - 50vw), calc(var(--endY) - 50vh));
        }
    }
    
    @keyframes floatEmoji {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.2);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Add special interactions for mobile devices
if ('ontouchstart' in window) {
    // Mobile-specific interactions
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
    });
    
    // Add touch styles
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .message-card.touched {
            transform: scale(1.05);
        }
        
        @media (hover: none) {
            .message-card:hover .card-front,
            .message-card:hover .card-back {
                transform: none;
            }
            
            .message-card.touched .card-front {
                transform: rotateY(180deg);
            }
            
            .message-card.touched .card-back {
                transform: rotateY(0deg);
            }
        }
    `;
    document.head.appendChild(touchStyles);
}