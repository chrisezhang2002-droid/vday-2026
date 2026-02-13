// Valentine's Day Website - Simplified JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeNoButtonBehavior();
});

// Function to go to page 2
function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    setTimeout(() => {
        document.getElementById('page2').classList.add('active');
    }, 250);
}

// Function to show final message
function showFinalMessage() {
    document.getElementById('page2').classList.remove('active');
    setTimeout(() => {
        document.getElementById('finalMessage').classList.add('active');
    }, 250);
}

// Make the "No" button run away from the mouse
function initializeNoButtonBehavior() {
    const noBtn = document.getElementById('noBtn');
    const buttonContainer = document.querySelector('.button-container');
    
    noBtn.addEventListener('mouseenter', function() {
        moveNoButton();
    });
    
    noBtn.addEventListener('mouseover', function() {
        moveNoButton();
    });
    
    // Also move on touch for mobile devices
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    function moveNoButton() {
        // Get container dimensions
        const containerRect = buttonContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Calculate available space
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        // Generate random position within container
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Apply the new position
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Add a little animation effect
        noBtn.style.transition = 'all 0.3s ease';
        
        // Reset transition after animation
        setTimeout(() => {
            noBtn.style.transition = 'all 0.3s ease';
        }, 300);
    }
    
    // Initial positioning of the No button
    const initialX = Math.random() * (buttonContainer.offsetWidth - noBtn.offsetWidth);
    const initialY = Math.random() * (buttonContainer.offsetHeight - noBtn.offsetHeight);
    noBtn.style.left = initialX + 'px';
    noBtn.style.top = initialY + 'px';
}