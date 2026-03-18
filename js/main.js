/*!
 * Dr. Mark Luckie — Personal Brand Website
 * Main JavaScript — v2.0 — Full Upgrade
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     EMAILJS INIT
     Replace 'YOUR_PUBLIC_KEY' with real key from emailjs.com
  ───────────────────────────────────────── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY' });
  }

  /* Auto-update footer year */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─────────────────────────────────────────
     PAGE LOADER
  ───────────────────────────────────────── */
  const loader = document.getElementById('pageLoader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.style.overflow = '';
    }, 800);
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => setTimeout(hideLoader, 1200));
  setTimeout(hideLoader, 4000);


  /* ─────────────────────────────────────────
     CUSTOM CURSOR — disabled (using normal browser cursor)
  ───────────────────────────────────────── */
  // Custom cursor removed per user request


  /* ─────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');

  function handleScroll() {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight - window.innerHeight;

    navbar && (scrollY > 60 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'));

    if (progressBar) {
      progressBar.style.transform = `scaleX(${Math.min(scrollY / docH, 1)})`;
    }

    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('visible', scrollY > 600);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ─────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }


  /* ─────────────────────────────────────────
     ACTIVE NAV SECTION
  ───────────────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active-section', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });


  /* ─────────────────────────────────────────
     HERO BACKGROUND SLIDER
  ───────────────────────────────────────── */
  const slides    = document.querySelectorAll('.hero-slide');
  const heroDots  = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    if (heroDots[currentSlide]) heroDots[currentSlide].classList.remove('active');
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
  }

  // Click dots to jump
  heroDots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  if (slides.length > 1) {
    setInterval(() => goToSlide(currentSlide + 1), 6500);
  }


  /* ─────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('revealed'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────
     COUNTER ANIMATION
  ───────────────────────────────────────── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target);
        const dur    = 1800;
        const step   = target / (dur / 16);
        let cur = 0;
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = Math.floor(cur).toLocaleString();
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-target]').forEach(c => counterObserver.observe(c));


  /* ─────────────────────────────────────────
     TESTIMONIALS CAROUSEL (supports any count)
  ───────────────────────────────────────── */
  const testimonials = Array.from(document.querySelectorAll('.testimonial:not(.testimonial-nav)'));
  const tDots        = document.querySelectorAll('.t-dot');
  const tPrev        = document.querySelector('.t-prev');
  const tNext        = document.querySelector('.t-next');
  let currentT = 0, tAutoplay;

  function showTestimonial(idx) {
    testimonials.forEach(t => t.classList.remove('active'));
    tDots.forEach(d => d.classList.remove('active'));
    currentT = ((idx % testimonials.length) + testimonials.length) % testimonials.length;
    if (testimonials[currentT]) testimonials[currentT].classList.add('active');
    if (tDots[currentT])        tDots[currentT].classList.add('active');
  }

  const resetAutoplay = () => { clearInterval(tAutoplay); tAutoplay = setInterval(() => showTestimonial(currentT + 1), 5500); };

  if (tPrev) tPrev.addEventListener('click', () => { showTestimonial(currentT - 1); resetAutoplay(); });
  if (tNext) tNext.addEventListener('click', () => { showTestimonial(currentT + 1); resetAutoplay(); });
  tDots.forEach((d, i) => d.addEventListener('click', () => { showTestimonial(i); resetAutoplay(); }));

  if (testimonials.length) resetAutoplay();

  // Swipe support
  const tCarousel = document.querySelector('.testimonials-carousel');
  if (tCarousel) {
    let tStartX = 0;
    tCarousel.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; }, { passive: true });
    tCarousel.addEventListener('touchend',   e => {
      const diff = tStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { showTestimonial(diff > 0 ? currentT + 1 : currentT - 1); resetAutoplay(); }
    });
  }


  /* ─────────────────────────────────────────
     GALLERY LIGHTBOX
  ───────────────────────────────────────── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox)      lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


  /* ─────────────────────────────────────────
     CONTACT FORM — EmailJS + Table API
  ───────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      const fname    = document.getElementById('fname')?.value || '';
      const lname    = document.getElementById('lname')?.value || '';
      const email    = document.getElementById('email')?.value || '';
      const phone    = document.getElementById('phone')?.value || '';
      const interest = document.getElementById('interest')?.value || '';
      const message  = document.getElementById('message')?.value || '';
      const fullName = `${fname} ${lname}`.trim();

      // 1. Save to Table API
      try {
        await fetch('tables/contact_submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ first_name: fname, last_name: lname, email, phone, interest, message, status: 'new' })
        });
      } catch (err) { console.warn('Table save error:', err); }

      // 2. Send via EmailJS (replace IDs with real values)
      try {
        if (typeof emailjs !== 'undefined') {
          await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name:    fullName,
            from_email:   email,
            phone:        phone,
            interest:     interest,
            message:      message,
            to_name:      'Dr. Mark Luckie',
            reply_to:     email
          });
        }
      } catch (err) { console.warn('EmailJS error:', err); }

      // 3. Show success
      if (submitBtn) submitBtn.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
    });
  }

  /* Newsletter */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailVal = newsletterForm.querySelector('input')?.value;
      const btn      = newsletterForm.querySelector('button');

      try {
        await fetch('tables/newsletter_subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal })
        });
      } catch (err) { /* silent */ }

      if (btn) { btn.innerHTML = '<i class="fas fa-check"></i>'; btn.style.background = '#3d8b3d'; }
      if (newsletterForm.querySelector('input')) newsletterForm.querySelector('input').value = '';
      setTimeout(() => {
        if (btn) { btn.innerHTML = '<i class="fas fa-arrow-right"></i>'; btn.style.background = ''; }
      }, 3000);
    });
  }


  /* ─────────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href   = anchor.getAttribute('href');
      const target = href && href !== '#' ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────
     PARALLAX
  ───────────────────────────────────────── */
  const parallaxEls = document.querySelectorAll('.hero-bg-slider, .philosophy-bg, .contact-bg, .booking-bg');

  window.addEventListener('scroll', () => {
    parallaxEls.forEach(el => {
      const parent = el.closest('section') || el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      el.style.transform = `translateY(${rect.top * 0.22}px)`;
    });
  }, { passive: true });


  /* ─────────────────────────────────────────
     MAGNETIC BUTTONS
  ───────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top  - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
  }


  /* ─────────────────────────────────────────
     STAGGER CHILDREN on entry
  ───────────────────────────────────────── */
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      Array.from(entry.target.children).forEach((child, i) => {
        child.style.opacity    = '0';
        child.style.transform  = 'translateY(22px)';
        setTimeout(() => {
          child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          child.style.opacity    = '1';
          child.style.transform  = 'translateY(0)';
        }, 80 + i * 80);
      });
      staggerObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.philosophy-pillars, .books-grid, .about-tags, .services-grid, .press-logos, .booking-options').forEach(s => staggerObserver.observe(s));


  /* ─────────────────────────────────────────
     LOGO HOVER
  ───────────────────────────────────────── */
  document.querySelectorAll('.logo-name').forEach(el => {
    el.addEventListener('mouseenter', () => { el.style.color = 'var(--gold)'; el.style.transition = 'color 0.3s ease'; });
    el.addEventListener('mouseleave', () => { el.style.color = ''; });
  });


  /* ─────────────────────────────────────────
     SERVICE CARD — tilt on hover (subtle)
  ───────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.service-card, .booking-option, .blog-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const x  = (e.clientX - r.left) / r.width  - 0.5;
        const y  = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }


  /* ─────────────────────────────────────────
     INSTAGRAM SCROLL FEED — infinite loop
  ───────────────────────────────────────── */
  const igRow = document.getElementById('igRow1');
  if (igRow) {
    // Duplicate children for seamless infinite scroll
    const cards = Array.from(igRow.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      igRow.appendChild(clone);
    });

    // Pause on hover (already handled by CSS)
    // Open Instagram on card click
    igRow.querySelectorAll('.ig-post-card').forEach(card => {
      card.addEventListener('click', () => {
        window.open('https://www.instagram.com/thedrluckie/', '_blank', 'noopener');
      });
    });

    // Behold.so live feed — show if configured
    const beholdEl = document.querySelector('behold-widget');
    if (beholdEl && beholdEl.getAttribute('feed-id') !== 'YOUR_FEED_ID') {
      document.getElementById('behold-feed-placeholder')?.style.removeProperty('display');
    }
  }


  console.log(
    '%c DR. MARK LUCKIE %c The Performance Doctor — More Energy. Sharper Focus. Higher Output. Faster Recovery.',
    'background:#C9A84C;color:#000;padding:6px 12px;font-weight:bold;font-family:serif;font-size:14px;',
    'color:#C9A84C;padding:6px 4px;font-size:12px;'
  );

})();
