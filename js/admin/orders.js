/* ============================================
   Orders Management JavaScript
   ============================================ */

// Sample Orders Data
const ordersData = [
    {
        id: 'ORD1001',
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '+1 234 567 8901',
            image: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        items: [
            { name: 'Professional Tool Set', unitPrice: 89.99, quantity: 1, amount: 89.99 },
            { name: 'Safety Gloves', unitPrice: 12.99, quantity: 2, amount: 25.98 },
            { name: 'Duct Tape', unitPrice: 5.99, quantity: 3, amount: 17.97 }
        ],
        subtotal: 133.94,
        tax: 13.39,
        totalAmount: 147.33,
        paymentMethod: 'VISA',
        paymentStatus: 'Success',
        orderType: 'delivery',
        orderStatus: 'delivered',
        orderDate: '2024-01-15 10:30:00',
        deliveryDate: '2024-01-16 14:00:00',
        deliverySlot: '2:00 PM - 4:00 PM',
        address: {
            line1: '123 Main Street',
            line2: 'Apt 4B',
            country: 'USA',
            city: 'New York',
            postalCode: '10001',
            latitude: 40.7128,
            longitude: -74.0060
        },
        timeline: {
            placed: '2024-01-15 10:30:00',
            confirmed: '2024-01-15 11:00:00',
            pickedUp: '2024-01-16 13:00:00',
            delivered: '2024-01-16 15:30:00'
        }
    },
    {
        id: 'ORD1002',
        customer: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            mobile: '+1 234 567 8902',
            image: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        items: [
            { name: 'Wireless Headphones', unitPrice: 159.99, quantity: 1, amount: 159.99 },
            { name: 'Phone Case', unitPrice: 19.99, quantity: 2, amount: 39.98 }
        ],
        subtotal: 199.97,
        tax: 20.00,
        totalAmount: 219.97,
        paymentMethod: 'MoMo',
        paymentStatus: 'Pending',
        orderType: 'pickup',
        orderStatus: 'pending',
        orderDate: '2024-01-17 09:15:00',
        deliveryDate: null,
        deliverySlot: null,
        address: null,
        timeline: {
            placed: '2024-01-17 09:15:00',
            confirmed: null,
            pickedUp: null,
            delivered: null
        }
    },
    {
        id: 'ORD1003',
        customer: {
            name: 'Mike Johnson',
            email: 'mike.j@example.com',
            mobile: '+1 234 567 8903',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        items: [
            { name: 'Gaming Keyboard', unitPrice: 129.99, quantity: 1, amount: 129.99 },
            { name: 'Gaming Mouse', unitPrice: 49.99, quantity: 1, amount: 49.99 },
            { name: 'Mouse Pad', unitPrice: 14.99, quantity: 1, amount: 14.99 }
        ],
        subtotal: 194.97,
        tax: 19.50,
        totalAmount: 214.47,
        paymentMethod: 'OM',
        paymentStatus: 'Success',
        orderType: 'delivery',
        orderStatus: 'confirmed',
        orderDate: '2024-01-16 14:20:00',
        deliveryDate: '2024-01-18 10:00:00',
        deliverySlot: '10:00 AM - 12:00 PM',
        address: {
            line1: '456 Oak Avenue',
            line2: '',
            country: 'USA',
            city: 'Los Angeles',
            postalCode: '90001',
            latitude: 34.0522,
            longitude: -118.2437
        },
        timeline: {
            placed: '2024-01-16 14:20:00',
            confirmed: '2024-01-16 15:00:00',
            pickedUp: null,
            delivered: null
        }
    },
    {
        id: 'ORD1004',
        customer: {
            name: 'Sarah Williams',
            email: 'sarah.w@example.com',
            mobile: '+1 234 567 8904',
            image: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        items: [
            { name: 'Smart TV 55"', unitPrice: 599.99, quantity: 1, amount: 599.99 },
            { name: 'Wall Mount', unitPrice: 49.99, quantity: 1, amount: 49.99 }
        ],
        subtotal: 649.98,
        tax: 65.00,
        totalAmount: 714.98,
        paymentMethod: 'VISA',
        paymentStatus: 'Success',
        orderType: 'delivery',
        orderStatus: 'picked_up',
        orderDate: '2024-01-14 11:45:00',
        deliveryDate: '2024-01-17 13:00:00',
        deliverySlot: '1:00 PM - 3:00 PM',
        address: {
            line1: '789 Pine Street',
            line2: '',
            country: 'USA',
            city: 'Chicago',
            postalCode: '60601',
            latitude: 41.8781,
            longitude: -87.6298
        },
        timeline: {
            placed: '2024-01-14 11:45:00',
            confirmed: '2024-01-14 12:30:00',
            pickedUp: '2024-01-17 12:45:00',
            delivered: null
        }
    },
    {
        id: 'ORD1005',
        customer: {
            name: 'Robert Brown',
            email: 'robert.b@example.com',
            mobile: '+1 234 567 8905',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        items: [
            { name: 'Fitness Tracker', unitPrice: 79.99, quantity: 2, amount: 159.98 },
            { name: 'Water Bottle', unitPrice: 14.99, quantity: 3, amount: 44.97 }
        ],
        subtotal: 204.95,
        tax: 20.50,
        totalAmount: 225.45,
        paymentMethod: 'MoMo',
        paymentStatus: 'Failed',
        orderType: 'pickup',
        orderStatus: 'cancelled',
        orderDate: '2024-01-13 16:30:00',
        deliveryDate: null,
        deliverySlot: null,
        address: null,
        timeline: {
            placed: '2024-01-13 16:30:00',
            confirmed: '2024-01-13 17:00:00',
            pickedUp: null,
            delivered: null
        }
    }
];

// Global variables
let currentPage = 1;
let rowsPerPage = 10;
let currentOrderId = null;
let currentFilters = {
    search: '',
    status: 'all',
    payment: 'all',
    type: 'all'
};

// DOM Elements
let ordersTableBody;
let paginationContainer;
let searchInput;
let statusFilter;
let paymentFilter;
let typeFilter;
let totalOrdersEl;
let pendingOrdersEl;
let deliveredOrdersEl;
let totalRevenueEl;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM references
    ordersTableBody = document.getElementById('ordersTableBody');
    paginationContainer = document.getElementById('pagination');
    searchInput = document.getElementById('searchInput');
    statusFilter = document.getElementById('statusFilter');
    paymentFilter = document.getElementById('paymentFilter');
    typeFilter = document.getElementById('typeFilter');
    totalOrdersEl = document.getElementById('totalOrders');
    pendingOrdersEl = document.getElementById('pendingOrders');
    deliveredOrdersEl = document.getElementById('deliveredOrders');
    totalRevenueEl = document.getElementById('totalRevenue');
    
    // Initialize page
    updateStatistics();
    renderOrdersTable();
    setupEventListeners();
});

// Update Statistics
function updateStatistics() {
    const total = ordersData.length;
    const pending = ordersData.filter(o => o.orderStatus === 'pending').length;
    const delivered = ordersData.filter(o => o.orderStatus === 'delivered').length;
    const revenue = ordersData.filter(o => o.paymentStatus === 'Success').reduce((sum, o) => sum + o.totalAmount, 0);
    
    if (totalOrdersEl) totalOrdersEl.textContent = total;
    if (pendingOrdersEl) pendingOrdersEl.textContent = pending;
    if (deliveredOrdersEl) deliveredOrdersEl.textContent = delivered;
    if (totalRevenueEl) totalRevenueEl.textContent = '$' + revenue.toFixed(2);
}

// Filter Orders
function filterOrders() {
    return ordersData.filter(order => {
        // Search filter
        if (currentFilters.search && !order.id.toLowerCase().includes(currentFilters.search) &&
            !order.customer.name.toLowerCase().includes(currentFilters.search) &&
            !order.customer.email.toLowerCase().includes(currentFilters.search)) {
            return false;
        }
        // Status filter
        if (currentFilters.status !== 'all' && order.orderStatus !== currentFilters.status) {
            return false;
        }
        // Payment filter
        if (currentFilters.payment !== 'all' && order.paymentStatus.toLowerCase() !== currentFilters.payment) {
            return false;
        }
        // Type filter
        if (currentFilters.type !== 'all') {
            const typeMatch = currentFilters.type === 'delivery' ? 'delivery' : 'pickup';
            if (order.orderType !== typeMatch) return false;
        }
        return true;
    });
}

// Get Status Badge Class
function getStatusBadgeClass(status) {
    const statusMap = {
        'pending': 'status-pending',
        'confirmed': 'status-info',
        'picked_up': 'status-warning',
        'delivered': 'status-success',
        'cancelled': 'status-inactive'
    };
    return statusMap[status] || 'status-pending';
}

// Get Status Text
function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'picked_up': 'Picked Up',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

// Format Date Time
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

// Format Currency
function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

// Render Orders Table
function renderOrdersTable() {
    if (!ordersTableBody) return;
    
    let filteredOrders = filterOrders();
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const pageOrders = filteredOrders.slice(start, start + rowsPerPage);
    
    ordersTableBody.innerHTML = '';
    
    if (pageOrders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="9" class="text-center py-5">No orders found</td></tr>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    pageOrders.forEach(order => {
        const row = document.createElement('tr');
        
        const statusClass = getStatusBadgeClass(order.orderStatus);
        const statusText = getStatusText(order.orderStatus);
        
        let paymentClass = order.paymentStatus === 'Success' ? 'status-success' : 
                          (order.paymentStatus === 'Pending' ? 'status-pending' : 'status-inactive');
        
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${order.customer.image}" class="rounded-circle me-2" width="40" height="40" onerror="this.src='https://via.placeholder.com/40'">
                    <div>
                        <div class="fw-bold">${escapeHtml(order.customer.name)}</div>
                        <small class="text-muted">${escapeHtml(order.customer.email)}</small><br>
                        <small class="text-muted">${order.customer.mobile}</small>
                    </div>
                </div>
            </td>
            <td>
                <div>${order.items.length} item(s)</div>
                <small class="text-muted">${escapeHtml(order.items[0].name)}${order.items.length > 1 ? ' +' + (order.items.length-1) + ' more' : ''}</small>
            </td>
            <td><strong>${formatCurrency(order.totalAmount)}</strong></td>
            <td>
                <span class="status-badge ${paymentClass}">${order.paymentStatus}</span><br>
                <small>${order.paymentMethod}</small>
            </td>
            <td>${order.orderType === 'delivery' ? '<i class="fas fa-truck"></i> Home Delivery' : '<i class="fas fa-store"></i> Pickup from Store'}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${formatDateTime(order.orderDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewOrder('${order.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="openUpdateStatus('${order.id}')" title="Update Status">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteOrder('${order.id}')" title="Delete Order">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        ordersTableBody.appendChild(row);
    });
    
    renderPagination(totalPages);
}

// Render Pagination
function renderPagination(totalPages) {
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>
    </li>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationContainer.innerHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationContainer.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Next button
    paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>
    </li>`;
}

// Change Page
function changePage(page) {
    currentPage = page;
    renderOrdersTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// View Order Details
function viewOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    currentOrderId = orderId;
    
    const modalBody = document.getElementById('orderModalBody');
    if (!modalBody) return;
    
    // Generate items table HTML
    let itemsHtml = `
        <div class="items-table">
            <table class="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    order.items.forEach((item, index) => {
        itemsHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHtml(item.name)}</td>
                <td>${formatCurrency(item.unitPrice)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.amount)}</td>
            </tr>
        `;
    });
    
    itemsHtml += `
                </tbody>
                <tfoot>
                    <tr class="table-light">
                        <td colspan="4" class="text-end fw-bold">Items Price:</td>
                        <td>${formatCurrency(order.subtotal)}</td>
                    </tr>
                    <tr class="table-light">
                        <td colspan="4" class="text-end fw-bold">TAX/VAT:</td>
                        <td>${formatCurrency(order.tax)}</td>
                    </tr>
                    <tr class="table-primary">
                        <td colspan="4" class="text-end fw-bold">Total Amount:</td>
                        <td class="total-amount">${formatCurrency(order.totalAmount)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
    
    // Determine current status index for timeline
    const statusOrder = ['placed', 'confirmed', 'picked_up', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.orderStatus === 'delivered' ? 'delivered' : 
                      (order.orderStatus === 'picked_up' ? 'picked_up' :
                      (order.orderStatus === 'confirmed' ? 'confirmed' : 'placed')));
    
    let timelineHtml = `
        <div class="status-timeline">
    `;
    
    const steps = [
        { key: 'placed', label: 'Order Placed', icon: 'fa-shopping-cart' },
        { key: 'confirmed', label: 'Confirmed', icon: 'fa-check-circle' },
        { key: 'picked_up', label: 'Picked Up', icon: 'fa-box-open' },
        { key: 'delivered', label: 'Delivered', icon: 'fa-home' }
    ];
    
    steps.forEach((step, idx) => {
        const isCompleted = idx <= currentIndex;
        const isActive = idx === currentIndex;
        let stepClass = '';
        if (isCompleted) stepClass = 'completed';
        if (isActive && !isCompleted) stepClass = 'active';
        
        timelineHtml += `
            <div class="timeline-step ${stepClass}">
                <div class="step-icon">
                    <i class="fas ${step.icon}"></i>
                </div>
                <div class="step-label">
                    <strong>${step.label}</strong>
                    ${order.timeline[step.key] ? `<br><small>${formatDateTime(order.timeline[step.key])}</small>` : ''}
                </div>
            </div>
        `;
    });
    
    timelineHtml += `</div>`;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="fas fa-user"></i> Customer Details</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${order.customer.image}" class="rounded-circle me-3" width="60" height="60" onerror="this.src='https://via.placeholder.com/60'">
                            <div>
                                <h5 class="mb-1">${escapeHtml(order.customer.name)}</h5>
                                <p class="mb-0 text-muted"><i class="fas fa-envelope"></i> ${escapeHtml(order.customer.email)}</p>
                                <p class="mb-0 text-muted"><i class="fas fa-phone"></i> ${order.customer.mobile}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="fas fa-info-circle"></i> Order Information</h6>
                    </div>
                    <div class="card-body">
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Order Date:</strong> ${formatDateTime(order.orderDate)}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                        <p><strong>Payment Status:</strong> <span class="status-badge ${order.paymentStatus === 'Success' ? 'status-success' : 'status-pending'}">${order.paymentStatus}</span></p>
                        <p><strong>Order Type:</strong> ${order.orderType === 'delivery' ? '🏠 Home Delivery' : '🏪 Pickup from Store'}</p>
                    </div>
                </div>
            </div>
        </div>
        
        ${order.orderType === 'delivery' && order.address ? `
        <div class="card mb-3">
            <div class="card-header bg-light">
                <h6 class="mb-0"><i class="fas fa-location-dot"></i> Delivery Details</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Delivery Date & Time:</strong><br>${order.deliveryDate ? formatDateTime(order.deliveryDate) : 'Pending'}</p>
                        <p><strong>Delivery Slot:</strong><br>${order.deliverySlot || 'Not scheduled'}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Shipping Address:</strong><br>
                        ${escapeHtml(order.address.line1)}<br>
                        ${order.address.line2 ? escapeHtml(order.address.line2) + '<br>' : ''}
                        ${escapeHtml(order.address.city)}, ${order.address.postalCode}<br>
                        ${order.address.country}</p>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="card mb-3">
            <div class="card-header bg-light">
                <h6 class="mb-0"><i class="fas fa-boxes"></i> Order Items</h6>
            </div>
            <div class="card-body p-0">
                ${itemsHtml}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header bg-light">
                <h6 class="mb-0"><i class="fas fa-chart-line"></i> Order Timeline</h6>
            </div>
            <div class="card-body">
                ${timelineHtml}
            </div>
        </div>
    `;
    
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
}

// Open Update Status Modal
function openUpdateStatus(orderId) {
    document.getElementById('updateOrderId').value = orderId;
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        document.getElementById('newOrderStatus').value = order.orderStatus;
    }
    new bootstrap.Modal(document.getElementById('updateStatusModal')).show();
}

// Confirm Status Update
function confirmStatusUpdate() {
    const orderId = document.getElementById('updateOrderId').value;
    const newStatus = document.getElementById('newOrderStatus').value;
    const note = document.getElementById('statusNote').value;
    
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        order.orderStatus = newStatus;
        
        // Update timeline
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        switch(newStatus) {
            case 'confirmed':
                order.timeline.confirmed = now;
                break;
            case 'picked_up':
                order.timeline.pickedUp = now;
                break;
            case 'delivered':
                order.timeline.delivered = now;
                break;
        }
        
        if (window.showToast) {
            window.showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
        } else {
            alert(`Order ${orderId} status updated to ${newStatus}`);
        }
        
        if (note) {
            console.log('Status note:', note);
        }
        
        updateStatistics();
        renderOrdersTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('updateStatusModal')).hide();
    document.getElementById('statusNote').value = '';
}

// Delete Order
function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
        const index = ordersData.findIndex(o => o.id === orderId);
        if (index !== -1) {
            ordersData.splice(index, 1);
            updateStatistics();
            renderOrdersTable();
            if (window.showToast) {
                window.showToast(`Order ${orderId} deleted successfully`, 'success');
            }
        }
    }
}

// Export Orders
function exportOrders() {
    const filteredOrders = filterOrders();
    let csvContent = "Order ID,Customer Name,Customer Email,Customer Mobile,Total Amount,Payment Method,Payment Status,Order Type,Order Status,Order Date\n";
    
    filteredOrders.forEach(order => {
        csvContent += `"${order.id}","${order.customer.name}","${order.customer.email}","${order.customer.mobile}","${order.totalAmount}","${order.paymentMethod}","${order.paymentStatus}","${order.orderType}","${order.orderStatus}","${order.orderDate}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    if (window.showToast) {
        window.showToast('Orders exported successfully', 'success');
    }
}

// Refresh Orders
function refreshOrders() {
    if (window.showToast) {
        window.showToast('Refreshing orders...', 'info');
    }
    setTimeout(() => {
        updateStatistics();
        renderOrdersTable();
        if (window.showToast) {
            window.showToast('Orders refreshed', 'success');
        }
    }, 500);
}

// Print Order
function printOrder() {
    window.print();
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            currentFilters.search = e.target.value.toLowerCase();
            currentPage = 1;
            renderOrdersTable();
        });
    }
    
    // Status filter
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            currentFilters.status = e.target.value;
            currentPage = 1;
            renderOrdersTable();
        });
    }
    
    // Payment filter
    if (paymentFilter) {
        paymentFilter.addEventListener('change', function(e) {
            currentFilters.payment = e.target.value;
            currentPage = 1;
            renderOrdersTable();
        });
    }
    
    // Type filter
    if (typeFilter) {
        typeFilter.addEventListener('change', function(e) {
            currentFilters.type = e.target.value;
            currentPage = 1;
            renderOrdersTable();
        });
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
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
    }
    
    // Export button
    const exportBtn = document.getElementById('exportOrdersBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportOrders);
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshOrdersBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshOrders);
    }
    
    // Print button
    const printBtn = document.getElementById('printOrderBtn');
    if (printBtn) {
        printBtn.addEventListener('click', printOrder);
    }
    
    // Confirm status button
    const confirmBtn = document.getElementById('confirmStatusBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmStatusUpdate);
    }
}

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

// Make functions globally accessible
window.viewOrder = viewOrder;
window.openUpdateStatus = openUpdateStatus;
window.deleteOrder = deleteOrder;
window.changePage = changePage; 