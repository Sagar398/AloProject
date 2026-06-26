/* ============================================
   Customer Login Page JavaScript
   For: login.html
   ============================================ */

// ============================================
// DOM Elements
// ============================================

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const togglePasswordBtn = document.getElementById('togglePassword');

// ============================================
// Toggle Password Visibility
// ============================================

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

// ============================================
// Remember Me Functionality
// ============================================

function loadSavedCredentials() {
    try {
        const savedEmail = localStorage.getItem('customerEmail');
        const savedPassword = localStorage.getItem('customerPassword');
        const savedRemember = localStorage.getItem('customerRemember');
        
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
            localStorage.setItem('customerEmail', email);
            localStorage.setItem('customerPassword', password);
            localStorage.setItem('customerRemember', 'true');
        } else {
            localStorage.removeItem('customerEmail');
            localStorage.removeItem('customerPassword');
            localStorage.removeItem('customerRemember');
        }
    } catch (error) {
        console.warn('Unable to save credentials:', error);
    }
}

// Load saved credentials on page load
loadSavedCredentials();

// ============================================
// Loading State Management
// ============================================

function setLoading(isLoading) {
    if (isLoading) {
        loginBtn.disabled = true;
        btnText.classList.add('d-none');
        btnSpinner.classList.remove('d-none');
        loginBtn.classList.add('btn-login-loading');
    } else {
        loginBtn.disabled = false;
        btnText.classList.remove('d-none');
        btnSpinner.classList.add('d-none');
        loginBtn.classList.remove('btn-login-loading');
    }
}

// ============================================
// Toast/Notification System
// ============================================

function showMessage(message, type = 'success') {
    // Check if global showToast exists (from main.js)
    if (typeof showToast === 'function') {
        showToast(message, type);
        return;
    }
    
    // Fallback notification system
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
            width: 100%;
        `;
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#4caf50' : 
                    type === 'danger' ? '#f44336' : 
                    type === 'warning' ? '#ff9800' : '#2196f3';
    
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        margin-top: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.5s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
    `;
    
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                        type === 'danger' ? 'fa-exclamation-circle' : 
                        type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
        ">&times;</button>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }
    }, 5000);
}

// Add animations if not already present
if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Form Validation
// ============================================

function validateForm(email, password) {
    if (!email || !password) {
        showMessage('Please enter email and password', 'danger');
        return false;
    }
    
    /*if (!email.includes('@') || !email.includes('.')) {
        showMessage('Please enter a valid email address', 'danger');
        return false;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'danger');
        return false;
    }*/
    
    return true;
}

// ============================================
// Handle Login Form Submission
// ============================================

loginForm.addEventListener('submit', function(e) {
    // Prevent default form submission (prevents page reload)
    e.preventDefault();
    e.stopPropagation();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Validate form
    if (!validateForm(email, password)) {
        return;
    }
    
    // Show loading state
    setLoading(true);
    
    // Simulate login process (frontend only)
    setTimeout(() => {
        // Save credentials if "Remember Me" is checked
        saveCredentials(email, password);
        
        // Store login session
        sessionStorage.setItem('customerLoggedIn', 'true');
        sessionStorage.setItem('customerEmail', email);
        sessionStorage.setItem('customerLoginTime', new Date().toISOString());
        
        // Show success message
        showMessage('Login successful! Redirecting to dashboard...', 'success');
        
        // Reset loading state
        setLoading(false);
        
        // Redirect to customer dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 1500);
});

// ============================================
// Social Login Handlers
// ============================================

document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' :
                        this.classList.contains('facebook') ? 'Facebook' : 'Apple';
        
        showMessage(`Redirecting to ${provider} login...`, 'info');
        
        // Simulate social login redirect
        setTimeout(() => {
            // In a real app, you'd redirect to OAuth provider
            window.location.href = `${provider.toLowerCase()}-auth.html`;
        }, 1000);
    });
});

// ============================================
// Keyboard Support - Enter key to submit
// ============================================

passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

emailInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        passwordInput.focus();
    }
});

// ============================================
// Input Focus Effects
// ============================================

emailInput.addEventListener('focus', function() {
    this.parentElement.parentElement.classList.add('focused');
});

emailInput.addEventListener('blur', function() {
    this.parentElement.parentElement.classList.remove('focused');
});

passwordInput.addEventListener('focus', function() {
    this.parentElement.parentElement.classList.add('focused');
});

passwordInput.addEventListener('blur', function() {
    this.parentElement.parentElement.classList.remove('focused');
});

// ============================================
// Clear Session on Login Page (Optional)
// ============================================

// Uncomment to clear session when user visits login page
// sessionStorage.removeItem('customerLoggedIn');

// ============================================
// Console Log for Development
// ============================================

console.log('Customer Login Page Initialized');
console.log('Remember Me is:', rememberMeCheckbox.checked);