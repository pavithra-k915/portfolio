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

})();
