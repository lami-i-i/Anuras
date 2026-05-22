/* ========================================
   ÀNÚRÀ WEBSITE - SMOOTH SCROLL ANIMATIONS
   ========================================
   This file handles all interactive animations and visual effects:
   - Scroll-triggered fade-in animations for elements
   - Button hover effects and interactions
   - Interactive Particles Canvas Background (Replaced Blobs)
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
       INTERACTIVE PARTICLES CANVAS BACKGROUND
       ======================================== */
    /* Create an interactive network of connecting nodes that react to mouse movement */
    const container = document.getElementById('canvas-container');
    if (container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        /* Update canvas size on window resize */
        window.addEventListener('resize', resizeCanvas);
        
        /* Track mouse coordinates */
        window.addEventListener('mousemove', (e) => { 
            mouse.x = e.clientX; 
            mouse.y = e.clientY; 
        });
        
        /* Remove mouse influence when cursor leaves window */
        window.addEventListener('mouseout', () => { 
            mouse.x = null; 
            mouse.y = null; 
        });

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        /* Particle class for individual nodes */
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4; /* Horizontal velocity */
                this.vy = (Math.random() - 0.5) * 0.4; /* Vertical velocity */
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                /* Bounce off canvas edges */
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                /* Mouse interaction physics - particles push away from cursor */
                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        this.x -= dx / dist * force * 1.5;
                        this.y -= dy / dist * force * 1.5;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(155, 114, 200, 0.35)'; /* Primary purple color */
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            /* Dynamically set number of particles based on screen size */
            let count = Math.floor((canvas.width * canvas.height) / 12000);
            for(let i=0; i<count; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            /* Update and draw all particles */
            particles.forEach(p => { p.update(); p.draw(); });
            
            /* Draw connection lines between nearby particles */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        /* Opacity fades based on distance */
                        ctx.strokeStyle = `rgba(155, 114, 200, ${0.15 * (1 - dist/100)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        
        resizeCanvas();
        animateCanvas();
    }

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
            background: linear-gradient(90deg, #9b72c8, #e8d8f8);
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
