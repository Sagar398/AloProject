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