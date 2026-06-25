// js/service-provider-forgot-password.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DOM Element References ---
    const stepEmail = document.getElementById('stepEmail');
    const stepReset = document.getElementById('stepReset');
    const stepSuccess = document.getElementById('stepSuccess');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    
    // --- Toggle Password Visibility for Reset Form ---
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
    
    // --- Step 1: Handle Forgot Password Form Submission ---
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
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call to send reset link
                setTimeout(() => {
                    console.log('Password reset link sent to:', emailInput.value);
                    
                    // Hide Step 1 and Show Step 2
                    stepEmail.style.display = 'none';
                    stepReset.style.display = 'block';
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // --- Step 2: Handle Reset Password Form Submission ---
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
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Resetting...';
                submitBtn.disabled = true;
                
                // Simulate API call to reset password
                setTimeout(() => {
                    console.log('Password reset successful');
                    
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