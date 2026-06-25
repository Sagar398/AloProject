// js/service_provider/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Dashboard JS loaded successfully');
    
    // ============================================
    // SIDEBAR TOGGLE (Mobile)
    // ============================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // ============================================
    // SET CURRENT DATE
    // ============================================
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // ============================================
    // SERVICE PROVIDER DATA
    // ============================================
    const serviceProviderData = {
        name: 'John Doe',
        firstName: 'John',
        serviceType: 'Plumber',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        const sidebarProviderName = document.getElementById('sidebarProviderName');
        const sidebarProviderService = document.getElementById('sidebarProviderService');
        const sidebarProfileImg = document.getElementById('sidebarProfileImg');
        
        if (sidebarProviderName) sidebarProviderName.textContent = serviceProviderData.name;
        if (sidebarProviderService) sidebarProviderService.textContent = serviceProviderData.serviceType;
        if (sidebarProfileImg) sidebarProfileImg.src = serviceProviderData.profileImage;
        
        console.log('Sidebar profile populated');
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        const topBarUserName = document.getElementById('topBarUserName');
        const topBarUserImg = document.getElementById('topBarUserImg');
        const welcomeName = document.getElementById('welcomeName');
        
        if (topBarUserName) topBarUserName.textContent = serviceProviderData.name;
        if (topBarUserImg) topBarUserImg.src = serviceProviderData.profileImage;
        if (welcomeName) welcomeName.textContent = serviceProviderData.firstName;
        
        console.log('Top bar populated');
    }
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New booking request received from Alice Martin', time: '5 min ago', unread: true },
        { id: 2, message: 'Payment received for booking #BK004', time: '1 hour ago', unread: true },
        { id: 3, message: 'Review received from Pierre Dubois', time: '3 hours ago', unread: true }
    ];
    
    // ============================================
    // POPULATE NOTIFICATIONS
    // ============================================
    function populateNotifications() {
        const notificationCount = document.getElementById('notificationCount');
        const notificationList = document.getElementById('notificationList');
        
        const unreadCount = notifications.filter(n => n.unread).length;
        
        if (notificationCount) {
            notificationCount.textContent = unreadCount;
            if (unreadCount === 0) notificationCount.style.display = 'none';
        }
        
        if (notificationList) {
            let html = '';
            notifications.forEach(notification => {
                html += `
                    <li>
                        <a class="dropdown-item ${notification.unread ? 'fw-bold' : ''}" href="#">
                            <small class="text-muted d-block">${notification.time}</small>
                            ${notification.message}
                        </a>
                    </li>
                `;
            });
            html += '<li><hr class="dropdown-divider"></li>';
            html += '<li><a class="dropdown-item text-center" href="#">View All Notifications</a></li>';
            notificationList.innerHTML = html;
        }
        
        console.log('Notifications populated');
    }
    
    // ============================================
    // STATS DATA
    // ============================================
    const stats = [
        { label: 'Pending', value: 12, icon: 'fa-clock', color: 'warning' },
        { label: 'Upcoming', value: 8, icon: 'fa-calendar-alt', color: 'info' },
        { label: 'Confirmed', value: 5, icon: 'fa-check-circle', color: 'primary' },
        { label: 'Completed', value: 45, icon: 'fa-check-double', color: 'success' },
        { label: 'Canceled', value: 3, icon: 'fa-times-circle', color: 'danger' },
        { label: 'Total Earnings', value: '$5.2K', icon: 'fa-dollar-sign', color: 'success' }
    ];
    
    // ============================================
    // POPULATE STATS CARDS
    // ============================================
    function populateStatsCards() {
        const statsCardsContainer = document.getElementById('statsCards');
        if (!statsCardsContainer) return;
        
        let statsHTML = '';
        stats.forEach(stat => {
            statsHTML += `
                <div class="col-xl-2 col-lg-4 col-md-6">
                    <div class="stat-card">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <p class="text-muted mb-1">${stat.label}</p>
                                <h3>${stat.value}</h3>
                            </div>
                            <div class="stat-icon bg-${stat.color} bg-opacity-10 text-${stat.color}">
                                <i class="fas ${stat.icon}"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        statsCardsContainer.innerHTML = statsHTML;
        console.log('Stats cards populated');
    }
    
    // ============================================
    // RECENT BOOKINGS DATA
    // ============================================
    const recentBookings = [
        {
            bookingId: '#BK001',
            customerName: 'Alice Martin',
            customerEmail: 'alice@email.com',
            customerMobile: '+33 123456789',
            serviceName: 'Plumbing',
            serviceDateTime: '20/08/2024 10:00 AM',
            serviceMan: 'Mike Johnson',
            paymentAmount: 150,
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024',
            bookingStatus: 'Pending'
        },
        {
            bookingId: '#BK002',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            serviceName: 'Pipe Repair',
            serviceDateTime: '21/08/2024 02:00 PM',
            serviceMan: 'David Brown',
            paymentAmount: 200,
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024',
            bookingStatus: 'Confirmed'
        },
        {
            bookingId: '#BK003',
            customerName: 'Sophie Laurent',
            customerEmail: 'sophie@email.com',
            customerMobile: '+33 456789123',
            serviceName: 'Water Heater',
            serviceDateTime: '22/08/2024 09:00 AM',
            serviceMan: '-',
            paymentAmount: 300,
            paymentStatus: 'Pending',
            location: 'France',
            bookingAt: '19/08/2024',
            bookingStatus: 'Upcoming'
        },
        {
            bookingId: '#BK004',
            customerName: 'Pierre Dubois',
            customerEmail: 'pierre@email.com',
            customerMobile: '+33 789123456',
            serviceName: 'Plumbing',
            serviceDateTime: '23/08/2024 11:00 AM',
            serviceMan: 'Tom Wilson',
            paymentAmount: 450,
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024',
            bookingStatus: 'Completed'
        },
        {
            bookingId: '#BK005',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            serviceName: 'Pipe Repair',
            serviceDateTime: '24/08/2024 03:00 PM',
            serviceMan: '-',
            paymentAmount: 175,
            paymentStatus: 'Pending',
            location: 'France',
            bookingAt: '19/08/2024',
            bookingStatus: 'Pending'
        }
    ];
    
    // ============================================
    // HELPER: GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        const statusMap = {
            'Success': 'success',
            'Pending': 'pending',
            'Failed': 'danger',
            'Confirmed': 'success',
            'Upcoming': 'info',
            'Completed': 'success',
            'Canceled': 'danger'
        };
        return statusMap[status] || 'secondary';
    }
    
    // ============================================
    // POPULATE RECENT BOOKINGS TABLE
    // ============================================
    function populateRecentBookings() {
        const tableBody = document.getElementById('recentBookingsTable');
        if (!tableBody) return;
        
        let tableHTML = '';
        
        recentBookings.forEach(booking => {
            const paymentStatusClass = getStatusClass(booking.paymentStatus);
            const bookingStatusClass = getStatusClass(booking.bookingStatus);
            
            tableHTML += `
                <tr>
                    <td><strong>${booking.bookingId}</strong></td>
                    <td>${booking.customerName}</td>
                    <td>${booking.customerEmail}</td>
                    <td>${booking.customerMobile}</td>
                    <td>${booking.serviceName}</td>
                    <td>${booking.serviceDateTime}</td>
                    <td>${booking.serviceMan}</td>
                    <td>$${booking.paymentAmount}</td>
                    <td><span class="status-badge status-${paymentStatusClass}">${booking.paymentStatus}</span></td>
                    <td>${booking.location}</td>
                    <td>${booking.bookingAt}</td>
                    <td><span class="status-badge status-${bookingStatusClass}">${booking.bookingStatus}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary view-booking" data-booking-id="${booking.bookingId}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = tableHTML;
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-booking').forEach(button => {
            button.addEventListener('click', function() {
                const bookingId = this.getAttribute('data-booking-id');
                const booking = recentBookings.find(b => b.bookingId === bookingId);
                if (booking) {
                    alert(`Booking: ${booking.bookingId}\nCustomer: ${booking.customerName}\nService: ${booking.serviceName}\nStatus: ${booking.bookingStatus}`);
                }
            });
        });
        
        console.log('Recent bookings table populated');
    }
    
    // ============================================
    // UPDATE BOOKING BADGE
    // ============================================
    function updateBookingBadge() {
        const bookingBadge = document.getElementById('bookingBadge');
        if (bookingBadge) {
            const pendingCount = recentBookings.filter(b => b.bookingStatus === 'Pending').length;
            bookingBadge.textContent = pendingCount;
        }
    }
    
    // ============================================
    // INITIALIZE CHARTS
    // ============================================
    function initializeCharts() {
        // Booking Chart
        const bookingChartCanvas = document.getElementById('bookingChart');
        if (bookingChartCanvas) {
            const ctx = bookingChartCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Pending',
                            data: [3, 2, 4, 1, 5, 2, 3],
                            backgroundColor: '#ffc107'
                        },
                        {
                            label: 'Confirmed',
                            data: [2, 3, 1, 2, 3, 1, 2],
                            backgroundColor: '#0d6efd'
                        },
                        {
                            label: 'Completed',
                            data: [5, 4, 6, 3, 7, 4, 5],
                            backgroundColor: '#198754'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                        }
                    }
                }
            });
            console.log('Booking chart initialized');
        }
        
        // Service Chart
        const serviceChartCanvas = document.getElementById('serviceChart');
        if (serviceChartCanvas) {
            const ctx = serviceChartCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Plumbing', 'Pipe Repair', 'Water Heater'],
                    datasets: [{
                        data: [25, 15, 10],
                        backgroundColor: ['#4361ee', '#3f37c9', '#4caf50']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            console.log('Service chart initialized');
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeDashboard() {
        console.log('Initializing dashboard...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateStatsCards();
        populateRecentBookings();
        updateBookingBadge();
        initializeCharts();
        console.log('Dashboard initialization complete');
    }
    
    // Call the main function
    initializeDashboard();
    
});