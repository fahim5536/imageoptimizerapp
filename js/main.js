import { initNavbar } from './navbar.js';
import { initAnimations } from './animations.js';

function initCursorGlow() {
  if (matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('pointermove', event => {
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-ready');
  initNavbar();
  initAnimations();
  initCursorGlow();
});
