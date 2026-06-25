// js/service-provider-login.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DOM Element References ---
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');

    // --- Toggle Password Visibility ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // --- Form Validation and Submission ---
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            let isValid = true;

            // Reset validation state
            emailInput.classList.remove('is-invalid');
            passwordInput.classList.remove('is-invalid');

            // 1. Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }

            // 2. Password Validation
            if (!passwordInput.value.trim()) {
                passwordInput.classList.add('is-invalid');
                isValid = false;
            }

            // 3. If validation passes, simulate login
            if (isValid) {
                this.querySelector('button[type="submit"]').disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // In a real application, this would be an AJAX/Fetch call to your backend
                    console.log('Login attempt with:', {
                        email: emailInput.value,
                        password: passwordInput.value,
                        remember: document.getElementById('rememberMe').checked
                    });
                    
                    alert('Login successful! Redirecting to dashboard...');
                    // Uncomment the line below for actual redirection
                    // window.location.href = 'dashboard.html';
                    
                    this.querySelector('button[type="submit"]').disabled = false;
                }, 1500);
            }
        });
    }

    // --- "Remember Me" Functionality (Optional Enhancement) ---
    const rememberMeCheckbox = document.getElementById('rememberMe');
    if (rememberMeCheckbox && emailInput) {
        // Check local storage on page load
        const rememberedEmail = localStorage.getItem('alo_sp_remembered_email');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }

        // Save to local storage on form submission
        loginForm.addEventListener('submit', function() {
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('alo_sp_remembered_email', emailInput.value);
            } else {
                localStorage.removeItem('alo_sp_remembered_email');
            }
        });
    }

});