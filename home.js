(() => {
  'use strict';

  // ── Scroll reveal ─────────────────────────────────────────────
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        reveal.unobserve(e.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.will-animate').forEach((el) => reveal.observe(el));

  // Stagger children inside the pillars and letters grids.
  document.querySelectorAll('.pillars__grid .pillar').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
  });
  document.querySelectorAll('.letters__grid .letter').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 100, 400)}ms`;
  });
  document.querySelectorAll('.timeline__entry').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
  });

  // ── Sticky CTA after hero ─────────────────────────────────────
  const sticky = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  if (sticky && hero) {
    const heroSentinel = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          sticky.classList.toggle('is-visible', !e.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    heroSentinel.observe(hero);
  }

  // ── Smooth anchor offset for sticky header ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Waitlist / Dispatch form ──────────────────────────────────
  const form = document.getElementById('waitlistForm');
  const success = document.getElementById('waitlistSuccess');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;

      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      try {
        await fetch('https://zain1-linux.azurewebsites.net/api/Waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'preview-site' }),
        });
      } catch (_) {
        /* show success either way — we don't want to block a subscriber on a blip */
      }

      form.hidden = true;
      if (success) success.hidden = false;
      btn.disabled = false;
      btn.textContent = original;
    });
  }

  // ── Quiet console note ────────────────────────────────────────
  try {
    console.log(
      '%cZain · preview edition',
      'font-family: Georgia, serif; font-size: 20px; color: #0A3F42;'
    );
    console.log(
      '%cCurious about how this was built, or about the role we have open?\n%chello@thezainapp.com',
      'color: #5A7577; font-size: 12px;',
      'color: #6E1E2B; font-size: 13px; font-weight: bold;'
    );
  } catch (_) { /* noop */ }
})();
