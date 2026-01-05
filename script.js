/**
 * Zain App Website - Interactive Scripts
 * Handles navigation, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // ═══════════════════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════════

    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Scroll effect for navbar
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Check on load

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SMOOTH SCROLL
    // ═══════════════════════════════════════════════════════════════════════════

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SCROLL ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════════════

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.pillar-card, .feature-row, .pricing-card, .section-header'
    );

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateOnScroll.observe(el);
    });

    // Add stagger delay to pillars grid
    const pillars = document.querySelectorAll('.pillar-card');
    pillars.forEach((pillar, index) => {
        pillar.style.transitionDelay = `${index * 0.1}s`;
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // PHONE MOCKUP ANIMATION
    // ═══════════════════════════════════════════════════════════════════════════

    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        // Add subtle floating animation
        let floatAngle = 0;
        function floatPhone() {
            floatAngle += 0.02;
            const yOffset = Math.sin(floatAngle) * 5;
            const rotation = Math.sin(floatAngle * 0.5) * 0.5;
            phoneMockup.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
            requestAnimationFrame(floatPhone);
        }
        floatPhone();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FAQ ACCORDION
    // ═══════════════════════════════════════════════════════════════════════════

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            // Initially collapse all answers
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out, padding 0.3s ease-out';
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';

            // Add toggle icon
            const toggleIcon = document.createElement('span');
            toggleIcon.innerHTML = '+';
            toggleIcon.style.cssText = 'font-size: 24px; color: var(--primary); transition: transform 0.3s ease;';
            question.appendChild(toggleIcon);

            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('open')) {
                        otherItem.classList.remove('open');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question span');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.style.paddingTop = '0';
                        otherAnswer.style.paddingBottom = '0';
                        otherIcon.innerHTML = '+';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('open');
                    answer.style.maxHeight = '0';
                    answer.style.paddingTop = '0';
                    answer.style.paddingBottom = '0';
                    toggleIcon.innerHTML = '+';
                    toggleIcon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                    answer.style.paddingTop = '16px';
                    answer.style.paddingBottom = '8px';
                    toggleIcon.innerHTML = '−';
                    toggleIcon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // FORM HANDLING
    // ═══════════════════════════════════════════════════════════════════════════

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // If using Formspree or similar, let it handle the submission
            // Otherwise, you can add custom handling here

            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;

                // Re-enable after form submission (Formspree redirects, so this is just a safety)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // PRICING TOGGLE HIGHLIGHT
    // ═══════════════════════════════════════════════════════════════════════════

    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => c.style.transform = 'scale(0.98)');
            this.style.transform = 'scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => c.style.transform = '');
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // STATS COUNTER ANIMATION
    // ═══════════════════════════════════════════════════════════════════════════

    function animateCounter(element, target, duration = 1500) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue && !statValue.dataset.animated) {
                    const value = parseInt(statValue.textContent);
                    statValue.dataset.animated = 'true';
                    animateCounter(statValue, value);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // COPY TO CLIPBOARD (for email addresses)
    // ═══════════════════════════════════════════════════════════════════════════

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');

            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show brief feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    // Fallback to default mailto behavior
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSOLE EASTER EGG
    // ═══════════════════════════════════════════════════════════════════════════

    console.log('%c 🌱 Zain ', 'background: #0D7377; color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Live with intention ', 'color: #C9A962; font-size: 14px; font-style: italic;');
    console.log('%c Want to join our team? Email us at careers@thezainapp.com ', 'color: #5A6B7A; font-size: 12px;');
});

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
