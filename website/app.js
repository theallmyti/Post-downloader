const reveals = document.querySelectorAll('.reveal');
const faqButtons = document.querySelectorAll('[data-faq]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -60px 0px',
  }
);

reveals.forEach((el) => observer.observe(el));

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('strong');
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer.open').forEach((panel) => {
      if (panel !== answer) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        const prevButton = panel.previousElementSibling;
        const prevIcon = prevButton?.querySelector('strong');
        if (prevIcon) prevIcon.textContent = '+';
        if (prevButton) prevButton.setAttribute('aria-expanded', 'false');
      }
    });

    answer.classList.toggle('open', !isOpen);
    answer.setAttribute('aria-hidden', String(isOpen));
    icon.textContent = isOpen ? '+' : '−';
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});
