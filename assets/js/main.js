/**
 * Pro Plumbing Services Corp — Main JavaScript
 * Handles: Scroll animations, year update, navbar behavior
 */

'use strict';

// ── Year Update ──────────────────────────────────────────────
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Intersection Observer — Scroll Animations ────────────────
const animatedElements = document.querySelectorAll('[data-animate]');

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Apply stagger delays to sibling elements
  const staggerGroups = new Map();

  animatedElements.forEach((el) => {
    const parent = el.parentElement;
    if (!staggerGroups.has(parent)) {
      staggerGroups.set(parent, []);
    }
    staggerGroups.get(parent).push(el);
  });

  staggerGroups.forEach((children) => {
    if (children.length > 1) {
      children.forEach((child, index) => {
        // Only stagger grids (more than 2 items)
        if (children.length >= 3) {
          child.style.transitionDelay = `${index * 65}ms`;
        }
      });
    }
  });

  animatedElements.forEach((el) => observer.observe(el));
}

// ── Navbar Scroll Behavior ───────────────────────────────────
const navbar = document.querySelector('.navbar');

if (navbar) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

// Add navbar scrolled styles
const navbarStyle = document.createElement('style');
navbarStyle.textContent = `
  .navbar--scrolled {
    box-shadow: 0 4px 24px rgba(10, 22, 40, 0.5);
  }
`;
document.head.appendChild(navbarStyle);

// ── Phone Number Click Tracking (console log for dev) ────────
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Phone call initiated:', link.href);
    // In production: replace with analytics event, e.g.:
    // gtag('event', 'phone_call', { phone: link.href });
  });
});

// ── Smooth hash navigation ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  });
});