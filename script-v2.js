// Enhanced JavaScript for Modern Interactions

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }
            
            if (entry.target.classList.contains('timeline-progress')) {
                entry.target.style.animationPlayState = 'running';
            }
            
            if (entry.target.classList.contains('process-step')) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 500);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.counter, .timeline-progress, .process-step, .feature-card, .problem-card').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target > 1000) {
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        } else {
            element.textContent = prefix + Math.floor(current) + suffix;
        }
    }, 16);
}

// Hero Stats Animation
document.querySelectorAll('.stat-number').forEach(stat => {
    const value = stat.textContent;
    const prefix = stat.getAttribute('data-prefix') || '';
    const suffix = stat.getAttribute('data-suffix') || '';
    const count = parseInt(stat.getAttribute('data-count')) || parseInt(value);
    
    stat.textContent = prefix + '0' + suffix;
    
    setTimeout(() => {
        animateValue(stat, 0, count, 2000, prefix, suffix);
    }, 500);
});

function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        element.textContent = prefix + Math.floor(easeOutQuad * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ROI Calculator
const calculator = {
    replies: document.getElementById('replies'),
    currentRate: document.getElementById('current-rate'),
    dealSize: document.getElementById('deal-size'),
    
    calculate() {
        if (!this.replies || !this.currentRate || !this.dealSize) return;
        
        const repliesVal = parseInt(this.replies.value) || 100;
        const currentRateVal = parseInt(this.currentRate.value) || 15;
        const dealSizeVal = parseInt(this.dealSize.value) || 25000;
        
        // Our booking rate is 68%
        const ourRate = 68;
        
        // Calculate additional meetings
        const currentMeetings = repliesVal * (currentRateVal / 100);
        const ourMeetings = repliesVal * (ourRate / 100);
        const additionalMeetings = Math.round(ourMeetings - currentMeetings);
        
        // Calculate additional revenue (assuming 25% close rate)
        const closeRate = 0.25;
        const additionalRevenue = additionalMeetings * dealSizeVal * closeRate;
        
        // Calculate ROI (assuming $79 per meeting)
        const cost = ourMeetings * 79;
        const roi = Math.round(((additionalRevenue - cost) / cost) * 100);
        
        // Update display
        document.getElementById('extra-meetings').textContent = additionalMeetings;
        document.getElementById('extra-revenue').textContent = '$' + additionalRevenue.toLocaleString();
        document.getElementById('roi').textContent = roi.toLocaleString() + '%';
    }
};

// Initialize calculator
if (calculator.replies && calculator.currentRate && calculator.dealSize) {
    calculator.replies.addEventListener('input', () => calculator.calculate());
    calculator.currentRate.addEventListener('input', () => calculator.calculate());
    calculator.dealSize.addEventListener('input', () => calculator.calculate());
    calculator.calculate();
}

// Pricing Toggle
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'block');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'block');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalContent = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        // Simulate submission
        setTimeout(() => {
            button.innerHTML = '<span>✓ We\'ll call you in 5 minutes!</span>';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Add success animation
            button.classList.add('success-pulse');
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
                button.classList.remove('success-pulse');
            }, 5000);
        }, 1500);
    });
}

// Process Steps Interaction
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', () => {
        // Remove active from all
        processSteps.forEach(s => s.classList.remove('active'));
        // Add active to current
        step.classList.add('active');
        
        // Update progress line
        const progressLine = document.querySelector('.process-line-fill');
        if (progressLine) {
            progressLine.style.width = `${(index + 1) * 25}%`;
        }
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', x + 'px');
        card.style.setProperty('--y', y + 'px');
    });
});

// Testimonial Slider (if multiple testimonials)
const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards.length > 1) {
    let currentTestimonial = 0;
    
    setInterval(() => {
        testimonialCards[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        testimonialCards[currentTestimonial].classList.add('active');
    }, 5000);
}

// Add CSS for success pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes success-pulse {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    
    .success-pulse {
        animation: success-pulse 1s ease-out infinite;
    }
    
    .nav-links.active {
        display: flex !important;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
        border-radius: 0 0 1rem 1rem;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Initialize on load
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-slide-up, .animate-scale-in').forEach(el => {
        el.style.opacity = '1';
    });
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 100));
