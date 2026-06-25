// js/seller/orders.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Orders JS loaded successfully');
    
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
    // SHOP DATA
    // ============================================
    const shopData = {
        shopName: 'Paris Hardware Store',
        sellerName: 'Pierre Martin',
        shopType: 'Hardware',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // ORDERS DATA
    // ============================================
    const ordersList = [
        {
            orderId: '#ORD001',
            orderDate: '2024-08-20 10:30 AM',
            customerName: 'Alice Martin',
            customerEmail: 'alice@email.com',
            customerMobile: '+33 123456789',
            customerImage: 'https://via.placeholder.com/40',
            timeSlot: '10:00 AM - 12:00 PM',
            totalAmount: 150,
            paymentMethod: 'OM',
            paymentStatus: 'Success',
            orderType: 'Pickup from Store',
            orderStatus: 'Confirmed',
            items: [
                { name: 'PVC Pipe 2 inch', unitPrice: 25, quantity: 3, amount: 75 },
                { name: 'Pipe Fittings Set', unitPrice: 18, quantity: 2, amount: 36 }
            ],
            itemsPrice: 111,
            taxVat: 39,
            deliveryDate: '2024-08-20',
            deliverySlot: '10:00 AM - 12:00 PM',
            addressLine1: '123 Rue de Paris',
            addressLine2: 'Apt 4B',
            country: 'France',
            city: 'Paris',
            postalCode: '75001',
            latitude: '48.8566',
            longitude: '2.3522'
        },
        {
            orderId: '#ORD002',
            orderDate: '2024-08-21 02:00 PM',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            customerImage: 'https://via.placeholder.com/40',
            timeSlot: '02:00 PM - 04:00 PM',
            totalAmount: 200,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            orderType: 'Home Delivery',
            orderStatus: 'Pending',
            items: [
                { name: 'Copper Wire 2.5mm', unitPrice: 45, quantity: 2, amount: 90 },
                { name: 'Wall Paint White', unitPrice: 35, quantity: 1, amount: 35 }
            ],
            itemsPrice: 125,
            taxVat: 75,
            deliveryDate: '2024-08-21',
            deliverySlot: '02:00 PM - 04:00 PM',
            addressLine1: '45 Avenue des Champs',
            addressLine2: '',
            country: 'France',
            city: 'Paris',
            postalCode: '75008',
            latitude: '48.8698',
            longitude: '2.3075'
        },
        {
            orderId: '#ORD003',
            orderDate: '2024-08-22 09:00 AM',
            customerName: 'Sophie Laurent',
            customerEmail: 'sophie@email.com',
            customerMobile: '+33 456789123',
            customerImage: 'https://via.placeholder.com/40',
            timeSlot: '09:00 AM - 11:00 AM',
            totalAmount: 300,
            paymentMethod: 'VISA',
            paymentStatus: 'Success',
            orderType: 'Pickup from Store',
            orderStatus: 'Delivered',
            items: [
                { name: 'Hammer Set', unitPrice: 30, quantity: 5, amount: 150 },
                { name: 'Cement Bag 50kg', unitPrice: 12, quantity: 10, amount: 120 }
            ],
            itemsPrice: 270,
            taxVat: 30,
            deliveryDate: '2024-08-22',
            deliverySlot: '09:00 AM - 11:00 AM',
            addressLine1: '78 Boulevard Saint-Germain',
            addressLine2: '',
            country: 'France',
            city: 'Paris',
            postalCode: '75005',
            latitude: '48.8502',
            longitude: '2.3441'
        },
        {
            orderId: '#ORD004',
            orderDate: '2024-08-23 11:00 AM',
            customerName: 'Jean Dupont',
            customerEmail: 'jean@email.com',
            customerMobile: '+33 555666777',
            customerImage: 'https://via.placeholder.com/40',
            timeSlot: '11:00 AM - 01:00 PM',
            totalAmount: 450,
            paymentMethod: 'OM',
            paymentStatus: 'Pending',
            orderType: 'Pickup from Store',
            orderStatus: 'Pending',
            items: [
                { name: 'PVC Pipe 2 inch', unitPrice: 25, quantity: 10, amount: 250 },
                { name: 'Pipe Fittings Set', unitPrice: 18, quantity: 5, amount: 90 }
            ],
            itemsPrice: 340,
            taxVat: 110,
            deliveryDate: '2024-08-23',
            deliverySlot: '11:00 AM - 01:00 PM',
            addressLine1: '12 Rue du Commerce',
            addressLine2: '',
            country: 'France',
            city: 'Lyon',
            postalCode: '69001',
            latitude: '45.7640',
            longitude: '4.8357'
        },
        {
            orderId: '#ORD005',
            orderDate: '2024-08-24 03:00 PM',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            customerImage: 'https://via.placeholder.com/40',
            timeSlot: '03:00 PM - 05:00 PM',
            totalAmount: 175,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            orderType: 'Home Delivery',
            orderStatus: 'Canceled',
            items: [
                { name: 'Wall Paint White', unitPrice: 35, quantity: 3, amount: 105 },
                { name: 'Hammer Set', unitPrice: 30, quantity: 1, amount: 30 }
            ],
            itemsPrice: 135,
            taxVat: 40,
            deliveryDate: '2024-08-24',
            deliverySlot: '03:00 PM - 05:00 PM',
            addressLine1: '56 Rue de la République',
            addressLine2: 'Suite 2',
            country: 'France',
            city: 'Marseille',
            postalCode: '13001',
            latitude: '43.2965',
            longitude: '5.3698'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New order #ORD001 received', time: '10 min ago', unread: true },
        { id: 2, message: 'Order #ORD003 has been delivered', time: '2 hours ago', unread: false }
    ];
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        document.getElementById('sidebarShopName').textContent = shopData.shopName;
        document.getElementById('sidebarShopType').textContent = shopData.shopType;
        document.getElementById('sidebarProfileImg').src = shopData.profileImage;
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        document.getElementById('topBarUserName').textContent = shopData.sellerName;
        document.getElementById('topBarUserImg').src = shopData.profileImage;
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
            notifications.forEach(n => {
                html += `<li><a class="dropdown-item ${n.unread ? 'fw-bold' : ''}" href="#"><small class="text-muted d-block">${n.time}</small>${n.message}</a></li>`;
            });
            html += '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item text-center" href="#">View All</a></li>';
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
    // RENDER ORDERS TABLE
    // ============================================
    function renderOrdersTable(filteredList) {
        const tableBody = document.getElementById('ordersTableBody');
        if (!tableBody) return;
        
        if (filteredList.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="11" class="text-center text-muted py-4"><i class="fas fa-shopping-cart fa-2x mb-2 d-block"></i>No orders found</td></tr>`;
            return;
        }
        
        let html = '';
        filteredList.forEach(order => {
            const paymentStatusClass = getStatusClass(order.paymentStatus);
            const orderStatusClass = getStatusClass(order.orderStatus);
            
            html += `
                <tr>
                    <td><strong>${order.orderId}</strong></td>
                    <td>${order.customerName}</td>
                    <td>${order.customerEmail}</td>
                    <td>${order.customerMobile}</td>
                    <td>${order.timeSlot}</td>
                    <td><strong>$${order.totalAmount}</strong></td>
                    <td><span class="badge bg-secondary">${order.paymentMethod}</span></td>
                    <td><span class="status-badge status-${paymentStatusClass}">${order.paymentStatus}</span></td>
                    <td>${order.orderType}</td>
                    <td><span class="status-badge status-${orderStatusClass}">${order.orderStatus}</span></td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-info view-order" data-order-id="${order.orderId}" title="View"><i class="fas fa-eye"></i></button>
                            
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        attachTableEvents();
    }
    
    // ============================================
    // ATTACH TABLE EVENTS
    // ============================================
    function attachTableEvents() {
        document.querySelectorAll('.view-order').forEach(btn => {
            btn.addEventListener('click', function() { viewOrder(this.getAttribute('data-order-id')); });
        });
        document.querySelectorAll('.update-status').forEach(btn => {
            btn.addEventListener('click', function() { updateOrderStatus(this.getAttribute('data-order-id')); });
        });
    }
    
    // ============================================
    // VIEW ORDER DETAILS
    // ============================================
    function viewOrder(orderId) {
        const order = ordersList.find(o => o.orderId === orderId);
        if (!order) return;
        
        let itemsHtml = '';
        order.items.forEach((item, index) => {
            itemsHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>$${item.unitPrice}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.amount}</td>
                </tr>
            `;
        });
        
        const content = document.getElementById('viewOrderContent');
        content.innerHTML = `
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6 class="fw-bold">Order Information</h6>
                    <div class="mb-1"><strong>Order ID:</strong> ${order.orderId}</div>
                    <div class="mb-1"><strong>Order Date:</strong> ${order.orderDate}</div>
                    <div class="mb-1"><strong>Order Status:</strong> <span class="status-badge status-${getStatusClass(order.orderStatus)}">${order.orderStatus}</span></div>
                    <div class="mb-1"><strong>Order Type:</strong> ${order.orderType}</div>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold">Payment Information</h6>
                    <div class="mb-1"><strong>Method:</strong> ${order.paymentMethod}</div>
                    <div class="mb-1"><strong>Status:</strong> <span class="status-badge status-${getStatusClass(order.paymentStatus)}">${order.paymentStatus}</span></div>
                </div>
            </div>
            <h6 class="fw-bold">Items</h6>
            <div class="table-responsive mb-3">
                <table class="table table-sm">
                    <thead><tr><th>#</th><th>Item</th><th>Unit Price</th><th>Qty</th><th>Amount</th></tr></thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-1"><strong>Items Price:</strong> $${order.itemsPrice}</div>
                    <div class="mb-1"><strong>TAX/VAT:</strong> $${order.taxVat}</div>
                    <div class="mb-1"><strong>Total Amount:</strong> <strong>$${order.totalAmount}</strong></div>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold">Delivery Details</h6>
                    <div class="mb-1"><strong>Date:</strong> ${order.deliveryDate}</div>
                    <div class="mb-1"><strong>Slot:</strong> ${order.deliverySlot}</div>
                </div>
            </div>
            <h6 class="fw-bold mt-3">Customer Details</h6>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-1"><strong>Name:</strong> ${order.customerName}</div>
                    <div class="mb-1"><strong>Email:</strong> ${order.customerEmail}</div>
                    <div class="mb-1"><strong>Mobile:</strong> ${order.customerMobile}</div>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold">Address</h6>
                    <div class="mb-1">${order.addressLine1}${order.addressLine2 ? ', ' + order.addressLine2 : ''}</div>
                    <div class="mb-1">${order.city}, ${order.postalCode}</div>
                    <div class="mb-1">${order.country}</div>
                </div>
            </div>
        `;
        
        new bootstrap.Modal(document.getElementById('viewOrderModal')).show();
    }
    
    // ============================================
    // UPDATE ORDER STATUS
    // ============================================
    function updateOrderStatus(orderId) {
        const order = ordersList.find(o => o.orderId === orderId);
        if (!order) return;
        
        const statuses = ['Pending', 'Confirmed', 'Picked up', 'Delivered', 'Canceled'];
        const currentIndex = statuses.indexOf(order.orderStatus);
        const nextStatuses = statuses.filter((s, i) => i > currentIndex && s !== 'Canceled');
        if (order.orderStatus !== 'Canceled') nextStatuses.push('Canceled');
        
        let options = nextStatuses.map(s => `<option value="${s}">${s}</option>`).join('');
        
        const newStatus = prompt(`Update status for ${orderId}\nCurrent: ${order.orderStatus}\n\nSelect new status:\n${nextStatuses.join(', ')}`);
        
        if (newStatus && nextStatuses.includes(newStatus)) {
            order.orderStatus = newStatus;
            applyFilters();
            showToast(`Order ${orderId} status updated to "${newStatus}".`, 'success');
        } else if (newStatus) {
            alert('Invalid status selected.');
        }
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const search = document.getElementById('searchOrder').value.toLowerCase().trim();
        const method = document.getElementById('filterPaymentMethod').value;
        const type = document.getElementById('filterOrderType').value;
        const payStatus = document.getElementById('filterPaymentStatus').value;
        const orderStatus = document.getElementById('filterOrderStatus').value;
        
        let filtered = ordersList;
        if (search) filtered = filtered.filter(o => o.orderId.toLowerCase().includes(search) || o.customerName.toLowerCase().includes(search));
        if (method) filtered = filtered.filter(o => o.paymentMethod === method);
        if (type) filtered = filtered.filter(o => o.orderType === type);
        if (payStatus !== 'all') filtered = filtered.filter(o => o.paymentStatus === payStatus);
        if (orderStatus !== 'all') filtered = filtered.filter(o => o.orderStatus === orderStatus);
        
        renderOrdersTable(filtered);
    }
    
    // ============================================
    // SHOW TOAST
    // ============================================
    function showToast(message, type) {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999;';
            document.body.appendChild(container);
        }
        const bg = type === 'success' ? 'bg-success' : 'bg-warning text-dark';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bg} border-0`;
        toast.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="fas ${icon} me-2"></i>${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
        container.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFilterEvents() {
        document.getElementById('searchOrder').addEventListener('input', applyFilters);
        document.getElementById('filterPaymentMethod').addEventListener('change', applyFilters);
        document.getElementById('filterOrderType').addEventListener('change', applyFilters);
        document.getElementById('filterPaymentStatus').addEventListener('change', applyFilters);
        document.getElementById('filterOrderStatus').addEventListener('change', applyFilters);
    }
    
    // ============================================
    // INITIALIZE
    // ============================================
    function initialize() {
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        renderOrdersTable(ordersList);
        attachFilterEvents();
    }
    
    initialize();
});