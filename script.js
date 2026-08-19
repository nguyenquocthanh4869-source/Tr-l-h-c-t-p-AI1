// ================================
// MOBILE MENU
// ================================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  });
}

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuBtn.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
  });
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (navLinks && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
    const icon = menuBtn.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// ================================
// HEADER SCROLL EFFECT
// ================================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 50
    ? "0 10px 30px rgba(0,0,0,.14)"
    : "0 2px 20px rgba(0,0,0,.07)";
});

// ================================
// ACTIVE NAVIGATION
// ================================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 160) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================================
// SCROLL REVEAL
// ================================
const revealElements = document.querySelectorAll(
  ".book-card, .service, .gallery-item, .stat, .contact-info, .contact-form-wrap"
);

function revealOnScroll() {
  revealElements.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      setTimeout(() => el.classList.add("show"), i % 4 * 80);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ================================
// COUNTER ANIMATION
// ================================
const counters = document.querySelectorAll(".stat h2");
let counterStarted = false;

function startCounter() {
  if (counterStarted) return;
  const stats = document.querySelector(".stats");
  if (!stats) return;
  if (stats.getBoundingClientRect().top < window.innerHeight - 100) {
    counterStarted = true;
    counters.forEach(counter => {
      const original = counter.innerText;
      let target = parseInt(original.replace(/\D/g, ""));
      let count = 0;
      const speed = Math.max(target / 80, 1);
      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count) + (original.includes("+") ? "+" : "");
          requestAnimationFrame(update);
        } else {
          counter.innerText = original;
        }
      };
      update();
    });
  }
}

window.addEventListener("scroll", startCounter);
startCounter();

// ================================
// SEARCH
// ================================
const searchBtn = document.querySelector(".search-box button");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const input = document.querySelector(".search-box input");
    const value = input.value.trim();
    if (!value) {
      input.style.borderColor = "#e74c3c";
      input.focus();
      return;
    }
    alert("Searching for: " + value + "\n\nFrontend demo only.");
    input.style.borderColor = "";
  });

  document.querySelector(".search-box input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}

// ================================
// CONTACT FORM
// ================================
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        valid = false;
        input.style.borderColor = "#e74c3c";
        input.style.boxShadow = "0 0 0 3px rgba(231,76,60,0.1)";
      } else {
        input.style.borderColor = "#22c55e";
        input.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)";
      }
    });

    if (valid) {
      const btn = form.querySelector(".btn-submit");
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
      setTimeout(() => {
        form.reset();
        inputs.forEach(input => { input.style.borderColor = ""; input.style.boxShadow = ""; });
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = "";
      }, 3000);
    }
  });

  form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    });
  });
}

// ================================
// SCROLL TO TOP BUTTON
// ================================
const topButton = document.createElement("button");
topButton.innerHTML = "↑";
topButton.className = "top-btn";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
  topButton.classList.toggle("show", window.scrollY > 400);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================================
// HERO FADE-IN
// ================================
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.cssText = "opacity:0;transform:translateY(40px);transition:all 1s ease";
    setTimeout(() => {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 300);
  }
});

// ================================
// CURRENT YEAR
// ================================
const copyright = document.querySelector(".copyright");
if (copyright) {
  copyright.innerHTML = `© ${new Date().getFullYear()} Xavier College Library. All Rights Reserved.`;
}
