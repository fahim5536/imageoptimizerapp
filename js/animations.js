export function initAnimations() {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
    revealObserver.observe(element);
  });
  document.querySelectorAll('[data-count]').forEach(counter => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      let current = 0;
      const tick = () => { current = Math.min(target, current + Math.max(1, Math.ceil(target / 24))); counter.textContent = `${current}${suffix}`; if (current < target) requestAnimationFrame(tick); };
      tick(); observer.disconnect();
    }), { threshold: .7 });
    observer.observe(counter);
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.hash);
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }));
}
