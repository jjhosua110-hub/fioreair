/**
 * FioreAir — Client-side JavaScript
 * Handles mobile menu toggle and other interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('[data-toggle="mobile-menu"]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('nav__list--open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) {
        menu.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
