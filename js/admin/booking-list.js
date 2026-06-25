/* ============================================
   Booking List Management JavaScript
   For: booking-list.html
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
// SAMPLE BOOKING DATA
// ============================================

let bookingsData = [
    {
        id: 'BK1001',
        customer: { name: 'John Doe', email: 'john.doe@example.com', mobile: '+1 234 567 8901', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        service: { name: 'Plumbing Repair', category: 'plumbing', provider: 'Mike\'s Plumbing', providerEmail: 'mike@plumbing.com', providerMobile: '+1 234 567 8910' },
        dateTime: '2024-01-15 10:00:00',
        timeSlot: '10:00 AM - 12:00 PM',
        amount: 147.33,
        paymentStatus: 'Success',
        paymentMethod: 'VISA',
        location: { country: 'USA', city: 'New York', address: '123 Main St, Apt 4B', postalCode: '10001' },
        status: 'completed',
        createdAt: '2024-01-10 08:30:00',
        serviceMan: { name: 'Tom Wilson', email: 'tom@plumbing.com', mobile: '+1 234 567 8999' }
    },
    {
        id: 'BK1002',
        customer: { name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '+1 234 567 8902', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
        service: { name: 'Electrical Wiring', category: 'electrical', provider: 'Spark Electric', providerEmail: 'spark@electric.com', providerMobile: '+1 234 567 8911' },
        dateTime: '2024-01-16 14:00:00',
        timeSlot: '2:00 PM - 4:00 PM',
        amount: 219.97,
        paymentStatus: 'Pending',
        paymentMethod: 'MoMo',
        location: { country: 'USA', city: 'Los Angeles', address: '456 Oak Ave', postalCode: '90001' },
        status: 'pending',
        createdAt: '2024-01-14 10:15:00',
        serviceMan: null
    },
    {
        id: 'BK1003',
        customer: { name: 'Mike Johnson', email: 'mike.j@example.com', mobile: '+1 234 567 8903', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        service: { name: 'AC Service', category: 'ac', provider: 'Cool AC', providerEmail: 'service@coolac.com', providerMobile: '+1 234 567 8912' },
        dateTime: '2024-01-17 11:00:00',
        timeSlot: '11:00 AM - 1:00 PM',
        amount: 214.47,
        paymentStatus: 'Success',
        paymentMethod: 'OM',
        location: { country: 'USA', city: 'Chicago', address: '789 Pine St', postalCode: '60601' },
        status: 'confirmed',
        createdAt: '2024-01-15 09:00:00',
        serviceMan: { name: 'David Miller', email: 'david@coolac.com', mobile: '+1 234 567 8915' }
    },
    {
        id: 'BK1004',
        customer: { name: 'Sarah Williams', email: 'sarah.w@example.com', mobile: '+1 234 567 8904', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
        service: { name: 'Wall Painting', category: 'painting', provider: 'Perfect Paint', providerEmail: 'info@perfectpaint.com', providerMobile: '+1 234 567 8913' },
        dateTime: '2024-01-18 09:00:00',
        timeSlot: '9:00 AM - 5:00 PM',
        amount: 714.98,
        paymentStatus: 'Success',
        paymentMethod: 'VISA',
        location: { country: 'USA', city: 'Houston', address: '321 Cedar Ln', postalCode: '77001' },
        status: 'upcoming',
        createdAt: '2024-01-16 11:30:00',
        serviceMan: { name: 'Robert Green', email: 'robert@perfectpaint.com', mobile: '+1 234 567 8916' }
    },
    {
        id: 'BK1005',
        customer: { name: 'Robert Brown', email: 'robert.b@example.com', mobile: '+1 234 567 8905', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        service: { name: 'Carpentry', category: 'carpentry', provider: 'Wood Magic', providerEmail: 'info@woodmagic.com', providerMobile: '+1 234 567 8914' },
        dateTime: '2024-01-19 13:00:00',
        timeSlot: '1:00 PM - 4:00 PM',
        amount: 225.45,
        paymentStatus: 'Failed',
        paymentMethod: 'MoMo',
        location: { country: 'USA', city: 'Phoenix', address: '555 Water St', postalCode: '85001' },
        status: 'cancelled',
        createdAt: '2024-01-17 14:45:00',
        serviceMan: null
    },
    {
        id: 'BK1006',
        customer: { name: 'Emily Davis', email: 'emily.d@example.com', mobile: '+1 234 567 8906', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
        service: { name: 'Plumbing Repair', category: 'plumbing', provider: 'Mike\'s Plumbing', providerEmail: 'mike@plumbing.com', providerMobile: '+1 234 567 8910' },
        dateTime: '2024-01-20 10:00:00',
        timeSlot: '10:00 AM - 12:00 PM',
        amount: 89.99,
        paymentStatus: 'Pending',
        paymentMethod: 'VISA',
        location: { country: 'USA', city: 'New York', address: '123 Main St', postalCode: '10001' },
        status: 'pending',
        createdAt: '2024-01-18 08:00:00',
        serviceMan: null
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentBookingPage = 1;
const bookingsPerPage = 5;

// Filters
let bookingFilters = {
    search: '',
    status: 'all',
    paymentStatus: 'all',
    service: 'all',
    dateFrom: '',
    dateTo: ''
};

// ============================================
// BOOKING STATISTICS
// ============================================

function updateBookingStats() {
    const total = bookingsData.length;
    const pending = bookingsData.filter(b => b.status === 'pending').length;
    const confirmed = bookingsData.filter(b => b.status === 'confirmed').length;
    const completed = bookingsData.filter(b => b.status === 'completed').length;
    
    document.getElementById('totalBookings').textContent = total;
    document.getElementById('pendingBookings').textContent = pending;
    document.getElementById('confirmedBookings').textContent = confirmed;
    document.getElementById('completedBookings').textContent = completed;
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterBookings() {
    return bookingsData.filter(booking => {
        // Search filter
        if (bookingFilters.search && !booking.id.toLowerCase().includes(bookingFilters.search) &&
            !booking.customer.name.toLowerCase().includes(bookingFilters.search) &&
            !booking.customer.email.toLowerCase().includes(bookingFilters.search)) {
            return false;
        }
        // Status filter
        if (bookingFilters.status !== 'all' && booking.status !== bookingFilters.status) {
            return false;
        }
        // Payment status filter
        if (bookingFilters.paymentStatus !== 'all' && booking.paymentStatus.toLowerCase() !== bookingFilters.paymentStatus) {
            return false;
        }
        // Service filter
        if (bookingFilters.service !== 'all' && booking.service.category !== bookingFilters.service) {
            return false;
        }
        // Date range filter
        if (bookingFilters.dateFrom && booking.dateTime.split(' ')[0] < bookingFilters.dateFrom) {
            return false;
        }
        if (bookingFilters.dateTo && booking.dateTime.split(' ')[0] > bookingFilters.dateTo) {
            return false;
        }
        return true;
    });
}

// ============================================
// RENDER BOOKINGS TABLE
// ============================================

function renderBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;
    
    let filteredData = filterBookings();
    const totalPages = Math.ceil(filteredData.length / bookingsPerPage);
    const start = (currentBookingPage - 1) * bookingsPerPage;
    const pageData = filteredData.slice(start, start + bookingsPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center py-5">No bookings found</td></tr>';
        renderBookingsPagination(totalPages);
        return;
    }
    
    pageData.forEach(booking => {
        const statusClass = booking.status === 'completed' ? 'status-success' : 
                           (booking.status === 'confirmed' ? 'status-info' : 
                           (booking.status === 'upcoming' ? 'status-warning' : 
                           (booking.status === 'pending' ? 'status-pending' : 'status-danger')));
        const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
        
        const paymentClass = booking.paymentStatus === 'Success' ? 'status-success' : 
                            (booking.paymentStatus === 'Pending' ? 'status-pending' : 'status-danger');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${booking.id}</strong></td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${booking.customer.image}" class="rounded-circle me-2" width="35" height="35" onerror="this.src='https://via.placeholder.com/35'">
                    <div>
                        <div class="fw-bold">${escapeHtml(booking.customer.name)}</div>
                        <small class="text-muted">${booking.customer.email}</small><br>
                        <small class="text-muted">${booking.customer.mobile}</small>
                    </div>
                </div>
            </td>
            <td>
                <div class="fw-bold">${booking.service.name}</div>
                <small class="text-muted">${booking.service.category.charAt(0).toUpperCase() + booking.service.category.slice(1)}</small>
            </td>
            <td>
                <div>${escapeHtml(booking.service.provider)}</div>
                <small class="text-muted">Provider</small>
            </td>
            <td>
                <div>${formatDateTime(booking.dateTime)}</div>
                <small class="text-muted">${booking.timeSlot}</small>
            </td>
            <td><strong>${formatCurrency(booking.amount)}</strong></td>
            <td><span class="status-badge ${paymentClass}">${booking.paymentStatus}</span><br><small>${booking.paymentMethod}</small></td>
            <td>
                ${booking.location.city}, ${booking.location.country}
            </td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewBooking('${booking.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="openUpdateStatus('${booking.id}')" title="Update Status">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteBooking('${booking.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderBookingsPagination(totalPages);
}

function renderBookingsPagination(totalPages) {
    const pagination = document.getElementById('bookingsPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentBookingPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeBookingPage(${currentBookingPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentBookingPage - 2 && i <= currentBookingPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentBookingPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeBookingPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentBookingPage - 3 || i === currentBookingPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentBookingPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeBookingPage(${currentBookingPage + 1}); return false;">Next</a>
    </li>`;
}

function changeBookingPage(page) {
    currentBookingPage = page;
    renderBookingsTable();
}

// ============================================
// VIEW BOOKING DETAILS
// ============================================

function viewBooking(bookingId) {
    const booking = bookingsData.find(b => b.id === bookingId);
    if (!booking) return;
    
    const modalBody = document.getElementById('viewBookingBody');
    if (!modalBody) return;
    
    const statusClass = booking.status === 'completed' ? 'status-success' : 
                       (booking.status === 'confirmed' ? 'status-info' : 
                       (booking.status === 'upcoming' ? 'status-warning' : 
                       (booking.status === 'pending' ? 'status-pending' : 'status-danger')));
    
    const paymentClass = booking.paymentStatus === 'Success' ? 'status-success' : 
                        (booking.paymentStatus === 'Pending' ? 'status-pending' : 'status-danger');
    
    let serviceManHtml = '';
    if (booking.serviceMan) {
        serviceManHtml = `
            <div class="col-md-6">
                <h6 class="text-primary">Service Man Details</h6>
                <p><strong>Name:</strong> ${escapeHtml(booking.serviceMan.name)}<br>
                <strong>Email:</strong> ${booking.serviceMan.email}<br>
                <strong>Mobile:</strong> ${booking.serviceMan.mobile}</p>
            </div>
        `;
    } else {
        serviceManHtml = `
            <div class="col-md-6">
                <h6 class="text-primary">Service Man Details</h6>
                <p class="text-muted">Not assigned yet</p>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="${booking.customer.image}" class="rounded-circle mb-3" width="100" height="100" onerror="this.src='https://via.placeholder.com/100'">
                <h5>${escapeHtml(booking.customer.name)}</h5>
                <p class="text-muted">Customer</p>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Customer Details</h6>
                        <p><strong>Name:</strong> ${escapeHtml(booking.customer.name)}<br>
                        <strong>Email:</strong> ${booking.customer.email}<br>
                        <strong>Mobile:</strong> ${booking.customer.mobile}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Service Provider Details</h6>
                        <p><strong>Name:</strong> ${escapeHtml(booking.service.provider)}<br>
                        <strong>Email:</strong> ${booking.service.providerEmail}<br>
                        <strong>Mobile:</strong> ${booking.service.providerMobile}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Booking Details</h6>
                        <p><strong>Booking ID:</strong> ${booking.id}<br>
                        <strong>Service:</strong> ${booking.service.name}<br>
                        <strong>Date & Time:</strong> ${formatDateTime(booking.dateTime)}<br>
                        <strong>Time Slot:</strong> ${booking.timeSlot}<br>
                        <strong>Booking Status:</strong> <span class="status-badge ${statusClass}">${booking.status}</span></p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Payment Details</h6>
                        <p><strong>Amount:</strong> ${formatCurrency(booking.amount)}<br>
                        <strong>Method:</strong> ${booking.paymentMethod}<br>
                        <strong>Status:</strong> <span class="status-badge ${paymentClass}">${booking.paymentStatus}</span></p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Service Location</h6>
                        <p>${booking.location.address}<br>
                        ${booking.location.city}, ${booking.location.postalCode}<br>
                        ${booking.location.country}</p>
                    </div>
                    ${serviceManHtml}
                </div>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewBookingModal')).show();
}

// ============================================
// UPDATE BOOKING STATUS
// ============================================

function openUpdateStatus(bookingId) {
    const booking = bookingsData.find(b => b.id === bookingId);
    if (!booking) return;
    
    document.getElementById('updateBookingId').value = bookingId;
    document.getElementById('newBookingStatus').value = booking.status;
    document.getElementById('statusNote').value = '';
    
    new bootstrap.Modal(document.getElementById('updateStatusModal')).show();
}

function confirmStatusUpdate() {
    const bookingId = document.getElementById('updateBookingId').value;
    const newStatus = document.getElementById('newBookingStatus').value;
    const note = document.getElementById('statusNote').value;
    
    const booking = bookingsData.find(b => b.id === bookingId);
    if (booking) {
        booking.status = newStatus;
        showToast(`Booking ${bookingId} status updated to ${newStatus}`, 'success');
        if (note) {
            console.log(`Status note for ${bookingId}: ${note}`);
        }
        updateBookingStats();
        renderBookingsTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('updateStatusModal')).hide();
}

// ============================================
// DELETE BOOKING
// ============================================

function deleteBooking(bookingId) {
    document.getElementById('deleteBookingId').value = bookingId;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteBooking() {
    const bookingId = document.getElementById('deleteBookingId').value;
    const index = bookingsData.findIndex(b => b.id === bookingId);
    
    if (index !== -1) {
        bookingsData.splice(index, 1);
        showToast(`Booking ${bookingId} deleted successfully`, 'success');
        
        const remainingItems = filterBookings().length;
        const totalPages = Math.ceil(remainingItems / bookingsPerPage);
        if (currentBookingPage > totalPages && totalPages > 0) {
            currentBookingPage = totalPages;
        } else if (totalPages === 0) {
            currentBookingPage = 1;
        }
        
        updateBookingStats();
        renderBookingsTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// EXPORT BOOKINGS
// ============================================

function exportBookings() {
    const filteredData = filterBookings();
    let csvContent = "Booking ID,Customer Name,Customer Email,Customer Mobile,Service,Provider,Booking Date,Amount,Payment Method,Payment Status,Location,Status\n";
    
    filteredData.forEach(booking => {
        csvContent += `"${booking.id}","${booking.customer.name}","${booking.customer.email}","${booking.customer.mobile}","${booking.service.name}","${booking.service.provider}","${booking.dateTime}","${booking.amount}","${booking.paymentMethod}","${booking.paymentStatus}","${booking.location.city}, ${booking.location.country}","${booking.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Bookings exported successfully', 'success');
}

function refreshBookings() {
    showToast('Refreshing bookings...', 'info');
    setTimeout(() => {
        updateBookingStats();
        renderBookingsTable();
        showToast('Bookings refreshed', 'success');
    }, 500);
}

// ============================================
// RESET FILTERS
// ============================================

function resetFilters() {
    bookingFilters = {
        search: '',
        status: 'all',
        paymentStatus: 'all',
        service: 'all',
        dateFrom: '',
        dateTo: ''
    };
    currentBookingPage = 1;
    
    const searchInput = document.getElementById('searchBooking');
    const statusFilter = document.getElementById('bookingStatusFilter');
    const paymentFilter = document.getElementById('paymentStatusFilter');
    const serviceFilter = document.getElementById('serviceFilter');
    const dateFrom = document.getElementById('dateFrom');
    const dateTo = document.getElementById('dateTo');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (paymentFilter) paymentFilter.value = 'all';
    if (serviceFilter) serviceFilter.value = 'all';
    if (dateFrom) dateFrom.value = '';
    if (dateTo) dateTo.value = '';
    
    renderBookingsTable();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupBookingEventListeners() {
    const searchInput = document.getElementById('searchBooking');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            bookingFilters.search = e.target.value.toLowerCase();
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const statusFilter = document.getElementById('bookingStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            bookingFilters.status = e.target.value;
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const paymentFilter = document.getElementById('paymentStatusFilter');
    if (paymentFilter) {
        paymentFilter.addEventListener('change', function(e) {
            bookingFilters.paymentStatus = e.target.value;
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const serviceFilter = document.getElementById('serviceFilter');
    if (serviceFilter) {
        serviceFilter.addEventListener('change', function(e) {
            bookingFilters.service = e.target.value;
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const dateFrom = document.getElementById('dateFrom');
    if (dateFrom) {
        dateFrom.addEventListener('change', function(e) {
            bookingFilters.dateFrom = e.target.value;
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const dateTo = document.getElementById('dateTo');
    if (dateTo) {
        dateTo.addEventListener('change', function(e) {
            bookingFilters.dateTo = e.target.value;
            currentBookingPage = 1;
            renderBookingsTable();
        });
    }
    
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    const exportBtn = document.getElementById('exportBookingsBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportBookings);
    }
    
    const refreshBtn = document.getElementById('refreshBookingsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshBookings);
    }
    
    const updateStatusBtn = document.getElementById('confirmStatusUpdateBtn');
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', confirmStatusUpdate);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteBooking);
    }
    
    const updateBookingStatusBtn = document.getElementById('updateBookingStatusBtn');
    if (updateBookingStatusBtn) {
        updateBookingStatusBtn.addEventListener('click', function() {
            const bookingId = document.getElementById('updateBookingId')?.value;
            if (bookingId) {
                openUpdateStatus(bookingId);
            }
        });
    }
}

// ============================================
// SIDEBAR TOGGLE
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

// ============================================
// MAKE FUNCTIONS GLOBAL
// ============================================
window.viewBooking = viewBooking;
window.openUpdateStatus = openUpdateStatus;
window.deleteBooking = deleteBooking;
window.changeBookingPage = changeBookingPage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    
    updateBookingStats();
    renderBookingsTable();
    setupBookingEventListeners();
});