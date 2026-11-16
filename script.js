
// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close mobile menu after clicking a navigation link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Exam dropdown
const examMenu = document.querySelector('.exam-menu');
const examTrigger = document.querySelector('.exam-trigger');

examTrigger.addEventListener('click', () => {
  const open = examMenu.classList.toggle('open');
  examTrigger.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', event => {
  if (!examMenu.contains(event.target)) {
    examMenu.classList.remove('open');
    examTrigger.setAttribute('aria-expanded', 'false');
  }
});

// Hindi / English language switch
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = localStorage.getItem('trustLanguage') || 'hi';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll('[data-hi][data-en]').forEach(element => {
    element.innerHTML = element.getAttribute(`data-${language}`);
  });

  languageToggle.textContent = language === 'hi' ? 'English' : 'हिंदी';

  localStorage.setItem('trustLanguage', language);
}

languageToggle.addEventListener('click', () => {
  setLanguage(currentLanguage === 'hi' ? 'en' : 'hi');
});

setLanguage(currentLanguage);

// Main banner automatic slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.slider-dot');

let heroIndex = 0;
let heroTimer;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  heroIndex = index;
}

function nextHeroSlide() {
  const next = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(next);
}

function startHeroSlider() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 4500);
}

heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showHeroSlide(index);
    startHeroSlider();
  });
});

startHeroSlider();

// About section automatic image slideshow
const aboutSlides = document.querySelectorAll('.about-slide');
const aboutDots = document.querySelectorAll('.about-dot');

let aboutIndex = 0;

function showAboutSlide(index) {
  aboutSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  aboutDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  aboutIndex = index;
}

setInterval(() => {
  const next = (aboutIndex + 1) % aboutSlides.length;
  showAboutSlide(next);
}, 4000);
