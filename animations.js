/* ========================================
   ÀNÚRÀ WEBSITE - INTERACTIVE ANIMATIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       1. INTERACTIVE CANVAS BACKGROUND
       ======================================== */
    const container = document.getElementById('canvas-container');
    if (container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

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
                ctx.fillStyle = 'rgba(155, 114, 200, 0.35)'; 
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let count = Math.floor((canvas.width * canvas.height) / 12000);
            for(let i=0; i<count; i++) particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
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
       2. SCROLL ANIMATION OBSERVER
       ======================================== */
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                if (entry.target.classList.contains('card-grid') || entry.target.classList.contains('hub-grid')) {
                    const cards = entry.target.querySelectorAll('.glass-card, .hub-card');
                    cards.forEach((card, cardIndex) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, cardIndex * 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('main > section, .card-grid, .hub-grid, .split-section, .reveal-on-scroll').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    /* ========================================
       3. BUTTON HOVER EFFECTS
       ======================================== */
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px) scale(1.02)'; });
        button.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    });

    /* ========================================
       4. SMOOTH ANCHOR LINK SCROLLING
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ========================================
       5. NAVIGATION LINK ACTIVE STATE
       ======================================== */
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.style.color = 'var(--primary-purple)';
            link.style.borderBottom = '2px solid var(--primary-purple)';
        }
    });

    /* ========================================
       6. RIPPLE CLICK EFFECT
       ======================================== */
    const interactiveElements = document.querySelectorAll('.glass-card, .hub-card, .btn-primary, .btn-secondary');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.tagName !== 'A') {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });

    /* ========================================
       7. COUNTER ANIMATION FOR STATISTICS
       ======================================== */
    const stats = document.querySelectorAll('[data-count]');
    stats.forEach(stat => {
        const targetCount = parseInt(stat.dataset.count);
        const duration = 2000;
        const increment = targetCount / (duration / 16);
        let currentCount = 0;

        const counter = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
                stat.textContent = targetCount;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentCount);
            }
        }, 16);
    });

    /* ========================================
       8. SCROLL PROGRESS INDICATOR
       ======================================== */
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed; top: 0; left: 0; height: 3px;
            background: linear-gradient(90deg, #9b72c8, #6b3a6e);
            width: 0%; z-index: 9999; transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    createProgressBar();
});

window.addEventListener('load', () => {
    document.body.style.transition = 'all 0.3s ease';
});
