export function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = [...document.querySelectorAll('.nav-links a')];
  if (!header || !toggle) return;
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  const closeMenu = () => { header.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55%' });
  sections.forEach(section => observer.observe(section));
}
