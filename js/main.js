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