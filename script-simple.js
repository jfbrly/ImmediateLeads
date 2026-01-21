// Simple JavaScript for basic interactions

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const form = document.getElementById('signup-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        // Show loading
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate submission
        setTimeout(() => {
            button.textContent = '✓ We\'ll call you in 5 minutes!';
            button.style.background = '#10b981';
            button.style.color = 'white';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                button.style.color = '';
            }, 4000);
        }, 1000);
    });
}

// Add subtle animation to stats when visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Simple fade-in animation
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat, .step, .feature').forEach(el => {
    observer.observe(el);
});
