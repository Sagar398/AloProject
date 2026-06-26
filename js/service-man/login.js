/* ============================================
   Service Man Login - Simple Redirect
   For: login.html
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Login page loaded successfully');
    
    // ============================================
    // DOM Elements
    // ============================================
    
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginForm = document.getElementById('loginForm');
    
    // ============================================
    // Toggle Password Visibility
    // ============================================
    
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const password = passwordInput;
            const icon = this.querySelector('i');
            
            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                password.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // ============================================
    // Remember Me Functionality
    // ============================================
    
    function loadSavedCredentials() {
        try {
            const savedEmail = localStorage.getItem('serviceManEmail');
            const savedPassword = localStorage.getItem('serviceManPassword');
            const savedRemember = localStorage.getItem('serviceManRemember');
            
            if (savedRemember === 'true' && savedEmail) {
                emailInput.value = savedEmail;
                if (savedPassword) {
                    passwordInput.value = savedPassword;
                }
                rememberMeCheckbox.checked = true;
            }
        } catch (error) {
            console.warn('Unable to load saved credentials:', error);
        }
    }
    
    function saveCredentials(email, password) {
        try {
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('serviceManEmail', email);
                localStorage.setItem('serviceManPassword', password);
                localStorage.setItem('serviceManRemember', 'true');
            } else {
                localStorage.removeItem('serviceManEmail');
                localStorage.removeItem('serviceManPassword');
                localStorage.removeItem('serviceManRemember');
            }
        } catch (error) {
            console.warn('Unable to save credentials:', error);
        }
    }
    
    // Load saved credentials on page load
    loadSavedCredentials();
    
    // ============================================
    // Show Toast Message
    // ============================================
    
    function showToast(message, type) {
        // Remove existing toast container if any
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        if (type === 'error') toast.classList.add('error');
        if (type === 'info') toast.classList.add('info');
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="close-toast">&times;</button>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(function() {
            toast.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 500);
        }, 3000);
        
        // Close button
        toast.querySelector('.close-toast').addEventListener('click', function() {
            toast.remove();
        });
    }
    
    // ============================================
    // Handle Login - Simple Redirect
    // ============================================
    
    function handleLogin() {
        console.log('Login button clicked');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate fields are not empty
        if (!email || !password) {
            showToast('Please enter email and password', 'error');
            return;
        }
        
        // Save credentials if "Remember Me" is checked
        if (rememberMeCheckbox.checked) {
            saveCredentials(email, password);
        }
        
        // Store login session
        sessionStorage.setItem('serviceManLoggedIn', 'true');
        sessionStorage.setItem('serviceManEmail', email);
        sessionStorage.setItem('serviceManLoginTime', new Date().toISOString());
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.classList.add('d-none');
        btnSpinner.classList.remove('d-none');
        
        // Show success message
        showToast('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(function() {
            console.log('Redirecting to dashboard.html');
            window.location.href = 'dashboard.html';
        }, 1000);
    }
    
    // ============================================
    // Event Listeners
    // ============================================
    
    // Login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Enter key on form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleLogin();
        });
    }
    
    // Enter key on password field
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
    }
    
    // Enter key on email field
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (passwordInput) {
                    passwordInput.focus();
                }
            }
        });
    }
    
    // ============================================
    // Check if already logged in
    // ============================================
    
    // If already logged in, redirect to dashboard
    if (sessionStorage.getItem('serviceManLoggedIn') === 'true') {
        console.log('Already logged in, redirecting to dashboard');
        window.location.href = 'dashboard.html';
    }
    
    console.log('Service Man Login Page Ready');
});