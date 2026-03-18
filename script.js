/* ============================================================
   PAVITHRA KALAIARASAN — PORTFOLIO JAVASCRIPT
   Navigation · Scroll Reveal · Skill Bars · Form Handling
   ============================================================ */

(function () {
  'use strict';

  // ── DOM References ──
  const header     = document.getElementById('site-header');
  const navToggle  = document.getElementById('nav-toggle');
  const navLinks   = document.getElementById('nav-links');
  const allNavA    = navLinks.querySelectorAll('a');
  const sections   = document.querySelectorAll('section[id]');
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // ============================================================
  // 1. HEADER SCROLL STYLING
  // ============================================================
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ============================================================
  // 2. MOBILE NAVIGATION TOGGLE
  // ============================================================
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  allNavA.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ============================================================
  // 3. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
  // ============================================================
  const navObserverOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        allNavA.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

  // ============================================================
  // 4. SCROLL REVEAL ANIMATION
  // ============================================================
  const revealElements = document.querySelectorAll(
    '.about-grid, .about-text p, .highlight-card, ' +
    '.skill-category-card, .project-card, ' +
    '.timeline-item, .contact-info, .contact-form-wrap'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add stagger delay based on sibling index
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) =>
            child.classList.contains('reveal')
          );
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 80}ms`;
        }

        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ============================================================
  // 5. SKILL BAR ANIMATION
  // ============================================================
  const skillLevels = document.querySelectorAll('.skill-level[data-level]');

  skillLevels.forEach((bar) => {
    const level = parseInt(bar.dataset.level, 10) / 100;
    bar.style.setProperty('--level', level);
  });

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate all skill bars within this card
          const card = entry.target;
          const bars = card.querySelectorAll('.skill-level[data-level]');
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.classList.add('animate');
            }, i * 120);
          });
          skillObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  document
    .querySelectorAll('.skill-category-card')
    .forEach((card) => skillObserver.observe(card));

  // ============================================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 7. CONTACT FORM HANDLING
  // ============================================================
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('form-name').value.trim();
      const email   = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending (replace with real backend later)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        Sending...
      `;

      setTimeout(() => {
        showFormStatus('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send Message
        `;
      }, 1500);
    });
  }

  function showFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = 'form-status ' + type;
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================================
  // 8. SPIN ANIMATION FOR LOADING ICON (injected via CSS)
  // ============================================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);

  // ============================================================
  // 9. DIGITAL BACKGROUND PARTICLE SYSTEM
  // ============================================================
  function initDigitalCanvas() {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w, h;
    let particles = [];
    
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };
    
    window.addEventListener('mousemove', function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
      mouse.x = undefined;
      mouse.y = undefined;
    });
    
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    }
    
    window.addEventListener('resize', resize);
    
    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
        if (distance < mouse.radius && mouse.x !== undefined) {
          this.x -= directionX;
          this.y -= directionY;
        }
      }
      
      draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    function init() {
      particles = [];
      let numberOfParticles = (w * h) / 7000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }
    
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;
          if (distance < (w/12) * (h/12)) {
            let opacityValue = 1 - (distance / 15000);
            if (opacityValue > 0) {
              ctx.strokeStyle = 'rgba(59, 130, 246,' + opacityValue * 0.3 + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    }
    
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    init();
    animate();
  }
  
  initDigitalCanvas();

})();
