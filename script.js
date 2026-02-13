// Valentine's Day Website - Simplified JavaScript

let noButtonScale = 1; // Track the current scale of the No button

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
        // Convert to absolute positioning on first move
        if (noBtn.style.position !== 'absolute') {
            const rect = noBtn.getBoundingClientRect();
            const containerRect = buttonContainer.getBoundingClientRect();
            noBtn.style.position = 'absolute';
            noBtn.style.left = (rect.left - containerRect.left) + 'px';
            noBtn.style.top = (rect.top - containerRect.top) + 'px';
        }
        
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
    
    // No initial positioning needed - button starts beside Yes button
}

// Function to make No button disappear when clicked
function disappearNoButton() {
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('disappearing');
    
    // Optional: Show a little message when they click No
    setTimeout(() => {
        const buttonContainer = document.querySelector('.button-container');
        const message = document.createElement('p');
        message.textContent = "You can't escape love! 💕";
        message.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            pointer-events: none;
            animation: fadeInOut 3s ease;
        `;
        document.body.appendChild(message);
        
        // Remove message after animation
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 3000);
    }, 300);
}

// Add fade in/out animation for the message
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(messageStyle);