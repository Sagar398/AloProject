/* ============================================
   Seller/Shop Management JavaScript
   For: manage-sellers.html
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
// SAMPLE DATA
// ============================================

let sellersData = [
    {
        id: 1,
        sellerName: 'John Smith',
        email: 'john@toolworld.com',
        mobile: '+1 234 567 8901',
        gender: 'male',
        description: 'Professional tool supplier since 2010',
        shopName: 'Tool World',
        shopEmail: 'sales@toolworld.com',
        shopMobile: '+1 234 567 8910',
        shopAddress: {
            line1: '123 Main Street',
            line2: 'Suite 100',
            country: 'USA',
            city: 'New York',
            postalCode: '10001'
        },
        shopCategory: 'tools',
        shopDescription: 'Quality tools for professionals and DIY enthusiasts',
        serviceCategories: ['plumbing', 'electrical', 'carpentry'],
        yearsInBusiness: 14,
        accountHolderName: 'John Smith',
        bankName: 'Chase Bank',
        accountNumber: '****1234',
        accountStatus: 'active',
        verificationStatus: 'verified',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        shopImage: 'https://via.placeholder.com/100?text=Tool+World',
        createdAt: '2024-01-15',
        totalItems: 156,
        totalRevenue: 28450.50,
        rating: 4.8,
        items: [
            { id: 1, name: 'Hammer', price: 24.99, stock: 50 },
            { id: 2, name: 'Screwdriver Set', price: 39.99, stock: 30 },
            { id: 3, name: 'Wrench Set', price: 89.99, stock: 20 }
        ]
    },
    {
        id: 2,
        sellerName: 'Sarah Johnson',
        email: 'sarah@electrohub.com',
        mobile: '+1 234 567 8902',
        gender: 'female',
        description: 'Electronics and electrical supplies expert',
        shopName: 'Electro Hub',
        shopEmail: 'info@electrohub.com',
        shopMobile: '+1 234 567 8911',
        shopAddress: {
            line1: '456 Oak Avenue',
            line2: '',
            country: 'USA',
            city: 'Los Angeles',
            postalCode: '90001'
        },
        shopCategory: 'electronics',
        shopDescription: 'Latest electronics and electrical components',
        serviceCategories: ['electrical', 'hvac'],
        yearsInBusiness: 8,
        accountHolderName: 'Sarah Johnson',
        bankName: 'Bank of America',
        accountNumber: '****5678',
        accountStatus: 'active',
        verificationStatus: 'verified',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        shopImage: 'https://via.placeholder.com/100?text=Electro+Hub',
        createdAt: '2024-01-20',
        totalItems: 89,
        totalRevenue: 18750.25,
        rating: 4.9,
        items: [
            { id: 4, name: 'Wireless Mouse', price: 29.99, stock: 100 },
            { id: 5, name: 'USB Cable', price: 12.99, stock: 200 }
        ]
    },
    {
        id: 3,
        sellerName: 'Mike Wilson',
        email: 'mike@furniturecraft.com',
        mobile: '+1 234 567 8903',
        gender: 'male',
        description: 'Custom furniture and home decor',
        shopName: 'Furniture Craft',
        shopEmail: 'sales@furniturecraft.com',
        shopMobile: '+1 234 567 8912',
        shopAddress: {
            line1: '789 Pine Street',
            line2: '',
            country: 'USA',
            city: 'Chicago',
            postalCode: '60601'
        },
        shopCategory: 'furniture',
        shopDescription: 'Handcrafted furniture and home accessories',
        serviceCategories: ['carpentry'],
        yearsInBusiness: 12,
        accountHolderName: 'Mike Wilson',
        bankName: 'Wells Fargo',
        accountNumber: '****9012',
        accountStatus: 'active',
        verificationStatus: 'verified',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        shopImage: 'https://via.placeholder.com/100?text=Furniture+Craft',
        createdAt: '2024-01-25',
        totalItems: 45,
        totalRevenue: 32500.00,
        rating: 4.7,
        items: [
            { id: 6, name: 'Wooden Chair', price: 149.99, stock: 25 },
            { id: 7, name: 'Coffee Table', price: 299.99, stock: 15 }
        ]
    },
    {
        id: 4,
        sellerName: 'Emily Brown',
        email: 'emily@paintpro.com',
        mobile: '+1 234 567 8904',
        gender: 'female',
        description: 'Quality paints and painting supplies',
        shopName: 'Paint Pro',
        shopEmail: 'info@paintpro.com',
        shopMobile: '+1 234 567 8913',
        shopAddress: {
            line1: '321 Cedar Lane',
            line2: '',
            country: 'USA',
            city: 'Houston',
            postalCode: '77001'
        },
        shopCategory: 'paint',
        shopDescription: 'Premium paints and painting accessories',
        serviceCategories: ['painting'],
        yearsInBusiness: 6,
        accountHolderName: 'Emily Brown',
        bankName: 'Citibank',
        accountNumber: '****3456',
        accountStatus: 'inactive',
        verificationStatus: 'pending',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        shopImage: 'https://via.placeholder.com/100?text=Paint+Pro',
        createdAt: '2024-02-01',
        totalItems: 78,
        totalRevenue: 12450.75,
        rating: 0,
        items: [
            { id: 8, name: 'Interior Paint', price: 45.99, stock: 80 },
            { id: 9, name: 'Paint Brush Set', price: 19.99, stock: 120 }
        ]
    },
    {
        id: 5,
        sellerName: 'Robert Chen',
        email: 'robert@plumbingsupply.com',
        mobile: '+1 234 567 8905',
        gender: 'male',
        description: 'Plumbing supplies and equipment',
        shopName: 'Plumbing Supply Co',
        shopEmail: 'sales@plumbingsupply.com',
        shopMobile: '+1 234 567 8914',
        shopAddress: {
            line1: '555 Water Street',
            line2: '',
            country: 'USA',
            city: 'Phoenix',
            postalCode: '85001'
        },
        shopCategory: 'plumbing',
        shopDescription: 'Complete plumbing solutions for professionals',
        serviceCategories: ['plumbing'],
        yearsInBusiness: 10,
        accountHolderName: 'Robert Chen',
        bankName: 'Chase Bank',
        accountNumber: '****7890',
        accountStatus: 'active',
        verificationStatus: 'verified',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        shopImage: 'https://via.placeholder.com/100?text=Plumbing+Supply',
        createdAt: '2024-02-05',
        totalItems: 112,
        totalRevenue: 22340.00,
        rating: 4.6,
        items: [
            { id: 10, name: 'Pipe Wrench', price: 34.99, stock: 60 },
            { id: 11, name: 'Plunger', price: 14.99, stock: 100 }
        ]
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentSellerPage = 1;
const sellersPerPage = 5;

// Filters
let sellerFilters = {
    search: '',
    status: 'all',
    verification: 'all'
};

// ============================================
// SELLER STATISTICS
// ============================================

function updateSellerStats() {
    const total = sellersData.length;
    const active = sellersData.filter(s => s.accountStatus === 'active').length;
    const totalItems = sellersData.reduce((sum, s) => sum + s.totalItems, 0);
    const totalRevenue = sellersData.reduce((sum, s) => sum + s.totalRevenue, 0);
    
    const totalSellersEl = document.getElementById('totalSellers');
    const activeSellersEl = document.getElementById('activeSellers');
    const totalItemsEl = document.getElementById('totalItems');
    const totalRevenueEl = document.getElementById('totalRevenue');
    
    if (totalSellersEl) totalSellersEl.textContent = total;
    if (activeSellersEl) activeSellersEl.textContent = active;
    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (totalRevenueEl) totalRevenueEl.textContent = formatCurrency(totalRevenue);
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterSellers() {
    return sellersData.filter(seller => {
        if (sellerFilters.search && !seller.sellerName.toLowerCase().includes(sellerFilters.search) &&
            !seller.shopName.toLowerCase().includes(sellerFilters.search) &&
            !seller.email.toLowerCase().includes(sellerFilters.search)) {
            return false;
        }
        if (sellerFilters.status !== 'all' && seller.accountStatus !== sellerFilters.status) {
            return false;
        }
        if (sellerFilters.verification !== 'all' && seller.verificationStatus !== sellerFilters.verification) {
            return false;
        }
        return true;
    });
}

// ============================================
// RENDER SELLERS TABLE
// ============================================

function renderSellersTable() {
    const tbody = document.getElementById('sellersTableBody');
    if (!tbody) return;
    
    let filteredData = filterSellers();
    const totalPages = Math.ceil(filteredData.length / sellersPerPage);
    const start = (currentSellerPage - 1) * sellersPerPage;
    const pageData = filteredData.slice(start, start + sellersPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-5">No sellers/shops found</td></tr>';
        renderSellersPagination(totalPages);
        return;
    }
    
    pageData.forEach(seller => {
        const statusClass = seller.accountStatus === 'active' ? 'status-success' : 'status-inactive';
        const statusText = seller.accountStatus === 'active' ? 'Active' : 'Inactive';
        const verificationClass = seller.verificationStatus === 'verified' ? 'status-success' : 'status-pending';
        const verificationText = seller.verificationStatus === 'verified' ? 'Verified' : 'Pending';
        
        const categoryNames = {
            'tools': 'Tools & Hardware',
            'electronics': 'Electronics',
            'furniture': 'Furniture',
            'paint': 'Paint & Supplies',
            'plumbing': 'Plumbing Supplies',
            'electrical': 'Electrical Supplies'
        };
        
        const categoryDisplay = categoryNames[seller.shopCategory] || seller.shopCategory;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seller.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${seller.image}" class="rounded-circle me-2" width="40" height="40" onerror="this.src='https://via.placeholder.com/40'">
                    <div>
                        <div class="fw-bold">${escapeHtml(seller.sellerName)}</div>
                        <small class="text-muted">ID: ${seller.id}</small>
                    </div>
                </div>
             </td>
            <td>
                <div>
                    <div class="fw-bold">${escapeHtml(seller.shopName)}</div>
                    <small class="text-muted">${categoryDisplay}</small>
                </div>
             </td>
            <td>
                <div>${seller.email}</div>
                <small>${seller.mobile}</small>
             </td>
            <td>${seller.totalItems}</td>
            <td>${formatCurrency(seller.totalRevenue)}</td>
            <td><span class="status-badge ${verificationClass}">${verificationText}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewSeller(${seller.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewSellerItems(${seller.id})" title="View Items">
                        <i class="fas fa-boxes"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editSeller(${seller.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteSeller(${seller.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
             </td>
        `;
        tbody.appendChild(row);
    });
    
    renderSellersPagination(totalPages);
}

function renderSellersPagination(totalPages) {
    const pagination = document.getElementById('sellersPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentSellerPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSellerPage(${currentSellerPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentSellerPage - 2 && i <= currentSellerPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentSellerPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeSellerPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentSellerPage - 3 || i === currentSellerPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentSellerPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSellerPage(${currentSellerPage + 1}); return false;">Next</a>
    </li>`;
}

function changeSellerPage(page) {
    currentSellerPage = page;
    renderSellersTable();
}

// ============================================
// VIEW SELLER DETAILS
// ============================================

function viewSeller(sellerId) {
    const seller = sellersData.find(s => s.id === sellerId);
    if (!seller) return;
    
    const modalBody = document.getElementById('viewSellerBody');
    if (!modalBody) return;
    
    // Rating stars
    const fullStars = Math.floor(seller.rating);
    const hasHalfStar = seller.rating % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
    if (hasHalfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
    for (let i = starsHtml.length / (hasHalfStar ? 13 : 12); i < 5; i++) starsHtml += '<i class="far fa-star"></i>';
    
    const categoryNames = {
        'tools': 'Tools & Hardware',
        'electronics': 'Electronics',
        'furniture': 'Furniture',
        'paint': 'Paint & Supplies',
        'plumbing': 'Plumbing Supplies',
        'electrical': 'Electrical Supplies'
    };
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="${seller.shopImage}" class="rounded mb-3" width="120" height="120" onerror="this.src='https://via.placeholder.com/120'">
                <h4>${escapeHtml(seller.shopName)}</h4>
                <p class="text-muted">${categoryNames[seller.shopCategory] || seller.shopCategory}</p>
                <div class="rating-stars mb-2">${starsHtml}</div>
                <p>${seller.rating} rating</p>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="text-primary">Seller Information</h6>
                        <p><strong>Name:</strong> ${escapeHtml(seller.sellerName)}<br>
                        <strong>Email:</strong> ${seller.email}<br>
                        <strong>Mobile:</strong> ${seller.mobile}<br>
                        <strong>Gender:</strong> ${seller.gender === 'male' ? 'Male' : (seller.gender === 'female' ? 'Female' : 'Other')}</p>
                    </div>
                    <div class="col-md-6">
                        <h6 class="text-primary">Shop Information</h6>
                        <p><strong>Shop Email:</strong> ${seller.shopEmail || 'N/A'}<br>
                        <strong>Shop Mobile:</strong> ${seller.shopMobile || 'N/A'}<br>
                        <strong>Years in Business:</strong> ${seller.yearsInBusiness} years</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="text-primary">Shop Address</h6>
                        <p>${seller.shopAddress.line1}<br>
                        ${seller.shopAddress.line2 ? seller.shopAddress.line2 + '<br>' : ''}
                        ${seller.shopAddress.city}, ${seller.shopAddress.postalCode}<br>
                        ${seller.shopAddress.country}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="text-primary">Description</h6>
                        <p>${seller.shopDescription || seller.description}</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-12">
                        <h6 class="text-primary">Service Categories</h6>
                        <p>${seller.serviceCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}</p>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h6 class="text-primary">Performance Metrics</h6>
                        <div class="performance-metrics" style="background: #f8f9fa; border-radius: 10px; padding: 15px;">
                            <div class="row">
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${seller.totalItems}</div>
                                    <div class="metric-label">Total Items</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${formatCurrency(seller.totalRevenue)}</div>
                                    <div class="metric-label">Total Revenue</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${seller.yearsInBusiness}</div>
                                    <div class="metric-label">Years Active</div>
                                </div>
                                <div class="col-md-3 metric-item" style="text-align: center;">
                                    <div class="metric-value" style="font-size: 20px; font-weight: 700; color: #4361ee;">${formatDateShort(seller.createdAt)}</div>
                                    <div class="metric-label">Joined</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewSellerModal')).show();
}

// ============================================
// VIEW SELLER ITEMS
// ============================================

function viewSellerItems(sellerId) {
    const seller = sellersData.find(s => s.id === sellerId);
    if (!seller) return;
    
    const modalBody = document.getElementById('viewItemsBody');
    if (!modalBody) return;
    
    let itemsHtml = '';
    if (seller.items && seller.items.length > 0) {
        itemsHtml = `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Unit Price</th>
                            <th>Stock Quantity</th>
                            <th>Total Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${seller.items.map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${escapeHtml(item.name)}</td>
                                <td>${formatCurrency(item.price)}</td>
                                <td>${item.stock}</td>
                                <td>${formatCurrency(item.price * item.stock)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot class="table-active">
                        <tr>
                            <th colspan="4" class="text-end">Total Items Value:</th>
                            <th>${formatCurrency(seller.items.reduce((sum, item) => sum + (item.price * item.stock), 0))}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    } else {
        itemsHtml = '<p class="text-center text-muted py-5">No items found for this shop.</p>';
    }
    
    modalBody.innerHTML = `
        <h5 class="mb-3">${escapeHtml(seller.shopName)} - Inventory</h5>
        <p class="text-muted mb-3">Total Items: ${seller.totalItems} | Total Revenue: ${formatCurrency(seller.totalRevenue)}</p>
        ${itemsHtml}
    `;
    
    new bootstrap.Modal(document.getElementById('viewItemsModal')).show();
}

// ============================================
// ADD/EDIT SELLER FUNCTIONS
// ============================================

function addSeller() {
    document.getElementById('sellerModalTitle').innerHTML = '<i class="fas fa-store"></i> Add Seller/Shop';
    document.getElementById('editSellerId').value = '';
    document.getElementById('sellerName').value = '';
    document.getElementById('sellerEmail').value = '';
    document.getElementById('sellerMobile').value = '';
    document.getElementById('sellerGender').value = 'male';
    document.getElementById('sellerDescription').value = '';
    document.getElementById('shopName').value = '';
    document.getElementById('shopEmail').value = '';
    document.getElementById('shopMobile').value = '';
    document.getElementById('shopAddressLine1').value = '';
    document.getElementById('shopAddressLine2').value = '';
    document.getElementById('shopCountry').value = 'USA';
    document.getElementById('shopCity').value = '';
    document.getElementById('shopPostalCode').value = '';
    document.getElementById('shopCategory').value = '';
    document.getElementById('shopDescription').value = '';
    document.getElementById('yearsInBusiness').value = '';
    document.getElementById('sellerAccountHolderName').value = '';
    document.getElementById('sellerBankName').value = '';
    document.getElementById('sellerAccountNumber').value = '';
    document.getElementById('sellerAccountStatus').value = 'active';
    document.getElementById('verificationStatus').value = 'pending';
    document.getElementById('sellerPassword').value = '';
    document.getElementById('sellerImagePreview').src = 'https://via.placeholder.com/100';
    document.getElementById('shopImagePreview').src = 'https://via.placeholder.com/100';
    
    // Clear multiple select
    const serviceSelect = document.getElementById('serviceCategories');
    if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            serviceSelect.options[i].selected = false;
        }
    }
    
    document.getElementById('sellerPasswordFields').style.display = 'block';
    
    new bootstrap.Modal(document.getElementById('sellerModal')).show();
}

function editSeller(sellerId) {
    const seller = sellersData.find(s => s.id === sellerId);
    if (!seller) return;
    
    document.getElementById('sellerModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Seller/Shop';
    document.getElementById('editSellerId').value = seller.id;
    document.getElementById('sellerName').value = seller.sellerName;
    document.getElementById('sellerEmail').value = seller.email;
    document.getElementById('sellerMobile').value = seller.mobile;
    document.getElementById('sellerGender').value = seller.gender;
    document.getElementById('sellerDescription').value = seller.description || '';
    document.getElementById('shopName').value = seller.shopName;
    document.getElementById('shopEmail').value = seller.shopEmail || '';
    document.getElementById('shopMobile').value = seller.shopMobile || '';
    document.getElementById('shopAddressLine1').value = seller.shopAddress.line1;
    document.getElementById('shopAddressLine2').value = seller.shopAddress.line2 || '';
    document.getElementById('shopCountry').value = seller.shopAddress.country;
    document.getElementById('shopCity').value = seller.shopAddress.city;
    document.getElementById('shopPostalCode').value = seller.shopAddress.postalCode;
    document.getElementById('shopCategory').value = seller.shopCategory;
    document.getElementById('shopDescription').value = seller.shopDescription || '';
    document.getElementById('yearsInBusiness').value = seller.yearsInBusiness;
    document.getElementById('sellerAccountHolderName').value = seller.accountHolderName || '';
    document.getElementById('sellerBankName').value = seller.bankName || '';
    document.getElementById('sellerAccountNumber').value = seller.accountNumber || '';
    document.getElementById('sellerAccountStatus').value = seller.accountStatus;
    document.getElementById('verificationStatus').value = seller.verificationStatus;
    document.getElementById('sellerImagePreview').src = seller.image;
    document.getElementById('shopImagePreview').src = seller.shopImage;
    
    // Set service categories
    const serviceSelect = document.getElementById('serviceCategories');
    if (serviceSelect && seller.serviceCategories) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            serviceSelect.options[i].selected = seller.serviceCategories.includes(serviceSelect.options[i].value);
        }
    }
    
    document.getElementById('sellerPasswordFields').style.display = 'none';
    
    new bootstrap.Modal(document.getElementById('sellerModal')).show();
}

function saveSeller() {
    const id = document.getElementById('editSellerId').value;
    const sellerName = document.getElementById('sellerName').value;
    const email = document.getElementById('sellerEmail').value;
    const mobile = document.getElementById('sellerMobile').value;
    const gender = document.getElementById('sellerGender').value;
    const description = document.getElementById('sellerDescription').value;
    const shopName = document.getElementById('shopName').value;
    const shopEmail = document.getElementById('shopEmail').value;
    const shopMobile = document.getElementById('shopMobile').value;
    const shopAddressLine1 = document.getElementById('shopAddressLine1').value;
    const shopAddressLine2 = document.getElementById('shopAddressLine2').value;
    const shopCountry = document.getElementById('shopCountry').value;
    const shopCity = document.getElementById('shopCity').value;
    const shopPostalCode = document.getElementById('shopPostalCode').value;
    const shopCategory = document.getElementById('shopCategory').value;
    const shopDescription = document.getElementById('shopDescription').value;
    const yearsInBusiness = document.getElementById('yearsInBusiness').value;
    const accountHolderName = document.getElementById('sellerAccountHolderName').value;
    const bankName = document.getElementById('sellerBankName').value;
    const accountNumber = document.getElementById('sellerAccountNumber').value;
    const accountStatus = document.getElementById('sellerAccountStatus').value;
    const verificationStatus = document.getElementById('verificationStatus').value;
    const password = document.getElementById('sellerPassword').value;
    
    // Get selected service categories
    const serviceSelect = document.getElementById('serviceCategories');
    const serviceCategories = [];
    if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].selected) {
                serviceCategories.push(serviceSelect.options[i].value);
            }
        }
    }
    
    // Validation
    if (!sellerName || !email || !mobile || !shopName || !shopCategory) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    
    if (!id && !password) {
        showToast('Please enter a password for new seller', 'danger');
        return;
    }
    
    if (mobile.length < 10) {
        showToast('Please enter a valid mobile number', 'danger');
        return;
    }
    
    const shopAddress = {
        line1: shopAddressLine1,
        line2: shopAddressLine2,
        country: shopCountry,
        city: shopCity,
        postalCode: shopPostalCode
    };
    
    if (id) {
        // Update existing
        const index = sellersData.findIndex(s => s.id == id);
        if (index !== -1) {
            sellersData[index] = {
                ...sellersData[index],
                sellerName: sellerName.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                gender: gender,
                description: description,
                shopName: shopName.trim(),
                shopEmail: shopEmail,
                shopMobile: shopMobile,
                shopAddress: shopAddress,
                shopCategory: shopCategory,
                shopDescription: shopDescription,
                serviceCategories: serviceCategories,
                yearsInBusiness: parseInt(yearsInBusiness) || 0,
                accountHolderName: accountHolderName,
                bankName: bankName,
                accountNumber: accountNumber,
                accountStatus: accountStatus,
                verificationStatus: verificationStatus
            };
            showToast('Seller updated successfully', 'success');
        }
    } else {
        // Add new
        const newId = sellersData.length + 1;
        sellersData.push({
            id: newId,
            sellerName: sellerName.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            gender: gender,
            description: description,
            shopName: shopName.trim(),
            shopEmail: shopEmail,
            shopMobile: shopMobile,
            shopAddress: shopAddress,
            shopCategory: shopCategory,
            shopDescription: shopDescription,
            serviceCategories: serviceCategories,
            yearsInBusiness: parseInt(yearsInBusiness) || 0,
            accountHolderName: accountHolderName,
            bankName: bankName,
            accountNumber: accountNumber,
            accountStatus: accountStatus,
            verificationStatus: verificationStatus,
            image: 'https://via.placeholder.com/100',
            shopImage: 'https://via.placeholder.com/100',
            createdAt: new Date().toISOString().slice(0, 10),
            totalItems: 0,
            totalRevenue: 0,
            rating: 0,
            items: []
        });
        showToast('Seller added successfully', 'success');
        console.log(`Welcome email sent to ${email} with password: ${password}`);
        showToast(`Login credentials sent to ${email}`, 'info');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('sellerModal')).hide();
    updateSellerStats();
    renderSellersTable();
}

// ============================================
// DELETE SELLER
// ============================================

function deleteSeller(sellerId) {
    document.getElementById('deleteSellerId').value = sellerId;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteSeller() {
    const sellerId = parseInt(document.getElementById('deleteSellerId').value);
    const index = sellersData.findIndex(s => s.id === sellerId);
    
    if (index !== -1) {
        const deletedSeller = sellersData[index];
        sellersData.splice(index, 1);
        showToast(`Seller "${deletedSeller.shopName}" deleted successfully`, 'success');
        
        const remainingItems = filterSellers().length;
        const totalPages = Math.ceil(remainingItems / sellersPerPage);
        if (currentSellerPage > totalPages && totalPages > 0) {
            currentSellerPage = totalPages;
        } else if (totalPages === 0) {
            currentSellerPage = 1;
        }
        
        updateSellerStats();
        renderSellersTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// EXPORT SELLERS
// ============================================

function exportSellers() {
    const filteredData = filterSellers();
    let csvContent = "ID,Seller Name,Email,Mobile,Shop Name,Shop Category,Account Status,Verification Status,Total Items,Total Revenue,Joined Date\n";
    
    filteredData.forEach(seller => {
        csvContent += `"${seller.id}","${seller.sellerName}","${seller.email}","${seller.mobile}","${seller.shopName}","${seller.shopCategory}","${seller.accountStatus}","${seller.verificationStatus}","${seller.totalItems}","${seller.totalRevenue}","${seller.createdAt}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sellers_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Sellers exported successfully', 'success');
}

// ============================================
// RESET FILTERS
// ============================================

function resetFilters() {
    sellerFilters = { search: '', status: 'all', verification: 'all' };
    currentSellerPage = 1;
    
    const searchInput = document.getElementById('searchSeller');
    const statusFilter = document.getElementById('sellerStatusFilter');
    const verificationFilter = document.getElementById('verificationStatusFilter');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (verificationFilter) verificationFilter.value = 'all';
    
    renderSellersTable();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupSellerEventListeners() {
    const searchInput = document.getElementById('searchSeller');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            sellerFilters.search = e.target.value.toLowerCase();
            currentSellerPage = 1;
            renderSellersTable();
        });
    }
    
    const statusFilter = document.getElementById('sellerStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            sellerFilters.status = e.target.value;
            currentSellerPage = 1;
            renderSellersTable();
        });
    }
    
    const verificationFilter = document.getElementById('verificationStatusFilter');
    if (verificationFilter) {
        verificationFilter.addEventListener('change', function(e) {
            sellerFilters.verification = e.target.value;
            currentSellerPage = 1;
            renderSellersTable();
        });
    }
    
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    const addBtn = document.getElementById('addSellerBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addSeller);
    }
    
    const saveBtn = document.getElementById('saveSellerBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSeller);
    }
    
    const exportBtn = document.getElementById('exportSellersBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportSellers);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteSeller);
    }
    
    // Image upload for seller
    const uploadSellerBtn = document.getElementById('uploadSellerImageBtn');
    const sellerImageInput = document.getElementById('sellerImage');
    const sellerImagePreview = document.getElementById('sellerImagePreview');
    
    if (uploadSellerBtn && sellerImageInput) {
        uploadSellerBtn.addEventListener('click', () => sellerImageInput.click());
        sellerImageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        sellerImagePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    showToast('Please select an image file', 'danger');
                }
            }
        });
    }
    
    // Image upload for shop
    const uploadShopBtn = document.getElementById('uploadShopImageBtn');
    const shopImageInput = document.getElementById('shopImage');
    const shopImagePreview = document.getElementById('shopImagePreview');
    
    if (uploadShopBtn && shopImageInput) {
        uploadShopBtn.addEventListener('click', () => shopImageInput.click());
        shopImageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        shopImagePreview.src = event.target.result;
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
window.viewSeller = viewSeller;
window.viewSellerItems = viewSellerItems;
window.editSeller = editSeller;
window.deleteSeller = deleteSeller;
window.changeSellerPage = changeSellerPage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    updateSellerStats();
    renderSellersTable();
    setupSellerEventListeners();
});