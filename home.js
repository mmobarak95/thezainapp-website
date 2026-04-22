(() => {
  'use strict';

  // ── Device-aware store CTAs ───────────────────────────────────
  // On iOS/Android, top-nav + hero + sticky buttons point straight at the
  // matching store and swap in the matching icon. On desktop we keep the
  // Apple mark and the in-page anchor to the download section (which still
  // shows both stores).
  const APP_STORE_URL = 'https://apps.apple.com/app/id6757399804';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.zainapp';
  const APPLE_SVG = '<path d="M11.5 8.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.5-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.5 1.3-2.6 0 0-2.5-.9-2.6-3.4zM9.2 1.6c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z"/>';
  const PLAY_SVG = '<path d="M3.6.6c-.3.3-.5.8-.5 1.3v18.2c0 .6.2 1 .5 1.3l10.2-10.4L3.6.6zm11.4 11.6l2.6-1.5c.9-.5.9-1.3 0-1.8l-2.3-1.3-2.8 2.8 2.5 1.8zm-2-3.3L5.3 1.2 13.5 6l-.5 2.9zm-.5 2.9L5.3 19.6 13 13.5l-.5-2.7z"/>';
  const PLAY_VIEWBOX = '0 0 20 22';

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
  const isAndroid = /Android/i.test(ua);

  if (isIOS || isAndroid) {
    const url = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;
    document.querySelectorAll('.js-store-cta').forEach((a) => {
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    if (isAndroid) {
      document.querySelectorAll('.js-store-icon').forEach((svg) => {
        svg.setAttribute('viewBox', PLAY_VIEWBOX);
        svg.innerHTML = PLAY_SVG;
      });
    }
  }

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
