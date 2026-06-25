/* ============================================
   Reports Management JavaScript
   For: reports.html
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

// ============================================
// SAMPLE DATA FOR REPORTS
// ============================================

// Overview Data
let overviewData = {
    totalRevenue: 125480.50,
    totalBookings: 1250,
    totalOrders: 3420,
    totalCustomers: 2450,
    monthlyRevenue: [8500, 9200, 10500, 11800, 13200, 14500, 15800, 17200, 18500, 19800, 21000, 22500],
    bookingStatusCounts: { completed: 985, pending: 220, upcoming: 45, cancelled: 30 },
    topServices: [
        { name: 'Plumbing', count: 350 },
        { name: 'Electrical', count: 280 },
        { name: 'AC Repair', count: 210 },
        { name: 'Painting', count: 180 },
        { name: 'Carpentry', count: 150 }
    ],
    topSellers: [
        { name: 'Tool World', revenue: 28450, itemsSold: 156 },
        { name: 'Electro Hub', revenue: 18750, itemsSold: 89 },
        { name: 'Furniture Craft', revenue: 32500, itemsSold: 45 },
        { name: 'Plumbing Supply Co', revenue: 22340, itemsSold: 112 },
        { name: 'Paint Pro', revenue: 12450, itemsSold: 78 }
    ]
};

// Bookings Data
let bookingsReportData = [
    { id: 'BK1001', customer: 'John Doe', service: 'Plumbing', provider: 'Mike\'s Plumbing', date: '2024-01-15', amount: 147.33, status: 'completed' },
    { id: 'BK1002', customer: 'Jane Smith', service: 'Electrical', provider: 'Spark Electric', date: '2024-01-16', amount: 219.97, status: 'pending' },
    { id: 'BK1003', customer: 'Mike Johnson', service: 'AC Repair', provider: 'Cool AC', date: '2024-01-17', amount: 214.47, status: 'confirmed' },
    { id: 'BK1004', customer: 'Sarah Williams', service: 'Painting', provider: 'Perfect Paint', date: '2024-01-18', amount: 714.98, status: 'completed' },
    { id: 'BK1005', customer: 'Robert Brown', service: 'Carpentry', provider: 'Wood Magic', date: '2024-01-19', amount: 225.45, status: 'cancelled' },
    { id: 'BK1006', customer: 'Emily Davis', service: 'Plumbing', provider: 'Mike\'s Plumbing', date: '2024-01-20', amount: 89.99, status: 'completed' },
    { id: 'BK1007', customer: 'David Wilson', service: 'Electrical', provider: 'Spark Electric', date: '2024-01-21', amount: 189.99, status: 'confirmed' },
    { id: 'BK1008', customer: 'Lisa Anderson', service: 'AC Repair', provider: 'Cool AC', date: '2024-01-22', amount: 335.76, status: 'pending' },
    { id: 'BK1009', customer: 'James Taylor', service: 'Painting', provider: 'Perfect Paint', date: '2024-01-23', amount: 450.00, status: 'completed' },
    { id: 'BK1010', customer: 'Maria Garcia', service: 'Carpentry', provider: 'Wood Magic', date: '2024-01-24', amount: 89.99, status: 'completed' }
];

// Orders Data
let ordersReportData = [
    { id: 'ORD1001', customer: 'John Doe', shop: 'Tool World', date: '2024-01-15', amount: 147.33, method: 'VISA', status: 'delivered' },
    { id: 'ORD1002', customer: 'Jane Smith', shop: 'Electro Hub', date: '2024-01-16', amount: 219.97, method: 'MoMo', status: 'pending' },
    { id: 'ORD1003', customer: 'Mike Johnson', shop: 'Furniture Craft', date: '2024-01-17', amount: 214.47, method: 'OM', status: 'confirmed' },
    { id: 'ORD1004', customer: 'Sarah Williams', shop: 'Paint Pro', date: '2024-01-18', amount: 714.98, method: 'VISA', status: 'delivered' },
    { id: 'ORD1005', customer: 'Robert Brown', shop: 'Plumbing Supply Co', date: '2024-01-19', amount: 225.45, method: 'MoMo', status: 'cancelled' }
];

// Payments Data
let paymentsReportData = [
    { id: 'PAY1001', customer: 'John Doe', service: 'Plumbing Repair', amount: 147.33, method: 'VISA', date: '2024-01-15', status: 'success' },
    { id: 'PAY1002', customer: 'Jane Smith', service: 'Electrical Wiring', amount: 219.97, method: 'MoMo', date: '2024-01-16', status: 'pending' },
    { id: 'PAY1003', customer: 'Mike Johnson', service: 'AC Service', amount: 214.47, method: 'OM', date: '2024-01-17', status: 'success' },
    { id: 'PAY1004', customer: 'Sarah Williams', service: 'Wall Painting', amount: 714.98, method: 'VISA', date: '2024-01-18', status: 'success' },
    { id: 'PAY1005', customer: 'Robert Brown', service: 'Furniture Repair', amount: 225.45, method: 'MoMo', date: '2024-01-19', status: 'failed' }
];

// Users Data
let usersReportData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'customer', status: 'active', registered: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', type: 'customer', status: 'active', registered: '2024-01-16' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'provider', status: 'active', registered: '2024-01-17' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', type: 'seller', status: 'active', registered: '2024-01-18' },
    { id: 5, name: 'Robert Brown', email: 'robert@example.com', type: 'customer', status: 'inactive', registered: '2024-01-19' }
];

// Inventory Data
let inventoryReportData = [
    { id: 1, name: 'Hammer', shop: 'Tool World', category: 'tools', price: 24.99, stock: 50, totalValue: 1249.50, status: 'active' },
    { id: 2, name: 'Screwdriver Set', shop: 'Tool World', category: 'tools', price: 39.99, stock: 30, totalValue: 1199.70, status: 'active' },
    { id: 3, name: 'Wireless Mouse', shop: 'Electro Hub', category: 'electronics', price: 29.99, stock: 5, totalValue: 149.95, status: 'active' },
    { id: 4, name: 'USB Cable', shop: 'Electro Hub', category: 'electronics', price: 12.99, stock: 200, totalValue: 2598.00, status: 'active' },
    { id: 5, name: 'Wooden Chair', shop: 'Furniture Craft', category: 'furniture', price: 149.99, stock: 0, totalValue: 0, status: 'inactive' }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentBookingsPage = 1;
let currentOrdersPage = 1;
let currentPaymentsPage = 1;
let currentUsersPage = 1;
let currentInventoryPage = 1;
const rowsPerPage = 5;

// Chart instances
let revenueChart = null;
let bookingStatusChart = null;
let topServicesChart = null;

// ============================================
// OVERVIEW FUNCTIONS
// ============================================

function updateOverviewKPIs() {
    document.getElementById('kpiTotalRevenue').textContent = formatCurrency(overviewData.totalRevenue);
    document.getElementById('kpiTotalBookings').textContent = overviewData.totalBookings;
    document.getElementById('kpiTotalOrders').textContent = overviewData.totalOrders;
    document.getElementById('kpiTotalCustomers').textContent = overviewData.totalCustomers;
}

function renderTopSellersTable() {
    const tbody = document.querySelector('#topSellersTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    overviewData.topSellers.forEach(seller => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(seller.name)}</td>
            <td>${formatCurrency(seller.revenue)}</td>
            <td>${seller.itemsSold}</td>
        `;
        tbody.appendChild(row);
    });
}

function initRevenueTrendChart() {
    const ctx = document.getElementById('revenueTrendChart');
    if (!ctx) return;
    
    if (revenueChart) revenueChart.destroy();
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: overviewData.monthlyRevenue,
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
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Revenue: ${formatCurrency(context.raw)}`;
                        }
                    }
                }
            }
        }
    });
}

function initBookingStatusChart() {
    const ctx = document.getElementById('bookingStatusChart');
    if (!ctx) return;
    
    if (bookingStatusChart) bookingStatusChart.destroy();
    
    bookingStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending', 'Upcoming', 'Cancelled'],
            datasets: [{
                data: [
                    overviewData.bookingStatusCounts.completed,
                    overviewData.bookingStatusCounts.pending,
                    overviewData.bookingStatusCounts.upcoming,
                    overviewData.bookingStatusCounts.cancelled
                ],
                backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function initTopServicesChart() {
    const ctx = document.getElementById('topServicesChart');
    if (!ctx) return;
    
    if (topServicesChart) topServicesChart.destroy();
    
    topServicesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: overviewData.topServices.map(s => s.name),
            datasets: [{
                label: 'Number of Bookings',
                data: overviewData.topServices.map(s => s.count),
                backgroundColor: '#4361ee',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

function applyOverviewFilter() {
    const fromDate = document.getElementById('overviewFromDate').value;
    const toDate = document.getElementById('overviewToDate').value;
    const reportType = document.getElementById('overviewReportType').value;
    
    showToast(`Generating ${reportType} report from ${fromDate || 'start'} to ${toDate || 'today'}`, 'info');
    // In production, fetch filtered data from API
    updateOverviewKPIs();
}

function exportOverviewReport() {
    const fromDate = document.getElementById('overviewFromDate').value || 'All';
    const toDate = document.getElementById('overviewToDate').value || 'All';
    
    let csvContent = `Alo Platform Report\n`;
    csvContent += `Period: ${fromDate} to ${toDate}\n\n`;
    csvContent += `Total Revenue,${overviewData.totalRevenue}\n`;
    csvContent += `Total Bookings,${overviewData.totalBookings}\n`;
    csvContent += `Total Orders,${overviewData.totalOrders}\n`;
    csvContent += `Active Customers,${overviewData.totalCustomers}\n\n`;
    
    csvContent += `Top Sellers\nSeller,Revenue,Items Sold\n`;
    overviewData.topSellers.forEach(s => {
        csvContent += `${s.name},${s.revenue},${s.itemsSold}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `overview_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Overview report exported successfully', 'success');
}

// ============================================
// BOOKINGS REPORT FUNCTIONS
// ============================================

function filterBookings() {
    const status = document.getElementById('bookingsStatusFilter').value;
    const service = document.getElementById('bookingsServiceFilter').value;
    const fromDate = document.getElementById('bookingsFromDate').value;
    const toDate = document.getElementById('bookingsToDate').value;
    
    let filtered = [...bookingsReportData];
    
    if (status !== 'all') {
        filtered = filtered.filter(b => b.status === status);
    }
    if (service !== 'all') {
        filtered = filtered.filter(b => b.service.toLowerCase() === service || b.service.toLowerCase().includes(service));
    }
    
    return filtered;
}

function renderBookingsReport() {
    let filteredData = filterBookings();
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentBookingsPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    
    const tbody = document.getElementById('bookingsReportBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-5">No bookings found</td></tr>';
        renderPagination('bookingsReportPagination', totalPages, currentBookingsPage, 'bookings');
        return;
    }
    
    pageData.forEach(booking => {
        const statusClass = booking.status === 'completed' ? 'status-success' : 
                           (booking.status === 'pending' ? 'status-pending' : 
                           (booking.status === 'confirmed' ? 'status-info' : 'status-danger'));
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${escapeHtml(booking.customer)}</td>
            <td>${booking.service}</td>
            <td>${escapeHtml(booking.provider)}</td>
            <td>${formatDateShort(booking.date)}</td>
            <td>${formatCurrency(booking.amount)}</td>
            <td><span class="status-badge ${statusClass}">${booking.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination('bookingsReportPagination', totalPages, currentBookingsPage, 'bookings');
}

function generateBookingsReport() {
    currentBookingsPage = 1;
    renderBookingsReport();
    showToast('Bookings report generated', 'success');
}

function exportBookingsReport() {
    let filteredData = filterBookings();
    let csvContent = "Booking ID,Customer,Service,Provider,Booking Date,Amount,Status\n";
    
    filteredData.forEach(booking => {
        csvContent += `"${booking.id}","${booking.customer}","${booking.service}","${booking.provider}","${booking.date}","${booking.amount}","${booking.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Bookings report exported successfully', 'success');
}

// ============================================
// ORDERS REPORT FUNCTIONS
// ============================================

function filterOrders() {
    const status = document.getElementById('ordersStatusFilter').value;
    const type = document.getElementById('ordersTypeFilter').value;
    
    let filtered = [...ordersReportData];
    
    if (status !== 'all') {
        filtered = filtered.filter(o => o.status === status);
    }
    
    return filtered;
}

function renderOrdersReport() {
    let filteredData = filterOrders();
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentOrdersPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    
    const tbody = document.getElementById('ordersReportBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-5">No orders found</td></tr>';
        renderPagination('ordersReportPagination', totalPages, currentOrdersPage, 'orders');
        return;
    }
    
    pageData.forEach(order => {
        const statusClass = order.status === 'delivered' ? 'status-success' : 
                           (order.status === 'pending' ? 'status-pending' : 
                           (order.status === 'confirmed' ? 'status-info' : 'status-danger'));
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${escapeHtml(order.customer)}</td>
            <td>${escapeHtml(order.shop)}</td>
            <td>${formatDateShort(order.date)}</td>
            <td>${formatCurrency(order.amount)}</td>
            <td>${order.method}</td>
            <td><span class="status-badge ${statusClass}">${order.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination('ordersReportPagination', totalPages, currentOrdersPage, 'orders');
}

function generateOrdersReport() {
    currentOrdersPage = 1;
    renderOrdersReport();
    showToast('Orders report generated', 'success');
}

function exportOrdersReport() {
    let filteredData = filterOrders();
    let csvContent = "Order ID,Customer,Shop/Seller,Order Date,Amount,Payment Method,Status\n";
    
    filteredData.forEach(order => {
        csvContent += `"${order.id}","${order.customer}","${order.shop}","${order.date}","${order.amount}","${order.method}","${order.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Orders report exported successfully', 'success');
}

// ============================================
// PAYMENTS REPORT FUNCTIONS
// ============================================

function filterPayments() {
    const status = document.getElementById('paymentsStatusFilter').value;
    const method = document.getElementById('paymentsMethodFilter').value;
    
    let filtered = [...paymentsReportData];
    
    if (status !== 'all') {
        filtered = filtered.filter(p => p.status === status);
    }
    if (method !== 'all') {
        filtered = filtered.filter(p => p.method === method);
    }
    
    return filtered;
}

function updatePaymentStats() {
    let filteredData = filterPayments();
    const totalCollected = filteredData.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
    const commission = totalCollected * 0.15;
    const pendingSettlements = filteredData.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    
    document.getElementById('paymentsTotalCollected').textContent = formatCurrency(totalCollected);
    document.getElementById('paymentsCommission').textContent = formatCurrency(commission);
    document.getElementById('paymentsPendingSettlements').textContent = formatCurrency(pendingSettlements);
}

function renderPaymentsReport() {
    let filteredData = filterPayments();
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentPaymentsPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    
    const tbody = document.getElementById('paymentsReportBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-5">No payments found</td></tr>';
        renderPagination('paymentsReportPagination', totalPages, currentPaymentsPage, 'payments');
        return;
    }
    
    pageData.forEach(payment => {
        const statusClass = payment.status === 'success' ? 'status-success' : 
                           (payment.status === 'pending' ? 'status-pending' : 'status-danger');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.id}</td>
            <td>${escapeHtml(payment.customer)}</td>
            <td>${payment.service}</td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>${payment.method}</td>
            <td>${formatDateShort(payment.date)}</td>
            <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination('paymentsReportPagination', totalPages, currentPaymentsPage, 'payments');
    updatePaymentStats();
}

function generatePaymentsReport() {
    currentPaymentsPage = 1;
    renderPaymentsReport();
    showToast('Payments report generated', 'success');
}

function exportPaymentsReport() {
    let filteredData = filterPayments();
    let csvContent = "Payment ID,Customer,Service/Order,Amount,Payment Method,Date,Status\n";
    
    filteredData.forEach(payment => {
        csvContent += `"${payment.id}","${payment.customer}","${payment.service}","${payment.amount}","${payment.method}","${payment.date}","${payment.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Payments report exported successfully', 'success');
}

// ============================================
// USERS REPORT FUNCTIONS
// ============================================

function filterUsers() {
    const type = document.getElementById('userTypeFilter').value;
    const status = document.getElementById('userStatusFilter').value;
    const regDate = document.getElementById('userRegistrationDate').value;
    
    let filtered = [...usersReportData];
    
    if (type !== 'all') {
        filtered = filtered.filter(u => u.type === type);
    }
    if (status !== 'all') {
        filtered = filtered.filter(u => u.status === status);
    }
    
    return filtered;
}

function updateUserStats() {
    let filteredData = filterUsers();
    const customers = filteredData.filter(u => u.type === 'customer').length;
    const providers = filteredData.filter(u => u.type === 'provider').length;
    const sellers = filteredData.filter(u => u.type === 'seller').length;
    const newThisMonth = filteredData.filter(u => new Date(u.registered).getMonth() === new Date().getMonth()).length;
    
    document.getElementById('usersTotalCustomers').textContent = customers;
    document.getElementById('usersTotalProviders').textContent = providers;
    document.getElementById('usersTotalSellers').textContent = sellers;
    document.getElementById('usersNewThisMonth').textContent = newThisMonth;
}

function renderUsersReport() {
    let filteredData = filterUsers();
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentUsersPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    
    const tbody = document.getElementById('usersReportBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-5">No users found</td></tr>';
        renderPagination('usersReportPagination', totalPages, currentUsersPage, 'users');
        return;
    }
    
    pageData.forEach(user => {
        const statusClass = user.status === 'active' ? 'status-success' : 'status-inactive';
        const typeClass = user.type === 'customer' ? 'bg-primary' : (user.type === 'provider' ? 'bg-info' : 'bg-secondary');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${escapeHtml(user.name)}</td>
            <td>${user.email}</td>
            <td><span class="badge ${typeClass}">${user.type}</span></td>
            <td><span class="status-badge ${statusClass}">${user.status}</span></td>
            <td>${formatDateShort(user.registered)}</td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination('usersReportPagination', totalPages, currentUsersPage, 'users');
    updateUserStats();
}

function generateUsersReport() {
    currentUsersPage = 1;
    renderUsersReport();
    showToast('Users report generated', 'success');
}

function exportUsersReport() {
    let filteredData = filterUsers();
    let csvContent = "ID,Name,Email,Type,Status,Registered Date\n";
    
    filteredData.forEach(user => {
        csvContent += `"${user.id}","${user.name}","${user.email}","${user.type}","${user.status}","${user.registered}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Users report exported successfully', 'success');
}

// ============================================
// INVENTORY REPORT FUNCTIONS
// ============================================

function filterInventory() {
    const shop = document.getElementById('inventoryShopFilter').value;
    const category = document.getElementById('inventoryCategoryFilter').value;
    const stockStatus = document.getElementById('inventoryStockFilter').value;
    
    let filtered = [...inventoryReportData];
    
    if (shop !== 'all') {
        filtered = filtered.filter(i => i.shop === shop);
    }
    if (category !== 'all') {
        filtered = filtered.filter(i => i.category === category);
    }
    if (stockStatus === 'low') {
        filtered = filtered.filter(i => i.stock > 0 && i.stock < 10);
    } else if (stockStatus === 'out') {
        filtered = filtered.filter(i => i.stock === 0);
    } else if (stockStatus === 'instock') {
        filtered = filtered.filter(i => i.stock > 0);
    }
    
    return filtered;
}

function updateInventoryStats() {
    let filteredData = filterInventory();
    const totalItems = filteredData.length;
    const totalValue = filteredData.reduce((sum, i) => sum + i.totalValue, 0);
    const lowStockCount = filteredData.filter(i => i.stock > 0 && i.stock < 10).length;
    
    document.getElementById('inventoryTotalItems').textContent = totalItems;
    document.getElementById('inventoryTotalValue').textContent = formatCurrency(totalValue);
    document.getElementById('inventoryLowStockCount').textContent = lowStockCount;
}

function renderInventoryReport() {
    let filteredData = filterInventory();
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const start = (currentInventoryPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);
    
    const tbody = document.getElementById('inventoryReportBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-5">No inventory items found</td></tr>';
        renderPagination('inventoryReportPagination', totalPages, currentInventoryPage, 'inventory');
        return;
    }
    
    pageData.forEach(item => {
        const statusClass = item.status === 'active' ? 'status-success' : 'status-inactive';
        const lowStockClass = item.stock < 10 && item.stock > 0 ? 'text-danger fw-bold' : '';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.shop)}</td>
            <td>${item.category}</td>
            <td>${formatCurrency(item.price)}</td>
            <td><span class="${lowStockClass}">${item.stock}</span></td>
            <td>${formatCurrency(item.totalValue)}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    renderPagination('inventoryReportPagination', totalPages, currentInventoryPage, 'inventory');
    updateInventoryStats();
}

function generateInventoryReport() {
    currentInventoryPage = 1;
    renderInventoryReport();
    showToast('Inventory report generated', 'success');
}

function exportInventoryReport() {
    let filteredData = filterInventory();
    let csvContent = "ID,Item Name,Shop,Category,Price,Stock,Total Value,Status\n";
    
    filteredData.forEach(item => {
        csvContent += `"${item.id}","${item.name}","${item.shop}","${item.category}","${item.price}","${item.stock}","${item.totalValue}","${item.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_report_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Inventory report exported successfully', 'success');
}

// ============================================
// PAGINATION HELPER
// ============================================

function renderPagination(containerId, totalPages, currentPage, type) {
    const pagination = document.getElementById(containerId);
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1}, '${type}'); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i}, '${type}'); return false;">${i}</a>
        </li>`;
    }
    
    pagination.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1}, '${type}'); return false;">Next</a>
    </li>`;
}

function changePage(page, type) {
    if (type === 'bookings') {
        currentBookingsPage = page;
        renderBookingsReport();
    } else if (type === 'orders') {
        currentOrdersPage = page;
        renderOrdersReport();
    } else if (type === 'payments') {
        currentPaymentsPage = page;
        renderPaymentsReport();
    } else if (type === 'users') {
        currentUsersPage = page;
        renderUsersReport();
    } else if (type === 'inventory') {
        currentInventoryPage = page;
        renderInventoryReport();
    }
}

// ============================================
// LOAD SHOPS FOR INVENTORY FILTER
// ============================================

function loadShopsForInventory() {
    const shopSelect = document.getElementById('inventoryShopFilter');
    if (!shopSelect) return;
    
    const shops = [...new Set(inventoryReportData.map(item => item.shop))];
    shopSelect.innerHTML = '<option value="all">All Shops</option>';
    shops.forEach(shop => {
        shopSelect.innerHTML += `<option value="${escapeHtml(shop)}">${escapeHtml(shop)}</option>`;
    });
}

// ============================================
// SET DEFAULT DATES
// ============================================

function setDefaultDates() {
    const today = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);
    
    const dateInputs = ['overviewFromDate', 'bookingsFromDate', 'ordersFromDate', 'paymentsFromDate'];
    const toDateInputs = ['overviewToDate', 'bookingsToDate', 'ordersToDate', 'paymentsToDate'];
    
    dateInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value) el.value = thirtyDaysAgoStr;
    });
    
    toDateInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value) el.value = today;
    });
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================

function setupReportEventListeners() {
    // Overview
    const applyOverviewBtn = document.getElementById('applyOverviewFilter');
    if (applyOverviewBtn) applyOverviewBtn.addEventListener('click', applyOverviewFilter);
    
    const exportOverviewBtn = document.getElementById('exportOverviewReport');
    if (exportOverviewBtn) exportOverviewBtn.addEventListener('click', exportOverviewReport);
    
    // Bookings
    const generateBookingsBtn = document.getElementById('generateBookingsReport');
    if (generateBookingsBtn) generateBookingsBtn.addEventListener('click', generateBookingsReport);
    
    const exportBookingsBtn = document.getElementById('exportBookingsReport');
    if (exportBookingsBtn) exportBookingsBtn.addEventListener('click', exportBookingsReport);
    
    // Orders
    const generateOrdersBtn = document.getElementById('generateOrdersReport');
    if (generateOrdersBtn) generateOrdersBtn.addEventListener('click', generateOrdersReport);
    
    const exportOrdersBtn = document.getElementById('exportOrdersReport');
    if (exportOrdersBtn) exportOrdersBtn.addEventListener('click', exportOrdersReport);
    
    // Payments
    const generatePaymentsBtn = document.getElementById('generatePaymentsReport');
    if (generatePaymentsBtn) generatePaymentsBtn.addEventListener('click', generatePaymentsReport);
    
    const exportPaymentsBtn = document.getElementById('exportPaymentsReport');
    if (exportPaymentsBtn) exportPaymentsBtn.addEventListener('click', exportPaymentsReport);
    
    // Users
    const generateUsersBtn = document.getElementById('generateUsersReport');
    if (generateUsersBtn) generateUsersBtn.addEventListener('click', generateUsersReport);
    
    const exportUsersBtn = document.getElementById('exportUsersReport');
    if (exportUsersBtn) exportUsersBtn.addEventListener('click', exportUsersReport);
    
    // Inventory
    const generateInventoryBtn = document.getElementById('generateInventoryReport');
    if (generateInventoryBtn) generateInventoryBtn.addEventListener('click', generateInventoryReport);
    
    const exportInventoryBtn = document.getElementById('exportInventoryReport');
    if (exportInventoryBtn) exportInventoryBtn.addEventListener('click', exportInventoryReport);
    
    // Filter change listeners
    const filterIds = ['bookingsStatusFilter', 'bookingsServiceFilter', 'ordersStatusFilter', 'ordersTypeFilter', 'paymentsStatusFilter', 'paymentsMethodFilter', 'userTypeFilter', 'userStatusFilter', 'inventoryShopFilter', 'inventoryCategoryFilter', 'inventoryStockFilter'];
    filterIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => changePage(1, id.includes('bookings') ? 'bookings' : (id.includes('orders') ? 'orders' : (id.includes('payments') ? 'payments' : (id.includes('user') ? 'users' : 'inventory')))));
    });
}

// ============================================
// SIDEBAR & DARK MODE FUNCTIONS
// ============================================

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.toggle('active');
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
window.changePage = changePage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    setDefaultDates();
    loadShopsForInventory();
    
    updateOverviewKPIs();
    renderTopSellersTable();
    initRevenueTrendChart();
    initBookingStatusChart();
    initTopServicesChart();
    
    renderBookingsReport();
    renderOrdersReport();
    renderPaymentsReport();
    renderUsersReport();
    renderInventoryReport();
    
    setupReportEventListeners();
});