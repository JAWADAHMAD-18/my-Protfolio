// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
      document.querySelector('.navbar-collapse').classList.remove('show');
    }
  });
});

// Active link switching
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 80;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Animated hero name/subtitle: realistic right-to-left removal and typing
const heroName = document.getElementById('hero-name');
const heroSubtitle = document.getElementById('hero-subtitle');
const nameText = 'Jawad Ahmad  ';
const subtitleText = 'Frontend Developer & Learner';

// --- HERO ANIMATION STATE ---
let i = 0;
let j = 0;
let heroAnimationRunning = false;
let heroTimeout = null;

function animateHeroTitle() {
  if (heroAnimationRunning) return; // Prevent multiple cycles
  heroAnimationRunning = true;
  i = 0;
  j = 0;
  heroName.textContent = '';
  heroSubtitle.textContent = '';
  heroSubtitle.style.opacity = 0;
  heroName.style.opacity = 1;
  typeHeroname();

  function typeHeroname() {
    if (i < nameText.length) {
      heroName.textContent = nameText.slice(0, i + 1);
      i++;
      heroTimeout = setTimeout(typeHeroname, 100);
    } else {
      heroTimeout = setTimeout(eraseName, 1000); // Hold name for 1s before erasing
    }
  }

  function eraseName() {
    if (i > 0) {
      heroName.textContent = nameText.slice(0, i - 1);
      i--;
      heroTimeout = setTimeout(eraseName, 100);
    } else {
      heroName.style.opacity = 0;
      heroSubtitle.style.opacity = 1;
      j = 0;
      heroTimeout = setTimeout(typeSubtitle, 0); // Immediately start typing subtitle
    }
  }

  function typeSubtitle() {
    if (j < subtitleText.length) {
      heroSubtitle.textContent = subtitleText.slice(0, j + 1);
      j++;
      heroTimeout = setTimeout(typeSubtitle, 50);
    } else {
      heroTimeout = setTimeout(eraseSubtitle, 700); // Hold subtitle for 700ms
    }
  }

  function eraseSubtitle() {
    if (j > 0) {
      heroSubtitle.textContent = subtitleText.slice(0, j - 1);
      j--;
      heroTimeout = setTimeout(eraseSubtitle, 40);
    } else {
      heroSubtitle.style.opacity = 0;
      heroName.style.opacity = 1;
      i = 0;
      heroAnimationRunning = false;
      heroTimeout = setTimeout(animateHeroTitle, 1000); // Restart cycle after 1s
    }
  }
}
setTimeout(animateHeroTitle, 1200);

// --- Only animate home section on load, others on scroll ---
window.addEventListener('DOMContentLoaded', () => {
  // Only home section and hero container animate on load
  document.querySelector('.hero-section .container').classList.add('visible');
  document.querySelector('section#home').classList.add('visible');
  revealOnScroll();
});

// Scroll animations
function revealOnScroll() {
  document.querySelectorAll('section:not(#home), .about-section .row, .projects-row, .skills-bar, .resume-section .container, .services-section .container, .testimonials-section .container, .contact-section .container')
    .forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
}
window.addEventListener('scroll', revealOnScroll);

// Lightbox for project images
const projectCards = document.querySelectorAll('.project-card img');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
projectCards.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    const modal = new bootstrap.Modal(lightboxModal);
    modal.show();
  });
});

// Contact form stub (no reload)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.reset();
  alert('Thank you for your message!');
});

// Animate skill bars when skills section comes into view
function animateSkillBars() {
  const section = document.querySelector('.skills-section');
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!section || !bars.length) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    bars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
    window.removeEventListener('scroll', animateSkillBars);
  }
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);
// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-mode');
  // Change icon
  const icon = themeToggleBtn.querySelector('i');
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});
