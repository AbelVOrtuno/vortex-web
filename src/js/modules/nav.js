/**
 * nav.js
 * Two small, independent behaviors for the site header:
 *  - initNavScrollSpy: highlights the nav link of the section in view.
 *  - initMobileMenu: toggles the mobile dropdown menu (the hamburger
 *    button already existed in the markup/CSS but had no behavior).
 */

export function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  });
}

export function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  // Close the menu after tapping a link, so it doesn't stay open
  // when the user is scrolled to the new section.
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });
}
