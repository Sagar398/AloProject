// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Sidebar Toggle for Mobile
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('sidebar-active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.getElementById('toast-container').appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Confirmation Dialog
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Format Date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Data Table Search
function filterTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');
    
    for (let i = 1; i < tr.length; i++) {
        let txtValue = '';
        const td = tr[i].getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            txtValue += td[j].textContent || td[j].innerText;
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

// Loader
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.backgroundColor = 'rgba(0,0,0,0.5)';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.zIndex = '99999';
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
}

// API Helper Functions
const API = {
    baseURL: '/api',
    
    async request(endpoint, method = 'GET', data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            
            return result;
        } catch (error) {
            showToast(error.message, 'danger');
            throw error;
        }
    },
    
    get(endpoint) {
        return this.request(endpoint);
    },
    
    post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    },
    
    put(endpoint, data) {
        return this.request(endpoint, 'PUT', data);
    },
    
    delete(endpoint) {
        return this.request(endpoint, 'DELETE');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API, showToast, formatCurrency, formatDate };
}

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
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Please enter a valid email address', 'danger');
        return false;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'danger');
        return false;
    }
    
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

/* ============================================
   Customer Dashboard JavaScript
   For: dashboard.html
   ============================================ */

// ============================================
// DOM Elements
// ============================================

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const notificationBtn = document.getElementById('notificationBtn');
const notificationMenu = document.getElementById('notificationMenu');
const searchInput = document.getElementById('searchInput');

// ============================================
// Sample Data
// ============================================

const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    totalBookings: 12,
    totalOrders: 8,
    pendingBookings: 3,
    totalSpent: 485.50
};

const recentActivities = [
    { icon: 'booking', iconClass: 'fa-calendar-check', title: 'Booking confirmed #BK1003', time: '2 minutes ago' },
    { icon: 'order', iconClass: 'fa-shopping-cart', title: 'Order #ORD1002 shipped', time: '1 hour ago' },
    { icon: 'payment', iconClass: 'fa-credit-card', title: 'Payment received $147.33', time: '3 hours ago' },
    { icon: 'service', iconClass: 'fa-tools', title: 'Service completed by Mike\'s Plumbing', time: 'Yesterday' },
    { icon: 'booking', iconClass: 'fa-calendar-check', title: 'New booking #BK1006', time: 'Yesterday' }
];

const quickServices = [
    { icon: 'fa-wrench', name: 'Plumber', desc: 'Pipe repair' },
    { icon: 'fa-bolt', name: 'Electrician', desc: 'Wiring service' },
    { icon: 'fa-paint-brush', name: 'Painter', desc: 'Wall painting' },
    { icon: 'fa-tools', name: 'Carpenter', desc: 'Furniture repair' },
    { icon: 'fa-snowplow', name: 'AC Repair', desc: 'Cooling service' },
    { icon: 'fa-truck', name: 'Towing', desc: 'Vehicle towing' }
];

// ============================================
// User Data Initialization
// ============================================

function initUserData() {
    // Update user profile
    const userName = document.getElementById('userName');
    const welcomeName = document.getElementById('welcomeName');
    
    if (userName) userName.textContent = userData.name;
    if (welcomeName) welcomeName.textContent = userData.name;
    
    // Update stats
    document.getElementById('totalBookings').textContent = userData.totalBookings;
    document.getElementById('totalOrders').textContent = userData.totalOrders;
    document.getElementById('pendingBookings').textContent = userData.pendingBookings;
    document.getElementById('totalSpent').textContent = '$' + userData.totalSpent.toFixed(2);
}

// ============================================
// Render Recent Activities
// ============================================

function renderActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    recentActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon ${activity.icon}">
                <i class="fas ${activity.iconClass}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.title}</p>
                <small>${activity.time}</small>
            </div>
        `;
        activityList.appendChild(item);
    });
}

// ============================================
// Render Quick Services
// ============================================

function renderQuickServices() {
    const servicesGrid = document.getElementById('quickServices');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    quickServices.forEach(service => {
        const card = document.createElement('a');
        card.className = 'service-card';
        card.href = 'services.html';
        card.innerHTML = `
            <i class="fas ${service.icon}"></i>
            <h6>${service.name}</h6>
            <p>${service.desc}</p>
        `;
        servicesGrid.appendChild(card);
    });
}

// ============================================
// Initialize Charts
// ============================================

function initBookingChart() {
    const ctx = document.getElementById('bookingChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Bookings',
                data: [3, 5, 2, 7, 4, 8, 6],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4361ee',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function initSpendingChart() {
    const ctx = document.getElementById('spendingChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Plumbing', 'Electrical', 'AC Repair', 'Painting', 'Carpentry'],
            datasets: [{
                data: [120, 80, 140, 60, 85],
                backgroundColor: ['#4361ee', '#4caf50', '#ff9800', '#2196f3', '#9c27b0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// ============================================
// Notification Dropdown
// ============================================

notificationBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    notificationMenu.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!notificationBtn.contains(e.target) && !notificationMenu.contains(e.target)) {
        notificationMenu.classList.remove('active');
    }
});

// Mark notification as read on click
document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.remove('unread');
        // Update badge count
        const badge = document.querySelector('.notification-btn .badge');
        if (badge) {
            const current = parseInt(badge.textContent);
            if (current > 0) {
                badge.textContent = current - 1;
                if (badge.textContent === '0') {
                    badge.style.display = 'none';
                }
            }
        }
    });
});

// ============================================
// Sidebar Toggle
// ============================================

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleSidebar);
sidebarClose.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Close sidebar on window resize (if open)
window.addEventListener('resize', function() {
    if (window.innerWidth > 767 && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// ============================================
// Search Functionality
// ============================================

searchInput.addEventListener('keyup', function(e) {
    const query = this.value.trim();
    if (e.key === 'Enter' && query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
});

// ============================================
// Theme Manager Integration
// ============================================

// If themeManager is available, use it
if (typeof themeManager !== 'undefined') {
    // Listen for theme changes
    themeManager.addListener(function(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// Theme toggle button
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        if (typeof themeManager !== 'undefined') {
            themeManager.toggleTheme();
        } else {
            // Fallback theme toggle
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
        }
    });
}

// Load dark mode preference (fallback)
if (typeof themeManager === 'undefined') {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// ============================================
// Chart Period Change
// ============================================

document.getElementById('chartPeriod')?.addEventListener('change', function() {
    // Update chart data based on period
    const period = this.value;
    console.log('Chart period changed to:', period);
    // In a real app, you would fetch new data and update charts
});

// ============================================
// Initialize Dashboard
// ============================================

function initDashboard() {
    initUserData();
    renderActivities();
    renderQuickServices();
    initBookingChart();
    initSpendingChart();
    
    console.log('Customer Dashboard initialized');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);

// ============================================
// Toast Notification Helper (if main.js not loaded)
// ============================================

if (typeof showToast === 'undefined') {
    window.showToast = function(message, type = 'success') {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 350px;
            width: 100%;
        `;
        container.id = 'toast-container';
        
        if (!document.getElementById('toast-container')) {
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
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.5s ease';
                setTimeout(() => toast.remove(), 500);
            }
        }, 5000);
    };
    
    // Add animation styles if not present
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
        `;
        document.head.appendChild(style);
    }
}

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