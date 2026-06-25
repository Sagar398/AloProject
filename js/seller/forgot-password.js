// js/seller/forgot-password.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Seller Forgot Password JS loaded successfully');
    
    // ============================================
    // DOM ELEMENTS
    // ============================================
    const stepEmail = document.getElementById('stepEmail');
    const stepReset = document.getElementById('stepReset');
    const stepSuccess = document.getElementById('stepSuccess');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    
    // ============================================
    // TOGGLE PASSWORD VISIBILITY
    // ============================================
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    });
    
    // ============================================
    // STEP 1: FORGOT PASSWORD FORM
    // ============================================
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Reset validation
            emailInput.classList.remove('is-invalid');
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                submitBtn.disabled = true;
                
                const email = emailInput.value.trim();
                console.log('Password reset link sent to:', email);
                
                // Simulate API call
                setTimeout(() => {
                    // Hide Step 1 and Show Step 2
                    stepEmail.style.display = 'none';
                    stepReset.style.display = 'block';
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // ============================================
    // STEP 2: RESET PASSWORD FORM
    // ============================================
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            let isValid = true;
            
            // Reset validation
            newPassword.classList.remove('is-invalid');
            confirmPassword.classList.remove('is-invalid');
            
            // New password validation
            if (!newPassword.value.trim() || newPassword.value.trim().length < 8) {
                newPassword.classList.add('is-invalid');
                isValid = false;
            }
            
            // Confirm password validation
            if (!confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else if (newPassword.value.trim() !== confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Resetting...';
                submitBtn.disabled = true;
                
                const formData = {
                    newPassword: newPassword.value,
                    confirmPassword: confirmPassword.value
                };
                
                console.log('Password reset:', formData);
                
                // Simulate API call
                setTimeout(() => {
                    // Hide Step 2 and Show Success Message
                    stepReset.style.display = 'none';
                    stepSuccess.style.display = 'block';
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
});