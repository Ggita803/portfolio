// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => mobileMenu.classList.add('active'), 10);
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    setTimeout(() => mobileMenu.classList.add('hidden'), 300);
});

// Close menu when clicking overlay
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove('active');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    });
});

// Active Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function setActiveLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // Run on load

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
    
    // Shrink navbar on scroll
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Typing Effect
const typingElement = document.getElementById('typing-text');
const roles = ['System Analyst', 'Digital Marketing Manager', 'Data Analyst', 'Process Optimizer', 'Tech Strategist'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause before deleting
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    // Simple validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    
    // Reset form after delay
    setTimeout(() => {
        contactForm.reset();
        contactForm.classList.remove('hidden');
        formSuccess.classList.add('hidden');
    }, 5000);
});

// Contact Form Tabs
const contactTabBtns = document.querySelectorAll('.contact-tab-btn');
const projectFields = document.getElementById('projectFields');
const budgetField = document.getElementById('budgetField');

contactTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        contactTabBtns.forEach(b => {
            b.classList.remove('active', 'bg-sky-600', 'text-white');
            b.classList.add('bg-gray-100', 'text-gray-600');
        });
        btn.classList.add('active', 'bg-sky-600', 'text-white');
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        
        // Toggle fields based on tab
        const tab = btn.getAttribute('data-tab');
        if (tab === 'project') {
            projectFields.classList.remove('hidden');
            budgetField.classList.remove('hidden');
            document.querySelector('textarea[name="message"]').placeholder = 'Tell me about your project...';
        } else {
            projectFields.classList.add('hidden');
            budgetField.classList.add('hidden');
            document.querySelector('textarea[name="message"]').placeholder = 'Say hello! What\'s on your mind?';
        }
    });
});

// Initialize first tab
if (contactTabBtns.length > 0) {
    contactTabBtns[0].classList.add('bg-sky-600', 'text-white');
    contactTabBtns[0].classList.remove('bg-gray-100', 'text-gray-600');
}

// FAQ Accordion
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const faqItem = toggle.parentElement;
        const content = faqItem.querySelector('.faq-content');
        const icon = toggle.querySelector('i');
        
        // Close all other FAQ items
        faqToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                const otherItem = otherToggle.parentElement;
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherToggle.querySelector('i');
                otherContent.classList.add('hidden');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        content.classList.toggle('hidden');
        if (content.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .glass-card').forEach(el => {
    observer.observe(el);
});

// Active navigation link highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-purple-400');
        link.classList.add('text-gray-300');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-purple-400');
        }
    });
});

// Add animation to progress bars on scroll
const progressBars = document.querySelectorAll('.skill-card');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            bar.style.animation = 'slideInUp 0.8s ease-out forwards';
        }
    });
};

window.addEventListener('scroll', animateProgressBars);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Scroll Reveal Animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

function checkScrollReveal() {
    scrollRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', checkScrollReveal);
window.addEventListener('load', checkScrollReveal);

// Counter Animation
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    const firstCounter = counters[0];
    if (!firstCounter) return;
    
    const rect = firstCounter.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// Animated Skill Progress Bars
const skillProgressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    const firstBar = skillProgressBars[0];
    if (!firstBar) return;
    
    const rect = firstBar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
        skillsAnimated = true;
        
        skillProgressBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = targetWidth;
            }, index * 150);
        });
    }
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dynamic Year
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// WhatsApp Button Pulse Animation
const whatsappBtn = document.getElementById('whatsappBtn');
let pulseInterval;

function startWhatsAppPulse() {
    pulseInterval = setInterval(() => {
        whatsappBtn.classList.add('scale-110');
        setTimeout(() => {
            whatsappBtn.classList.remove('scale-110');
        }, 300);
    }, 3000);
}

// Start pulse after 5 seconds
setTimeout(startWhatsAppPulse, 5000);