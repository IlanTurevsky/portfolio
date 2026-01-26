// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '12px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '16px 0';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill-category, .experience-item, .research-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--accent)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// ===== Typing Effect for Hero (Optional Enhancement) =====
const heroTagline = document.querySelector('.hero-tagline');
const originalText = heroTagline.textContent;

// Uncomment below to enable typing effect
/*
heroTagline.textContent = '';
let charIndex = 0;

function typeText() {
    if (charIndex < originalText.length) {
        heroTagline.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});
*/

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio. Want to connect? Reach out!', 'font-size: 14px;');
