/* ─────────────────────────────────────────────────────────────
   Zain · thezainapp.com
   Draws the two decorative motifs (the gold terrain and the dot
   grids), reveals sections on scroll, and plays the phone clips
   only while they are on screen. Everything here adds; the page
   reads without any of it.
   ───────────────────────────────────────────────────────────── */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 700px)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  const SVG = 'http://www.w3.org/2000/svg';
  const el = (name, attrs) => {
    const node = document.createElementNS(SVG, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  };

  // ── the twelve weeks ────────────────────────────────────────
  // The same two patterns the live deck uses. A row is a week,
  // read left to right in every language; null is a day that has
  // not happened yet.
  const BEFORE = {
    1: [1, 1, 1, 1, 1, 1, 1],
    2: [1, 1, 1, 0, 1, 1, 1],
    3: [1, 1, 0, 0, 0, 0, 0],
    4: [1, 0, 0, 0, 0, 0, 0],
  };
  const NOW = {
    1: [1, 1, 1, 1, 1, 1, 1],
    2: [1, 1, 1, 1, 0, 1, 1],
    3: [1, 1, 0, 0, 0, 0, 0],
    4: [1, 0, 1, 1, 0, 1, 1],
    5: [1, 1, 1, 0, 1, 1, 1],
    6: [1, 1, 1, 1, 1, 1, 1],
    7: [1, 1, 0, 1, 1, 0, 1],
    8: [1, 1, 1, 1, 0, 1, 1],
    9: [1, 1, 1, null, null, null, null],
  };

  // The weeks read left to right in every language; only the word changes.
  const WEEK_WORD = { en: 'wk', ar: '\u0623\u0633\u0628\u0648\u0639', tr: 'hafta' };
  const weekWord = () => WEEK_WORD[document.documentElement.lang] || WEEK_WORD.en;

  function drawGrid(svg) {
    const kept = svg.dataset.grid === 'now' ? NOW : BEFORE;
    // The full grid needs room for a 16px dot in every one of its 84 cells.
    // Below that it is drawn compact, so the dots stay dots and the week
    // numbers stay readable rather than shrinking into a texture.
    const compact = svg.dataset.compact === '1' || window.innerWidth < 720;
    const dot = compact ? 10 : 16;
    const sp = compact ? 22 : 32;
    const colw = compact ? 24 : 115;
    const ahead = svg.dataset.grid === 'now' ? 10 : 13;
    const step = compact ? 0.035 : 0.05;
    const start = 0.15;
    const r = dot / 2;
    const pad = compact ? 3 : 0;
    const labelY = 7 * sp + (compact ? 18 : 26);
    const width = compact ? 11 * colw + dot + pad * 2 : 12 * colw - 20;
    const height = labelY + 6;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMinYMid meet');
    svg.style.aspectRatio = `${width} / ${height}`;

    let k = 0;
    for (let wk = 0; wk < 12; wk++) {
      const row = kept[wk + 1] || [0, 0, 0, 0, 0, 0, 0];
      const left = compact ? wk * colw + pad : wk * colw + (colw - 20 - dot) / 2;
      const cx = left + r;
      for (let d = 0; d < 7; d++) {
        const v = row[d];
        if (v === null || v === undefined) continue;
        const cy = d * sp + r;
        if (v) {
          const c = el('circle', { cx, cy, r, class: 'on' });
          c.style.setProperty('--d', `${(start + k * step).toFixed(2)}s`);
          svg.appendChild(c);
          k++;
        } else {
          svg.appendChild(el('circle', { cx, cy, r, class: wk + 1 >= ahead ? 'faint' : '' }));
        }
      }
      const t = el('text', {
        x: compact ? cx : left + r,
        y: labelY,
        'font-size': compact ? 9 : 11,
      });
      t.textContent = compact ? String(wk + 1) : `${weekWord()} ${wk + 1}`;
      svg.appendChild(t);
    }
  }

  // ── the gold terrain, advancing down the page ───────────────
  function drawTerrain(svg) {
    const W = 1360, AMP = 13, H = 40;
    const p = parseFloat(svg.dataset.terrain || '0');
    const y = (t) => 20 - AMP * (0.55 * Math.sin(t * 5.6) + 0.45 * Math.sin(t * 2.1 + 0.7));
    const pts = [];
    for (let i = 0; i <= W; i += 8) pts.push([i, y(i / W)]);

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');

    const walked = pts.filter((q) => q[0] <= W * p).map((q) => q.join(',')).join(' ');
    const aheadPts = pts.filter((q) => q[0] >= W * p).map((q) => q.join(',')).join(' ');
    if (aheadPts) svg.appendChild(el('polyline', { points: aheadPts, fill: 'none', stroke: '#B8985A', 'stroke-opacity': '.28', 'stroke-width': '1' }));
    if (walked) svg.appendChild(el('polyline', { points: walked, fill: 'none', stroke: '#B8985A', 'stroke-width': '1.4' }));

    [0.22, 0.46, 0.72, 0.94].forEach((m) => {
      const mx = W * m, my = y(m);
      svg.appendChild(el('path', {
        d: `M${mx} ${my - 4.6}L${mx + 4.6} ${my}L${mx} ${my + 4.6}L${mx - 4.6} ${my}Z`,
        fill: m <= p ? '#B8985A' : 'none',
        stroke: '#B8985A',
        'stroke-width': '1',
      }));
    });
  }

  const grids = [...document.querySelectorAll('svg.dots')];
  grids.forEach(drawGrid);
  document.querySelectorAll('svg.terrain').forEach(drawTerrain);

  // i18n.js announces every switch; the grids carry a word, so they redraw.
  document.addEventListener('zain:lang', () => {
    grids.forEach((svg) => {
      const wasIn = svg.classList.contains('in');
      svg.replaceChildren();
      drawGrid(svg);
      if (wasIn) svg.classList.add('in');
    });
  });

  // ── reveals, and the grids filling on first view ────────────
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      reveal.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.will, svg.dots, [data-stage]').forEach((node) => reveal.observe(node));

  // Stagger the phones in the foundation row and the three columns.
  document.querySelectorAll('.found__col, .why__col').forEach((node, i) => {
    node.style.transitionDelay = `${Math.min((i % 4) * 90, 360)}ms`;
  });

  // ── phone clips ─────────────────────────────────────────────
  // Posters carry every clip on their own, so nothing is fetched
  // until a phone is near the viewport, and nothing at all when
  // motion is reduced or the connection is metered.
  const videos = [...document.querySelectorAll('video[data-clip]')];

  function load(v) {
    if (v.dataset.loaded) return;
    v.dataset.loaded = '1';
    const name = v.dataset.clip;
    v.src = `assets/clips/${name}${small ? '-m' : ''}.mp4`;
    v.load();
  }

  function play(v) {
    try {
      v.muted = true;
      v.defaultMuted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      if (v.readyState < 3) {
        v.addEventListener('loadeddata', () => {
          v.muted = true;
          const q = v.play();
          if (q && q.catch) q.catch(() => {});
        }, { once: true });
      }
    } catch (_) { /* the poster stands in */ }
  }

  if (!reduced && !saveData && videos.length) {
    const near = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) load(e.target); });
    }, { rootMargin: '400px 0px' });

    const onScreen = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { load(e.target); play(e.target); }
        else if (!e.target.paused) e.target.pause();
      });
    }, { threshold: 0.25 });

    videos.forEach((v) => { near.observe(v); onScreen.observe(v); });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) videos.forEach((v) => { if (!v.paused) v.pause(); });
    });
  }

  // ── anchors, offset for the sticky masthead ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  // ── the letter ──────────────────────────────────────────────
  const form = document.getElementById('letterForm');
  const ok = document.getElementById('letterOk');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        form.email.focus();
        return;
      }
      const btn = form.querySelector('button');
      const label = btn.textContent;
      btn.disabled = true;

      try {
        await fetch('https://zain1-linux.azurewebsites.net/api/Waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'thezainapp.com' }),
        });
      } catch (_) {
        /* a blip on our side is not the subscriber's problem */
      }

      form.hidden = true;
      if (ok) ok.hidden = false;
      btn.disabled = false;
      btn.textContent = label;
    });
  }

  // ── a quiet note in the console ─────────────────────────────
  try {
    console.log('%cZain', 'font-family: Georgia, serif; font-size: 20px; color: #0A3F42;');
    console.log(
      '%cCurious how this was built, or about working on it?\n%chello@thezainapp.com',
      'color: #4E6A6C; font-size: 12px;',
      'color: #6E1E2B; font-size: 13px; font-weight: bold;'
    );
  } catch (_) { /* noop */ }
})();
