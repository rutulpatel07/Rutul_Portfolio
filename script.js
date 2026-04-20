// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Check screen size and apply appropriate styles
    function checkScreenSize() {
        const isLargeScreen = window.innerWidth >= 1200;
        const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1200;
        const isSmallScreen = window.innerWidth < 768;
        const viewportHeight = window.innerHeight;
        
        // Adjust elements based on screen size
        const mainHeading = document.querySelector('.main-heading');
        const subtitle = document.querySelector('.subtitle');
        const progressSection = document.querySelector('.progress-section');
        const socialLinks = document.querySelector('.social-links');
        const footer = document.querySelector('.footer');
        
        // Adjust for different viewport heights
        if (viewportHeight < 700) {
            // For shorter screens, reduce spacing to fit everything
            if (mainHeading) mainHeading.style.marginBottom = '1.25rem';
            if (subtitle) subtitle.style.marginBottom = '1.5rem';
            if (progressSection) progressSection.style.marginBottom = '1.5rem';
            if (footer) footer.style.padding = '0.75rem';
        } else {
            // Reset to default for taller screens
            if (mainHeading) mainHeading.style.marginBottom = '';
            if (subtitle) subtitle.style.marginBottom = '';
            if (progressSection) progressSection.style.marginBottom = '';
            if (footer) footer.style.padding = '';
        }
        
        if (isLargeScreen) {
            // Enhanced styles for large screens
            document.documentElement.style.setProperty('--content-padding', '2.5rem');
            if (mainHeading) mainHeading.style.letterSpacing = '-0.06em';
            if (progressSection) progressSection.style.maxWidth = '36rem';
        } else if (isMediumScreen) {
            // Medium screen adjustments
            document.documentElement.style.setProperty('--content-padding', '2rem');
            if (mainHeading) mainHeading.style.letterSpacing = '-0.05em';
            if (progressSection) progressSection.style.maxWidth = '32rem';
        } else {
            // Small screen (mobile) adjustments - keep original styles
            document.documentElement.style.setProperty('--content-padding', '1rem');
            if (mainHeading) mainHeading.style.letterSpacing = '-0.04em';
            if (progressSection) progressSection.style.maxWidth = '28rem';
        }
        
        // Make sure everything fits
        ensureContentFits();
    }
    
    // Ensure all content fits on screen
    function ensureContentFits() {
        const container = document.querySelector('.container');
        const socialLinks = document.querySelector('.social-links');
        
        // Make sure social links are visible
        if (socialLinks) {
            const socialLinksRect = socialLinks.getBoundingClientRect();
            if (socialLinksRect.bottom > window.innerHeight) {
                // If social links are cut off, adjust sizing
                const mainHeading = document.querySelector('.main-heading');
                if (mainHeading) {
                    const currentSize = parseFloat(window.getComputedStyle(mainHeading).fontSize);
                    // Reduce heading size slightly
                    mainHeading.style.fontSize = (currentSize * 0.9) + 'px';
                }
            }
        }
    }
    
    // Run on load and window resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add smooth hover effects for social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add click animation to progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse-glow 2s ease-in-out infinite alternate';
            }, 10);
        });
    }
      // Add subtle parallax effect to background elements
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const glowElements = document.querySelectorAll('.glow-element');
        glowElements.forEach((element, index) => {
            const speed = (index + 1) * (window.innerWidth > 768 ? 1.0 : 0.5); // Enhanced effect on larger screens
            const x = (mouseX - 0.5) * speed * 15; // Increased movement range
            const y = (mouseY - 0.5) * speed * 15;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Add subtle parallax to grid background on larger screens
        if (window.innerWidth > 768) {
            const gridBg = document.querySelector('.grid-bg');
            if (gridBg) {
                const slowSpeed = 0.2;
                const gridX = (mouseX - 0.5) * slowSpeed * 10;
                const gridY = (mouseY - 0.5) * slowSpeed * 10;
                gridBg.style.transform = `translate(${gridX}px, ${gridY}px)`;
            }
        }
    });
    
    // Animate elements on scroll (for mobile devices that might scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const style = document.createElement('style');
        style.textContent = `
            .glow-element,
            .scan-line {
                animation-duration: 16s !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced text animation trigger
    setTimeout(() => {
        const gradientTexts = document.querySelectorAll('.gradient-text');
        gradientTexts.forEach(text => {
            text.style.animationPlayState = 'running';
        });
    }, 500);
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation .social-link:focus {
        outline: 2px solid #22d3ee;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);