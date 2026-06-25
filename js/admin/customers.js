/* ============================================
   Customer Management JavaScript
   For: manage-customers.html
   ============================================ */

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : (type === 'danger' ? 'danger' : 'info')} border-0`;
    toast.setAttribute('role', 'alert');
    toast.style.marginTop = '10px';
    toast.style.minWidth = '250px';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : (type === 'danger' ? 'fa-exclamation-circle' : 'fa-info-circle')} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

function formatDateShort(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// SAMPLE CUSTOMER DATA
// ============================================

let customersData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '+1 234 567 8901',
        gender: 'male',
        address: '123 Main Street',
        city: 'New York',
        country: 'USA',
        postalCode: '10001',
        status: 'active',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: '2024-01-15',
        totalOrders: 12,
        totalSpent: 1250.50,
        orders: [
            { id: 'ORD1001', date: '2024-01-20', amount: 147.33, status: 'delivered' },
            { id: 'ORD1005', date: '2024-01-25', amount: 89.99, status: 'delivered' },
            { id: 'ORD1012', date: '2024-02-01', amount: 234.50, status: 'delivered' }
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        mobile: '+1 234 567 8902',
        gender: 'female',
        address: '456 Oak Avenue',
        city: 'Los Angeles',
        country: 'USA',
        postalCode: '90001',
        status: 'active',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        createdAt: '2024-01-20',
        totalOrders: 8,
        totalSpent: 890.25,
        orders: [
            { id: 'ORD1002', date: '2024-01-22', amount: 219.97, status: 'delivered' },
            { id: 'ORD1008', date: '2024-01-30', amount: 145.50, status: 'delivered' }
        ]
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        mobile: '+1 234 567 8903',
        gender: 'male',
        address: '789 Pine Street',
        city: 'Chicago',
        country: 'USA',
        postalCode: '60601',
        status: 'inactive',
        emailVerified: 'pending',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        createdAt: '2024-02-01',
        totalOrders: 0,
        totalSpent: 0,
        orders: []
    },
    {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        mobile: '+1 234 567 8904',
        gender: 'female',
        address: '321 Cedar Lane',
        city: 'Houston',
        country: 'USA',
        postalCode: '77001',
        status: 'active',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        createdAt: '2024-02-05',
        totalOrders: 15,
        totalSpent: 2450.00,
        orders: [
            { id: 'ORD1003', date: '2024-02-10', amount: 714.98, status: 'delivered' },
            { id: 'ORD1009', date: '2024-02-15', amount: 189.99, status: 'delivered' },
            { id: 'ORD1015', date: '2024-02-20', amount: 325.00, status: 'shipped' }
        ]
    },
    {
        id: 5,
        name: 'Robert Brown',
        email: 'robert.b@example.com',
        mobile: '+1 234 567 8905',
        gender: 'male',
        address: '555 Water Street',
        city: 'Phoenix',
        country: 'USA',
        postalCode: '85001',
        status: 'blocked',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        createdAt: '2024-02-10',
        totalOrders: 3,
        totalSpent: 459.99,
        orders: [
            { id: 'ORD1004', date: '2024-02-12', amount: 225.45, status: 'cancelled' },
            { id: 'ORD1010', date: '2024-02-18', amount: 234.54, status: 'delivered' }
        ]
    },
    {
        id: 6,
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        mobile: '+1 234 567 8906',
        gender: 'female',
        address: '777 Maple Drive',
        city: 'Philadelphia',
        country: 'USA',
        postalCode: '19101',
        status: 'active',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        createdAt: '2024-02-15',
        totalOrders: 5,
        totalSpent: 425.75,
        orders: [
            { id: 'ORD1006', date: '2024-02-20', amount: 89.99, status: 'delivered' },
            { id: 'ORD1013', date: '2024-02-25', amount: 335.76, status: 'shipped' }
        ]
    },
    {
        id: 7,
        name: 'David Wilson',
        email: 'david.w@example.com',
        mobile: '+1 234 567 8907',
        gender: 'male',
        address: '888 Birch Road',
        city: 'San Antonio',
        country: 'USA',
        postalCode: '78201',
        status: 'active',
        emailVerified: 'verified',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        createdAt: '2024-02-20',
        totalOrders: 7,
        totalSpent: 1120.00,
        orders: [
            { id: 'ORD1007', date: '2024-02-22', amount: 189.99, status: 'delivered' },
            { id: 'ORD1014', date: '2024-02-28', amount: 450.00, status: 'delivered' }
        ]
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        email: 'lisa.a@example.com',
        mobile: '+1 234 567 8908',
        gender: 'female',
        address: '999 Elm Street',
        city: 'San Diego',
        country: 'USA',
        postalCode: '92101',
        status: 'inactive',
        emailVerified: 'pending',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        createdAt: '2024-02-25',
        totalOrders: 0,
        totalSpent: 0,
        orders: []
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentCustomerPage = 1;
const customersPerPage = 6;

// Filters
let customerFilters = {
    search: '',
    status: 'all',
    gender: 'all',
    minOrders: '',
    dateFrom: '',
    dateTo: ''
};

// Chart instances
let growthChart = null;
let segmentsChart = null;

// ============================================
// CUSTOMER STATISTICS
// ============================================

function updateCustomerStats() {
    const total = customersData.length;
    const active = customersData.filter(c => c.status === 'active').length;
    const totalOrders = customersData.reduce((sum, c) => sum + c.totalOrders, 0);
    const totalSpent = customersData.reduce((sum, c) => sum + c.totalSpent, 0);
    
    const totalCustomersEl = document.getElementById('totalCustomers');
    const activeCustomersEl = document.getElementById('activeCustomers');
    const totalOrdersEl = document.getElementById('totalOrders');
    const totalSpentEl = document.getElementById('totalSpent');
    
    if (totalCustomersEl) totalCustomersEl.textContent = total;
    if (activeCustomersEl) activeCustomersEl.textContent = active;
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
    if (totalSpentEl) totalSpentEl.textContent = formatCurrency(totalSpent);
}

// ============================================
// CHART INITIALIZATION
// ============================================

function initCustomerGrowthChart() {
    const ctx = document.getElementById('customerGrowthChart');
    if (!ctx) return;
    
    // Calculate monthly growth
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCustomers = [45, 52, 48, 61, 73, 82, 95, 108, 124, 145, 168, 185];
    
    if (growthChart) {
        growthChart.destroy();
    }
    
    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'New Customers',
                data: monthlyCustomers,
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#4361ee',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `New Customers: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

