/* ========== PEZZAVA — Main App Logic ========== */

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

// Scroll reveal
function initReveals() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-clip, .reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
}

// 3D Tilt effect on product cards
function initTilt() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Marketplace modal
function showMarketplaceModal(product) {
  const modal = document.getElementById('marketplace-modal');
  if (!modal) return;
  const mp = product.marketplace;
  let btns = '';
  if (mp.amazon) btns += `<a href="#" class="btn btn-amazon" onclick="event.preventDefault()">🛒 Buy on Amazon</a>`;
  if (mp.flipkart) btns += `<a href="#" class="btn btn-flipkart" onclick="event.preventDefault()">🛍️ Buy on Flipkart</a>`;
  if (mp.shopclues) btns += `<a href="#" class="btn btn-primary" onclick="event.preventDefault()">🛒 Buy on Shopclues</a>`;
  if (mp.limeroad) btns += `<a href="#" class="btn btn-primary" onclick="event.preventDefault()">🛍️ Buy on Limeroad</a>`;
  if (!btns) btns = '<p style="color:var(--text-muted)">This product is currently unavailable.</p>';
  modal.querySelector('.modal-product-name').textContent = product.name;
  modal.querySelector('.modal-buttons').innerHTML = btns;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('marketplace-modal')?.classList.remove('active');
}

// Close modal on overlay click
document.getElementById('marketplace-modal')?.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString('en-IN');
    }, 30);
  });
}

// Active nav link
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initTilt();
  initCursor();
  // Animate counters when visible
  const counterSection = document.querySelector('.counter-section');
  if (counterSection) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); }
    }, { threshold: 0.3 }).observe(counterSection);
  }
});

// Custom Cursor Implementation
function initCursor() {
  if (window.innerWidth <= 1024) return;

  const dot = document.createElement('div');
  const outline = document.createElement('div');
  dot.className = 'cursor-dot';
  outline.className = 'cursor-outline';
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });

  // Smooth follower for outline
  const animateOutline = () => {
    const easing = 0.15;
    outlineX += (mouseX - outlineX) * easing;
    outlineY += (mouseY - outlineY) * easing;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Hover effects
  const interactiveElements = document.querySelectorAll('a, button, .product-card, .btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '40px';
      outline.style.height = '40px';
      outline.style.backgroundColor = 'rgba(148, 123, 89, 0.1)';
      outline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width = '24px';
      outline.style.height = '24px';
      outline.style.backgroundColor = 'transparent';
      outline.style.borderColor = 'var(--primary)';
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });
}
