// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Hero to About transition
const heroSection = document.querySelector('.hero');
const aboutSection = document.querySelector('#about');

function handleHeroToAboutTransition() {
    const heroRect = heroSection.getBoundingClientRect();
    const aboutRect = aboutSection.getBoundingClientRect();
    
    // Calculate transition progress
    const scrollProgress = Math.max(0, Math.min(1, -heroRect.bottom / (aboutRect.top - heroRect.bottom)));
    
    // Apply transition effects
    if (scrollProgress > 0) {
        aboutSection.style.opacity = scrollProgress;
        aboutSection.style.transform = `translateY(${(1 - scrollProgress) * 50}px)`;
        
        // Add special glow effect to about section
        aboutSection.style.boxShadow = `0 0 ${scrollProgress * 50}px rgba(51, 204, 153, ${scrollProgress * 0.3})`;
    }
}

// Color transition on scroll
const sections = document.querySelectorAll('.section');

function updateColors() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        
        // Calculate how much of the section is visible
        const visibleStart = Math.max(0, scrollY - sectionTop + windowHeight * 0.5);
        const visibleEnd = Math.min(sectionHeight, scrollY + windowHeight - sectionTop + windowHeight * 0.5);
        const visibleRatio = Math.max(0, Math.min(1, (visibleEnd - visibleStart) / sectionHeight));
        
        if (visibleRatio > 0.3) {
            // Add color transition class
            section.classList.add('color-transition');
            
            // Update text colors based on section
            const textElements = section.querySelectorAll('h2, h3, p, li, .skill-item, .category-label');
            textElements.forEach(el => {
                el.style.transition = 'color 0.6s ease';
                if (index % 2 === 0) {
                    el.style.color = 'var(--text-primary)';
                } else {
                    el.style.color = 'var(--text-secondary)';
                }
            });
        } else {
            section.classList.remove('color-transition');
        }
    });
}

// Throttled scroll event
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateColors();
            handleHeroToAboutTransition();
        });
        ticking = true;
        setTimeout(() => { ticking = false; }, 16);
    }
}

window.addEventListener('scroll', requestTick);

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm && submitBtn && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;
        formMessage.innerHTML = '';
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            formMessage.innerHTML = '<div class="message success">Thank you! Your message has been sent successfully.</div>';
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            formMessage.innerHTML = '<div class="message error">Sorry, there was an error sending your message. Please try again.</div>';
        } finally {
            // Reset button
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click animation to buttons (excluding form submit button to avoid conflict)
document.querySelectorAll('.btn:not(#submitBtn)').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

