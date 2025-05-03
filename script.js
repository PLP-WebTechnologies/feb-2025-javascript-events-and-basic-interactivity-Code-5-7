document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 1. Event Handling
    
    // Button click - change text
    const changeTextBtn = document.getElementById('text-changer');
    const changeableText = document.getElementById('changeable-text');
    const texts = [
        "You changed me!",
        "JavaScript is fun!",
        "Keep clicking!",
        "Web development rocks!",
        "Hello World!"
    ];
    
    changeTextBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * texts.length);
        changeableText.textContent = texts[randomIndex];
        
        // Add animation
        changeableText.style.animation = 'none';
        setTimeout(() => {
            changeableText.style.animation = 'fadeIn 0.5s';
        }, 10);
    });

    // Hover effects are handled in CSS
    
    // Keypress detection
    const keyInput = document.getElementById('key-input');
    const keyDisplay = document.getElementById('key-display');
    
    keyInput.addEventListener('keyup', (e) => {
        keyDisplay.textContent = e.key === ' ' ? 'Space' : e.key;
    });

    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    let pressTimer;
    
    // Long press detection
    secretBox.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            activateSecret();
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });
    
    // Double click detection
    secretBox.addEventListener('dblclick', activateSecret);
    
    function activateSecret() {
        secretBox.classList.add('secret-activated');
        
        // Create confetti effect
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
        
        setTimeout(() => {
            secretBox.classList.remove('secret-activated');
        }, 2000);
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '100%';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.animation = `confetti ${Math.random() * 2 + 1}s linear forwards`;
        secretBox.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }

    // 2. Interactive Elements
    
    // Image slideshow
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // 3. Form Validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordStrength = document.querySelector('.password-strength');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            updatePasswordStrength(0);
            return false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            updatePasswordStrength(1);
            return false;
        } else {
            passwordError.textContent = '';
            
            // Calculate strength
            let strength = 1; // starts at weak
            if (passwordInput.value.length >= 12) strength++;
            if (/[A-Z]/.test(passwordInput.value)) strength++;
            if (/[0-9]/.test(passwordInput.value)) strength++;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength++;
            
            updatePasswordStrength(strength);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        passwordStrength.className = 'password-strength';
        
        if (strength >= 4) {
            passwordStrength.classList.add('strong');
            strengthText.textContent = 'Strong';
        } else if (strength >= 2) {
            passwordStrength.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            strengthText.textContent = 'Weak';
        }
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
            passwordStrength.className = 'password-strength';
            strengthText.textContent = 'Weak';
        } else {
            alert('Please fix the errors in the form');
        }
    });
});
