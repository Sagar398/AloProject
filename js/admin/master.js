/* ============================================
   Master Management JavaScript
   For: master.html
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

function generateSlug(str) {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// ============================================
// BILLING METHODS COUNTER
// ============================================
let billingMethodCounter = 1;

// ============================================
// SERVICES DATA
// ============================================
let servicesData = [
    {
        id: 1,
        name: 'Plumbing Service',
        category: 'Home Services',
        categoryId: 1,
        description: 'Professional plumbing services for residential and commercial properties.',
        image: 'https://via.placeholder.com/50?text=Plumbing',
        billingMethods: [
            { duration: '1 hour', price: 89.99, type: 'standard' },
            { duration: '2 hours', price: 159.99, type: 'premium' },
            { duration: '4 hours', price: 299.99, type: 'platinum' }
        ],
        commissionRate: 15,
        commissionType: 'percentage',
        status: 'active',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Electrical Service',
        category: 'Home Services',
        categoryId: 1,
        description: 'Expert electrical repair and installation services.',
        image: 'https://via.placeholder.com/50?text=Electrical',
        billingMethods: [
            { duration: '1 hour', price: 79.99, type: 'standard' },
            { duration: '3 hours', price: 219.99, type: 'premium' }
        ],
        commissionRate: 15,
        commissionType: 'percentage',
        status: 'active',
        createdAt: '2024-01-20'
    },
    {
        id: 3,
        name: 'AC Repair',
        category: 'HVAC Services',
        categoryId: 2,
        description: 'Air conditioning repair and maintenance services.',
        image: 'https://via.placeholder.com/50?text=AC',
        billingMethods: [
            { duration: '1 hour', price: 99.99, type: 'standard' },
            { duration: '2 hours', price: 179.99, type: 'premium' }
        ],
        commissionRate: 12.5,
        commissionType: 'percentage',
        status: 'active',
        createdAt: '2024-01-25'
    },
    {
        id: 4,
        name: 'Painting Service',
        category: 'Home Services',
        categoryId: 1,
        description: 'Professional interior and exterior painting.',
        image: 'https://via.placeholder.com/50?text=Painting',
        billingMethods: [
            { duration: 'per room', price: 149.99, type: 'standard' },
            { duration: 'per house', price: 999.99, type: 'premium' }
        ],
        commissionRate: 15,
        commissionType: 'percentage',
        status: 'inactive',
        createdAt: '2024-02-01'
    },
    {
        id: 5,
        name: 'Carpentry',
        category: 'Home Services',
        categoryId: 1,
        description: 'Custom furniture and woodworking services.',
        image: 'https://via.placeholder.com/50?text=Carpentry',
        billingMethods: [
            { duration: '1 hour', price: 69.99, type: 'standard' },
            { duration: '4 hours', price: 249.99, type: 'premium' }
        ],
        commissionRate: 15,
        commissionType: 'percentage',
        status: 'active',
        createdAt: '2024-02-05'
    }
];

// ============================================
// CATEGORIES DATA
// ============================================
let categoriesData = [
    { id: 1, title: 'Home Services', slug: 'home-services', status: 'active' },
    { id: 2, title: 'HVAC Services', slug: 'hvac-services', status: 'active' },
    { id: 3, title: 'Automotive', slug: 'automotive', status: 'active' },
    { id: 4, title: 'Cleaning Services', slug: 'cleaning-services', status: 'inactive' },
    { id: 5, title: 'Beauty & Wellness', slug: 'beauty-wellness', status: 'active' }
];

// ============================================
// SUB-CATEGORIES DATA
// ============================================
let subCategoriesData = [
    { id: 1, title: 'Plumbing', category: 'Home Services', categoryId: 1, description: 'Pipe installation and repair services', image: 'https://via.placeholder.com/50?text=Plumbing', status: 'active' },
    { id: 2, title: 'Electrical', category: 'Home Services', categoryId: 1, description: 'Wiring and electrical repairs', image: 'https://via.placeholder.com/50?text=Electrical', status: 'active' },
    { id: 3, title: 'Painting', category: 'Home Services', categoryId: 1, description: 'Interior and exterior painting', image: 'https://via.placeholder.com/50?text=Painting', status: 'active' },
    { id: 4, title: 'AC Installation', category: 'HVAC Services', categoryId: 2, description: 'New AC installation services', image: 'https://via.placeholder.com/50?text=AC', status: 'active' },
    { id: 5, title: 'AC Repair', category: 'HVAC Services', categoryId: 2, description: 'AC repair and maintenance', image: 'https://via.placeholder.com/50?text=Repair', status: 'active' },
    { id: 6, title: 'Carpentry', category: 'Home Services', categoryId: 1, description: 'Custom woodworking', image: 'https://via.placeholder.com/50?text=Carpentry', status: 'inactive' }
];

// ============================================
// COUNTRIES DATA
// ============================================
let countriesData = [
    { id: 1, title: 'United States', code: 'US', dialCode: '+1', status: 'active' },
    { id: 2, title: 'Canada', code: 'CA', dialCode: '+1', status: 'active' },
    { id: 3, title: 'United Kingdom', code: 'GB', dialCode: '+44', status: 'active' },
    { id: 4, title: 'Australia', code: 'AU', dialCode: '+61', status: 'active' },
    { id: 5, title: 'India', code: 'IN', dialCode: '+91', status: 'active' },
    { id: 6, title: 'Germany', code: 'DE', dialCode: '+49', status: 'inactive' }
];

// ============================================
// CITIES DATA
// ============================================
let citiesData = [
    { id: 1, title: 'New York', country: 'United States', countryId: 1, status: 'active' },
    { id: 2, title: 'Los Angeles', country: 'United States', countryId: 1, status: 'active' },
    { id: 3, title: 'Chicago', country: 'United States', countryId: 1, status: 'active' },
    { id: 4, title: 'Toronto', country: 'Canada', countryId: 2, status: 'active' },
    { id: 5, title: 'Vancouver', country: 'Canada', countryId: 2, status: 'active' },
    { id: 6, title: 'London', country: 'United Kingdom', countryId: 3, status: 'active' },
    { id: 7, title: 'Manchester', country: 'United Kingdom', countryId: 3, status: 'inactive' },
    { id: 8, title: 'Sydney', country: 'Australia', countryId: 4, status: 'active' },
    { id: 9, title: 'Melbourne', country: 'Australia', countryId: 4, status: 'active' },
    { id: 10, title: 'Mumbai', country: 'India', countryId: 5, status: 'active' }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentServicePage = 1;
const servicesPerPage = 5;

// ============================================
// SERVICES FUNCTIONS
// ============================================

function loadCategoryDropdown() {
    const serviceCategorySelect = document.getElementById('serviceCategory');
    if (serviceCategorySelect) {
        serviceCategorySelect.innerHTML = '<option value="">Select Category</option>';
        categoriesData.filter(c => c.status === 'active').forEach(category => {
            serviceCategorySelect.innerHTML += `<option value="${category.id}">${escapeHtml(category.title)}</option>`;
        });
    }
}

function renderServicesTable() {
    const tbody = document.getElementById('servicesTableBody');
    if (!tbody) return;
    
    const start = (currentServicePage - 1) * servicesPerPage;
    const pageData = servicesData.slice(start, start + servicesPerPage);
    const totalPages = Math.ceil(servicesData.length / servicesPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-5">No services found</td></tr>';
        renderServicesPagination(totalPages);
        return;
    }
    
    pageData.forEach(service => {
        const statusClass = service.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = service.status === 'active' ? 'Active' : 'Inactive';
        const billingMethodsText = service.billingMethods.map(m => `${m.duration}: $${m.price}`).join('<br>');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}</td>
            <td><img src="${service.image}" width="40" height="40" class="rounded" onerror="this.src='https://via.placeholder.com/40'"></td>
            <td><strong>${escapeHtml(service.name)}</strong><br><small class="text-muted">${escapeHtml(service.category)}</small></td>
            <td>${service.category}</td>
            <td>${billingMethodsText}</td>
            <td>${service.commissionRate}%</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewService(${service.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editService(${service.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteService(${service.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderServicesPagination(totalPages);
}

function renderServicesPagination(totalPages) {
    const pagination = document.getElementById('servicesPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentServicePage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeServicePage(${currentServicePage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item ${currentServicePage === i ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changeServicePage(${i}); return false;">${i}</a>
        </li>`;
    }
    
    pagination.innerHTML += `<li class="page-item ${currentServicePage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeServicePage(${currentServicePage + 1}); return false;">Next</a>
    </li>`;
}

function changeServicePage(page) {
    currentServicePage = page;
    renderServicesTable();
}

function addService() {
    billingMethodCounter = 1;
    document.getElementById('serviceModalTitle').innerHTML = '<i class="fas fa-tools"></i> Add Service';
    document.getElementById('editServiceId').value = '';
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('commissionRate').value = '';
    document.getElementById('commissionType').value = 'percentage';
    document.getElementById('serviceStatus').value = 'active';
    document.getElementById('serviceImagePreview').src = 'https://via.placeholder.com/100?text=Service';
    
    // Reset billing methods container
    const container = document.getElementById('billingMethodsContainer');
    container.innerHTML = `
        <div class="billing-method-item row mb-2">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Duration (e.g., 1 hour)" id="billingDuration_0">
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control" placeholder="Price" id="billingPrice_0" step="0.01">
            </div>
            <div class="col-md-3">
                <select class="form-select" id="billingType_0">
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="platinum">Platinum</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger remove-billing-btn" onclick="removeBillingMethod(0)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('serviceModal')).show();
}

function editService(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    billingMethodCounter = service.billingMethods.length;
    document.getElementById('serviceModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Service';
    document.getElementById('editServiceId').value = service.id;
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceDescription').value = service.description;
    document.getElementById('commissionRate').value = service.commissionRate;
    document.getElementById('commissionType').value = service.commissionType;
    document.getElementById('serviceStatus').value = service.status;
    document.getElementById('serviceImagePreview').src = service.image;
    
    // Set category
    const categorySelect = document.getElementById('serviceCategory');
    const category = categoriesData.find(c => c.title === service.category);
    if (category) categorySelect.value = category.id;
    
    // Load billing methods
    const container = document.getElementById('billingMethodsContainer');
    container.innerHTML = '';
    service.billingMethods.forEach((method, index) => {
        container.innerHTML += `
            <div class="billing-method-item row mb-2">
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Duration" value="${escapeHtml(method.duration)}" id="billingDuration_${index}">
                </div>
                <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="Price" value="${method.price}" id="billingPrice_${index}" step="0.01">
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="billingType_${index}">
                        <option value="standard" ${method.type === 'standard' ? 'selected' : ''}>Standard</option>
                        <option value="premium" ${method.type === 'premium' ? 'selected' : ''}>Premium</option>
                        <option value="platinum" ${method.type === 'platinum' ? 'selected' : ''}>Platinum</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-danger remove-billing-btn" onclick="removeBillingMethod(${index})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    
    new bootstrap.Modal(document.getElementById('serviceModal')).show();
}

function addBillingMethod() {
    const container = document.getElementById('billingMethodsContainer');
    const newIndex = billingMethodCounter++;
    container.innerHTML += `
        <div class="billing-method-item row mb-2">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Duration (e.g., 1 hour)" id="billingDuration_${newIndex}">
            </div>
            <div class="col-md-3">
                <input type="number" class="form-control" placeholder="Price" id="billingPrice_${newIndex}" step="0.01">
            </div>
            <div class="col-md-3">
                <select class="form-select" id="billingType_${newIndex}">
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="platinum">Platinum</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger remove-billing-btn" onclick="removeBillingMethod(${newIndex})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
}

function removeBillingMethod(index) {
    const element = document.querySelector(`#billingDuration_${index}`)?.closest('.billing-method-item');
    if (element) element.remove();
}

function saveService() {
    const id = document.getElementById('editServiceId').value;
    const name = document.getElementById('serviceName').value;
    const categoryId = document.getElementById('serviceCategory').value;
    const description = document.getElementById('serviceDescription').value;
    const commissionRate = parseFloat(document.getElementById('commissionRate').value);
    const commissionType = document.getElementById('commissionType').value;
    const status = document.getElementById('serviceStatus').value;
    
    if (!name || !categoryId) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    // Collect billing methods
    const billingMethods = [];
    const billingItems = document.querySelectorAll('.billing-method-item');
    billingItems.forEach((item, idx) => {
        const duration = item.querySelector(`[id^="billingDuration_"]`)?.value;
        const price = parseFloat(item.querySelector(`[id^="billingPrice_"]`)?.value);
        const type = item.querySelector(`[id^="billingType_"]`)?.value;
        if (duration && price) {
            billingMethods.push({ duration, price, type });
        }
    });
    
    if (billingMethods.length === 0) {
        showToast('Please add at least one billing method', 'danger');
        return;
    }
    
    const category = categoriesData.find(c => c.id == categoryId);
    
    if (id) {
        const index = servicesData.findIndex(s => s.id == id);
        if (index !== -1) {
            servicesData[index] = {
                ...servicesData[index],
                name: name.trim(),
                category: category.title,
                categoryId: parseInt(categoryId),
                description: description,
                billingMethods: billingMethods,
                commissionRate: commissionRate,
                commissionType: commissionType,
                status: status
            };
            showToast('Service updated successfully', 'success');
        }
    } else {
        const newId = servicesData.length + 1;
        servicesData.push({
            id: newId,
            name: name.trim(),
            category: category.title,
            categoryId: parseInt(categoryId),
            description: description,
            image: 'https://via.placeholder.com/50?text=' + encodeURIComponent(name),
            billingMethods: billingMethods,
            commissionRate: commissionRate,
            commissionType: commissionType,
            status: status,
            createdAt: new Date().toISOString().slice(0, 10)
        });
        showToast('Service added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('serviceModal')).hide();
    renderServicesTable();
}

function viewService(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    const modalBody = document.getElementById('viewServiceBody');
    if (!modalBody) return;
    
    let billingHtml = '<ul class="list-group">';
    service.billingMethods.forEach(method => {
        billingHtml += `<li class="list-group-item d-flex justify-content-between">
            <span>${escapeHtml(method.duration)}</span>
            <span class="fw-bold">${formatCurrency(method.price)}</span>
            <span class="badge bg-secondary">${method.type}</span>
        </li>`;
    });
    billingHtml += '</ul>';
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-3 text-center">
                <img src="${service.image}" class="rounded mb-3" width="100" height="100">
                <h5>${escapeHtml(service.name)}</h5>
                <p class="text-muted">${escapeHtml(service.category)}</p>
            </div>
            <div class="col-md-9">
                <p><strong>Description:</strong> ${escapeHtml(service.description)}</p>
                <p><strong>Commission:</strong> ${service.commissionRate}% (${service.commissionType})</p>
                <p><strong>Status:</strong> <span class="status-badge ${service.status === 'active' ? 'status-success' : 'status-inactive'}">${service.status}</span></p>
                <p><strong>Created:</strong> ${formatDateShort(service.createdAt)}</p>
                <h6 class="mt-3">Billing Methods</h6>
                ${billingHtml}
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewServiceModal')).show();
}

function deleteService(serviceId) {
    document.getElementById('deleteItemId').value = serviceId;
    document.getElementById('deleteItemType').value = 'service';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// CATEGORIES FUNCTIONS
// ============================================

function renderCategoriesTable() {
    const tbody = document.getElementById('categoriesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    categoriesData.forEach(category => {
        const statusClass = category.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = category.status === 'active' ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.id}</td>
            <td><strong>${escapeHtml(category.title)}</strong></td>
            <td><code>/${category.slug}</code></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editCategory(${category.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory(${category.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addCategory() {
    document.getElementById('categoryModalTitle').innerHTML = '<i class="fas fa-tag"></i> Add Category';
    document.getElementById('editCategoryId').value = '';
    document.getElementById('categoryTitle').value = '';
    document.getElementById('categorySlug').value = '';
    document.getElementById('categoryStatus').value = 'active';
    
    new bootstrap.Modal(document.getElementById('categoryModal')).show();
}

function editCategory(categoryId) {
    const category = categoriesData.find(c => c.id === categoryId);
    if (!category) return;
    
    document.getElementById('categoryModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Category';
    document.getElementById('editCategoryId').value = category.id;
    document.getElementById('categoryTitle').value = category.title;
    document.getElementById('categorySlug').value = category.slug;
    document.getElementById('categoryStatus').value = category.status;
    
    new bootstrap.Modal(document.getElementById('categoryModal')).show();
}

function saveCategory() {
    const id = document.getElementById('editCategoryId').value;
    const title = document.getElementById('categoryTitle').value;
    const status = document.getElementById('categoryStatus').value;
    
    if (!title) {
        showToast('Please enter category title', 'danger');
        return;
    }
    
    const slug = generateSlug(title);
    
    if (id) {
        const index = categoriesData.findIndex(c => c.id == id);
        if (index !== -1) {
            categoriesData[index] = { ...categoriesData[index], title: title.trim(), slug: slug, status: status };
            showToast('Category updated successfully', 'success');
        }
    } else {
        const newId = categoriesData.length + 1;
        categoriesData.push({ id: newId, title: title.trim(), slug: slug, status: status });
        showToast('Category added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
    renderCategoriesTable();
    loadCategoryDropdown();
    loadParentCategoryDropdown();
}

function deleteCategory(categoryId) {
    document.getElementById('deleteItemId').value = categoryId;
    document.getElementById('deleteItemType').value = 'category';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// SUB-CATEGORIES FUNCTIONS
// ============================================

function loadParentCategoryDropdown() {
    const parentCategorySelect = document.getElementById('parentCategory');
    if (parentCategorySelect) {
        parentCategorySelect.innerHTML = '<option value="">Select Category</option>';
        categoriesData.filter(c => c.status === 'active').forEach(category => {
            parentCategorySelect.innerHTML += `<option value="${category.id}">${escapeHtml(category.title)}</option>`;
        });
    }
}

function renderSubCategoriesTable() {
    const tbody = document.getElementById('subCategoriesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    subCategoriesData.forEach(subCategory => {
        const statusClass = subCategory.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = subCategory.status === 'active' ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subCategory.id}</td>
            <td><img src="${subCategory.image}" width="40" height="40" class="rounded" onerror="this.src='https://via.placeholder.com/40'"></td>
            <td><strong>${escapeHtml(subCategory.title)}</strong></td>
            <td>${escapeHtml(subCategory.category)}</td>
            <td>${escapeHtml(subCategory.description.substring(0, 50))}${subCategory.description.length > 50 ? '...' : ''}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editSubCategory(${subCategory.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteSubCategory(${subCategory.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addSubCategory() {
    document.getElementById('subCategoryModalTitle').innerHTML = '<i class="fas fa-layer-group"></i> Add Sub-Category';
    document.getElementById('editSubCategoryId').value = '';
    document.getElementById('subCategoryTitle').value = '';
    document.getElementById('subCategoryDescription').value = '';
    document.getElementById('subCategoryStatus').value = 'active';
    document.getElementById('parentCategory').value = '';
    document.getElementById('subCategoryImagePreview').src = 'https://via.placeholder.com/100?text=Sub-Category';
    
    new bootstrap.Modal(document.getElementById('subCategoryModal')).show();
}

function editSubCategory(subCategoryId) {
    const subCategory = subCategoriesData.find(s => s.id === subCategoryId);
    if (!subCategory) return;
    
    document.getElementById('subCategoryModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Sub-Category';
    document.getElementById('editSubCategoryId').value = subCategory.id;
    document.getElementById('subCategoryTitle').value = subCategory.title;
    document.getElementById('subCategoryDescription').value = subCategory.description;
    document.getElementById('subCategoryStatus').value = subCategory.status;
    document.getElementById('parentCategory').value = subCategory.categoryId;
    document.getElementById('subCategoryImagePreview').src = subCategory.image;
    
    new bootstrap.Modal(document.getElementById('subCategoryModal')).show();
}

function saveSubCategory() {
    const id = document.getElementById('editSubCategoryId').value;
    const title = document.getElementById('subCategoryTitle').value;
    const categoryId = document.getElementById('parentCategory').value;
    const description = document.getElementById('subCategoryDescription').value;
    const status = document.getElementById('subCategoryStatus').value;
    
    if (!title || !categoryId) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    const category = categoriesData.find(c => c.id == categoryId);
    
    if (id) {
        const index = subCategoriesData.findIndex(s => s.id == id);
        if (index !== -1) {
            subCategoriesData[index] = {
                ...subCategoriesData[index],
                title: title.trim(),
                category: category.title,
                categoryId: parseInt(categoryId),
                description: description,
                status: status
            };
            showToast('Sub-category updated successfully', 'success');
        }
    } else {
        const newId = subCategoriesData.length + 1;
        subCategoriesData.push({
            id: newId,
            title: title.trim(),
            category: category.title,
            categoryId: parseInt(categoryId),
            description: description,
            image: 'https://via.placeholder.com/50?text=' + encodeURIComponent(title),
            status: status
        });
        showToast('Sub-category added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('subCategoryModal')).hide();
    renderSubCategoriesTable();
}

function deleteSubCategory(subCategoryId) {
    document.getElementById('deleteItemId').value = subCategoryId;
    document.getElementById('deleteItemType').value = 'subcategory';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// COUNTRIES FUNCTIONS
// ============================================

function renderCountriesTable() {
    const tbody = document.getElementById('countriesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    countriesData.forEach(country => {
        const statusClass = country.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = country.status === 'active' ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.id}</td>
            <td><strong>${escapeHtml(country.title)}</strong></td>
            <td><span class="badge bg-secondary">${country.code}</span> <span class="badge bg-info">${country.dialCode}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editCountry(${country.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCountry(${country.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addCountry() {
    document.getElementById('countryModalTitle').innerHTML = '<i class="fas fa-globe"></i> Add Country';
    document.getElementById('editCountryId').value = '';
    document.getElementById('countryTitle').value = '';
    document.getElementById('countryCode').value = '';
    document.getElementById('dialCode').value = '';
    document.getElementById('countryStatus').value = 'active';
    
    new bootstrap.Modal(document.getElementById('countryModal')).show();
}

function editCountry(countryId) {
    const country = countriesData.find(c => c.id === countryId);
    if (!country) return;
    
    document.getElementById('countryModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Country';
    document.getElementById('editCountryId').value = country.id;
    document.getElementById('countryTitle').value = country.title;
    document.getElementById('countryCode').value = country.code;
    document.getElementById('dialCode').value = country.dialCode;
    document.getElementById('countryStatus').value = country.status;
    
    new bootstrap.Modal(document.getElementById('countryModal')).show();
}

function saveCountry() {
    const id = document.getElementById('editCountryId').value;
    const title = document.getElementById('countryTitle').value;
    const code = document.getElementById('countryCode').value.toUpperCase();
    const dialCode = document.getElementById('dialCode').value;
    const status = document.getElementById('countryStatus').value;
    
    if (!title || !code) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (id) {
        const index = countriesData.findIndex(c => c.id == id);
        if (index !== -1) {
            countriesData[index] = { ...countriesData[index], title: title.trim(), code: code, dialCode: dialCode, status: status };
            showToast('Country updated successfully', 'success');
        }
    } else {
        const newId = countriesData.length + 1;
        countriesData.push({ id: newId, title: title.trim(), code: code, dialCode: dialCode, status: status });
        showToast('Country added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('countryModal')).hide();
    renderCountriesTable();
    loadCountryDropdown();
}

function deleteCountry(countryId) {
    document.getElementById('deleteItemId').value = countryId;
    document.getElementById('deleteItemType').value = 'country';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// CITIES FUNCTIONS
// ============================================

function loadCountryDropdown() {
    const cityCountrySelect = document.getElementById('cityCountry');
    if (cityCountrySelect) {
        cityCountrySelect.innerHTML = '<option value="">Select Country</option>';
        countriesData.filter(c => c.status === 'active').forEach(country => {
            cityCountrySelect.innerHTML += `<option value="${country.id}">${escapeHtml(country.title)}</option>`;
        });
    }
}

function renderCitiesTable() {
    const tbody = document.getElementById('citiesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    citiesData.forEach(city => {
        const statusClass = city.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = city.status === 'active' ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${city.id}</td>
            <td><strong>${escapeHtml(city.title)}</strong></td>
            <td>${escapeHtml(city.country)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editCity(${city.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCity(${city.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addCity() {
    document.getElementById('cityModalTitle').innerHTML = '<i class="fas fa-city"></i> Add City';
    document.getElementById('editCityId').value = '';
    document.getElementById('cityTitle').value = '';
    document.getElementById('cityCountry').value = '';
    document.getElementById('cityStatus').value = 'active';
    
    new bootstrap.Modal(document.getElementById('cityModal')).show();
}

function editCity(cityId) {
    const city = citiesData.find(c => c.id === cityId);
    if (!city) return;
    
    document.getElementById('cityModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit City';
    document.getElementById('editCityId').value = city.id;
    document.getElementById('cityTitle').value = city.title;
    document.getElementById('cityCountry').value = city.countryId;
    document.getElementById('cityStatus').value = city.status;
    
    new bootstrap.Modal(document.getElementById('cityModal')).show();
}

function saveCity() {
    const id = document.getElementById('editCityId').value;
    const title = document.getElementById('cityTitle').value;
    const countryId = document.getElementById('cityCountry').value;
    const status = document.getElementById('cityStatus').value;
    
    if (!title || !countryId) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    const country = countriesData.find(c => c.id == countryId);
    
    if (id) {
        const index = citiesData.findIndex(c => c.id == id);
        if (index !== -1) {
            citiesData[index] = { ...citiesData[index], title: title.trim(), country: country.title, countryId: parseInt(countryId), status: status };
            showToast('City updated successfully', 'success');
        }
    } else {
        const newId = citiesData.length + 1;
        citiesData.push({ id: newId, title: title.trim(), country: country.title, countryId: parseInt(countryId), status: status });
        showToast('City added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('cityModal')).hide();
    renderCitiesTable();
}

function deleteCity(cityId) {
    document.getElementById('deleteItemId').value = cityId;
    document.getElementById('deleteItemType').value = 'city';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// DELETE CONFIRMATION
// ============================================

function confirmDelete() {
    const id = parseInt(document.getElementById('deleteItemId').value);
    const type = document.getElementById('deleteItemType').value;
    
    if (type === 'service') {
        const index = servicesData.findIndex(s => s.id === id);
        if (index !== -1) {
            servicesData.splice(index, 1);
            showToast('Service deleted successfully', 'success');
            renderServicesTable();
        }
    } else if (type === 'category') {
        const index = categoriesData.findIndex(c => c.id === id);
        if (index !== -1) {
            categoriesData.splice(index, 1);
            showToast('Category deleted successfully', 'success');
            renderCategoriesTable();
            loadCategoryDropdown();
            loadParentCategoryDropdown();
        }
    } else if (type === 'subcategory') {
        const index = subCategoriesData.findIndex(s => s.id === id);
        if (index !== -1) {
            subCategoriesData.splice(index, 1);
            showToast('Sub-category deleted successfully', 'success');
            renderSubCategoriesTable();
        }
    } else if (type === 'country') {
        const index = countriesData.findIndex(c => c.id === id);
        if (index !== -1) {
            countriesData.splice(index, 1);
            showToast('Country deleted successfully', 'success');
            renderCountriesTable();
            loadCountryDropdown();
        }
    } else if (type === 'city') {
        const index = citiesData.findIndex(c => c.id === id);
        if (index !== -1) {
            citiesData.splice(index, 1);
            showToast('City deleted successfully', 'success');
            renderCitiesTable();
        }
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// SLUG GENERATION
// ============================================

document.getElementById('categoryTitle')?.addEventListener('input', function() {
    const slug = generateSlug(this.value);
    document.getElementById('categorySlug').value = slug;
});

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupMasterEventListeners() {
    const addServiceBtn = document.getElementById('addServiceBtn');
    if (addServiceBtn) addServiceBtn.addEventListener('click', addService);
    
    const saveServiceBtn = document.getElementById('saveServiceBtn');
    if (saveServiceBtn) saveServiceBtn.addEventListener('click', saveService);
    
    const addBillingMethodBtn = document.getElementById('addBillingMethodBtn');
    if (addBillingMethodBtn) addBillingMethodBtn.addEventListener('click', addBillingMethod);
    
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn) addCategoryBtn.addEventListener('click', addCategory);
    
    const saveCategoryBtn = document.getElementById('saveCategoryBtn');
    if (saveCategoryBtn) saveCategoryBtn.addEventListener('click', saveCategory);
    
    const addSubCategoryBtn = document.getElementById('addSubCategoryBtn');
    if (addSubCategoryBtn) addSubCategoryBtn.addEventListener('click', addSubCategory);
    
    const saveSubCategoryBtn = document.getElementById('saveSubCategoryBtn');
    if (saveSubCategoryBtn) saveSubCategoryBtn.addEventListener('click', saveSubCategory);
    
    const addCountryBtn = document.getElementById('addCountryBtn');
    if (addCountryBtn) addCountryBtn.addEventListener('click', addCountry);
    
    const saveCountryBtn = document.getElementById('saveCountryBtn');
    if (saveCountryBtn) saveCountryBtn.addEventListener('click', saveCountry);
    
    const addCityBtn = document.getElementById('addCityBtn');
    if (addCityBtn) addCityBtn.addEventListener('click', addCity);
    
    const saveCityBtn = document.getElementById('saveCityBtn');
    if (saveCityBtn) saveCityBtn.addEventListener('click', saveCity);
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', confirmDelete);
    
    // Image upload handlers
    const uploadServiceImageBtn = document.getElementById('uploadServiceImageBtn');
    const serviceImageInput = document.getElementById('serviceImage');
    const serviceImagePreview = document.getElementById('serviceImagePreview');
    if (uploadServiceImageBtn && serviceImageInput) {
        uploadServiceImageBtn.addEventListener('click', () => serviceImageInput.click());
        serviceImageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        serviceImagePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
    
    const uploadSubCategoryImageBtn = document.getElementById('uploadSubCategoryImageBtn');
    const subCategoryImageInput = document.getElementById('subCategoryImage');
    const subCategoryImagePreview = document.getElementById('subCategoryImagePreview');
    if (uploadSubCategoryImageBtn && subCategoryImageInput) {
        uploadSubCategoryImageBtn.addEventListener('click', () => subCategoryImageInput.click());
        subCategoryImageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        subCategoryImagePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
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
window.viewService = viewService;
window.editService = editService;
window.deleteService = deleteService;
window.changeServicePage = changeServicePage;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.editSubCategory = editSubCategory;
window.deleteSubCategory = deleteSubCategory;
window.editCountry = editCountry;
window.deleteCountry = deleteCountry;
window.editCity = editCity;
window.deleteCity = deleteCity;
window.removeBillingMethod = removeBillingMethod;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    loadCategoryDropdown();
    loadParentCategoryDropdown();
    loadCountryDropdown();
    
    renderServicesTable();
    renderCategoriesTable();
    renderSubCategoriesTable();
    renderCountriesTable();
    renderCitiesTable();
    
    setupMasterEventListeners();
});