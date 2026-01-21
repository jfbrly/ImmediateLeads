// Smooth scrolling for navigation links
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

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        // Simulate form submission
        button.textContent = 'Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            // Show success message
            button.textContent = '✓ We\'ll be in touch!';
            button.style.background = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1000);
    });
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate numbers
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stats
document.querySelectorAll('.stat-number, .metric-number').forEach(stat => {
    observer.observe(stat);
});

// Number animation function
function animateNumber(element) {
    const finalValue = element.textContent;
    const isPercentage = finalValue.includes('%');
    const isTime = finalValue.includes(' min');
    const isDollar = finalValue.includes('$');
    const hasPlus = finalValue.includes('+');
    const hasDecimal = finalValue.includes('.');
    
    let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let display = hasDecimal ? current.toFixed(1) : Math.floor(current);
        
        if (isDollar) display = '$' + display;
        if (isPercentage) display = display + '%';
        if (isTime) display = display + ' min';
        if (hasPlus && current === numericValue) display = display + '+';
        
        element.textContent = display;
    }, 30);
}
