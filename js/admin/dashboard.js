// Admin Dashboard JavaScript

// Simulated data - will be replaced with actual API calls
const adminData = {
    stats: {
        totalServiceProviders: 128,
        totalCustomers: 2450,
        totalSellers: 86,
        totalEarnings: 48500,
        totalBookings: 1250,
        upcomingBookings: 45,
        completedBookings: 985,
        pendingBookings: 220
    },
    recentBookings: [
        { id: 'BK001', customer: 'John Doe', service: 'Plumbing', date: '2024-01-15', amount: 150, status: 'Completed' },
        { id: 'BK002', customer: 'Jane Smith', service: 'Electrical', date: '2024-01-16', amount: 200, status: 'Upcoming' },
        { id: 'BK003', customer: 'Mike Johnson', service: 'AC Repair', date: '2024-01-17', amount: 180, status: 'Pending' },
        { id: 'BK004', customer: 'Sarah Williams', service: 'Painting', date: '2024-01-18', amount: 350, status: 'Confirmed' },
        { id: 'BK005', customer: 'Robert Brown', service: 'Carpentry', date: '2024-01-19', amount: 220, status: 'Pending' }
    ]
};

// Format currency
function formatCurrency(amount) {
    return '$' + amount.toLocaleString();
}

// Update dashboard stats
function updateDashboardStats() {
    document.getElementById('totalServiceProviders').textContent = adminData.stats.totalServiceProviders;
    document.getElementById('totalCustomers').textContent = adminData.stats.totalCustomers;
    document.getElementById('totalSellers').textContent = adminData.stats.totalSellers;
    document.getElementById('totalEarnings').textContent = formatCurrency(adminData.stats.totalEarnings);
    document.getElementById('totalBookings').textContent = adminData.stats.totalBookings;
    document.getElementById('upcomingBookings').textContent = adminData.stats.upcomingBookings;
    document.getElementById('completedBookings').textContent = adminData.stats.completedBookings;
    document.getElementById('pendingBookings').textContent = adminData.stats.pendingBookings;
}

// Load recent bookings
function loadRecentBookings() {
    const tbody = document.getElementById('recentBookings');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    adminData.recentBookings.forEach(booking => {
        const row = document.createElement('tr');
        let statusClass = '';
        switch(booking.status) {
            case 'Completed': statusClass = 'status-success'; break;
            case 'Pending': statusClass = 'status-pending'; break;
            case 'Upcoming': statusClass = 'status-info'; break;
            default: statusClass = 'status-active';
        }
        
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.service}</td>
            <td>${formatDate(booking.date)}</td>
            <td>${formatCurrency(booking.amount)}</td>
            <td><span class="status-badge ${statusClass}">${booking.status}</span></td>
            <td><button class="btn btn-sm btn-outline-primary" onclick="viewBooking('${booking.id}')"><i class="fas fa-eye"></i></button></td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize Earnings Chart
function initEarningsChart() {
    const ctx = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Earnings',
                data: [2500, 3200, 4100, 4800, 5200, 5800, 6200, 7100, 8500, 9200, 10500, 12500],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// Initialize Booking Chart
function initBookingChart() {
    const ctx = document.getElementById('bookingChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending', 'Upcoming', 'Cancelled'],
            datasets: [{
                data: [985, 220, 45, 30],
                backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// View booking details
function viewBooking(bookingId) {
    showToast(`Viewing booking ${bookingId}`, 'info');
    // Redirect to booking details page
    // window.location.href = `booking-details.html?id=${bookingId}`;
}

// Sidebar toggle for mobile
document.getElementById('sidebarToggle')?.addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Dark mode toggle
document.getElementById('darkModeToggle')?.addEventListener('click', function() {
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
});

// Load dark mode preference
function loadDarkModePreference() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
    loadRecentBookings();
    initEarningsChart();
    initBookingChart();
    loadDarkModePreference();
});





