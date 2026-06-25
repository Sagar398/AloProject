// js/service_provider/payment.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Payment JS loaded successfully');
    
    // ============================================
    // SIDEBAR TOGGLE (Mobile)
    // ============================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
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
    // PAYMENTS DATA
    // ============================================
    const paymentsList = [
        {
            id: 1,
            paymentId: 'PAY001',
            paymentDate: '2024-08-15',
            paymentMethod: 'OM',
            serviceName: 'Plumbing',
            serviceDate: '2024-08-14',
            totalCompletedService: 3,
            paymentAmount: 450,
            paymentStatus: 'Success'
        },
        {
            id: 2,
            paymentId: 'PAY002',
            paymentDate: '2024-08-16',
            paymentMethod: 'MoMo',
            serviceName: 'Pipe Repair',
            serviceDate: '2024-08-15',
            totalCompletedService: 2,
            paymentAmount: 350,
            paymentStatus: 'Success'
        },
        {
            id: 3,
            paymentId: 'PAY003',
            paymentDate: '2024-08-18',
            paymentMethod: 'VISA',
            serviceName: 'Water Heater',
            serviceDate: '2024-08-17',
            totalCompletedService: 1,
            paymentAmount: 300,
            paymentStatus: 'Success'
        },
        {
            id: 4,
            paymentId: 'PAY004',
            paymentDate: '2024-08-19',
            paymentMethod: 'OM',
            serviceName: 'Painting',
            serviceDate: '2024-08-18',
            totalCompletedService: 5,
            paymentAmount: 800,
            paymentStatus: 'Pending'
        },
        {
            id: 5,
            paymentId: 'PAY005',
            paymentDate: '2024-08-20',
            paymentMethod: 'MoMo',
            serviceName: 'Electrician',
            serviceDate: '2024-08-19',
            totalCompletedService: 2,
            paymentAmount: 250,
            paymentStatus: 'Success'
        },
        {
            id: 6,
            paymentId: 'PAY006',
            paymentDate: '2024-08-21',
            paymentMethod: 'VISA',
            serviceName: 'Carpentry',
            serviceDate: '2024-08-20',
            totalCompletedService: 4,
            paymentAmount: 600,
            paymentStatus: 'Failed'
        },
        {
            id: 7,
            paymentId: 'PAY007',
            paymentDate: '2024-08-22',
            paymentMethod: 'OM',
            serviceName: 'Plumbing',
            serviceDate: '2024-08-21',
            totalCompletedService: 1,
            paymentAmount: 175,
            paymentStatus: 'Success'
        },
        {
            id: 8,
            paymentId: 'PAY008',
            paymentDate: '2024-08-23',
            paymentMethod: 'MoMo',
            serviceName: 'Pipe Repair',
            serviceDate: '2024-08-22',
            totalCompletedService: 3,
            paymentAmount: 400,
            paymentStatus: 'Pending'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'Payment of $450 received for booking #BK001', time: '2 hours ago', unread: true },
        { id: 2, message: 'Payment settlement processed successfully', time: '1 day ago', unread: false }
    ];
    
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
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        const topBarUserName = document.getElementById('topBarUserName');
        const topBarUserImg = document.getElementById('topBarUserImg');
        
        if (topBarUserName) topBarUserName.textContent = serviceProviderData.name;
        if (topBarUserImg) topBarUserImg.src = serviceProviderData.profileImage;
    }
    
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
    }
    
    // ============================================
    // FORMAT DATE
    // ============================================
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
    
    // ============================================
    // GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        const statusMap = {
            'Success': 'success',
            'Pending': 'pending',
            'Failed': 'danger'
        };
        return statusMap[status] || 'secondary';
    }
    
    // ============================================
    // UPDATE SUMMARY COUNTS
    // ============================================
    function updateSummaryCounts(filteredList) {
        const totalPayments = filteredList.length;
        const totalAmount = filteredList.reduce((sum, p) => sum + p.paymentAmount, 0);
        const successCount = filteredList.filter(p => p.paymentStatus === 'Success').length;
        const pendingCount = filteredList.filter(p => p.paymentStatus === 'Pending').length;
        
        document.getElementById('totalPayments').textContent = totalPayments;
        document.getElementById('totalAmount').textContent = '$' + totalAmount.toLocaleString();
        document.getElementById('successPayments').textContent = successCount;
        document.getElementById('pendingPayments').textContent = pendingCount;
    }
    
    // ============================================
    // RENDER PAYMENTS TABLE
    // ============================================
    function renderPaymentsTable(filteredList) {
        const tableBody = document.getElementById('paymentsTableBody');
        if (!tableBody) return;
        
        if (filteredList.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted py-4">
                        <i class="fas fa-credit-card fa-2x mb-2 d-block"></i>
                        No payments found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        filteredList.forEach(payment => {
            const statusClass = getStatusClass(payment.paymentStatus);
            
            html += `
                <tr>
                    <td><strong>${payment.paymentId}</strong></td>
                    <td>${formatDate(payment.paymentDate)}</td>
                    <td>
                        <span class="badge bg-secondary">${payment.paymentMethod}</span>
                    </td>
                    <td>${payment.serviceName}</td>
                    <td>${formatDate(payment.serviceDate)}</td>
                    <td>${payment.totalCompletedService}</td>
                    <td><strong>$${payment.paymentAmount}</strong></td>
                    <td>
                        <span class="status-badge status-${statusClass}">${payment.paymentStatus}</span>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        updateSummaryCounts(filteredList);
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const searchQuery = document.getElementById('searchPayment').value.toLowerCase().trim();
        const filterMethod = document.getElementById('filterPaymentMethod').value;
        const filterStatus = document.getElementById('filterPaymentStatus').value;
        
        let filtered = paymentsList;
        
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.paymentId.toLowerCase().includes(searchQuery) ||
                p.serviceName.toLowerCase().includes(searchQuery)
            );
        }
        
        if (filterMethod) {
            filtered = filtered.filter(p => p.paymentMethod === filterMethod);
        }
        
        if (filterStatus !== 'all') {
            filtered = filtered.filter(p => p.paymentStatus === filterStatus);
        }
        
        renderPaymentsTable(filtered);
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFilterEvents() {
        document.getElementById('searchPayment').addEventListener('input', applyFilters);
        document.getElementById('filterPaymentMethod').addEventListener('change', applyFilters);
        document.getElementById('filterPaymentStatus').addEventListener('change', applyFilters);
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializePayment() {
        console.log('Initializing payment...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        renderPaymentsTable(paymentsList);
        attachFilterEvents();
        console.log('Payment initialization complete');
    }
    
    initializePayment();
    
});