function initCustomerSegmentsChart() {
    const ctx = document.getElementById('customerSegmentsChart');
    if (!ctx) return;
    
    const highValue = customersData.filter(c => c.totalSpent >= 500).length;
    const mediumValue = customersData.filter(c => c.totalSpent >= 100 && c.totalSpent < 500).length;
    const lowValue = customersData.filter(c => c.totalSpent > 0 && c.totalSpent < 100).length;
    const inactive = customersData.filter(c => c.totalSpent === 0).length;
    
    if (segmentsChart) {
        segmentsChart.destroy();
    }
    
    segmentsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Value ($500+)', 'Medium Value ($100-500)', 'Low Value (<$100)', 'Inactive (No orders)'],
            datasets: [{
                data: [highValue, mediumValue, lowValue, inactive],
                backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9e9e9e'],
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

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterCustomers() {
    return customersData.filter(customer => {
        // Search filter
        if (customerFilters.search && !customer.name.toLowerCase().includes(customerFilters.search) &&
            !customer.email.toLowerCase().includes(customerFilters.search) &&
            !customer.mobile.includes(customerFilters.search)) {
            return false;
        }
        // Status filter
        if (customerFilters.status !== 'all' && customer.status !== customerFilters.status) {
            return false;
        }
        // Gender filter
        if (customerFilters.gender !== 'all' && customer.gender !== customerFilters.gender) {
            return false;
        }
        // Min orders filter
        if (customerFilters.minOrders && customer.totalOrders < parseInt(customerFilters.minOrders)) {
            return false;
        }
        // Date range filter
        if (customerFilters.dateFrom && customer.createdAt < customerFilters.dateFrom) {
            return false;
        }
        if (customerFilters.dateTo && customer.createdAt > customerFilters.dateTo) {
            return false;
        }
        return true;
    });
}

// ============================================
// RENDER CUSTOMERS TABLE
// ============================================

function renderCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    
    let filteredData = filterCustomers();
    const totalPages = Math.ceil(filteredData.length / customersPerPage);
    const start = (currentCustomerPage - 1) * customersPerPage;
    const pageData = filteredData.slice(start, start + customersPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-5">No customers found</td></tr>';
        renderCustomersPagination(totalPages);
        return;
    }
    
    pageData.forEach(customer => {
        const statusClass = customer.status === 'active' ? 'status-success' : 
                           (customer.status === 'blocked' ? 'status-danger' : 'status-inactive');
        const statusText = customer.status === 'active' ? 'Active' : 
                          (customer.status === 'blocked' ? 'Blocked' : 'Inactive');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${customer.image}" class="rounded-circle me-2" width="40" height="40" onerror="this.src='https://via.placeholder.com/40'">
                    <div>
                        <div class="fw-bold">${escapeHtml(customer.name)}</div>
                        <small class="text-muted">${customer.gender === 'male' ? 'Male' : (customer.gender === 'female' ? 'Female' : 'Other')}</small>
                    </div>
                </div>
            </td>
            <td>
                <div>${customer.email}</div>
                <small>${customer.mobile}</small>
                ${customer.emailVerified === 'verified' ? '<span class="badge bg-success">Verified</span>' : '<span class="badge bg-warning">Pending</span>'}
            </td>
            <td>
                ${customer.city}, ${customer.country}
            </td>
            <td class="text-center">
                <span class="badge bg-primary">${customer.totalOrders}</span>
            </td>
            <td><strong>${formatCurrency(customer.totalSpent)}</strong></td>
            <td>${formatDateShort(customer.createdAt)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewCustomer(${customer.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editCustomer(${customer.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="viewOrderHistory(${customer.id})" title="Order History">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    ${customer.status === 'blocked' ? 
                        `<button class="btn btn-sm btn-outline-success me-1" onclick="unblockCustomer(${customer.id})" title="Unblock">
                            <i class="fas fa-check-circle"></i>
                        </button>` :
                        `<button class="btn btn-sm btn-outline-warning me-1" onclick="showBlockModal(${customer.id})" title="Block">
                            <i class="fas fa-ban"></i>
                        </button>`
                    }
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomer(${customer.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderCustomersPagination(totalPages);
}

function renderCustomersPagination(totalPages) {
    const pagination = document.getElementById('customersPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentCustomerPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeCustomerPage(${currentCustomerPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentCustomerPage - 2 && i <= currentCustomerPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentCustomerPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeCustomerPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentCustomerPage - 3 || i === currentCustomerPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentCustomerPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeCustomerPage(${currentCustomerPage + 1}); return false;">Next</a>
    </li>`;
}

function changeCustomerPage(page) {
    currentCustomerPage = page;
    renderCustomersTable();
}

// ============================================
// VIEW CUSTOMER DETAILS
// ============================================

function viewCustomer(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    const modalBody = document.getElementById('viewCustomerBody');
    if (!modalBody) return;
    
    // Order history preview (last 3 orders)
    let recentOrdersHtml = '';
    if (customer.orders && customer.orders.length > 0) {
        recentOrdersHtml = `
            <div class="table-responsive mt-3">
                <h6 class="text-primary">Recent Orders</h6>
                <table class="table table-sm">
                    <thead>
                        <tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        ${customer.orders.slice(0, 5).map(order => `
                            <tr>
                                <td>${order.id}</td>
                                <td>${formatDateShort(order.date)}</td>
                                <td>${formatCurrency(order.amount)}</td>
                                <td><span class="badge ${order.status === 'delivered' ? 'bg-success' : (order.status === 'shipped' ? 'bg-info' : 'bg-warning')}">${order.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        recentOrdersHtml = '<p class="text-muted mt-3">No orders yet.</p>';
    }
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-3 text-center">
                <img src="${customer.image}" class="rounded-circle mb-3" width="120" height="120" onerror="this.src='https://via.placeholder.com/120'">
                <h4>${escapeHtml(customer.name)}</h4>
                <p class="text-muted">Customer since ${formatDateShort(customer.createdAt)}</p>
                <div class="mb-2">
                    <span class="status-badge ${customer.status === 'active' ? 'status-success' : (customer.status === 'blocked' ? 'status-danger' : 'status-inactive')}">
                        ${customer.status === 'active' ? 'Active' : (customer.status === 'blocked' ? 'Blocked' : 'Inactive')}
                    </span>
                </div>
                <button class="btn btn-sm btn-outline-primary w-100 mb-2" onclick="sendMessageToCustomer(${customer.id})">
                    <i class="fas fa-envelope"></i> Send Message
                </button>
                <button class="btn btn-sm btn-outline-info w-100" onclick="viewOrderHistory(${customer.id})">
                    <i class="fas fa-shopping-cart"></i> View All Orders
                </button>
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Contact Information</h6>
                        <p><strong>Email:</strong> ${customer.email}<br>
                        <strong>Mobile:</strong> ${customer.mobile}<br>
                        <strong>Gender:</strong> ${customer.gender === 'male' ? 'Male' : (customer.gender === 'female' ? 'Female' : 'Other')}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Address</h6>
                        <p>${customer.address}<br>
                        ${customer.city}, ${customer.postalCode}<br>
                        ${customer.country}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="text-primary">Account Status</h6>
                        <p><strong>Email Verification:</strong> <span class="badge ${customer.emailVerified === 'verified' ? 'bg-success' : 'bg-warning'}">${customer.emailVerified === 'verified' ? 'Verified' : 'Pending'}</span><br>
                        <strong>Joined Date:</strong> ${formatDateTime(customer.createdAt)}</p>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h6 class="text-primary">Statistics</h6>
                        <div class="performance-metrics">
                            <div class="row">
                                <div class="col-md-3 metric-item">
                                    <div class="metric-value">${customer.totalOrders}</div>
                                    <div class="metric-label">Total Orders</div>
                                </div>
                                <div class="col-md-3 metric-item">
                                    <div class="metric-value">${formatCurrency(customer.totalSpent)}</div>
                                    <div class="metric-label">Total Spent</div>
                                </div>
                                <div class="col-md-3 metric-item">
                                    <div class="metric-value">${customer.totalOrders > 0 ? formatCurrency(customer.totalSpent / customer.totalOrders) : '$0'}</div>
                                    <div class="metric-label">Avg Order Value</div>
                                </div>
                                <div class="col-md-3 metric-item">
                                    <div class="metric-value">${customer.status === 'active' ? '✅' : '❌'}</div>
                                    <div class="metric-label">Active Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${recentOrdersHtml}
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewCustomerModal')).show();
}

// ============================================
// EDIT CUSTOMER FUNCTIONS
// ============================================

function editCustomer(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    document.getElementById('editCustomerId').value = customer.id;
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerMobile').value = customer.mobile;
    document.getElementById('customerGender').value = customer.gender;
    document.getElementById('customerAddress').value = customer.address || '';
    document.getElementById('customerCity').value = customer.city || '';
    document.getElementById('customerCountry').value = customer.country || 'USA';
    document.getElementById('customerPostalCode').value = customer.postalCode || '';
    document.getElementById('customerAccountStatus').value = customer.status;
    document.getElementById('emailVerification').value = customer.emailVerified;
    document.getElementById('customerImagePreview').src = customer.image;
    
    new bootstrap.Modal(document.getElementById('editCustomerModal')).show();
}

function saveCustomer() {
    const id = document.getElementById('editCustomerId').value;
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const mobile = document.getElementById('customerMobile').value;
    const gender = document.getElementById('customerGender').value;
    const address = document.getElementById('customerAddress').value;
    const city = document.getElementById('customerCity').value;
    const country = document.getElementById('customerCountry').value;
    const postalCode = document.getElementById('customerPostalCode').value;
    const status = document.getElementById('customerAccountStatus').value;
    const emailVerified = document.getElementById('emailVerification').value;
    
    if (!name || !email || !mobile) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    
    const index = customersData.findIndex(c => c.id == id);
    if (index !== -1) {
        customersData[index] = {
            ...customersData[index],
            name: name.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            gender: gender,
            address: address,
            city: city,
            country: country,
            postalCode: postalCode,
            status: status,
            emailVerified: emailVerified
        };
        showToast('Customer updated successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('editCustomerModal')).hide();
    updateCustomerStats();
    renderCustomersTable();
    initCustomerSegmentsChart();
}

// ============================================
// ORDER HISTORY
// ============================================

function viewOrderHistory(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    const modalBody = document.getElementById('orderHistoryBody');
    if (!modalBody) return;
    
    let ordersHtml = '';
    if (customer.orders && customer.orders.length > 0) {
        ordersHtml = `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customer.orders.map(order => `
                            <tr>
                                <td><strong>${order.id}</strong></td>
                                <td>${formatDateTime(order.date)}</td>
                                <td>${formatCurrency(order.amount)}</td>
                                <td><span class="badge ${order.status === 'delivered' ? 'bg-success' : (order.status === 'shipped' ? 'bg-info' : 'bg-warning')}">${order.status}</span></td>
                                <td><button class="btn btn-sm btn-outline-primary" onclick="viewOrderDetails('${order.id}')">View Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        ordersHtml = '<div class="text-center py-5"><i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i><p>No orders found for this customer.</p></div>';
    }
    
    modalBody.innerHTML = `
        <h5 class="mb-3">Order History - ${escapeHtml(customer.name)}</h5>
        <p class="text-muted mb-3">Total Orders: ${customer.totalOrders} | Total Spent: ${formatCurrency(customer.totalSpent)}</p>
        ${ordersHtml}
    `;
    
    new bootstrap.Modal(document.getElementById('orderHistoryModal')).show();
}

function viewOrderDetails(orderId) {
    showToast(`Viewing order ${orderId}`, 'info');
    // Redirect to orders page or open order details modal
    // window.location.href = `orders.html?order=${orderId}`;
}

// ============================================
// BLOCK/UNBLOCK CUSTOMER
// ============================================

function showBlockModal(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    document.getElementById('blockCustomerId').value = customerId;
    document.getElementById('blockCustomerName').value = customer.name;
    document.getElementById('blockCustomerNameDisplay').textContent = customer.name;
    document.getElementById('blockReason').value = '';
    
    new bootstrap.Modal(document.getElementById('blockModal')).show();
}

function blockCustomer() {
    const customerId = parseInt(document.getElementById('blockCustomerId').value);
    const reason = document.getElementById('blockReason').value;
    
    const index = customersData.findIndex(c => c.id === customerId);
    if (index !== -1) {
        customersData[index].status = 'blocked';
        showToast(`Customer "${customersData[index].name}" has been blocked`, 'warning');
        if (reason) {
            console.log(`Block reason: ${reason}`);
            // Send email notification about block
            showToast(`Notification email sent to ${customersData[index].email}`, 'info');
        }
    }
    
    bootstrap.Modal.getInstance(document.getElementById('blockModal')).hide();
    updateCustomerStats();
    renderCustomersTable();
    initCustomerSegmentsChart();
}

function unblockCustomer(customerId) {
    const index = customersData.findIndex(c => c.id === customerId);
    if (index !== -1) {
        customersData[index].status = 'active';
        showToast(`Customer "${customersData[index].name}" has been unblocked`, 'success');
    }
    
    updateCustomerStats();
    renderCustomersTable();
    initCustomerSegmentsChart();
}

// ============================================
// DELETE CUSTOMER
// ============================================

function deleteCustomer(customerId) {
    document.getElementById('deleteCustomerId').value = customerId;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteCustomer() {
    const customerId = parseInt(document.getElementById('deleteCustomerId').value);
    const index = customersData.findIndex(c => c.id === customerId);
    
    if (index !== -1) {
        const deletedCustomer = customersData[index];
        customersData.splice(index, 1);
        showToast(`Customer "${deletedCustomer.name}" deleted successfully`, 'success');
        
        const remainingItems = filterCustomers().length;
        const totalPages = Math.ceil(remainingItems / customersPerPage);
        if (currentCustomerPage > totalPages && totalPages > 0) {
            currentCustomerPage = totalPages;
        } else if (totalPages === 0) {
            currentCustomerPage = 1;
        }
        
        updateCustomerStats();
        renderCustomersTable();
        initCustomerSegmentsChart();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// SEND MESSAGE & NEWSLETTER
// ============================================

function sendMessageToCustomer(customerId) {
    const customer = customersData.find(c => c.id === customerId);
    if (!customer) return;
    
    document.getElementById('messageCustomerId').value = customer.id;
    document.getElementById('messageCustomerName').value = customer.name;
    document.getElementById('messageCustomerEmail').value = customer.email;
    document.getElementById('messageSubject').value = '';
    document.getElementById('messageContent').value = '';
    
    new bootstrap.Modal(document.getElementById('messageModal')).show();
}

function sendMessage() {
    const customerId = document.getElementById('messageCustomerId').value;
    const customerName = document.getElementById('messageCustomerName').value;
    const subject = document.getElementById('messageSubject').value;
    const message = document.getElementById('messageContent').value;
    const customerEmail = document.getElementById('messageCustomerEmail').value;
    
    if (!subject || !message) {
        showToast('Please enter both subject and message', 'danger');
        return;
    }
    
    showToast(`Message sent to ${customerName}`, 'success');
    console.log(`Email sent to: ${customerEmail}\nSubject: ${subject}\nMessage: ${message}`);
    
    bootstrap.Modal.getInstance(document.getElementById('messageModal')).hide();
}

function showNewsletterModal() {
    document.getElementById('newsletterSubject').value = '';
    document.getElementById('newsletterMessage').value = '';
    document.getElementById('newsletterRecipients').value = 'all';
    
    new bootstrap.Modal(document.getElementById('newsletterModal')).show();
}

function sendNewsletter() {
    const subject = document.getElementById('newsletterSubject').value;
    const message = document.getElementById('newsletterMessage').value;
    const recipients = document.getElementById('newsletterRecipients').value;
    
    if (!subject || !message) {
        showToast('Please enter both subject and message', 'danger');
        return;
    }
    
    let recipientCount = 0;
    switch(recipients) {
        case 'all':
            recipientCount = customersData.length;
            break;
        case 'active':
            recipientCount = customersData.filter(c => c.status === 'active').length;
            break;
        case 'recent':
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            recipientCount = customersData.filter(c => new Date(c.createdAt) >= thirtyDaysAgo).length;
            break;
        case 'high_value':
            recipientCount = customersData.filter(c => c.totalSpent >= 500).length;
            break;
    }
    
    showToast(`Newsletter sent to ${recipientCount} customers`, 'success');
    console.log(`Newsletter sent:\nSubject: ${subject}\nRecipients: ${recipientCount}\nMessage: ${message}`);
    
    bootstrap.Modal.getInstance(document.getElementById('newsletterModal')).hide();
}

// ============================================
// EXPORT CUSTOMERS
// ============================================

function exportCustomers() {
    const filteredData = filterCustomers();
    let csvContent = "ID,Name,Email,Mobile,Gender,City,Country,Status,Email Verification,Total Orders,Total Spent,Registered Date\n";
    
    filteredData.forEach(customer => {
        csvContent += `"${customer.id}","${customer.name}","${customer.email}","${customer.mobile}","${customer.gender}","${customer.city}","${customer.country}","${customer.status}","${customer.emailVerified}","${customer.totalOrders}","${customer.totalSpent}","${customer.createdAt}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Customers exported successfully', 'success');
}

// ============================================
// RESET FILTERS
// ============================================

function resetCustomerFilters() {
    customerFilters = {
        search: '',
        status: 'all',
        gender: 'all',
        minOrders: '',
        dateFrom: '',
        dateTo: ''
    };
    currentCustomerPage = 1;
    
    const searchInput = document.getElementById('searchCustomer');
    const statusFilter = document.getElementById('customerStatusFilter');
    const genderFilter = document.getElementById('genderFilter');
    const minOrders = document.getElementById('minOrders');
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (genderFilter) genderFilter.value = 'all';
    if (minOrders) minOrders.value = '';
    if (dateFrom) dateFrom.value = '';
    if (dateTo) dateTo.value = '';
    
    renderCustomersTable();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupCustomerEventListeners() {
    const searchInput = document.getElementById('searchCustomer');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            customerFilters.search = e.target.value.toLowerCase();
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const statusFilter = document.getElementById('customerStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            customerFilters.status = e.target.value;
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const genderFilter = document.getElementById('genderFilter');
    if (genderFilter) {
        genderFilter.addEventListener('change', function(e) {
            customerFilters.gender = e.target.value;
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const minOrders = document.getElementById('minOrders');
    if (minOrders) {
        minOrders.addEventListener('change', function(e) {
            customerFilters.minOrders = e.target.value;
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const dateFrom = document.getElementById('dateFrom');
    if (dateFrom) {
        dateFrom.addEventListener('change', function(e) {
            customerFilters.dateFrom = e.target.value;
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const dateTo = document.getElementById('dateTo');
    if (dateTo) {
        dateTo.addEventListener('change', function(e) {
            customerFilters.dateTo = e.target.value;
            currentCustomerPage = 1;
            renderCustomersTable();
        });
    }
    
    const resetBtn = document.getElementById('resetCustomerFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCustomerFilters);
    }
    
    const exportBtn = document.getElementById('exportCustomersBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCustomers);
    }
    
    const newsletterBtn = document.getElementById('sendNewsletterBtn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', showNewsletterModal);
    }
    
    const sendNewsletterSubmitBtn = document.getElementById('sendNewsletterSubmitBtn');
    if (sendNewsletterSubmitBtn) {
        sendNewsletterSubmitBtn.addEventListener('click', sendNewsletter);
    }
    
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function() {
            const customerId = document.getElementById('editCustomerId')?.value;
            if (customerId) {
                sendMessageToCustomer(parseInt(customerId));
            }
        });
    }
    
    const sendMessageSubmitBtn = document.getElementById('sendMessageSubmitBtn');
    if (sendMessageSubmitBtn) {
        sendMessageSubmitBtn.addEventListener('click', sendMessage);
    }
    
    const saveCustomerBtn = document.getElementById('saveCustomerBtn');
    if (saveCustomerBtn) {
        saveCustomerBtn.addEventListener('click', saveCustomer);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteCustomer);
    }
    
    const confirmBlockBtn = document.getElementById('confirmBlockBtn');
    if (confirmBlockBtn) {
        confirmBlockBtn.addEventListener('click', blockCustomer);
    }
    
    // Image upload
    const uploadBtn = document.getElementById('uploadCustomerImageBtn');
    const imageInput = document.getElementById('customerImage');
    const imagePreview = document.getElementById('customerImagePreview');
    
    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imagePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    showToast('Please select an image file', 'danger');
                }
            }
        });
    }
}

// ============================================
// SIDEBAR & DARK MODE FUNCTIONS
// ============================================

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }
}

function setupDarkModeToggle() {
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
}

function loadDarkModePreference() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
}

// ============================================
// MAKE FUNCTIONS GLOBAL
// ============================================
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;
window.viewOrderHistory = viewOrderHistory;
window.viewOrderDetails = viewOrderDetails;
window.showBlockModal = showBlockModal;
window.unblockCustomer = unblockCustomer;
window.sendMessageToCustomer = sendMessageToCustomer;
window.changeCustomerPage = changeCustomerPage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    updateCustomerStats();
    renderCustomersTable();
    initCustomerGrowthChart();
    initCustomerSegmentsChart();
    setupCustomerEventListeners();
});