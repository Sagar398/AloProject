/* ============================================
   Payment Management JavaScript
   For: payment.html
   ============================================ */

// ============================================
// SAMPLE DATA
// ============================================

// Sample Payment Data
const paymentsData = [
    {
        id: 'PAY1001',
        customer: { name: 'John Doe', email: 'john.doe@example.com', mobile: '+1 234 567 8901' },
        service: { name: 'Plumbing Repair', provider: 'Mike\'s Plumbing', date: '2024-01-15 10:00:00' },
        amount: 147.33, paymentMethod: 'VISA', paymentDate: '2024-01-15 10:30:00', status: 'Success',
        breakdown: { labor: 89.99, material: 35.97, transport: 10.00, tax: 13.39 }
    },
    {
        id: 'PAY1002',
        customer: { name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '+1 234 567 8902' },
        service: { name: 'Electrical Wiring', provider: 'Spark Electric', date: '2024-01-16 14:00:00' },
        amount: 219.97, paymentMethod: 'MoMo', paymentDate: '2024-01-16 14:15:00', status: 'Pending',
        breakdown: { labor: 120.00, material: 159.98, transport: 0, tax: 20.00 }
    },
    {
        id: 'PAY1003',
        customer: { name: 'Mike Johnson', email: 'mike.j@example.com', mobile: '+1 234 567 8903' },
        service: { name: 'AC Service', provider: 'Cool AC', date: '2024-01-17 11:00:00' },
        amount: 214.47, paymentMethod: 'OM', paymentDate: '2024-01-17 11:20:00', status: 'Success',
        breakdown: { labor: 80.00, material: 114.97, transport: 15.00, tax: 19.50 }
    },
    {
        id: 'PAY1004',
        customer: { name: 'Sarah Williams', email: 'sarah.w@example.com', mobile: '+1 234 567 8904' },
        service: { name: 'Wall Painting', provider: 'Perfect Paint', date: '2024-01-18 09:00:00' },
        amount: 714.98, paymentMethod: 'VISA', paymentDate: '2024-01-18 09:30:00', status: 'Success',
        breakdown: { labor: 350.00, material: 299.98, transport: 25.00, tax: 65.00 }
    },
    {
        id: 'PAY1005',
        customer: { name: 'Robert Brown', email: 'robert.b@example.com', mobile: '+1 234 567 8905' },
        service: { name: 'Furniture Repair', provider: 'Wood Magic', date: '2024-01-19 13:00:00' },
        amount: 225.45, paymentMethod: 'MoMo', paymentDate: '2024-01-19 13:45:00', status: 'Failed',
        breakdown: { labor: 75.00, material: 129.95, transport: 10.00, tax: 20.50 }
    }
];

