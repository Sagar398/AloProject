// js/seller/login.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Seller Login JS loaded successfully');
    
    // ============================================
    // TOGGLE PASSWORD VISIBILITY
    // ============================================
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // ============================================
    // FORM VALIDATION AND SUBMISSION
    // ============================================
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Reset validation
            emailInput.classList.remove('is-invalid');
            passwordInput.classList.remove('is-invalid');
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Password validation
            if (!passwordInput.value.trim()) {
                passwordInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
                submitBtn.disabled = true;
                
                // Collect form data
                const formData = {
                    email: emailInput.value.trim(),
                    password: passwordInput.value,
                    rememberMe: document.getElementById('rememberMe').checked
                };
                
                console.log('Seller login attempt:', formData);
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    alert('Login successful! Redirecting to seller dashboard...');
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }
    
    // ============================================
    // REMEMBER ME FUNCTIONALITY
    // ============================================
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (rememberMeCheckbox && emailInput) {
        // Check local storage on page load
        const rememberedEmail = localStorage.getItem('alo_seller_remembered_email');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }
        
        // Save to local storage on form submission
        loginForm.addEventListener('submit', function() {
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('alo_seller_remembered_email', emailInput.value);
            } else {
                localStorage.removeItem('alo_seller_remembered_email');
            }
        });
    }
    
});