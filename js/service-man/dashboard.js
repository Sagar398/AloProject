/* ============================================
   Service Man Dashboard JavaScript
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
const statusToggle = document.getElementById('statusToggle');

// ============================================
// Sample Data
// ============================================

const userData = {
    name: 'Tom Wilson',
    email: 'tom.wilson@alo.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    totalJobs: 48,
    completedJobs: 32,
    pendingJobs: 16,
    averageRating: 4.8,
    status: 'online'
};

const todayJobs = [
    { id: 'JOB1001', customer: 'John Doe', service: 'Plumbing Repair', time: '09:00 AM', status: 'pending' },
    { id: 'JOB1002', customer: 'Jane Smith', service: 'Electrical Wiring', time: '11:00 AM', status: 'in-progress' },
    { id: 'JOB1003', customer: 'Mike Johnson', service: 'AC Service', time: '02:00 PM', status: 'pending' },
    { id: 'JOB1004', customer: 'Sarah Williams', service: 'Wall Painting', time: '04:00 PM', status: 'pending' },
    { id: 'JOB1005', customer: 'Robert Brown', service: 'Carpentry', time: '06:00 PM', status: 'completed' }
];

// ============================================
// User Data Initialization
// ============================================

function initUserData() {
    const userName = document.getElementById('userName');
    const welcomeName = document.getElementById('welcomeName');
    
    if (userName) userName.textContent = userData.name;
    if (welcomeName) welcomeName.textContent = userData.name;
    
    // Update stats
    document.getElementById('totalJobs').textContent = userData.totalJobs;
    document.getElementById('completedJobs').textContent = userData.completedJobs;
    document.getElementById('pendingJobs').textContent = userData.pendingJobs;
    document.getElementById('averageRating').textContent = userData.averageRating.toFixed(1);
    document.getElementById('pendingJobsCount').textContent = userData.pendingJobs;
    
    // Update status
    updateStatusDisplay(userData.status);
}

function updateStatusDisplay(status) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const statusIcon = document.querySelector('.status-toggle i');
    
    if (status === 'online') {
        statusDot.className = 'status-dot online';
        statusText.textContent = 'Available';
        statusIcon.className = 'fas fa-toggle-on';
    } else {
        statusDot.className = 'status-dot offline';
        statusText.textContent = 'Unavailable';
        statusIcon.className = 'fas fa-toggle-off';
    }
}

// ============================================
// Toggle Status
// ============================================

statusToggle.addEventListener('click', function() {
    const isOnline = userData.status === 'online';
    userData.status = isOnline ? 'offline' : 'online';
    updateStatusDisplay(userData.status);
    
    const message = userData.status === 'online' ? 'You are now available for jobs' : 'You are now offline';
    showMessage(message, userData.status === 'online' ? 'success' : 'warning');
});

// ============================================
// Render Today's Jobs
// ============================================

function renderTodayJobs() {
    const jobList = document.getElementById('todayJobs');
    if (!jobList) return;
    
    jobList.innerHTML = '';
    
    todayJobs.forEach(job => {
        const item = document.createElement('div');
        item.className = 'job-item';
        
        const statusClass = job.status === 'pending' ? 'pending' : 
                           job.status === 'in-progress' ? 'in-progress' : 'completed';
        const statusText = job.status === 'pending' ? 'Pending' : 
                          job.status === 'in-progress' ? 'In Progress' : 'Completed';
        
        item.innerHTML = `
            <div class="job-info">
                <div class="job-icon">
                    <i class="fas fa-tools"></i>
                </div>
                <div class="job-details">
                    <p>${job.service} - ${job.customer}</p>
                    <small><i class="far fa-clock"></i> ${job.time}</small>
                </div>
            </div>
            <span class="job-status ${statusClass}">${statusText}</span>
            <div class="job-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="viewJob('${job.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${job.status === 'pending' ? 
                    `<button class="btn btn-sm btn-success" onclick="startJob('${job.id}')">
                        <i class="fas fa-play"></i> Start
                    </button>` : ''
                }
                ${job.status === 'in-progress' ? 
                    `<button class="btn btn-sm btn-primary" onclick="completeJob('${job.id}')">
                        <i class="fas fa-check"></i> Complete
                    </button>` : ''
                }
            </div>
        `;
        jobList.appendChild(item);
    });
}

// ============================================
// Job Actions
// ============================================

function viewJob(jobId) {
    showMessage(`Viewing job ${jobId}`, 'info');
    // In real app, redirect to job details page
}

function startJob(jobId) {
    const job = todayJobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'in-progress';
        renderTodayJobs();
        showMessage(`Job ${jobId} started successfully`, 'success');
    }
}

function completeJob(jobId) {
    const job = todayJobs.find(j => j.id === jobId);
    if (job) {
        job.status = 'completed';
        userData.completedJobs++;
        userData.pendingJobs--;
        userData.totalJobs++;
        renderTodayJobs();
        initUserData();
        showMessage(`Job ${jobId} completed! Great work! 🎉`, 'success');
    }
}

// ============================================
// Initialize Charts
// ============================================

function initJobChart() {
    const ctx = document.getElementById('jobChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Completed',
                data: [3, 5, 4, 6, 7, 4, 3],
                backgroundColor: '#4caf50',
                borderRadius: 4
            },
            {
                label: 'Pending',
                data: [2, 1, 3, 1, 2, 3, 1],
                backgroundColor: '#ff9800',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
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

function initStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Pending'],
            datasets: [{
                data: [32, 8, 16],
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
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
// Theme Manager Integration
// ============================================

if (typeof themeManager !== 'undefined') {
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

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        if (typeof themeManager !== 'undefined') {
            themeManager.toggleTheme();
        } else {
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
    const period = this.value;
    console.log('Chart period changed to:', period);
    // In a real app, you would fetch new data and update charts
});

// ============================================
// Toast Notification Helper
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

// ============================================
// Initialize Dashboard
// ============================================

function initDashboard() {
    initUserData();
    renderTodayJobs();
    initJobChart();
    initStatusChart();
    
    console.log('Service Man Dashboard initialized');
}

document.addEventListener('DOMContentLoaded', initDashboard);