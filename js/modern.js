/**
 * modern.js
 * Handles interactivity for the modernized Pezzava legacy site.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initCustomCursor();
    initReveals();
});

// Reveal Animations
function initReveals() {
    const reveals = document.querySelectorAll('.reveal-fade');
    const windowHeight = window.innerHeight;
    
    function checkReveals() {
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 50) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveals);
    checkReveals(); // Initial check
}


// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('glass-morphism', 'py-4', 'shadow-sm');
            header.classList.remove('bg-white/80', 'py-6', 'backdrop-blur-sm');
        } else {
            header.classList.remove('glass-morphism', 'py-4', 'shadow-sm');
            header.classList.add('bg-white/80', 'py-6', 'backdrop-blur-sm');
        }
    });
}

// Mobile Menu Logic
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (!menuBtn || !menuOverlay || !closeBtn) return;

    function openMenu() {
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Trigger animation
        requestAnimationFrame(() => {
            menuOverlay.classList.remove('-translate-x-full');
            menuOverlay.classList.add('translate-x-0');
        });
    }

    function closeMenu() {
        menuOverlay.classList.remove('translate-x-0');
        menuOverlay.classList.add('-translate-x-full');
        document.body.style.overflow = '';
        
        // Hide after transition ends
        setTimeout(() => {
            menuOverlay.classList.add('hidden');
        }, 500); // Matches Tailwind transition duration
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
}

// Enhanced Custom Cursor
function initCustomCursor() {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        document.body.style.cursor = 'auto';
        return;
    }

    document.body.style.cursor = 'none';

    // Create cursor elements if they don't exist
    let cursorDot = document.querySelector('.cursor-dot');
    let cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }

    if (!cursorOutline) {
        cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorOutline);
    }

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let outlineX = dotX;
    let outlineY = dotY;

    // Show cursors
    setTimeout(() => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    }, 100);

    window.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    });

    // Smooth follow for outline
    function animateOutline() {
        outlineX += (dotX - outlineX) * 0.15;
        outlineY += (dotY - outlineY) * 0.15;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .cursor-pointer');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '48px';
            cursorOutline.style.height = '48px';
            cursorOutline.style.backgroundColor = 'rgba(143, 151, 74, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '24px';
            cursorOutline.style.height = '24px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}
