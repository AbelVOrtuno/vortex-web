import { initVortex } from './modules/vortex.js';
import { initNavScrollSpy, initMobileMenu } from './modules/nav.js';

document.addEventListener('DOMContentLoaded', () => {
  initVortex('vortex-canvas');
  initNavScrollSpy();
  initMobileMenu();
});
