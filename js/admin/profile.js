/* ============================================
   Profile Management JavaScript
   For: profile.html
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

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

function formatDateShort(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
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
// USER DATA (Simulated)
// ============================================

let userData = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@alo.com',
    mobile: '+1 234 567 8900',
    role: 'Super Administrator',
    department: 'Administration',
    bio: 'Experienced system administrator with over 5 years of experience in managing on-demand service platforms.',
    joined: '2024-01-15',
    lastLogin: new Date().toISOString(),
    twoFAEnabled: true,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
};

// Activity Log Data
let activityLogs = [
    { datetime: '2024-01-15 10:30:00', type: 'Login', description: 'Successful login from new device', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-15 14:20:00', type: 'Settings', description: 'Updated system settings', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-16 09:15:00', type: 'User Management', description: 'Added new sub-admin', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-16 11:45:00', type: 'Booking', description: 'Cancelled booking #BK1002', ip: '192.168.1.1', status: 'warning' },
    { datetime: '2024-01-17 08:30:00', type: 'Login', description: 'Successful login', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-17 13:00:00', type: 'Payment', description: 'Processed settlement for provider', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-18 10:15:00', type: 'Reports', description: 'Exported monthly report', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-18 16:30:00', type: 'Settings', description: 'Changed email notification settings', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-19 09:00:00', type: 'Login', description: 'Successful login', ip: '192.168.1.1', status: 'success' },
    { datetime: '2024-01-19 14:45:00', type: 'User Management', description: 'Updated service provider details', ip: '192.168.1.1', status: 'success' }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentActivityPage = 1;
const activitiesPerPage = 5;

// ============================================
// PROFILE DETAILS FUNCTIONS
// ============================================

function loadProfileDetails() {
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('email').value = userData.email;
    document.getElementById('mobile').value = userData.mobile;
    document.getElementById('role').value = userData.role;
    document.getElementById('department').value = userData.department;
    document.getElementById('bio').value = userData.bio;
    
    document.getElementById('displayName').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('displayRole').textContent = userData.role;
    document.getElementById('displayJoined').textContent = formatDateShort(userData.joined);
    document.getElementById('displayLastLogin').textContent = formatDateTime(userData.lastLogin);
    document.getElementById('profileImage').src = userData.profileImage;
    
    const twoFAElement = document.getElementById('display2FA');
    if (twoFAElement) {
        twoFAElement.textContent = userData.twoFAEnabled ? 'Enabled' : 'Disabled';
        twoFAElement.className = userData.twoFAEnabled ? 'badge bg-success' : 'badge bg-secondary';
    }
}

function saveProfileDetails(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const department = document.getElementById('department').value;
    const bio = document.getElementById('bio').value;
    
    if (!firstName || !lastName || !email) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (!email.includes('@')) {
        showToast('Please enter a valid email address', 'danger');
        return;
    }
    
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.email = email;
    userData.mobile = mobile;
    userData.department = department;
    userData.bio = bio;
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update display
    document.getElementById('displayName').textContent = `${firstName} ${lastName}`;
    
    showToast('Profile updated successfully', 'success');
    
    // Add to activity log
    addActivity('Profile', 'Updated profile information', 'success');
}

function cancelChanges() {
    loadProfileDetails();
    showToast('Changes cancelled', 'info');
}

// ============================================
// PROFILE IMAGE UPLOAD
// ============================================

function setupImageUpload() {
    const uploadBtn = document.getElementById('uploadProfileImageBtn');
    const imageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');
    
    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        profileImage.src = event.target.result;
                        userData.profileImage = event.target.result;
                        localStorage.setItem('userData', JSON.stringify(userData));
                        showToast('Profile picture updated successfully', 'success');
                        addActivity('Profile', 'Changed profile picture', 'success');
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
// PASSWORD FUNCTIONS
// ============================================

function calculatePasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    
    let width = (strength / 5) * 100;
    let color = '#dc3545';
    let message = 'Weak';
    
    if (strength >= 3) {
        color = '#ffc107';
        message = 'Medium';
    }
    if (strength >= 4) {
        color = '#28a745';
        message = 'Strong';
    }
    if (strength >= 5) {
        color = '#17a2b8';
        message = 'Very Strong';
    }
    
    if (strengthBar) {
        strengthBar.style.width = width + '%';
        strengthBar.style.backgroundColor = color;
    }
    if (strengthText) {
        strengthText.textContent = message + ' password';
        strengthText.style.color = color;
    }
    
    return strength;
}

function validatePassword(password) {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('One special character');
    return errors;
}

function setupPasswordValidation() {
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const matchError = document.getElementById('passwordMatchError');
    
    if (newPassword) {
        newPassword.addEventListener('input', function() {
            calculatePasswordStrength(this.value);
            if (confirmPassword.value) {
                if (this.value === confirmPassword.value) {
                    matchError.classList.add('d-none');
                } else {
                    matchError.classList.remove('d-none');
                }
            }
        });
    }
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (newPassword.value === this.value) {
                matchError.classList.add('d-none');
            } else {
                matchError.classList.remove('d-none');
            }
        });
    }
}

function setupPasswordToggles() {
    const toggleCurrent = document.getElementById('toggleCurrentPassword');
    const toggleNew = document.getElementById('toggleNewPassword');
    const toggleConfirm = document.getElementById('toggleConfirmPassword');
    
    if (toggleCurrent) {
        toggleCurrent.addEventListener('click', function() {
            const input = document.getElementById('currentPassword');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    if (toggleNew) {
        toggleNew.addEventListener('click', function() {
            const input = document.getElementById('newPassword');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    if (toggleConfirm) {
        toggleConfirm.addEventListener('click', function() {
            const input = document.getElementById('confirmPassword');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

function changePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword) {
        showToast('Please enter your current password', 'danger');
        return;
    }
    
    // Simulate current password check
    if (currentPassword !== 'admin123') {
        showToast('Current password is incorrect', 'danger');
        return;
    }
    
    if (!newPassword || !confirmPassword) {
        showToast('Please enter new password', 'danger');
        return;
    }
    
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
        showToast(`Password requirements: ${errors.join(', ')}`, 'danger');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'danger');
        return;
    }
    
    if (newPassword === currentPassword) {
        showToast('New password cannot be the same as current password', 'danger');
        return;
    }
    
    showToast('Password changed successfully', 'success');
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Reset strength bar
    const strengthBar = document.getElementById('passwordStrengthBar');
    if (strengthBar) strengthBar.style.width = '0%';
    
    // Add to activity log
    addActivity('Security', 'Changed account password', 'success');
}

// ============================================
// ACTIVITY LOG FUNCTIONS
// ============================================

function addActivity(type, description, status) {
    const newActivity = {
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        type: type,
        description: description,
        ip: '127.0.0.1',
        status: status
    };
    activityLogs.unshift(newActivity);
    
    // Keep only last 50 activities
    if (activityLogs.length > 50) activityLogs.pop();
    
    // Save to localStorage
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs));
    
    // Re-render if on activity tab
    if (document.getElementById('activity').classList.contains('active')) {
        renderActivityLog();
    }
}

function renderActivityLog() {
    const tbody = document.getElementById('activityTableBody');
    if (!tbody) return;
    
    const start = (currentActivityPage - 1) * activitiesPerPage;
    const pageData = activityLogs.slice(start, start + activitiesPerPage);
    const totalPages = Math.ceil(activityLogs.length / activitiesPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-5">No activity records found</td></tr>';
        renderActivityPagination(totalPages);
        return;
    }
    
    pageData.forEach(activity => {
        let statusClass = '';
        let statusText = '';
        
        switch(activity.status) {
            case 'success':
                statusClass = 'status-success';
                statusText = 'Success';
                break;
            case 'warning':
                statusClass = 'status-warning';
                statusText = 'Warning';
                break;
            case 'danger':
                statusClass = 'status-danger';
                statusText = 'Failed';
                break;
            default:
                statusClass = 'status-info';
                statusText = activity.status;
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDateTime(activity.datetime)}</td>
            <td><strong>${escapeHtml(activity.type)}</strong></td>
            <td>${escapeHtml(activity.description)}</td>
            <td><code>${activity.ip}</code></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    renderActivityPagination(totalPages);
}

function renderActivityPagination(totalPages) {
    const pagination = document.getElementById('activityPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentActivityPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeActivityPage(${currentActivityPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<li class="page-item ${currentActivityPage === i ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changeActivityPage(${i}); return false;">${i}</a>
        </li>`;
    }
    
    pagination.innerHTML += `<li class="page-item ${currentActivityPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeActivityPage(${currentActivityPage + 1}); return false;">Next</a>
    </li>`;
}

function changeActivityPage(page) {
    currentActivityPage = page;
    renderActivityLog();
}

function exportActivityLog() {
    let csvContent = "Date & Time,Activity Type,Description,IP Address,Status\n";
    
    activityLogs.forEach(activity => {
        csvContent += `"${activity.datetime}","${activity.type}","${activity.description}","${activity.ip}","${activity.status}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity_log_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Activity log exported successfully', 'success');
}

// ============================================
// PREFERENCES FUNCTIONS
// ============================================

function loadPreferences() {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        if (document.getElementById('emailNewUser')) document.getElementById('emailNewUser').checked = prefs.emailNewUser !== false;
        if (document.getElementById('emailNewBooking')) document.getElementById('emailNewBooking').checked = prefs.emailNewBooking !== false;
        if (document.getElementById('emailPaymentReceived')) document.getElementById('emailPaymentReceived').checked = prefs.emailPaymentReceived !== false;
        if (document.getElementById('emailSystemAlert')) document.getElementById('emailSystemAlert').checked = prefs.emailSystemAlert || false;
        if (document.getElementById('pushNewBooking')) document.getElementById('pushNewBooking').checked = prefs.pushNewBooking !== false;
        if (document.getElementById('pushOrderUpdate')) document.getElementById('pushOrderUpdate').checked = prefs.pushOrderUpdate !== false;
        if (document.getElementById('pushPromotions')) document.getElementById('pushPromotions').checked = prefs.pushPromotions || false;
        if (document.getElementById('dashboardLayout')) document.getElementById('dashboardLayout').value = prefs.dashboardLayout || 'grid';
        if (document.getElementById('itemsPerPage')) document.getElementById('itemsPerPage').value = prefs.itemsPerPage || '25';
        if (document.getElementById('compactSidebar')) document.getElementById('compactSidebar').checked = prefs.compactSidebar || false;
    } else {
        // Default values
        if (document.getElementById('emailNewUser')) document.getElementById('emailNewUser').checked = true;
        if (document.getElementById('emailNewBooking')) document.getElementById('emailNewBooking').checked = true;
        if (document.getElementById('emailPaymentReceived')) document.getElementById('emailPaymentReceived').checked = true;
        if (document.getElementById('emailSystemAlert')) document.getElementById('emailSystemAlert').checked = false;
        if (document.getElementById('pushNewBooking')) document.getElementById('pushNewBooking').checked = true;
        if (document.getElementById('pushOrderUpdate')) document.getElementById('pushOrderUpdate').checked = true;
        if (document.getElementById('pushPromotions')) document.getElementById('pushPromotions').checked = false;
        if (document.getElementById('dashboardLayout')) document.getElementById('dashboardLayout').value = 'grid';
        if (document.getElementById('itemsPerPage')) document.getElementById('itemsPerPage').value = '25';
        if (document.getElementById('compactSidebar')) document.getElementById('compactSidebar').checked = false;
    }
}

function savePreferences(e) {
    e.preventDefault();
    
    const preferences = {
        emailNewUser: document.getElementById('emailNewUser').checked,
        emailNewBooking: document.getElementById('emailNewBooking').checked,
        emailPaymentReceived: document.getElementById('emailPaymentReceived').checked,
        emailSystemAlert: document.getElementById('emailSystemAlert').checked,
        pushNewBooking: document.getElementById('pushNewBooking').checked,
        pushOrderUpdate: document.getElementById('pushOrderUpdate').checked,
        pushPromotions: document.getElementById('pushPromotions').checked,
        dashboardLayout: document.getElementById('dashboardLayout').value,
        itemsPerPage: document.getElementById('itemsPerPage').value,
        compactSidebar: document.getElementById('compactSidebar').checked
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    showToast('Preferences saved successfully', 'success');
    addActivity('Preferences', 'Updated notification and display preferences', 'success');
}

function resetPreferences() {
    if (confirm('Are you sure you want to reset all preferences to default?')) {
        localStorage.removeItem('userPreferences');
        loadPreferences();
        showToast('Preferences reset to default', 'success');
        addActivity('Preferences', 'Reset preferences to default', 'success');
    }
}

// ============================================
// DELETE ACCOUNT
// ============================================

function setupDeleteAccount() {
    const confirmDeleteBtn = document.getElementById('confirmDeleteAccountBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const password = document.getElementById('confirmDeletePassword').value;
            
            if (!password) {
                showToast('Please enter your password to confirm', 'danger');
                return;
            }
            
            if (password !== 'admin123') {
                showToast('Incorrect password', 'danger');
                return;
            }
            
            if (confirm('WARNING: This action is irreversible. Are you absolutely sure you want to delete your account?')) {
                showToast('Account deletion request submitted', 'info');
                // In a real app, this would call an API
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            }
        });
    }
}

// ============================================
// DARK MODE & SIDEBAR FUNCTIONS
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
// LOAD SAVED USER DATA
// ============================================

function loadSavedUserData() {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
        const saved = JSON.parse(savedUser);
        userData = { ...userData, ...saved };
    }
    
    const savedLogs = localStorage.getItem('activityLogs');
    if (savedLogs) {
        const logs = JSON.parse(savedLogs);
        if (logs && logs.length > 0) {
            activityLogs = logs;
        }
    }
}

// ============================================
// MAKE FUNCTIONS GLOBAL
// ============================================
window.changeActivityPage = changeActivityPage;

// ============================================
// FORM SUBMIT HANDLERS
// ============================================

function setupFormSubmits() {
    const profileForm = document.getElementById('profileDetailsForm');
    if (profileForm) profileForm.addEventListener('submit', saveProfileDetails);
    
    const passwordForm = document.getElementById('changePasswordForm');
    if (passwordForm) passwordForm.addEventListener('submit', changePassword);
    
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) preferencesForm.addEventListener('submit', savePreferences);
    
    const cancelBtn = document.getElementById('cancelChangesBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', cancelChanges);
    
    const resetPrefsBtn = document.getElementById('resetPreferencesBtn');
    if (resetPrefsBtn) resetPrefsBtn.addEventListener('click', resetPreferences);
    
    const exportBtn = document.getElementById('exportActivityBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportActivityLog);
}

// ============================================
// TAB ACTIVITY RENDER
// ============================================

function setupTabListener() {
    const activityTab = document.getElementById('activity-tab');
    if (activityTab) {
        activityTab.addEventListener('shown.bs.tab', function() {
            renderActivityLog();
        });
    }
}

// ============================================
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    loadSavedUserData();
    
    // Setup UI components
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    // Setup profile
    loadProfileDetails();
    setupImageUpload();
    
    // Setup password
    setupPasswordValidation();
    setupPasswordToggles();
    
    // Setup preferences
    loadPreferences();
    
    // Setup activity log
    renderActivityLog();
    
    // Setup event listeners
    setupFormSubmits();
    setupTabListener();
    setupDeleteAccount();
    
    console.log('Profile page initialized');
});