/* ========================================
   ÀNÚRÀ WEBSITE - SMOOTH SCROLL ANIMATIONS
   ========================================
   This file handles all interactive animations and visual effects:
   - Scroll-triggered fade-in animations for elements
   - Button hover effects and interactions
   - Parallax scrolling for background blobs
   - Smooth anchor link scrolling
   - Navigation link active state highlighting
   - Ripple click effects
   - Counter animations for statistics
   - Scroll progress indicator bar
======================================== */

/* Wait for DOM to fully load before running animations */
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       INTERSECTION OBSERVER CONFIGURATION
       ======================================== */
    /* Configure options for when elements become visible during scroll */
    const observerOptions = {
        threshold: 0.1, /* Trigger when 10% of element is visible */
        rootMargin: '0px 0px -100px 0px' /* Trigger 100px before element reaches bottom */
    };

    /* ========================================
       SCROLL ANIMATION OBSERVER
       ======================================== */
    /* Create intersection observer to detect when elements come into view */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            /* Check if element is currently visible in viewport */
            if (entry.isIntersecting) {
                /* Make element visible with fade-in effect */
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                /* Stagger animation for card grids - each card animates in sequence */
                if (entry.target.classList.contains('card-grid') ||
                    entry.target.classList.contains('hub-grid')) {
                    /* Get all cards within the grid */
                    const cards = entry.target.querySelectorAll('.glass-card, .hub-card');
                    cards.forEach((card, cardIndex) => {
                        /* Set initial state - invisible and moved down */
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        /* Animate each card with a staggered delay */
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, cardIndex * 100); /* Each card delays by 100ms */
                    });
                }

                /* Stop observing this element after animation triggers */
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /* ========================================
       OBSERVE ELEMENTS FOR SCROLL ANIMATIONS
       ======================================== */
    /* Select all main sections and grids that need scroll animations */
    document.querySelectorAll('main > section, .card-grid, .hub-grid, .split-section').forEach((el) => {
        /* Set initial state - invisible and positioned lower */
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        /* Start observing this element for visibility changes */
        observer.observe(el);
    });

    /* ========================================
       BUTTON HOVER EFFECTS
       ======================================== */
    /* Get all primary and secondary buttons */
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        /* Add hover-in effect - scale and lift button */
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        /* Add hover-out effect - return to normal */
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    /* ========================================
       PARALLAX BACKGROUND BLOBS
       ======================================== */
    /* Get all animated background blobs */
    const blobs = document.querySelectorAll('.blob');
    /* Listen for scroll events to move blobs */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; /* Get current scroll position */
        blobs.forEach((blob, index) => {
            /* Different speed for each blob based on index (parallax effect) */
            const speed = 0.5 + (index * 0.1);
            /* Move blob based on scroll position and speed */
            blob.style.transform = `translate(${scrollY * speed * 0.02}px, ${scrollY * speed * 0.02}px)`;
        });
    });

    /* ========================================
       SMOOTH ANCHOR LINK SCROLLING
       ======================================== */
    /* Find all anchor links that point to sections on the page */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            /* Check if link is valid and target exists on page */
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault(); /* Prevent default anchor behavior */
                const target = document.querySelector(href);
                /* Smooth scroll to target element */
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ========================================
       NAVIGATION LINK ACTIVE STATE
       ======================================== */
    /* Get all navigation links */
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        /* Check if current page matches link's href */
        if (link.href === window.location.href) {
            /* Highlight the active link */
            link.style.color = 'var(--primary-purple)';
            link.style.borderBottom = '2px solid var(--primary-purple)';
        }
    });

    /* ========================================
       RIPPLE CLICK EFFECT
       ======================================== */
    /* Get all interactive elements that should have ripple effect */
    const interactiveElements = document.querySelectorAll('.glass-card, .hub-card, .btn-primary, .btn-secondary');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            /* Only add ripple if element is not already a link */
            if (this.tagName !== 'A') {
                /* Create ripple element */
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect(); /* Get element position */
                const size = Math.max(rect.width, rect.height); /* Ripple size based on element size */
                /* Calculate ripple position relative to click point */
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                /* Set ripple dimensions and position */
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                /* Add ripple to element and remove after animation */
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600); /* Remove after animation completes */
            }
        });
    });

    /* ========================================
       COUNTER ANIMATION FOR STATISTICS
       ======================================== */
    /* Find all elements with data-count attribute (for number counters) */
    const stats = document.querySelectorAll('[data-count]');
    stats.forEach(stat => {
        const targetCount = parseInt(stat.dataset.count); /* Target number to count to */
        const duration = 2000; /* Animation duration in ms */
        const increment = targetCount / (duration / 16); /* Calculate increment per frame */
        let currentCount = 0;

        /* Counter animation loop */
        const counter = setInterval(() => {
            currentCount += increment;
            /* Check if we've reached target */
            if (currentCount >= targetCount) {
                stat.textContent = targetCount;
                clearInterval(counter);
            } else {
                /* Display current count as integer */
                stat.textContent = Math.floor(currentCount);
            }
        }, 16); /* Update roughly 60 times per second (60fps) */
    });

    /* ========================================
       IMAGE REVEAL ANIMATION ON SCROLL
       ======================================== */
    /* Get all images on the page */
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        /* Set initial state - invisible and scaled down */
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        /* Observe images for scroll animations */
        observer.observe(img);
    });

    /* ========================================
       SCROLL PROGRESS INDICATOR
       ======================================== */
    /* Create and add scroll progress bar at top of page */
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        /* Style the progress bar with CSS */
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #a892b8, #d4c5e0);
            width: 0%;
            z-index: 999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        /* Update progress bar width on scroll */
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / totalHeight) * 100; /* Calculate scroll percentage */
            progressBar.style.width = scrolled + '%'; /* Update width */
        });
    };
    /* Initialize progress bar */
    createProgressBar();
});

/* ========================================
   PAGE LOAD EVENT HANDLER
   ======================================== */
/* Add transition effect when page fully loads */
window.addEventListener('load', () => {
    document.body.style.transition = 'all 0.3s ease';
});
