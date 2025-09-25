// --- GSAP TextPlugin for Typing Effect ---
// Load TextPlugin if not already loaded
if (!gsap.plugins.TextPlugin) {
  gsap.registerPlugin(window.TextPlugin);
}

const button = document.querySelector(".send-button");
const form = document.querySelector("#contactForm");
button.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  Swal.fire({
    icon: "success",
    title: '<span style="color:green">Message Sent!</span>',
    html: '<span style="color:#28a745">Thank you for your message!</span>',
    showConfirmButton: false,
    timer: 1500,
  });
  form.reset(); // Reset the form fields
});

// ...existing code...
// Smooth scroll for nav links
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.hash) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({ behavior: "smooth" });
      document.querySelector(".navbar-collapse").classList.remove("show");
    }
  });
});

// Active link switching
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 80;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (
      section &&
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Animated hero name/subtitle: realistic right-to-left removal and typing
const heroName = document.getElementById("hero-name");
const heroSubtitle = document.getElementById("hero-subtitle");
const nameText = "Jawad Ahmad  ";
const subtitleText = "Full-Stacked Developer & Learner";

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
  heroName.textContent = "";
  heroSubtitle.textContent = "";
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

// --- Project Filter Buttons (Restored) ---
const filterBtns = document.querySelectorAll(".project-filter-btn");
const projectItems = document.querySelectorAll(".project-item");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const filter = this.getAttribute("data-filter").trim().toLowerCase();
    projectItems.forEach((item) => {
      const type = item.getAttribute("data-type").trim().toLowerCase();
      if (filter === "all" || type === filter) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// --- GSAP Typing Effect for Header Text (Looping) ---

// --- Theme Toggle ---
const themeToggleBtn = document.getElementById("theme-toggle");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    // Change icon
    const icon = themeToggleBtn.querySelector("i");
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

// =======================
// GSAP + ScrollTrigger Setup
// =======================
gsap.registerPlugin(ScrollTrigger);

// Navbar animation on load
gsap.from("#navbar", {
  y: -150,
  opacity: 0,
  duration: 1.6,
  ease: "power3.out",
});

// Hero Section animations
gsap.from(".scroll-left", {
  x: -100,
  opacity: 0,
  duration: 1.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".scroll-left",
    start: "top 80%",
    toggleActions: "restart reverse restart reverse",
  },
});

gsap.from(".scroll-right", {
  x: 100,
  opacity: 0,
  duration: 1.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".scroll-right",
    start: "top 80%",
    toggleActions: "restart reverse restart reverse",
  },
});

// About section
gsap.from("#about img", {
  x: -100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "restart reverse restart reverse",
  },
});

gsap.from("#about h3, #about p, #about ul", {
  x: 100,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "restart reverse restart reverse",
  },
});

// Projects cards
gsap.from(".project-card", {
  y: 50,
  opacity: 0,
  rotationY: 180,
  scale: 0.8,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#projects",
    start: "top 80%",
    toggleActions: "restart reverse restart reverse",
  },
});
//Skills bar fill animation
gsap.fromTo(
  ".skill-bar-fill",
  { width: "0%" },
  {
    width: (i, el) => el.dataset.width + "%",
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#skills",
      start: "top 70%",
      toggleActions: "restart reverse restart reverse",
    },
  }
);

// // Services cards
// gsap.from(".service-card", {
//   y: 150,
//   opacity: 0,
//   duration: 1.7,
//   // stagger: 0.3,
//   ease: "power3.out",
//   scrollTrigger: {
//     trigger: "#services",
//     start: "top 75%",
//     markers: true,
//     toggleActions: "restart reverse restart reverse"
//   },
// });
gsap.from(".service-card", {
  y: 100, // neeche se aaye
  opacity: 0, // fade in
  rotationY: 90, // spin (3D flip from side)
  transformOrigin: "center center", // smooth flip
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".service-card",
    start: "top 70%",
    end: "bottom top",
    toggleActions: "restart reverse restart reverse",
  },
});

// Testimonials
gsap.from(".testimonial", {
  x: -80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#testimonials",
    start: "top 85%",
    toggleActions: "restart reverse restart reverse",
  },
});

// Contact form
gsap.from("#contact form", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
    toggleActions: "restart reverse restart reverse",
  },
});
