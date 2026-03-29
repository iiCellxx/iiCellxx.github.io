// Create Star Wars Starfield
let stars = [];
let mouseParallaxTick = false;

function createStarfield() {
  const starfield = document.getElementById('starfield');
  const starCount = window.innerWidth < 768 ? 80 : 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;
    
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = left + '%';
    star.style.top = top + '%';
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = delay + 's';
    
    starfield.appendChild(star);
    stars.push({ el: star, x: left, y: top });
  }
}

// Interactive Starfield Parallax
window.addEventListener('mousemove', (e) => {
  if (!mouseParallaxTick) {
    window.requestAnimationFrame(() => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      stars.forEach(star => {
        star.el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      mouseParallaxTick = false;
    });
    mouseParallaxTick = true;
  }
});

// Text Scramble Effect
function scrambleText(element) {
  const originalText = element.innerText;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+';
  let iteration = 0;
  
  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) return originalText[index];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
    
    if (iteration >= originalText.length) {
      clearInterval(interval);
      element.innerText = originalText;
    }
    iteration += 1 / 3;
  }, 30);
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Scroll Animation for Sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger scramble on h2 inside section
      const h2 = entry.target.querySelector('h2');
      if (h2 && !h2.dataset.scrambled) {
        scrambleText(h2);
        h2.dataset.scrambled = "true";
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize starfield
createStarfield();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollPx = document.documentElement.scrollTop;
  const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollPx / winHeightPx) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero-content');
if (hero) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return; // Disable parallax on mobile
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 700);
  });
}

// CV Password Protection
// SHA-256 hash of "cralmario07"
const CV_HASH = "5e33d0628e93297a7a51c727038e11a3e5c94d0c7540670868f0290196881c62";

async function hashPassword(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

let failCount = 0;

const cvBtn = document.getElementById('view-cv-btn');
const modal = document.getElementById('cv-modal');
const closeBtn = document.querySelector('.close');
const submitBtn = document.getElementById('submit-password');
const passwordInput = document.getElementById('cv-password');
const errorMsg = document.getElementById('error-msg');
const contactMsg = document.getElementById('contact-owner-msg');

// Open modal
cvBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  passwordInput.focus();
  passwordInput.value = '';
  errorMsg.textContent = '';
  contactMsg.style.display = 'none';
  failCount = 0; // Reset on open
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  failCount = 0;
  submitBtn.disabled = false;
  submitBtn.style.opacity = '1';
  submitBtn.textContent = 'Unlock CV';
});

// Submit password
submitBtn.addEventListener('click', async () => {
  const input = passwordInput.value.trim();
  const hashedInput = await hashPassword(input);
  
  if (hashedInput === CV_HASH) {
    window.open('assets/resume.pdf', '_blank');
    modal.style.display = 'none';
    failCount = 0;
  } else {
    failCount++;
    errorMsg.textContent = `Incorrect password. Attempt ${failCount}/3`;
    passwordInput.focus();
    
    if (failCount >= 3) {
      errorMsg.textContent = '';
      contactMsg.style.display = 'block';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.textContent = 'Locked';
    }
  }
});

// Enter key
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitBtn.click();
  }
});

// Close on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    failCount = 0;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.textContent = 'Unlock CV';
  }
});

// Certifications Slider
const certContainer = document.querySelector('.certificates-container');
const certCards = document.querySelectorAll('.cert-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const totalCards = certCards.length;

// Create dots
certCards.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
  const card = certCards[0];
  const cardWidth = card.offsetWidth;
  const gap = parseInt(window.getComputedStyle(certContainer).gap) || 0;
  const offset = -currentIndex * (cardWidth + gap);
  certContainer.style.transform = `translateX(${offset}px)`;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateSlider();
});

// Recalculate slider on resize to prevent alignment issues
window.addEventListener('resize', () => {
  updateSlider();
});

// Touch Support for Slider
let touchStartX = 0;
let touchEndX = 0;

certContainer.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

certContainer.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) nextBtn.click();
  if (touchEndX - touchStartX > 50) prevBtn.click();
}, { passive: true });

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Auto-play (optional)
// setInterval(() => {
//   nextBtn.click();
// }, 5000);