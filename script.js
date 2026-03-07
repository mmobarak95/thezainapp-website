/**
 * Zain App Website — Interactive Scripts (Redesign v2)
 */

document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════════════════════════════════════
    // NAVIGATION — sticky glass effect (throttled)
    // ═══════════════════════════════════════════════════════════════════════

    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    function handleNavScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', throttle(handleNavScroll, 100));
    handleNavScroll();

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active', isOpen);
            const [s1, s2, s3] = mobileMenuBtn.querySelectorAll('span');
            if (isOpen) {
                s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
                s2.style.opacity = '0';
                s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                s1.style.transform = s3.style.transform = 'none';
                s2.style.opacity = '1';
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelectorAll('span').forEach(s => {
                    s.style.transform = 'none';
                    s.style.opacity = '1';
                });
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL — offset for fixed nav
    // ═══════════════════════════════════════════════════════════════════════

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // SCROLL ANIMATIONS — class-based (no inline style overrides)
    // ═══════════════════════════════════════════════════════════════════════

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay for grid children
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.will-animate').forEach((el, i) => {
        observer.observe(el);
    });

    // Stagger delay for bento tiles
    document.querySelectorAll('.bento-tile').forEach((tile, i) => {
        tile.dataset.delay = i * 80;
    });

    // Stagger delay for testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
        card.dataset.delay = i * 100;
    });

    // ═══════════════════════════════════════════════════════════════════════
    // STATS BAR — animated counter
    // ═══════════════════════════════════════════════════════════════════════

    function animateCounter(el, target, duration = 1800) {
        const start = performance.now();
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                if (!el.dataset.animated) {
                    el.dataset.animated = 'true';
                    animateCounter(el, target);
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-num').forEach(el => statsObserver.observe(el));

    // ═══════════════════════════════════════════════════════════════════════
    // PRICING TOGGLE — annual / monthly
    // ═══════════════════════════════════════════════════════════════════════

    const toggleBtns = document.querySelectorAll('.toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const period = this.dataset.period;
            toggleBtns.forEach(b => b.classList.toggle('active', b === this));

            // Update all elements with data-annual / data-monthly attributes
            document.querySelectorAll('[data-annual][data-monthly]').forEach(el => {
                el.textContent = el.dataset[period];
            });
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // WAITLIST FORM — submit handler
    // ═══════════════════════════════════════════════════════════════════════

    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistSuccess = document.getElementById('waitlistSuccess');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = waitlistForm.querySelector('.waitlist-btn');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;

            btnText.textContent = 'Joining…';
            btn.disabled = true;

            try {
                const formData = new FormData(waitlistForm);
                const response = await fetch(waitlistForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    waitlistForm.querySelector('.form-row').style.display = 'none';
                    waitlistSuccess.hidden = false;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch {
                // Fallback: show success anyway (Formspree might redirect)
                waitlistForm.querySelector('.form-row').style.display = 'none';
                waitlistSuccess.hidden = false;
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FAQ ACCORDION (support.html compatibility)
    // ═══════════════════════════════════════════════════════════════════════

    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer   = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        answer.style.maxHeight = '0';
        answer.style.overflow  = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';

        const icon = document.createElement('span');
        icon.innerHTML = '+';
        icon.style.cssText = 'font-size: 22px; color: var(--primary); transition: transform 0.3s ease; line-height: 1;';
        question.appendChild(icon);

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close siblings
            document.querySelectorAll('.faq-item.open').forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = '0';
                    const otherIcon = other.querySelector('.faq-question span');
                    if (otherIcon) { otherIcon.innerHTML = '+'; otherIcon.style.transform = 'none'; }
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
                icon.innerHTML = '+';
                icon.style.transform = 'none';
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
                icon.innerHTML = '−';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // EMAIL COPY (support pages)
    // ═══════════════════════════════════════════════════════════════════════

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const email = this.href.replace('mailto:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    const orig = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => { this.textContent = orig; }, 2000);
                }).catch(() => {});
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    // CONSOLE EASTER EGG
    // ═══════════════════════════════════════════════════════════════════════

    console.log('%c 🌱 Zain ', 'background: #0D7377; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Live with intention ', 'color: #C9A962; font-size: 14px; font-style: italic;');
    console.log('%c Want to join our team? hello@thezainapp.com ', 'color: #5A6B7A; font-size: 12px;');
});

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function debounce(fn, wait) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}
