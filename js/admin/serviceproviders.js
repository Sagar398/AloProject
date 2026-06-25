/* ============================================
   Service Provider Management JavaScript
   For: manage-service-providers.html
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
// SAMPLE DATA
// ============================================

let providersData = [
    {
        id: 1,
        name: 'Michael Johnson',
        email: 'michael.j@example.com',
        mobile: '+1 234 567 8901',
        gender: 'male',
        type: 'individual',
        companyName: null,
        address: {
            line1: '123 Main St',
            line2: 'Apt 4B',
            country: 'USA',
            city: 'New York',
            postalCode: '10001'
        },
        businessAddress: null,
        experience: 8,
        skills: 'Plumbing, Pipe Installation, Leak Repair',
        serviceCategory: 'plumber',
        description: 'Expert plumber with 8+ years of experience. Specializing in residential and commercial plumbing services.',
        accountHolderName: 'Michael Johnson',
        bankName: 'Chase Bank',
        accountNumber: '****1234',
        approvalStatus: 'approved',
        accountStatus: 'active',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: '2024-01-15',
        totalBookings: 156,
        completedBookings: 148,
        rating: 4.8,
        reviews: [
            { customer: 'John Doe', rating: 5, comment: 'Excellent service! Very professional and timely.', date: '2024-02-01' },
            { customer: 'Jane Smith', rating: 4, comment: 'Good work, on time. Would recommend.', date: '2024-01-28' }
        ]
    },
    {
        id: 2,
        name: 'Electric Pros Inc.',
        email: 'contact@electricpros.com',
        mobile: '+1 234 567 8902',
        gender: 'other',
        type: 'company',
        companyName: 'Electric Pros Inc.',
        address: {
            line1: '456 Oak Ave',
            line2: 'Suite 200',
            country: 'USA',
            city: 'Los Angeles',
            postalCode: '90001'
        },
        businessAddress: {
            line1: '456 Oak Ave',
            line2: 'Suite 200',
            country: 'USA',
            city: 'Los Angeles',
            postalCode: '90001'
        },
        experience: 15,
        skills: 'Electrical Wiring, Circuit Breakers, Lighting Installation',
        serviceCategory: 'electrician',
        description: 'Professional electrical services for residential and commercial properties. Licensed and insured.',
        accountHolderName: 'Electric Pros Inc.',
        bankName: 'Bank of America',
        accountNumber: '****5678',
        approvalStatus: 'approved',
        accountStatus: 'active',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        createdAt: '2024-01-20',
        totalBookings: 234,
        completedBookings: 228,
        rating: 4.9,
        reviews: [
            { customer: 'Mike Wilson', rating: 5, comment: 'Very professional team. Fixed all my electrical issues.', date: '2024-02-05' }
        ]
    },
    {
        id: 3,
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        mobile: '+1 234 567 8903',
        gender: 'female',
        type: 'individual',
        companyName: null,
        address: {
            line1: '789 Pine St',
            line2: '',
            country: 'USA',
            city: 'Chicago',
            postalCode: '60601'
        },
        businessAddress: null,
        experience: 5,
        skills: 'Interior Painting, Exterior Painting, Wallpaper Removal',
        serviceCategory: 'painter',
        description: 'Professional painter specializing in residential projects. Quality work guaranteed.',
        accountHolderName: 'Sarah Williams',
        bankName: 'Wells Fargo',
        accountNumber: '****9012',
        approvalStatus: 'pending',
        accountStatus: 'inactive',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        createdAt: '2024-02-01',
        totalBookings: 0,
        completedBookings: 0,
        rating: 0,
        reviews: []
    },
    {
        id: 4,
        name: 'Wood Crafters',
        email: 'info@woodcrafters.com',
        mobile: '+1 234 567 8904',
        gender: 'other',
        type: 'company',
        companyName: 'Wood Crafters LLC',
        address: {
            line1: '321 Cedar Ln',
            line2: '',
            country: 'USA',
            city: 'Houston',
            postalCode: '77001'
        },
        businessAddress: {
            line1: '321 Cedar Ln',
            line2: '',
            country: 'USA',
            city: 'Houston',
            postalCode: '77001'
        },
        experience: 12,
        skills: 'Custom Furniture, Cabinet Making, Wood Repair',
        serviceCategory: 'carpenter',
        description: 'Expert carpentry and woodworking services. Custom furniture and repairs.',
        accountHolderName: 'Wood Crafters LLC',
        bankName: 'Chase Bank',
        accountNumber: '****3456',
        approvalStatus: 'approved',
        accountStatus: 'active',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        createdAt: '2024-01-25',
        totalBookings: 89,
        completedBookings: 85,
        rating: 4.7,
        reviews: [
            { customer: 'Robert Brown', rating: 5, comment: 'Beautiful work! Highly recommend.', date: '2024-02-03' }
        ]
    },
    {
        id: 5,
        name: 'Cool Air Solutions',
        email: 'service@coolair.com',
        mobile: '+1 234 567 8905',
        gender: 'other',
        type: 'company',
        companyName: 'Cool Air Solutions',
        address: {
            line1: '555 HVAC Dr',
            line2: '',
            country: 'USA',
            city: 'Phoenix',
            postalCode: '85001'
        },
        businessAddress: {
            line1: '555 HVAC Dr',
            line2: '',
            country: 'USA',
            city: 'Phoenix',
            postalCode: '85001'
        },
        experience: 10,
        skills: 'AC Installation, AC Repair, Maintenance',
        serviceCategory: 'ac',
        description: 'Heating and cooling specialists. 24/7 emergency service available.',
        accountHolderName: 'Cool Air Solutions',
        bankName: 'Citibank',
        accountNumber: '****7890',
        approvalStatus: 'rejected',
        accountStatus: 'inactive',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        createdAt: '2024-02-05',
        totalBookings: 0,
        completedBookings: 0,
        rating: 0,
        reviews: []
    },
    {
        id: 6,
        name: 'Quick Towing',
        email: 'dispatch@quicktowing.com',
        mobile: '+1 234 567 8906',
        gender: 'other',
        type: 'company',
        companyName: 'Quick Towing Services',
        address: {
            line1: '777 Service Rd',
            line2: '',
            country: 'USA',
            city: 'Miami',
            postalCode: '33101'
        },
        businessAddress: {
            line1: '777 Service Rd',
            line2: '',
            country: 'USA',
            city: 'Miami',
            postalCode: '33101'
        },
        experience: 7,
        skills: 'Towing, Roadside Assistance, Jump Starts',
        serviceCategory: 'towing',
        description: '24/7 towing and roadside assistance services.',
        accountHolderName: 'Quick Towing Services',
        bankName: 'Bank of America',
        accountNumber: '****2345',
        approvalStatus: 'approved',
        accountStatus: 'active',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        createdAt: '2024-02-10',
        totalBookings: 45,
        completedBookings: 43,
        rating: 4.6,
        reviews: [
            { customer: 'David Lee', rating: 5, comment: 'Fast response time!', date: '2024-02-12' }
        ]
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentProviderPage = 1;
const providersPerPage = 5;

// Filters
let providerFilters = {
    search: '',
    approvalStatus: 'all',
    accountStatus: 'all',
    providerType: 'all',
    service: 'all'
};

// ============================================
// PROVIDER STATISTICS
// ============================================

function updateProviderStats() {
    const total = providersData.length;
    const active = providersData.filter(p => p.accountStatus === 'active').length;
    const pending = providersData.filter(p => p.approvalStatus === 'pending').length;
    const avgRating = providersData.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / (providersData.filter(p => p.rating > 0).length || 1);
    
    const totalProvidersEl = document.getElementById('totalProviders');
    const activeProvidersEl = document.getElementById('activeProviders');
    const pendingApprovalEl = document.getElementById('pendingApproval');
    const avgRatingEl = document.getElementById('avgRating');
    
    if (totalProvidersEl) totalProvidersEl.textContent = total;
    if (activeProvidersEl) activeProvidersEl.textContent = active;
    if (pendingApprovalEl) pendingApprovalEl.textContent = pending;
    if (avgRatingEl) avgRatingEl.textContent = avgRating.toFixed(1);
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterProviders() {
    return providersData.filter(provider => {
        if (providerFilters.search && !provider.name.toLowerCase().includes(providerFilters.search) &&
            !provider.email.toLowerCase().includes(providerFilters.search)) {
            return false;
        }
        if (providerFilters.approvalStatus !== 'all' && provider.approvalStatus !== providerFilters.approvalStatus) {
            return false;
        }
        if (providerFilters.accountStatus !== 'all' && provider.accountStatus !== providerFilters.accountStatus) {
            return false;
        }
        if (providerFilters.providerType !== 'all' && provider.type !== providerFilters.providerType) {
            return false;
        }
        if (providerFilters.service !== 'all' && provider.serviceCategory !== providerFilters.service) {
            return false;
        }
        return true;
    });
}

// ============================================
// RENDER PROVIDERS TABLE
// ============================================

function renderProvidersTable() {
    const tbody = document.getElementById('providersTableBody');
    if (!tbody) return;
    
    let filteredData = filterProviders();
    const totalPages = Math.ceil(filteredData.length / providersPerPage);
    const start = (currentProviderPage - 1) * providersPerPage;
    const pageData = filteredData.slice(start, start + providersPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-5">No service providers found</td></tr>';
        renderProvidersPagination(totalPages);
        return;
    }
    
    pageData.forEach(provider => {
        const approvalClass = provider.approvalStatus === 'approved' ? 'approval-approved' : 
                             (provider.approvalStatus === 'pending' ? 'approval-pending' : 'approval-rejected');
        const approvalText = provider.approvalStatus === 'approved' ? 'Approved' : 
                            (provider.approvalStatus === 'pending' ? 'Pending' : 'Rejected');
        const statusClass = provider.accountStatus === 'active' ? 'status-success' : 'status-inactive';
        const statusText = provider.accountStatus === 'active' ? 'Active' : 'Inactive';
        const typeClass = provider.type === 'individual' ? 'provider-type-individual' : 'provider-type-company';
        const typeText = provider.type === 'individual' ? 'Individual' : 'Company';
        
        // Rating stars
        const fullStars = Math.floor(provider.rating);
        const hasHalfStar = provider.rating % 1 >= 0.5;
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
        if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
        for (let i = starsHtml.length / (hasHalfStar ? 13 : 12); i < 5; i++) starsHtml += '<i class="far fa-star"></i>';
        
        const serviceName = provider.serviceCategory.charAt(0).toUpperCase() + provider.serviceCategory.slice(1);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${provider.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${provider.image}" class="rounded-circle me-2" width="40" height="40" onerror="this.src='https://via.placeholder.com/40'">
                    <div>
                        <div class="fw-bold">${escapeHtml(provider.name)}</div>
                        <small class="text-muted">ID: ${provider.id}</small>
                    </div>
                </div>
            </td>
            <td>
                <div>${provider.email}</div>
                <small>${provider.mobile}</small>
            </td>
            <td><span class="${typeClass}">${typeText}</span></td>
            <td><span class="service-tag">${serviceName}</span></td>
            <td><span class="approval-badge ${approvalClass}">${approvalText}</span></td>
            <td>
                <div class="rating-stars">${starsHtml}</div>
                <small>${provider.rating} (${provider.reviews.length} reviews)</small>
            </td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewProvider(${provider.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editProvider(${provider.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProvider(${provider.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderProvidersPagination(totalPages);
}

function renderProvidersPagination(totalPages) {
    const pagination = document.getElementById('providersPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentProviderPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeProviderPage(${currentProviderPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentProviderPage - 2 && i <= currentProviderPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentProviderPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeProviderPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentProviderPage - 3 || i === currentProviderPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentProviderPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeProviderPage(${currentProviderPage + 1}); return false;">Next</a>
    </li>`;
}

function changeProviderPage(page) {
    currentProviderPage = page;
    renderProvidersTable();
}

// ============================================
// VIEW PROVIDER DETAILS
// ============================================

function viewProvider(providerId) {
    const provider = providersData.find(p => p.id === providerId);
    if (!provider) return;
    
    const modalBody = document.getElementById('viewProviderBody');
    if (!modalBody) return;
    
    // Rating stars
    const fullStars = Math.floor(provider.rating);
    const hasHalfStar = provider.rating % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
    if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
    for (let i = starsHtml.length / (hasHalfStar ? 13 : 12); i < 5; i++) starsHtml += '<i class="far fa-star"></i>';
    
    // Reviews HTML
    let reviewsHtml = '';
    if (provider.reviews.length > 0) {
        reviewsHtml = '<div class="reviews-list" style="max-height: 300px; overflow-y: auto;">';
        provider.reviews.forEach(review => {
            let reviewStars = '';
            for (let i = 0; i < review.rating; i++) reviewStars += '<i class="fas fa-star"></i>';
            for (let i = review.rating; i < 5; i++) reviewStars += '<i class="far fa-star"></i>';
            
            reviewsHtml += `
                <div class="review-item" style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
                    <div class="review-customer" style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" style="width: 35px; height: 35px; border-radius: 50%; margin-right: 10px;" onerror="this.src='https://via.placeholder.com/35'">
                        <span style="font-weight: 600; font-size: 14px;">${escapeHtml(review.customer)}</span>
                        <div style="color: #ffc107; font-size: 12px; margin-left: auto;">${reviewStars}</div>
                    </div>
                    <div class="review-text" style="font-size: 13px; color: #6c757d; margin-left: 45px;">${escapeHtml(review.comment)}</div>
                    <small class="text-muted" style="margin-left: 45px;">${formatDateShort(review.date)}</small>
                </div>
            `;
        });
        reviewsHtml += '</div>';
    } else {
        reviewsHtml = '<p class="text-muted">No reviews yet.</p>';
    }
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="${provider.image}" class="rounded-circle mb-3" width="150" height="150" onerror="this.src='https://via.placeholder.com/150'">
                <h4>${escapeHtml(provider.name)}</h4>
                <p class="text-muted">${provider.type === 'individual' ? 'Individual Provider' : 'Company'}</p>
                <div class="rating-stars mb-2">${starsHtml}</div>
                <p>${provider.rating} (${provider.reviews.length} reviews)</p>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Contact Details</h6>
                        <p><strong>Email:</strong> ${provider.email}<br>
                        <strong>Mobile:</strong> ${provider.mobile}<br>
                        <strong>Gender:</strong> ${provider.gender === 'male' ? 'Male' : (provider.gender === 'female' ? 'Female' : 'Other')}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Professional Details</h6>
                        <p><strong>Experience:</strong> ${provider.experience} years<br>
                        <strong>Service:</strong> ${provider.serviceCategory.charAt(0).toUpperCase() + provider.serviceCategory.slice(1)}<br>
                        <strong>Skills:</strong> ${provider.skills}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Address</h6>
                        <p>${provider.address.line1}<br>
                        ${provider.address.line2 ? provider.address.line2 + '<br>' : ''}
                        ${provider.address.city}, ${provider.address.postalCode}<br>
                        ${provider.address.country}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Account Status</h6>
                        <p><strong>Approval:</strong> <span class="approval-badge ${provider.approvalStatus === 'approved' ? 'approval-approved' : (provider.approvalStatus === 'pending' ? 'approval-pending' : 'approval-rejected')}">${provider.approvalStatus.charAt(0).toUpperCase() + provider.approvalStatus.slice(1)}</span><br>
                        <strong>Account:</strong> <span class="status-badge ${provider.accountStatus === 'active' ? 'status-success' : 'status-inactive'}">${provider.accountStatus === 'active' ? 'Active' : 'Inactive'}</span><br>
                        <strong>Joined:</strong> ${formatDateShort(provider.createdAt)}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="text-primary">Description</h6>
                        <p>${provider.description}</p>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h6 class="text-primary">Performance Metrics</h6>
                        <div class="performance-metrics" style="background: #f8f9fa; border-radius: 10px; padding: 15px;">
                            <div class="row">
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${provider.totalBookings}</div>
                                    <div class="metric-label" style="font-size: 12px; color: #6c757d;">Total Bookings</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${provider.completedBookings}</div>
                                    <div class="metric-label" style="font-size: 12px; color: #6c757d;">Completed</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${provider.totalBookings - provider.completedBookings}</div>
                                    <div class="metric-label" style="font-size: 12px; color: #6c757d;">Pending</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${provider.totalBookings ? ((provider.completedBookings / provider.totalBookings) * 100).toFixed(0) : 0}%</div>
                                    <div class="metric-label" style="font-size: 12px; color: #6c757d;">Completion Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h6 class="text-primary">Customer Reviews</h6>
                        ${reviewsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewProviderModal')).show();
}

// ============================================
// ADD/EDIT PROVIDER FUNCTIONS
// ============================================

function addProvider() {
    document.getElementById('providerModalTitle').innerHTML = '<i class="fas fa-user-plus"></i> Add Service Provider';
    document.getElementById('editProviderId').value = '';
    document.getElementById('providerName').value = '';
    document.getElementById('providerEmail').value = '';
    document.getElementById('providerMobile').value = '';
    document.getElementById('providerGender').value = 'male';
    document.getElementById('providerType').value = 'individual';
    document.getElementById('companyName').value = '';
    document.getElementById('addressLine1').value = '';
    document.getElementById('addressLine2').value = '';
    document.getElementById('country').value = 'USA';
    document.getElementById('city').value = '';
    document.getElementById('postalCode').value = '';
    document.getElementById('experience').value = '';
    document.getElementById('skills').value = '';
    document.getElementById('serviceCategory').value = '';
    document.getElementById('providerDescription').value = '';
    document.getElementById('accountHolderName').value = '';
    document.getElementById('bankName').value = '';
    document.getElementById('accountNumber').value = '';
    document.getElementById('approvalStatus').value = 'pending';
    document.getElementById('accountStatus').value = 'active';
    document.getElementById('providerPassword').value = '';
    document.getElementById('providerImagePreview').src = 'https://via.placeholder.com/100';
    
    document.getElementById('companyNameField').style.display = 'none';
    document.getElementById('businessAddressSection').style.display = 'none';
    document.getElementById('passwordFields').style.display = 'block';
    
    new bootstrap.Modal(document.getElementById('providerModal')).show();
}

function editProvider(providerId) {
    const provider = providersData.find(p => p.id === providerId);
    if (!provider) return;
    
    document.getElementById('providerModalTitle').innerHTML = '<i class="fas fa-user-edit"></i> Edit Service Provider';
    document.getElementById('editProviderId').value = provider.id;
    document.getElementById('providerName').value = provider.name;
    document.getElementById('providerEmail').value = provider.email;
    document.getElementById('providerMobile').value = provider.mobile;
    document.getElementById('providerGender').value = provider.gender;
    document.getElementById('providerType').value = provider.type;
    document.getElementById('companyName').value = provider.companyName || '';
    document.getElementById('addressLine1').value = provider.address.line1;
    document.getElementById('addressLine2').value = provider.address.line2 || '';
    document.getElementById('country').value = provider.address.country;
    document.getElementById('city').value = provider.address.city;
    document.getElementById('postalCode').value = provider.address.postalCode;
    document.getElementById('experience').value = provider.experience;
    document.getElementById('skills').value = provider.skills;
    document.getElementById('serviceCategory').value = provider.serviceCategory;
    document.getElementById('providerDescription').value = provider.description;
    document.getElementById('accountHolderName').value = provider.accountHolderName || '';
    document.getElementById('bankName').value = provider.bankName || '';
    document.getElementById('accountNumber').value = provider.accountNumber || '';
    document.getElementById('approvalStatus').value = provider.approvalStatus;
    document.getElementById('accountStatus').value = provider.accountStatus;
    document.getElementById('providerImagePreview').src = provider.image;
    
    if (provider.type === 'company') {
        document.getElementById('companyNameField').style.display = 'block';
        document.getElementById('businessAddressSection').style.display = 'block';
        if (provider.businessAddress) {
            document.getElementById('businessAddressLine1').value = provider.businessAddress.line1 || '';
            document.getElementById('businessAddressLine2').value = provider.businessAddress.line2 || '';
            document.getElementById('businessCountry').value = provider.businessAddress.country || 'USA';
            document.getElementById('businessCity').value = provider.businessAddress.city || '';
            document.getElementById('businessPostalCode').value = provider.businessAddress.postalCode || '';
        }
    } else {
        document.getElementById('companyNameField').style.display = 'none';
        document.getElementById('businessAddressSection').style.display = 'none';
    }
    
    document.getElementById('passwordFields').style.display = 'none';
    
    new bootstrap.Modal(document.getElementById('providerModal')).show();
}

function saveProvider() {
    const id = document.getElementById('editProviderId').value;
    const name = document.getElementById('providerName').value;
    const email = document.getElementById('providerEmail').value;
    const mobile = document.getElementById('providerMobile').value;
    const gender = document.getElementById('providerGender').value;
    const type = document.getElementById('providerType').value;
    const companyName = document.getElementById('companyName').value;
    const addressLine1 = document.getElementById('addressLine1').value;
    const addressLine2 = document.getElementById('addressLine2').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const serviceCategory = document.getElementById('serviceCategory').value;
    const description = document.getElementById('providerDescription').value;
    const accountHolderName = document.getElementById('accountHolderName').value;
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const approvalStatus = document.getElementById('approvalStatus').value;
    const accountStatus = document.getElementById('accountStatus').value;
    const password = document.getElementById('providerPassword').value;
    
    if (!name || !email || !mobile || !serviceCategory) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    
    if (!id && !password) {
        showToast('Please enter a password for new provider', 'danger');
        return;
    }
    
    if (mobile.length < 10) {
        showToast('Please enter a valid mobile number', 'danger');
        return;
    }
    
    const address = { line1: addressLine1, line2: addressLine2, country, city, postalCode };
    let businessAddress = null;
    
    if (type === 'company') {
        businessAddress = {
            line1: document.getElementById('businessAddressLine1').value,
            line2: document.getElementById('businessAddressLine2').value,
            country: document.getElementById('businessCountry').value,
            city: document.getElementById('businessCity').value,
            postalCode: document.getElementById('businessPostalCode').value
        };
    }
    
    if (id) {
        const index = providersData.findIndex(p => p.id == id);
        if (index !== -1) {
            const oldApprovalStatus = providersData[index].approvalStatus;
            providersData[index] = {
                ...providersData[index],
                name: name.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                gender: gender,
                type: type,
                companyName: type === 'company' ? companyName : null,
                address: address,
                businessAddress: businessAddress,
                experience: parseInt(experience) || 0,
                skills: skills,
                serviceCategory: serviceCategory,
                description: description,
                accountHolderName: accountHolderName,
                bankName: bankName,
                accountNumber: accountNumber,
                approvalStatus: approvalStatus,
                accountStatus: accountStatus
            };
            showToast('Service provider updated successfully', 'success');
            
            if (approvalStatus === 'approved' && oldApprovalStatus !== 'approved') {
                console.log(`Approval email sent to ${email}`);
                showToast(`Approval notification sent to ${email}`, 'info');
            }
        }
    } else {
        const newId = providersData.length + 1;
        providersData.push({
            id: newId,
            name: name.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            gender: gender,
            type: type,
            companyName: type === 'company' ? companyName : null,
            address: address,
            businessAddress: businessAddress,
            experience: parseInt(experience) || 0,
            skills: skills,
            serviceCategory: serviceCategory,
            description: description,
            accountHolderName: accountHolderName,
            bankName: bankName,
            accountNumber: accountNumber,
            approvalStatus: approvalStatus,
            accountStatus: accountStatus,
            image: 'https://via.placeholder.com/100',
            createdAt: new Date().toISOString().slice(0, 10),
            totalBookings: 0,
            completedBookings: 0,
            rating: 0,
            reviews: []
        });
        showToast('Service provider added successfully', 'success');
        console.log(`Welcome email sent to ${email} with password: ${password}`);
        showToast(`Login credentials sent to ${email}`, 'info');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('providerModal')).hide();
    updateProviderStats();
    renderProvidersTable();
}

// ============================================
// DELETE PROVIDER
// ============================================

function deleteProvider(providerId) {
    document.getElementById('deleteProviderId').value = providerId;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteProvider() {
    const providerId = parseInt(document.getElementById('deleteProviderId').value);
    const index = providersData.findIndex(p => p.id === providerId);
    
    if (index !== -1) {
        const deletedProvider = providersData[index];
        providersData.splice(index, 1);
        showToast(`Service provider "${deletedProvider.name}" deleted successfully`, 'success');
        
        const remainingItems = filterProviders().length;
        const totalPages = Math.ceil(remainingItems / providersPerPage);
        if (currentProviderPage > totalPages && totalPages > 0) {
            currentProviderPage = totalPages;
        } else if (totalPages === 0) {
            currentProviderPage = 1;
        }
        
        updateProviderStats();
        renderProvidersTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// EXPORT PROVIDERS
// ============================================

function exportProviders() {
    const filteredData = filterProviders();
    let csvContent = "ID,Name,Email,Mobile,Type,Service,Approval Status,Account Status,Experience,Total Bookings,Completed Bookings,Rating\n";
    
    filteredData.forEach(provider => {
        csvContent += `"${provider.id}","${provider.name}","${provider.email}","${provider.mobile}","${provider.type}","${provider.serviceCategory}","${provider.approvalStatus}","${provider.accountStatus}","${provider.experience}","${provider.totalBookings}","${provider.completedBookings}","${provider.rating}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `service_providers_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Providers exported successfully', 'success');
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupProviderEventListeners() {
    const searchInput = document.getElementById('searchProvider');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            providerFilters.search = e.target.value.toLowerCase();
            currentProviderPage = 1;
            renderProvidersTable();
        });
    }
    
    const approvalFilter = document.getElementById('approvalStatusFilter');
    if (approvalFilter) {
        approvalFilter.addEventListener('change', function(e) {
            providerFilters.approvalStatus = e.target.value;
            currentProviderPage = 1;
            renderProvidersTable();
        });
    }
    
    const accountFilter = document.getElementById('accountStatusFilter');
    if (accountFilter) {
        accountFilter.addEventListener('change', function(e) {
            providerFilters.accountStatus = e.target.value;
            currentProviderPage = 1;
            renderProvidersTable();
        });
    }
    
    const typeFilter = document.getElementById('providerTypeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function(e) {
            providerFilters.providerType = e.target.value;
            currentProviderPage = 1;
            renderProvidersTable();
        });
    }
    
    const serviceFilter = document.getElementById('serviceFilter');
    if (serviceFilter) {
        serviceFilter.addEventListener('change', function(e) {
            providerFilters.service = e.target.value;
            currentProviderPage = 1;
            renderProvidersTable();
        });
    }
    
    const addBtn = document.getElementById('addProviderBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addProvider);
    }
    
    const saveBtn = document.getElementById('saveProviderBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProvider);
    }
    
    const exportBtn = document.getElementById('exportProvidersBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProviders);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteProvider);
    }
    
    const providerTypeSelect = document.getElementById('providerType');
    if (providerTypeSelect) {
        providerTypeSelect.addEventListener('change', function(e) {
            const isCompany = e.target.value === 'company';
            document.getElementById('companyNameField').style.display = isCompany ? 'block' : 'none';
            document.getElementById('businessAddressSection').style.display = isCompany ? 'block' : 'none';
        });
    }
    
    const sameAddressCheckbox = document.getElementById('sameAsBusinessAddress');
    if (sameAddressCheckbox) {
        sameAddressCheckbox.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.getElementById('businessAddressLine1').value = document.getElementById('addressLine1').value;
                document.getElementById('businessAddressLine2').value = document.getElementById('addressLine2').value;
                document.getElementById('businessCountry').value = document.getElementById('country').value;
                document.getElementById('businessCity').value = document.getElementById('city').value;
                document.getElementById('businessPostalCode').value = document.getElementById('postalCode').value;
            }
        });
    }
    
    const uploadBtn = document.getElementById('uploadProviderImageBtn');
    const imageInput = document.getElementById('providerImage');
    const imagePreview = document.getElementById('providerImagePreview');
    
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
window.viewProvider = viewProvider;
window.editProvider = editProvider;
window.deleteProvider = deleteProvider;
window.changeProviderPage = changeProviderPage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    updateProviderStats();
    renderProvidersTable();
    setupProviderEventListeners();
});