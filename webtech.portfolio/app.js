// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const roles = document.querySelectorAll('.role');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Section Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger skill bar animations when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            
            // Trigger timeline animations
            if (entry.target.id === 'experience') {
                animateTimeline();
            }
            
            // Trigger achievement card animations
            if (entry.target.id === 'achievements') {
                animateAchievements();
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animate Skill Progress Bars
function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Animate Timeline Items
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Animate Achievement Cards
function animateAchievements() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Role Switching Animation in Hero Section
let currentRoleIndex = 0;
const roleTexts = ['Designer', 'Coder', 'Musician'];

function switchRoles() {
    roles.forEach(role => role.classList.remove('active'));
    
    setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roleTexts.length;
        roles[currentRoleIndex].classList.add('active');
    }, 300);
}

// Switch roles every 3 seconds
setInterval(switchRoles, 3000);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Floating Shapes Animation Enhancement
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Add mouse interaction
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            const moveX = (x - 50) * (index + 1) * 0.5;
            const moveY = (y - 50) * (index + 1) * 0.5;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
        });
    });
}

// Initialize floating shapes enhancement
enhanceFloatingShapes();

// Code Snippets Typing Effect
function typeCodeSnippets() {
    const codeSnippets = document.querySelectorAll('.code-snippet');
    
    codeSnippets.forEach((snippet, index) => {
        const text = snippet.textContent;
        snippet.textContent = '';
        snippet.style.opacity = '1';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                snippet.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                
                // Add cursor blink effect
                snippet.style.borderRight = '2px solid var(--color-primary)';
                snippet.style.animation = 'blink 1s infinite';
            }
        }, 50 + (index * 10)); // Staggered typing speed
    });
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeCodeSnippets, 2000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const geometricBg = document.querySelector('.geometric-bg');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (geometricBg) {
        geometricBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Scroll Indicator Functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Stats Counter Animation
function animateStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        
        // Skip if it's not a pure number
        if (isNaN(finalNumber.replace('+', ''))) return;
        
        const number = parseInt(finalNumber.replace('+', ''));
        const increment = number / 30; // Animation duration control
        let current = 0;
        
        stat.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = finalNumber;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (finalNumber.includes('+') ? '+' : '');
            }
        }, 50);
    });
}

// Trigger stats animation when about section is in view
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatsCounter();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.achievement-card, .education-card, .contact-item, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize card hover effects
addCardHoverEffects();

// Enhanced scroll animations for timeline
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Initially hide timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease-out';
    });
}

// Initialize timeline animations
setupTimelineAnimations();

// Achievement cards initial state
function setupAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });
}

// Initialize achievement animations
setupAchievementAnimations();

// Contact form enhancement (if needed)
const contactLinks = document.querySelectorAll('.contact-value');
contactLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Add a subtle animation when clicked
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Page load animations
window.addEventListener('load', () => {
    // Animate hero elements with staggered delays
    const heroElements = [
        '.hero-intro',
        '.hero-name',
        '.hero-roles',
        '.hero-description',
        '.hero-cta'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        }
    });
});

// Add CSS for smooth transitions to elements that don't have them
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .hero-intro,
        .hero-name,
        .hero-roles,
        .hero-description,
        .hero-cta {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});

// Error handling for smooth scrolling
function safeScrollTo(element) {
    try {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } catch (error) {
        // Fallback for older browsers
        if (element) {
            window.scrollTo(0, element.offsetTop - 80);
        }
    }
}

// Enhanced mobile experience
function enhanceMobileExperience() {
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .floating-shape {
                    animation-duration: 8s;
                }
                
                .code-snippet {
                    animation-duration: 6s;
                }
                
                * {
                    transition-duration: 0.2s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize mobile enhancements
enhanceMobileExperience();

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Enable keyboard navigation for the mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload critical animations
function preloadAnimations() {
    // Trigger critical CSS animations early
    requestAnimationFrame(() => {
        document.body.classList.add('animations-ready');
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    preloadAnimations();
    
    // Add loading complete class for any CSS that depends on it
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});