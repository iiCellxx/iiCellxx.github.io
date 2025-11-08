// Create Star Wars Starfield
function createStarfield() {
  const starfield = document.getElementById('starfield');
  const starCount = 200;
  
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
  }
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

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 700);
  }
});

// CV Password Protection
const CV_PASSWORD = "cralmario07";
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
});

// Submit password
submitBtn.addEventListener('click', () => {
  const input = passwordInput.value.trim();
  
  if (input === CV_PASSWORD) {
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
passwordInput.addEventListener('keypress', (e) => {
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