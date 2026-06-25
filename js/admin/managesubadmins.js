/* ============================================
   Manage Sub-Admins JavaScript
   For: manage-subadmins.html
   ============================================ */

// ============================================
// SAMPLE DATA
// ============================================

// Sample Sub-Admins Data
let subAdminsData = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@alo.com',
        mobile: '+1 234 567 8901',
        role: 'admin',
        roleName: 'Admin',
        status: 'active',
        createdAt: '2024-01-15',
        image: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@alo.com',
        mobile: '+1 234 567 8902',
        role: 'manager',
        roleName: 'Manager',
        status: 'active',
        createdAt: '2024-01-20',
        image: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    {
        id: 3,
        name: 'Mike Wilson',
        email: 'mike.w@alo.com',
        mobile: '+1 234 567 8903',
        role: 'support',
        roleName: 'Support',
        status: 'inactive',
        createdAt: '2024-02-01',
        image: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    {
        id: 4,
        name: 'Emily Brown',
        email: 'emily.b@alo.com',
        mobile: '+1 234 567 8904',
        role: 'viewer',
        roleName: 'Viewer',
        status: 'active',
        createdAt: '2024-02-10',
        image: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
        id: 5,
        name: 'David Lee',
        email: 'david.lee@alo.com',
        mobile: '+1 234 567 8905',
        role: 'manager',
        roleName: 'Manager',
        status: 'active',
        createdAt: '2024-02-15',
        image: 'https://randomuser.me/api/portraits/men/13.jpg'
    },
    {
        id: 6,
        name: 'Lisa Wang',
        email: 'lisa.wang@alo.com',
        mobile: '+1 234 567 8906',
        role: 'support',
        roleName: 'Support',
        status: 'inactive',
        createdAt: '2024-02-20',
        image: 'https://randomuser.me/api/portraits/women/13.jpg'
    }
];

// Sample Roles Data with permissions
let rolesData = [
    {
        id: 1,
        name: 'Admin',
        status: 'active',
        permissions: [
            'perm_dashboard_view',
            'perm_bookings_view', 'perm_bookings_edit', 'perm_bookings_delete',
            'perm_orders_view', 'perm_orders_edit', 'perm_orders_delete',
            'perm_payments_view', 'perm_payments_process', 'perm_settlements_view',
            'perm_providers_view', 'perm_providers_add', 'perm_providers_edit', 'perm_providers_delete',
            'perm_sellers_view', 'perm_sellers_add', 'perm_sellers_edit', 'perm_sellers_delete',
            'perm_customers_view', 'perm_customers_edit', 'perm_customers_block',
            'perm_reports_view', 'perm_reports_export',
            'perm_settings_view', 'perm_settings_edit',
            'perm_subadmins_view', 'perm_subadmins_add', 'perm_subadmins_edit', 'perm_subadmins_delete',
            'perm_roles_view', 'perm_roles_add', 'perm_roles_edit', 'perm_roles_delete'
        ]
    },
    {
        id: 2,
        name: 'Manager',
        status: 'active',
        permissions: [
            'perm_dashboard_view',
            'perm_bookings_view', 'perm_bookings_edit',
            'perm_orders_view', 'perm_orders_edit',
            'perm_payments_view',
            'perm_providers_view', 'perm_providers_edit',
            'perm_sellers_view', 'perm_sellers_edit',
            'perm_customers_view', 'perm_customers_edit',
            'perm_reports_view'
        ]
    },
    {
        id: 3,
        name: 'Support',
        status: 'active',
        permissions: [
            'perm_dashboard_view',
            'perm_bookings_view', 'perm_bookings_edit',
            'perm_orders_view',
            'perm_payments_view',
            'perm_customers_view',
            'perm_reports_view'
        ]
    },
    {
        id: 4,
        name: 'Viewer',
        status: 'inactive',
        permissions: [
            'perm_dashboard_view',
            'perm_bookings_view',
            'perm_orders_view',
            'perm_payments_view',
            'perm_customers_view',
            'perm_reports_view'
        ]
    }
];

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

