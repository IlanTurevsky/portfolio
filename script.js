// ===== Typewriter Effect =====
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const text = "Hi, I'm Ilan.";
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    // Start typing after a brief delay
    setTimeout(type, 500);
}

// ===== Animated Counters =====
const counters = document.querySelectorAll('.highlight-number[data-count]');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    countersAnimated = true;
}

// Trigger counter animation when highlights section is visible
const highlightsSection = document.querySelector('.highlights');
if (highlightsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(highlightsSection);
}

// ===== Mobile Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===== Header scroll effect =====
const header = document.querySelector('.header:not(.header-light)');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== Hero Carousel =====
const carousel = document.querySelector('.carousel');

if (carousel) {
    const slides = document.querySelectorAll('.carousel-slide');
    const titles = document.querySelectorAll('.carousel-title');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update titles
        titles.forEach((title, i) => {
            title.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        showSlide(next);
    }

    function startCarousel() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    // Click handlers for dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopCarousel();
            showSlide(i);
            startCarousel();
        });
    });

    // Initialize
    showSlide(0);
    startCarousel();

    // Pause on hover
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
}

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Fade in elements on scroll =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to various elements
document.querySelectorAll('.featured-card, .link-card, .other-item, .experience-item, .research-card, .skill-group, .highlight-item, .activity-item, .tech-tags span, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ===== Project page anchor handling =====
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}

// ===== Click Ripple Effect =====
document.querySelectorAll('.btn-explore, .btn-secondary, .contact-card, .link-card, .featured-card').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Card hover effects handled in CSS

// ===== Parallax Scroll Effect =====
const parallaxElements = document.querySelectorAll('.page-hero, .project-header');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
        const rate = 0.3;
        el.style.backgroundPositionY = (scrolled * rate) + 'px';
    });
});

// ===== Tech Tag Hover Effect =====
// Hover effects are now handled in CSS with the unified color scheme

// ===== Staggered Animation for Lists =====
document.querySelectorAll('.skill-group ul, .experience-timeline').forEach(list => {
    const items = list.querySelectorAll('li, .experience-item');
    items.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
    });
});

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.filter = 'hue-rotate(180deg)';

    const message = document.createElement('div');
    message.textContent = '🎮 You found the secret! 🎮';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2c2c2c;
        color: white;
        padding: 24px 48px;
        font-size: 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        animation: fadeInOut 3s ease forwards;
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.style.filter = '';
        message.remove();
    }, 3000);
}

// Minimal hover effects - keeping site clean like Adrian's

// Button hover effects handled in CSS

// ===== Custom Interactive Cursor =====
function initCustomCursor() {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    document.body.classList.add('has-custom-cursor');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .featured-card, .link-card, .other-item, .research-card, .contact-card, video, .video-container, .tilt-card, .project-card-alt-media');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            dot.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            dot.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
    });
}

initCustomCursor();

// ===== Video Hover Play =====
function initVideoHoverPlay() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        video.autoplay = false;
        video.pause();
        video.currentTime = 0;
        video.classList.add('hover-video');

        const source = video.querySelector('source');
        const isJacobsLadder3 = source && source.src.includes('jacobsladder3');

        // Mute all videos except jacobsladder3
        if (!isJacobsLadder3) {
            video.muted = true;
        } else {
            video.muted = false;
            video.classList.add('has-sound');
        }

        // Wrap video in container if not already
        let container = video.parentElement;
        if (!container.classList.contains('video-container')) {
            container = document.createElement('div');
            container.className = 'video-container';
            video.parentNode.insertBefore(container, video);
            container.appendChild(video);
        }

        // Detect vertical vs horizontal and add class
        video.addEventListener('loadedmetadata', () => {
            if (video.videoHeight > video.videoWidth) {
                container.classList.add('vertical');
            } else {
                container.classList.add('horizontal');
            }
        });

        // Add play hint if not exists
        if (!container.querySelector('.video-play-hint')) {
            const hint = document.createElement('div');
            hint.className = 'video-play-hint';
            if (isJacobsLadder3) {
                hint.classList.add('has-sound');
            }
            container.appendChild(hint);
        }

        // Play on hover
        container.addEventListener('mouseenter', () => {
            video.play();
            container.classList.add('playing');
        });

        container.addEventListener('mouseleave', () => {
            video.pause();
            container.classList.remove('playing');
        });
    });
}

initVideoHoverPlay();

// ===== 3D Tilt Card Effect =====
function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

initTiltCards();
