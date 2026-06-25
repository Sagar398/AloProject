// js/seller/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Seller Dashboard JS loaded successfully');
    
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
    // SET CURRENT DATE
    // ============================================
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // ============================================
    // SHOP DATA
    // ============================================
    const shopData = {
        shopName: 'Paris Hardware Store',
        sellerName: 'Pierre Martin',
        firstName: 'Pierre',
        shopType: 'Hardware',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // ORDERS DATA
    // ============================================
    const recentOrders = [
        {
            orderId: '#ORD001',
            customerName: 'Alice Martin',
            customerEmail: 'alice@email.com',
            customerMobile: '+33 123456789',
            timeSlot: '10:00 AM - 12:00 PM',
            totalAmount: 150,
            paymentMethod: 'OM',
            paymentStatus: 'Success',
            orderType: 'Pickup from Store',
            orderStatus: 'Confirmed'
        },
        {
            orderId: '#ORD002',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            timeSlot: '02:00 PM - 04:00 PM',
            totalAmount: 200,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            orderType: 'Home Delivery',
            orderStatus: 'Pending'
        },
        {
            orderId: '#ORD003',
            customerName: 'Sophie Laurent',
            customerEmail: 'sophie@email.com',
            customerMobile: '+33 456789123',
            timeSlot: '09:00 AM - 11:00 AM',
            totalAmount: 300,
            paymentMethod: 'VISA',
            paymentStatus: 'Success',
            orderType: 'Pickup from Store',
            orderStatus: 'Delivered'
        },
        {
            orderId: '#ORD004',
            customerName: 'Jean Dupont',
            customerEmail: 'jean@email.com',
            customerMobile: '+33 555666777',
            timeSlot: '11:00 AM - 01:00 PM',
            totalAmount: 450,
            paymentMethod: 'OM',
            paymentStatus: 'Pending',
            orderType: 'Pickup from Store',
            orderStatus: 'Pending'
        },
        {
            orderId: '#ORD005',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            timeSlot: '03:00 PM - 05:00 PM',
            totalAmount: 175,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            orderType: 'Home Delivery',
            orderStatus: 'Canceled'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New order received from Alice Martin', time: '10 min ago', unread: true },
        { id: 2, message: 'Payment received for order #ORD001', time: '1 hour ago', unread: true },
        { id: 3, message: 'Order #ORD003 has been delivered', time: '3 hours ago', unread: false }
    ];
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        const sidebarShopName = document.getElementById('sidebarShopName');
        const sidebarShopType = document.getElementById('sidebarShopType');
        const sidebarProfileImg = document.getElementById('sidebarProfileImg');
        
        if (sidebarShopName) sidebarShopName.textContent = shopData.shopName;
        if (sidebarShopType) sidebarShopType.textContent = shopData.shopType;
        if (sidebarProfileImg) sidebarProfileImg.src = shopData.profileImage;
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        const topBarUserName = document.getElementById('topBarUserName');
        const topBarUserImg = document.getElementById('topBarUserImg');
        const welcomeName = document.getElementById('welcomeName');
        
        if (topBarUserName) topBarUserName.textContent = shopData.sellerName;
        if (topBarUserImg) topBarUserImg.src = shopData.profileImage;
        if (welcomeName) welcomeName.textContent = shopData.firstName;
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
    // GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        const statusMap = {
            'Success': 'success',
            'Pending': 'pending',
            'Failed': 'danger',
            'Confirmed': 'success',
            'Picked up': 'info',
            'Delivered': 'success',
            'Canceled': 'danger'
        };
        return statusMap[status] || 'secondary';
    }
    
    // ============================================
    // POPULATE STATS CARDS
    // ============================================
    function populateStatsCards() {
        const statsCardsContainer = document.getElementById('statsCards');
        if (!statsCardsContainer) return;
        
        const pendingCount = recentOrders.filter(o => o.orderStatus === 'Pending').length;
        const confirmedCount = recentOrders.filter(o => o.orderStatus === 'Confirmed').length;
        const pickedUpCount = recentOrders.filter(o => o.orderStatus === 'Picked up').length;
        const deliveredCount = recentOrders.filter(o => o.orderStatus === 'Delivered').length;
        const canceledCount = recentOrders.filter(o => o.orderStatus === 'Canceled').length;
        const totalPayment = recentOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        
        const stats = [
            { label: 'Pending', value: pendingCount, icon: 'fa-clock', color: 'warning' },
            { label: 'Confirmed', value: confirmedCount, icon: 'fa-check-circle', color: 'info' },
            { label: 'Picked Up', value: pickedUpCount, icon: 'fa-shopping-bag', color: 'primary' },
            { label: 'Delivered', value: deliveredCount, icon: 'fa-truck', color: 'success' },
            { label: 'Canceled', value: canceledCount, icon: 'fa-times-circle', color: 'danger' },
            { label: 'Total Payment', value: '$' + totalPayment, icon: 'fa-dollar-sign', color: 'success' }
        ];
        
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
    // POPULATE RECENT ORDERS TABLE
    // ============================================
    function populateRecentOrders() {
        const tableBody = document.getElementById('recentOrdersTable');
        if (!tableBody) return;
        
        if (recentOrders.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="11" class="text-center text-muted py-4">
                        <i class="fas fa-shopping-cart fa-2x mb-2 d-block"></i>
                        No orders found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        recentOrders.forEach(order => {
            const paymentStatusClass = getStatusClass(order.paymentStatus);
            const orderStatusClass = getStatusClass(order.orderStatus);
            
            html += `
                <tr>
                    <td><strong>${order.orderId}</strong></td>
                    <td>${order.customerName}</td>
                    <td>${order.customerEmail}</td>
                    <td>${order.customerMobile}</td>
                    <td>${order.timeSlot}</td>
                    <td>$${order.totalAmount}</td>
                    <td><span class="badge bg-secondary">${order.paymentMethod}</span></td>
                    <td><span class="status-badge status-${paymentStatusClass}">${order.paymentStatus}</span></td>
                    <td>${order.orderType}</td>
                    <td><span class="status-badge status-${orderStatusClass}">${order.orderStatus}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary view-order" data-order-id="${order.orderId}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        
        // Attach event listeners
        document.querySelectorAll('.view-order').forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-order-id');
                const order = recentOrders.find(o => o.orderId === orderId);
                if (order) {
                    alert(`Order: ${order.orderId}\nCustomer: ${order.customerName}\nAmount: $${order.totalAmount}\nStatus: ${order.orderStatus}`);
                }
            });
        });
        
        console.log('Recent orders table populated');
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeDashboard() {
        console.log('Initializing seller dashboard...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateStatsCards();
        populateRecentOrders();
        console.log('Seller dashboard initialization complete');
    }
    
    initializeDashboard();
    
});