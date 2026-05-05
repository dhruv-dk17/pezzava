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
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

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
  // Animate counters when visible
  const counterSection = document.querySelector('.counter-section');
  if (counterSection) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); }
    }, { threshold: 0.3 }).observe(counterSection);
  }
});
