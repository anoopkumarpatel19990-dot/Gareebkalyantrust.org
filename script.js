const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const examMenu = document.querySelector('.exam-menu');
const examTrigger = document.querySelector('.exam-trigger');
examTrigger.addEventListener('click', () => {
  const open = examMenu.classList.toggle('open');
  examTrigger.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (event) => {
  if (!examMenu.contains(event.target)) {
    examMenu.classList.remove('open');
    examTrigger.setAttribute('aria-expanded', 'false');
  }
});