// ============================================
// SUB-ADMINS MANAGEMENT
// ============================================

// Pagination variables
let currentSubAdminPage = 1;
const subAdminsPerPage = 5;

// Filters
let subAdminFilters = {
    search: '',
    role: 'all',
    status: 'all'
};

function renderSubAdminsTable() {
    const tbody = document.getElementById('subAdminsTableBody');
    if (!tbody) return;
    
    let filteredData = subAdminsData.filter(subadmin => {
        if (subAdminFilters.search && !subadmin.name.toLowerCase().includes(subAdminFilters.search) &&
            !subadmin.email.toLowerCase().includes(subAdminFilters.search)) {
            return false;
        }
        if (subAdminFilters.role !== 'all' && subadmin.role !== subAdminFilters.role) {
            return false;
        }
        if (subAdminFilters.status !== 'all' && subadmin.status !== subAdminFilters.status) {
            return false;
        }
        return true;
    });
    
    const totalPages = Math.ceil(filteredData.length / subAdminsPerPage);
    const start = (currentSubAdminPage - 1) * subAdminsPerPage;
    const pageData = filteredData.slice(start, start + subAdminsPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-5">No sub-admins found</td></tr>';
        renderSubAdminsPagination(totalPages);
        return;
    }
    
    pageData.forEach(subadmin => {
        const statusClass = subadmin.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = subadmin.status === 'active' ? 'Active' : 'Inactive';
        const roleClass = `role-badge ${subadmin.role}`;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subadmin.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${subadmin.image}" class="rounded-circle me-2" width="35" height="35" onerror="this.src='https://via.placeholder.com/35'">
                    <div>
                        <div class="fw-bold">${escapeHtml(subadmin.name)}</div>
                    </div>
                </div>
            </td>
            <td>${subadmin.email}</td>
            <td>${subadmin.mobile}</td>
            <td><span class="${roleClass}">${subadmin.roleName}</span></td>
            <td>${formatDateShort(subadmin.createdAt)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info" onclick="viewSubAdmin(${subadmin.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" onclick="editSubAdmin(${subadmin.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteSubAdmin(${subadmin.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderSubAdminsPagination(totalPages);
}

function renderSubAdminsPagination(totalPages) {
    const pagination = document.getElementById('subAdminsPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentSubAdminPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSubAdminPage(${currentSubAdminPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentSubAdminPage - 2 && i <= currentSubAdminPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentSubAdminPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeSubAdminPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentSubAdminPage - 3 || i === currentSubAdminPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentSubAdminPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeSubAdminPage(${currentSubAdminPage + 1}); return false;">Next</a>
    </li>`;
}

function changeSubAdminPage(page) {
    currentSubAdminPage = page;
    renderSubAdminsTable();
}

// View Sub-Admin
function viewSubAdmin(id) {
    const subadmin = subAdminsData.find(s => s.id === id);
    if (!subadmin) return;
    
    const modalBody = document.getElementById('viewSubAdminBody');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="text-center mb-3">
                <img src="${subadmin.image}" class="rounded-circle" width="100" height="100" onerror="this.src='https://via.placeholder.com/100'">
                <h4 class="mt-2">${escapeHtml(subadmin.name)}</h4>
            </div>
            <table class="table table-bordered">
                <tr><th style="width: 40%">Email</th><td>${subadmin.email}</td></tr>
                <tr><th>Mobile Number</th><td>${subadmin.mobile}</td></tr>
                <tr><th>Role</th><td><span class="role-badge ${subadmin.role}">${subadmin.roleName}</span></td></tr>
                <tr><th>Status</th><td><span class="status-badge ${subadmin.status === 'active' ? 'status-success' : 'status-inactive'}">${subadmin.status === 'active' ? 'Active' : 'Inactive'}</span></td></tr>
                <tr><th>Created At</th><td>${formatDateTime(subadmin.createdAt)}</td></tr>
            </table>
        `;
    }
    
    new bootstrap.Modal(document.getElementById('viewSubAdminModal')).show();
}

// Add Sub-Admin
function addSubAdmin() {
    document.getElementById('subAdminModalTitle').innerHTML = '<i class="fas fa-user-plus"></i> Add Sub-Admin';
    document.getElementById('editSubAdminId').value = '';
    document.getElementById('subAdminName').value = '';
    document.getElementById('subAdminEmail').value = '';
    document.getElementById('subAdminMobile').value = '';
    document.getElementById('subAdminRole').value = '';
    document.getElementById('subAdminPassword').value = '';
    document.getElementById('subAdminConfirmPassword').value = '';
    document.getElementById('subAdminStatus').value = 'active';
    document.getElementById('subAdminImagePreview').src = 'https://via.placeholder.com/100';
    
    // Show password fields for new user
    document.getElementById('passwordFields').style.display = 'block';
    document.getElementById('confirmPasswordFields').style.display = 'block';
    
    new bootstrap.Modal(document.getElementById('subAdminModal')).show();
}

// Edit Sub-Admin
function editSubAdmin(id) {
    const subadmin = subAdminsData.find(s => s.id === id);
    if (!subadmin) return;
    
    document.getElementById('subAdminModalTitle').innerHTML = '<i class="fas fa-user-edit"></i> Edit Sub-Admin';
    document.getElementById('editSubAdminId').value = subadmin.id;
    document.getElementById('subAdminName').value = subadmin.name;
    document.getElementById('subAdminEmail').value = subadmin.email;
    document.getElementById('subAdminMobile').value = subadmin.mobile;
    document.getElementById('subAdminRole').value = subadmin.role;
    document.getElementById('subAdminStatus').value = subadmin.status;
    document.getElementById('subAdminImagePreview').src = subadmin.image;
    
    // Hide password fields for editing (optional - can be shown with a checkbox)
    document.getElementById('passwordFields').style.display = 'none';
    document.getElementById('confirmPasswordFields').style.display = 'none';
    
    new bootstrap.Modal(document.getElementById('subAdminModal')).show();
}

// Save Sub-Admin
function saveSubAdmin() {
    const id = document.getElementById('editSubAdminId').value;
    const name = document.getElementById('subAdminName').value;
    const email = document.getElementById('subAdminEmail').value;
    const mobile = document.getElementById('subAdminMobile').value;
    const role = document.getElementById('subAdminRole').value;
    const status = document.getElementById('subAdminStatus').value;
    const password = document.getElementById('subAdminPassword').value;
    const confirmPassword = document.getElementById('subAdminConfirmPassword').value;
    
    // Validation
    if (!name || !email || !mobile || !role) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (!email.includes('@')) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    
    if (mobile.length < 10) {
        showToast('Please enter a valid mobile number', 'danger');
        return;
    }
    
    if (!id && (!password || !confirmPassword)) {
        showToast('Please enter password for new sub-admin', 'danger');
        return;
    }
    
    if (!id && password !== confirmPassword) {
        showToast('Passwords do not match', 'danger');
        return;
    }
    
    if (!id && password.length < 6) {
        showToast('Password must be at least 6 characters', 'danger');
        return;
    }
    
    const roleMap = {
        'admin': 'Admin',
        'manager': 'Manager',
        'support': 'Support',
        'viewer': 'Viewer'
    };
    
    if (id) {
        // Update existing
        const index = subAdminsData.findIndex(s => s.id == id);
        if (index !== -1) {
            subAdminsData[index] = {
                ...subAdminsData[index],
                name: name.trim(),
                email: email.trim(),
                mobile: mobile.trim(),
                role: role,
                roleName: roleMap[role],
                status: status
            };
            showToast('Sub-admin updated successfully', 'success');
        }
    } else {
        // Add new
        const newId = subAdminsData.length + 1;
        subAdminsData.push({
            id: newId,
            name: name.trim(),
            email: email.trim(),
            mobile: mobile.trim(),
            role: role,
            roleName: roleMap[role],
            status: status,
            createdAt: new Date().toISOString().slice(0, 10),
            image: 'https://via.placeholder.com/100'
        });
        showToast('Sub-admin added successfully. Email sent with login credentials.', 'success');
        
        // Simulate email sending
        console.log(`Email sent to ${email} with login credentials`);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('subAdminModal')).hide();
    renderSubAdminsTable();
}

// Delete Sub-Admin (opens confirmation modal)
function deleteSubAdmin(id) {
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = 'subadmin';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// ============================================
// ROLES MANAGEMENT
// ============================================

function renderRolesTable() {
    const tbody = document.getElementById('rolesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    rolesData.forEach(role => {
        const statusClass = role.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = role.status === 'active' ? 'Active' : 'Inactive';
        const permCount = role.permissions.length;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.id}</td>
            <td><strong>${escapeHtml(role.name)}</strong></td>
            <td><span class="badge bg-secondary">${permCount} Permissions</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-warning" onclick="editRole(${role.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteRole(${role.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add Role
function addRole() {
    document.getElementById('roleModalTitle').innerHTML = '<i class="fas fa-lock"></i> Add Role';
    document.getElementById('editRoleId').value = '';
    document.getElementById('roleName').value = '';
    document.getElementById('roleStatus').value = 'active';
    
    // Uncheck all permissions
    document.querySelectorAll('#permissionsContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    new bootstrap.Modal(document.getElementById('roleModal')).show();
}

// Edit Role
function editRole(id) {
    const role = rolesData.find(r => r.id === id);
    if (!role) return;
    
    document.getElementById('roleModalTitle').innerHTML = '<i class="fas fa-lock"></i> Edit Role';
    document.getElementById('editRoleId').value = role.id;
    document.getElementById('roleName').value = role.name;
    document.getElementById('roleStatus').value = role.status;
    
    // Uncheck all permissions first
    document.querySelectorAll('#permissionsContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Check permissions that belong to this role
    role.permissions.forEach(permId => {
        const checkbox = document.getElementById(permId);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    new bootstrap.Modal(document.getElementById('roleModal')).show();
}

// Delete Role
function deleteRole(id) {
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = 'role';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// Save Role
function saveRole() {
    const id = document.getElementById('editRoleId').value;
    const name = document.getElementById('roleName').value;
    const status = document.getElementById('roleStatus').value;
    
    if (!name.trim()) {
        showToast('Please enter role name', 'danger');
        return;
    }
    
    // Check if role name already exists (for new role)
    if (!id && rolesData.some(r => r.name.toLowerCase() === name.trim().toLowerCase())) {
        showToast('Role name already exists', 'danger');
        return;
    }
    
    // Get selected permissions
    const permissions = [];
    document.querySelectorAll('#permissionsContainer input[type="checkbox"]:checked').forEach(cb => {
        permissions.push(cb.id);
    });
    
    if (id) {
        // Update existing
        const index = rolesData.findIndex(r => r.id == id);
        if (index !== -1) {
            rolesData[index] = {
                ...rolesData[index],
                name: name.trim(),
                status: status,
                permissions: permissions
            };
            showToast('Role updated successfully', 'success');
        }
    } else {
        // Add new
        const newId = rolesData.length + 1;
        rolesData.push({
            id: newId,
            name: name.trim(),
            status: status,
            permissions: permissions
        });
        showToast('Role added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('roleModal')).hide();
    renderRolesTable();
}

// ============================================
// DELETE CONFIRMATION
// ============================================

function confirmDelete() {
    const id = parseInt(document.getElementById('deleteItemId').value);
    const type = document.getElementById('deleteItemType').value;
    
    if (type === 'subadmin') {
        // Check if trying to delete the last admin
        const subadmin = subAdminsData.find(s => s.id === id);
        if (subadmin && subadmin.role === 'admin') {
            const adminCount = subAdminsData.filter(s => s.role === 'admin' && s.status === 'active').length;
            if (adminCount <= 1) {
                showToast('Cannot delete the last active admin user', 'danger');
                bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
                return;
            }
        }
        
        const index = subAdminsData.findIndex(s => s.id === id);
        if (index !== -1) {
            subAdminsData.splice(index, 1);
            showToast('Sub-admin deleted successfully', 'success');
            
            // Adjust pagination if needed
            const remainingItems = subAdminsData.filter(s => {
                if (subAdminFilters.search && !s.name.toLowerCase().includes(subAdminFilters.search) &&
                    !s.email.toLowerCase().includes(subAdminFilters.search)) return false;
                if (subAdminFilters.role !== 'all' && s.role !== subAdminFilters.role) return false;
                if (subAdminFilters.status !== 'all' && s.status !== subAdminFilters.status) return false;
                return true;
            }).length;
            
            const totalPages = Math.ceil(remainingItems / subAdminsPerPage);
            if (currentSubAdminPage > totalPages && totalPages > 0) {
                currentSubAdminPage = totalPages;
            } else if (totalPages === 0) {
                currentSubAdminPage = 1;
            }
            
            renderSubAdminsTable();
        }
    } else if (type === 'role') {
        // Check if role is assigned to any sub-admin
        const role = rolesData.find(r => r.id === id);
        if (role) {
            const assignedCount = subAdminsData.filter(s => s.role === role.name.toLowerCase()).length;
            if (assignedCount > 0) {
                showToast(`Cannot delete role "${role.name}" as it is assigned to ${assignedCount} sub-admin(s)`, 'danger');
                bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
                return;
            }
        }
        
        const index = rolesData.findIndex(r => r.id === id);
        if (index !== -1) {
            rolesData.splice(index, 1);
            showToast('Role deleted successfully', 'success');
            renderRolesTable();
        }
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// FILTERS AND RESET
// ============================================

function resetSubAdminFilters() {
    subAdminFilters = { search: '', role: 'all', status: 'all' };
    currentSubAdminPage = 1;
    
    document.getElementById('subAdminSearch').value = '';
    document.getElementById('roleFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    
    renderSubAdminsTable();
}

// ============================================
// SIDEBAR & DARK MODE
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
// IMAGE UPLOAD HANDLER
// ============================================

function setupImageUpload() {
    const uploadBtn = document.getElementById('uploadImageBtn');
    const imageInput = document.getElementById('subAdminImage');
    const imagePreview = document.getElementById('subAdminImagePreview');
    
    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showToast('Please select an image file', 'danger');
                    return;
                }
                
                // Validate file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    showToast('Image size must be less than 2MB', 'danger');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagePreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('subAdminSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            subAdminFilters.search = e.target.value.toLowerCase();
            currentSubAdminPage = 1;
            renderSubAdminsTable();
        });
    }
    
    // Role filter
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function(e) {
            subAdminFilters.role = e.target.value;
            currentSubAdminPage = 1;
            renderSubAdminsTable();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            subAdminFilters.status = e.target.value;
            currentSubAdminPage = 1;
            renderSubAdminsTable();
        });
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSubAdminFilters);
    }
    
    // Add sub-admin button
    const addBtn = document.getElementById('addSubAdminBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addSubAdmin);
    }
    
    // Save sub-admin button
    const saveBtn = document.getElementById('saveSubAdminBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSubAdmin);
    }
    
    // Add role button
    const addRoleBtn = document.getElementById('addRoleBtn');
    if (addRoleBtn) {
        addRoleBtn.addEventListener('click', addRole);
    }
    
    // Save role button
    const saveRoleBtn = document.getElementById('saveRoleBtn');
    if (saveRoleBtn) {
        saveRoleBtn.addEventListener('click', saveRole);
    }
    
    // Confirm delete button
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
    
    // Setup image upload
    setupImageUpload();
}

// ============================================
// MAKE FUNCTIONS GLOBAL FOR ONCLICK
// ============================================
window.viewSubAdmin = viewSubAdmin;
window.editSubAdmin = editSubAdmin;
window.deleteSubAdmin = deleteSubAdmin;
window.changeSubAdminPage = changeSubAdminPage;
window.addRole = addRole;
window.editRole = editRole;
window.deleteRole = deleteRole;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Setup common elements
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    // Initialize tables
    renderSubAdminsTable();
    renderRolesTable();
    
    // Setup event listeners
    setupEventListeners();
});