document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Exam dropdown
  const examMenu = document.querySelector(".exam-menu");
  const examTrigger = document.querySelector(".exam-trigger");

  if (examMenu && examTrigger) {
    examTrigger.addEventListener("click", event => {
      event.stopPropagation();
      const open = examMenu.classList.toggle("open");
      examTrigger.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", event => {
      if (!examMenu.contains(event.target)) {
        examMenu.classList.remove("open");
        examTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hindi / English language switch
  const languageToggle = document.getElementById("languageToggle");
  let currentLanguage = localStorage.getItem("trustLanguage") || "hi";

  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-hi][data-en]").forEach(element => {
      element.innerHTML = element.getAttribute(`data-${language}`);
    });

    if (languageToggle) {
      languageToggle.textContent = language === "hi" ? "English" : "हिंदी";
    }

    localStorage.setItem("trustLanguage", language);
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(currentLanguage === "hi" ? "en" : "hi");
    });
  }
  setLanguage(currentLanguage);

  // Hero slider
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".slider-dot");
  let heroIndex = 0;
  let heroTimer;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === heroIndex);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === heroIndex);
    });
  }

  function startHeroSlider() {
    if (heroSlides.length < 2) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(() => showHeroSlide(heroIndex + 1), 4500);
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroSlider();
    });
  });
  startHeroSlider();

  // About image slider
  const aboutSlides = document.querySelectorAll(".about-slide");
  const aboutDots = document.querySelectorAll(".about-dot");
  let aboutIndex = 0;

  function showAboutSlide(index) {
    if (!aboutSlides.length) return;
    aboutIndex = (index + aboutSlides.length) % aboutSlides.length;

    aboutSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === aboutIndex);
    });

    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === aboutIndex);
    });
  }

  if (aboutSlides.length > 1) {
    setInterval(() => showAboutSlide(aboutIndex + 1), 4000);
  }

  // Back to top button
  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 350);
    }
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Active navigation link while scrolling
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => observer.observe(section));
  }
});