// Sample Settlement Data
const settlementsData = [
    {
        id: 'STL1001',
        type: 'service_provider',
        provider: { name: 'Mike\'s Plumbing', email: 'mike@plumbing.com', mobile: '+1 234 567 8910' },
        service: 'Plumbing Services',
        totalCompletedServices: 25,
        commissionRate: 15,
        totalAmount: 3683.25,
        paymentDate: '2024-01-20',
        status: 'Success'
    },
    {
        id: 'STL1002',
        type: 'service_provider',
        provider: { name: 'Spark Electric', email: 'spark@electric.com', mobile: '+1 234 567 8911' },
        service: 'Electrical Services',
        totalCompletedServices: 18,
        commissionRate: 15,
        totalAmount: 3295.50,
        paymentDate: '2024-01-19',
        status: 'Success'
    },
    {
        id: 'STL1003',
        type: 'vendor',
        provider: { name: 'Tool World', email: 'sales@toolworld.com', mobile: '+1 234 567 8912' },
        service: 'Tools & Equipment',
        totalCompletedServices: 42,
        commissionRate: 10,
        totalAmount: 1890.00,
        paymentDate: '2024-01-21',
        status: 'Pending'
    },
    {
        id: 'STL1004',
        type: 'service_provider',
        provider: { name: 'Cool AC', email: 'service@coolac.com', mobile: '+1 234 567 8913' },
        service: 'AC Services',
        totalCompletedServices: 12,
        commissionRate: 15,
        totalAmount: 2574.36,
        paymentDate: null,
        status: 'Pending'
    },
    {
        id: 'STL1005',
        type: 'vendor',
        provider: { name: 'Paint Mart', email: 'info@paintmart.com', mobile: '+1 234 567 8914' },
        service: 'Painting Supplies',
        totalCompletedServices: 15,
        commissionRate: 10,
        totalAmount: 675.00,
        paymentDate: '2024-01-18',
        status: 'Success'
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentPaymentPage = 1;
let currentSettlementPage = 1;
const rowsPerPage = 5;

// ============================================
// FILTER VARIABLES
// ============================================
let paymentFilters = {
    search: '',
    status: 'all',
    method: 'all',
    dateFrom: '',
    dateTo: ''
};

let settlementFilters = {
    search: '',
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: ''
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

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

// ============================================
// PAYMENT MANAGEMENT FUNCTIONS
// ============================================

function updatePaymentStats() {
    const total = paymentsData.length;
    const totalRevenue = paymentsData.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0);
    const successfulPayments = paymentsData.filter(p => p.status === 'Success').length;
    const pendingSettlements = settlementsData.filter(s => s.status === 'Pending').length;
    
    const totalPaymentsEl = document.getElementById('totalPayments');
    const totalRevenueEl = document.getElementById('totalRevenue');
    const successfulPaymentsEl = document.getElementById('successfulPayments');
    const pendingSettlementsEl = document.getElementById('pendingSettlements');
    
    if (totalPaymentsEl) totalPaymentsEl.textContent = total;
    if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRevenue);
    if (successfulPaymentsEl) successfulPaymentsEl.textContent = successfulPayments;
    if (pendingSettlementsEl) pendingSettlementsEl.textContent = pendingSettlements;
}

function filterPayments() {
    return paymentsData.filter(payment => {
        // Search filter
        if (paymentFilters.search && !payment.id.toLowerCase().includes(paymentFilters.search) &&
            !payment.customer.name.toLowerCase().includes(paymentFilters.search)) {
            return false;
        }
        // Status filter
        if (paymentFilters.status !== 'all' && payment.status.toLowerCase() !== paymentFilters.status) {
            return false;
        }
        // Method filter
        if (paymentFilters.method !== 'all' && payment.paymentMethod !== paymentFilters.method) {
            return false;
        }
        // Date range filters
        if (paymentFilters.dateFrom && new Date(payment.paymentDate) < new Date(paymentFilters.dateFrom)) {
            return false;
        }
        if (paymentFilters.dateTo && new Date(payment.paymentDate) > new Date(paymentFilters.dateTo)) {
            return false;
        }
        return true;
    });
}

function renderPaymentsTable() {
    const tbody = document.getElementById('paymentsTableBody');
    if (!tbody) return;
    
    let filteredPayments = filterPayments();
    const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
    const start = (currentPaymentPage - 1) * rowsPerPage;
    const pagePayments = filteredPayments.slice(start, start + rowsPerPage);
    
    tbody.innerHTML = '';
    
    if (pagePayments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-5">No payments found</td></tr>';
        renderPaymentsPagination(totalPages);
        return;
    }
    
    pagePayments.forEach(payment => {
        const statusClass = payment.status === 'Success' ? 'status-success' : 
                           (payment.status === 'Pending' ? 'status-pending' : 'status-failed');
        
        let methodIcon = '';
        switch(payment.paymentMethod) {
            case 'VISA':
                methodIcon = 'fab fa-cc-visa';
                break;
            case 'MoMo':
                methodIcon = 'fas fa-money-bill-wave';
                break;
            case 'OM':
                methodIcon = 'fas fa-mobile-alt';
                break;
            default:
                methodIcon = 'fas fa-credit-card';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${payment.id}</strong></td>
            <td>
                <div>
                    <div class="fw-bold">${escapeHtml(payment.customer.name)}</div>
                    <small class="text-muted">${payment.customer.email}</small><br>
                    <small class="text-muted">${payment.customer.mobile}</small>
                </div>
            </td>
            <td>
                <div>${escapeHtml(payment.service.name)}</div>
                <small class="text-muted">Provider: ${escapeHtml(payment.service.provider)}</small><br>
                <small class="text-muted">Date: ${formatDateTime(payment.service.date)}</small>
            </td>
            <td><strong>${formatCurrency(payment.amount)}</strong></td>
            <td><i class="${methodIcon} me-1"></i> ${payment.paymentMethod}</td>
            <td>${formatDateShort(payment.paymentDate)}</td>
            <td><span class="status-badge ${statusClass}">${payment.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewPaymentDetails('${payment.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderPaymentsPagination(totalPages);
}

function renderPaymentsPagination(totalPages) {
    const pagination = document.getElementById('paymentsPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    // Previous button
    pagination.innerHTML += `<li class="page-item ${currentPaymentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePaymentPage(${currentPaymentPage - 1}); return false;">Previous</a>
    </li>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPaymentPage - 2 && i <= currentPaymentPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentPaymentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePaymentPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentPaymentPage - 3 || i === currentPaymentPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Next button
    pagination.innerHTML += `<li class="page-item ${currentPaymentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changePaymentPage(${currentPaymentPage + 1}); return false;">Next</a>
    </li>`;
}

function changePaymentPage(page) {
    currentPaymentPage = page;
    renderPaymentsTable();
}

function viewPaymentDetails(paymentId) {
    const payment = paymentsData.find(p => p.id === paymentId);
    if (!payment) return;
    
    const modalBody = document.getElementById('paymentModalBody');
    if (!modalBody) return;
    
    const commissionAmount = payment.breakdown.labor * 0.15;
    
    modalBody.innerHTML = `
        <div class="receipt">
            <div class="text-center mb-4">
                <h2><i class="fas fa-bolt"></i> Alo</h2>
                <p>Payment Receipt</p>
                <p><strong>Payment ID:</strong> ${payment.id}</p>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h6>Customer Details</h6>
                    <p>
                        <strong>Name:</strong> ${escapeHtml(payment.customer.name)}<br>
                        <strong>Email:</strong> ${payment.customer.email}<br>
                        <strong>Mobile:</strong> ${payment.customer.mobile}
                    </p>
                </div>
                <div class="col-md-6">
                    <h6>Service Details</h6>
                    <p>
                        <strong>Service:</strong> ${escapeHtml(payment.service.name)}<br>
                        <strong>Provider:</strong> ${escapeHtml(payment.service.provider)}<br>
                        <strong>Date:</strong> ${formatDateTime(payment.service.date)}
                    </p>
                </div>
            </div>
            
            <h6>Amount Breakdown</h6>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <tr>
                        <td>Labor Charges</td>
                        <td class="text-end">${formatCurrency(payment.breakdown.labor)}</td>
                    </tr>
                    <tr>
                        <td>Material Purchase Charges</td>
                        <td class="text-end">${formatCurrency(payment.breakdown.material)}</td>
                    </tr>
                    <tr>
                        <td>Transport Charges</td>
                        <td class="text-end">${formatCurrency(payment.breakdown.transport)}</td>
                    </tr>
                    <tr>
                        <td>Commission Charges</td>
                        <td class="text-end">${formatCurrency(commissionAmount)}</td>
                    </tr>
                    <tr>
                        <td>TAX/VAT</td>
                        <td class="text-end">${formatCurrency(payment.breakdown.tax)}</td>
                    </tr>
                    <tr class="table-active">
                        <th>Total Amount</th>
                        <th class="text-end">${formatCurrency(payment.amount)}</th>
                    </tr>
                </table>
            </div>
            
            <div class="text-center mt-3 text-muted">
                <small>Thank you for choosing Alo!</small>
            </div>
        </div>
    `;
    
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
}

// ============================================
// SETTLEMENT MANAGEMENT FUNCTIONS
// ============================================

function filterSettlements() {
    return settlementsData.filter(settlement => {
        // Search filter
        if (settlementFilters.search && !settlement.id.toLowerCase().includes(settlementFilters.search) &&
            !settlement.provider.name.toLowerCase().includes(settlementFilters.search)) {
            return false;
        }
        // Type filter
        if (settlementFilters.type !== 'all' && settlement.type !== settlementFilters.type) {
            return false;
        }
        // Status filter
        if (settlementFilters.status !== 'all' && settlement.status.toLowerCase() !== settlementFilters.status) {
            return false;
        }
        return true;
    });
}

function renderSettlementsTable() {
    const tbody = document.getElementById('settlementsTableBody');
    if (!tbody) return;
    
    let filteredSettlements = filterSettlements();
    const totalPages = Math.ceil(filteredSettlements.length / rowsPerPage);
    const start = (currentSettlementPage - 1) * rowsPerPage;
    const pageSettlements = filteredSettlements.slice(start, start + rowsPerPage);
    
    tbody.innerHTML = '';
    
    if (pageSettlements.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-5">No settlements found</td></tr>';
        renderSettlementsPagination(totalPages);
        return;
    }
    
    pageSettlements.forEach(settlement => {
        const statusClass = settlement.status === 'Success' ? 'status-success' : 'status-pending';
        const typeBadge = settlement.type === 'service_provider' ? 'bg-primary' : 'bg-info';
        const typeText = settlement.type === 'service_provider' ? 'Provider' : 'Vendor';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${settlement.id}</strong></td>
            <td>
                <div>
                    <div class="fw-bold">${escapeHtml(settlement.provider.name)}</div>
                    <small class="text-muted">${settlement.provider.email}</small>
                </div>
            </td>
            <td>${settlement.service}</td>
            <td>${settlement.totalCompletedServices}</td>
            <td><span class="badge ${typeBadge}">${settlement.commissionRate}%</span></td>
            <td><strong>${formatCurrency(settlement.totalAmount)}</strong></td>
            <td>${settlement.paymentDate ? formatDateShort(settlement.paymentDate) : 'Not Processed'}</td>
            <td><span class="status-badge ${statusClass}">${settlement.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="viewSettlementDetails('${settlement.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                ${settlement.status === 'Pending' ? 
                    `<button class="btn btn-sm btn-success" onclick="openProcessSettlement('${settlement.id}')">
                        <i class="fas fa-hand-holding-usd"></i> Process
                    </button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderSettlementsPagination(totalPages);
}

function renderSettlementsPagination(totalPages) {
    const pagination = document.getElementById('settlementsPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    // Previous button
    pagination.innerHTML += `<li class="page-item ${currentSettlementPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSettlementPage(${currentSettlementPage - 1}); return false;">Previous</a>
    </li>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentSettlementPage - 2 && i <= currentSettlementPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentSettlementPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeSettlementPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentSettlementPage - 3 || i === currentSettlementPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Next button
    pagination.innerHTML += `<li class="page-item ${currentSettlementPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSettlementPage(${currentSettlementPage + 1}); return false;">Next</a>
    </li>`;
}

function changeSettlementPage(page) {
    currentSettlementPage = page;
    renderSettlementsTable();
}

function viewSettlementDetails(settlementId) {
    const settlement = settlementsData.find(s => s.id === settlementId);
    if (!settlement) return;
    
    const commissionAmount = (settlement.totalAmount * settlement.commissionRate / 100);
    const netAmount = settlement.totalAmount - commissionAmount;
    const typeText = settlement.type === 'service_provider' ? 'Service Provider' : 'Vendor';
    
    const modalBody = document.getElementById('settlementModalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h6>${typeText} Details</h6>
                <p>
                    <strong>Name:</strong> ${escapeHtml(settlement.provider.name)}<br>
                    <strong>Email:</strong> ${settlement.provider.email}<br>
                    <strong>Mobile:</strong> ${settlement.provider.mobile}<br>
                    <strong>Service:</strong> ${settlement.service}
                </p>
            </div>
            <div class="col-md-6">
                <h6>Settlement Details</h6>
                <p>
                    <strong>Total Completed Services:</strong> ${settlement.totalCompletedServices}<br>
                    <strong>Commission Rate:</strong> ${settlement.commissionRate}%<br>
                    <strong>Status:</strong> <span class="status-badge ${settlement.status === 'Success' ? 'status-success' : 'status-pending'}">${settlement.status}</span>
                </p>
            </div>
        </div>
        
        <h6>Payment Breakdown</h6>
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <td>Total Payment Amount</td>
                    <td class="text-end">${formatCurrency(settlement.totalAmount)}</td>
                </tr>
                <tr>
                    <td>Commission (${settlement.commissionRate}%)</td>
                    <td class="text-end text-danger">-${formatCurrency(commissionAmount)}</td>
                </tr>
                <tr class="table-active">
                    <th>Net Settlement Amount</th>
                    <th class="text-end">${formatCurrency(netAmount)}</th>
                </tr>
            </table>
        </div>
    `;
    
    const settlementModal = new bootstrap.Modal(document.getElementById('settlementModal'));
    settlementModal.show();
}

function openProcessSettlement(settlementId) {
    document.getElementById('processSettlementId').value = settlementId;
    const processModal = new bootstrap.Modal(document.getElementById('processSettlementModal'));
    processModal.show();
}

function processSettlement() {
    const settlementId = document.getElementById('processSettlementId').value;
    const transactionRef = document.getElementById('transactionRef').value;
    const paymentMethod = document.getElementById('settlementPaymentMethod').value;
    const note = document.getElementById('settlementNote').value;
    
    if (!transactionRef) {
        showToast('Please enter transaction reference', 'danger');
        return;
    }
    
    const settlement = settlementsData.find(s => s.id === settlementId);
    if (settlement) {
        settlement.status = 'Success';
        settlement.paymentDate = new Date().toISOString().slice(0, 10);
        showToast(`Settlement ${settlementId} processed successfully via ${paymentMethod}`, 'success');
        
        if (note) {
            console.log('Settlement note:', note);
        }
        
        updatePaymentStats();
        renderSettlementsTable();
    }
    
    // Close modal and clear form
    bootstrap.Modal.getInstance(document.getElementById('processSettlementModal')).hide();
    document.getElementById('transactionRef').value = '';
    document.getElementById('settlementNote').value = '';
}

function exportPayments() {
    const filteredPayments = filterPayments();
    let csvContent = "Payment ID,Customer Name,Customer Email,Customer Mobile,Service Name,Service Provider,Amount,Payment Method,Payment Date,Status\n";
    
    filteredPayments.forEach(payment => {
        csvContent += `"${payment.id}","${payment.customer.name}","${payment.customer.email}","${payment.customer.mobile}","${payment.service.name}","${payment.service.provider}","${payment.amount}","${payment.paymentMethod}","${payment.paymentDate}","${payment.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Payments exported successfully', 'success');
}

function refreshPayments() {
    showToast('Refreshing payments...', 'info');
    setTimeout(() => {
        updatePaymentStats();
        renderPaymentsTable();
        renderSettlementsTable();
        showToast('Payments refreshed successfully', 'success');
    }, 500);
}

function printPaymentReceipt() {
    window.print();
}

function printSettlementReceipt() {
    window.print();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupPaymentEventListeners() {
    // Payment Search
    const paymentSearch = document.getElementById('paymentSearchInput');
    if (paymentSearch) {
        paymentSearch.addEventListener('keyup', function(e) {
            paymentFilters.search = e.target.value.toLowerCase();
            currentPaymentPage = 1;
            renderPaymentsTable();
        });
    }
    
    // Payment Status Filter
    const statusFilter = document.getElementById('paymentStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            paymentFilters.status = e.target.value;
            currentPaymentPage = 1;
            renderPaymentsTable();
        });
    }
    
    // Payment Method Filter
    const methodFilter = document.getElementById('paymentMethodFilter');
    if (methodFilter) {
        methodFilter.addEventListener('change', function(e) {
            paymentFilters.method = e.target.value;
            currentPaymentPage = 1;
            renderPaymentsTable();
        });
    }
    
    // Payment Date Filters
    const dateFrom = document.getElementById('paymentDateFrom');
    const dateTo = document.getElementById('paymentDateTo');
    if (dateFrom) {
        dateFrom.addEventListener('change', function(e) {
            paymentFilters.dateFrom = e.target.value;
            currentPaymentPage = 1;
            renderPaymentsTable();
        });
    }
    if (dateTo) {
        dateTo.addEventListener('change', function(e) {
            paymentFilters.dateTo = e.target.value;
            currentPaymentPage = 1;
            renderPaymentsTable();
        });
    }
    
    // Settlement Search
    const settlementSearch = document.getElementById('settlementSearchInput');
    if (settlementSearch) {
        settlementSearch.addEventListener('keyup', function(e) {
            settlementFilters.search = e.target.value.toLowerCase();
            currentSettlementPage = 1;
            renderSettlementsTable();
        });
    }
    
    // Settlement Type Filter
    const settlementType = document.getElementById('settlementTypeFilter');
    if (settlementType) {
        settlementType.addEventListener('change', function(e) {
            settlementFilters.type = e.target.value;
            currentSettlementPage = 1;
            renderSettlementsTable();
        });
    }
    
    // Settlement Status Filter
    const settlementStatus = document.getElementById('settlementStatusFilter');
    if (settlementStatus) {
        settlementStatus.addEventListener('change', function(e) {
            settlementFilters.status = e.target.value;
            currentSettlementPage = 1;
            renderSettlementsTable();
        });
    }
    
    // Export Button
    const exportBtn = document.getElementById('exportPaymentsBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportPayments);
    }
    
    // Refresh Button
    const refreshBtn = document.getElementById('refreshPaymentsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshPayments);
    }
    
    // Process Settlement Button in modal
    const confirmSettlementBtn = document.getElementById('confirmSettlementBtn');
    if (confirmSettlementBtn) {
        confirmSettlementBtn.addEventListener('click', processSettlement);
    }
    
    // Process Settlement Button in settlement modal
    const processSettlementBtn = document.getElementById('processSettlementBtn');
    if (processSettlementBtn) {
        processSettlementBtn.addEventListener('click', function() {
            const settlementId = document.getElementById('processSettlementId').value;
            if (settlementId) {
                bootstrap.Modal.getInstance(document.getElementById('settlementModal')).hide();
                openProcessSettlement(settlementId);
            }
        });
    }
    
    // Print Buttons
    const printPaymentBtn = document.getElementById('printPaymentBtn');
    if (printPaymentBtn) {
        printPaymentBtn.addEventListener('click', printPaymentReceipt);
    }
    
    const printSettlementBtn = document.getElementById('printSettlementBtn');
    if (printSettlementBtn) {
        printSettlementBtn.addEventListener('click', printSettlementReceipt);
    }
}

// ============================================
// SIDEBAR TOGGLE & DARK MODE
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
// MAKE FUNCTIONS GLOBAL FOR ONCLICK
// ============================================
window.viewPaymentDetails = viewPaymentDetails;
window.changePaymentPage = changePaymentPage;
window.viewSettlementDetails = viewSettlementDetails;
window.changeSettlementPage = changeSettlementPage;
window.openProcessSettlement = openProcessSettlement;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Setup common elements
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    // Initialize payment page
    updatePaymentStats();
    renderPaymentsTable();
    renderSettlementsTable();
    setupPaymentEventListeners();
});