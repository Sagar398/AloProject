/* ============================================
   System Settings JavaScript
   For: system-settings.html
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
// GENERAL SETTINGS FUNCTIONS
// ============================================

function saveGeneralSettings(e) {
    e.preventDefault();
    
    const settings = {
        websiteName: document.getElementById('websiteName').value,
        websiteUrl: document.getElementById('websiteUrl').value,
        defaultLanguage: document.getElementById('defaultLanguage').value,
        defaultCurrency: document.getElementById('defaultCurrency').value,
        timezone: document.getElementById('timezone').value,
        dateFormat: document.getElementById('dateFormat').value,
        maintenanceMode: document.getElementById('maintenanceMode').checked
    };
    
    // Validate required fields
    if (!settings.websiteName || !settings.websiteUrl) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    // Save to localStorage for demo
    localStorage.setItem('generalSettings', JSON.stringify(settings));
    
    showToast('General settings saved successfully', 'success');
    console.log('General Settings saved:', settings);
}

function loadGeneralSettings() {
    const saved = localStorage.getItem('generalSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('websiteName')) document.getElementById('websiteName').value = settings.websiteName;
        if (document.getElementById('websiteUrl')) document.getElementById('websiteUrl').value = settings.websiteUrl;
        if (document.getElementById('defaultLanguage')) document.getElementById('defaultLanguage').value = settings.defaultLanguage;
        if (document.getElementById('defaultCurrency')) document.getElementById('defaultCurrency').value = settings.defaultCurrency;
        if (document.getElementById('timezone')) document.getElementById('timezone').value = settings.timezone;
        if (document.getElementById('dateFormat')) document.getElementById('dateFormat').value = settings.dateFormat;
        if (document.getElementById('maintenanceMode')) document.getElementById('maintenanceMode').checked = settings.maintenanceMode;
    }
}

// ============================================
// BRANDING SETTINGS FUNCTIONS
// ============================================

function saveBrandingSettings(e) {
    e.preventDefault();
    
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    
    // Apply colors to CSS variables for demo
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    const settings = {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        logo: document.getElementById('logoPreview').src,
        favicon: document.getElementById('faviconPreview').src
    };
    
    localStorage.setItem('brandingSettings', JSON.stringify(settings));
    
    showToast('Branding settings saved successfully', 'success');
    console.log('Branding Settings saved:', settings);
}

function loadBrandingSettings() {
    const saved = localStorage.getItem('brandingSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('primaryColor')) document.getElementById('primaryColor').value = settings.primaryColor;
        if (document.getElementById('primaryColorHex')) document.getElementById('primaryColorHex').value = settings.primaryColor;
        if (document.getElementById('secondaryColor')) document.getElementById('secondaryColor').value = settings.secondaryColor;
        if (document.getElementById('secondaryColorHex')) document.getElementById('secondaryColorHex').value = settings.secondaryColor;
        if (document.getElementById('logoPreview') && settings.logo) document.getElementById('logoPreview').src = settings.logo;
        if (document.getElementById('faviconPreview') && settings.favicon) document.getElementById('faviconPreview').src = settings.favicon;
    }
}

function setupColorSync() {
    const primaryColor = document.getElementById('primaryColor');
    const primaryColorHex = document.getElementById('primaryColorHex');
    const secondaryColor = document.getElementById('secondaryColor');
    const secondaryColorHex = document.getElementById('secondaryColorHex');
    
    if (primaryColor && primaryColorHex) {
        primaryColor.addEventListener('input', function() {
            primaryColorHex.value = this.value;
        });
        primaryColorHex.addEventListener('input', function() {
            primaryColor.value = this.value;
        });
    }
    
    if (secondaryColor && secondaryColorHex) {
        secondaryColor.addEventListener('input', function() {
            secondaryColorHex.value = this.value;
        });
        secondaryColorHex.addEventListener('input', function() {
            secondaryColor.value = this.value;
        });
    }
}

function setupImageUpload() {
    // Logo upload
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
    const logoFile = document.getElementById('logoFile');
    const logoPreview = document.getElementById('logoPreview');
    
    if (uploadLogoBtn && logoFile) {
        uploadLogoBtn.addEventListener('click', () => logoFile.click());
        logoFile.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        logoPreview.src = event.target.result;
                        showToast('Logo uploaded successfully', 'success');
                    };
                    reader.readAsDataURL(file);
                } else {
                    showToast('Please select an image file', 'danger');
                }
            }
        });
    }
    
    // Favicon upload
    const uploadFaviconBtn = document.getElementById('uploadFaviconBtn');
    const faviconFile = document.getElementById('faviconFile');
    const faviconPreview = document.getElementById('faviconPreview');
    
    if (uploadFaviconBtn && faviconFile) {
        uploadFaviconBtn.addEventListener('click', () => faviconFile.click());
        faviconFile.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        faviconPreview.src = event.target.result;
                        showToast('Favicon uploaded successfully', 'success');
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
// EMAIL SETTINGS FUNCTIONS
// ============================================

function saveEmailSettings(e) {
    e.preventDefault();
    
    const settings = {
        smtpHost: document.getElementById('smtpHost').value,
        smtpPort: document.getElementById('smtpPort').value,
        smtpUsername: document.getElementById('smtpUsername').value,
        smtpPassword: document.getElementById('smtpPassword').value,
        fromEmail: document.getElementById('fromEmail').value,
        fromName: document.getElementById('fromName').value,
        enableSSL: document.getElementById('enableSSL').checked
    };
    
    if (!settings.smtpHost || !settings.smtpPort || !settings.fromEmail) {
        showToast('Please fill all required SMTP fields', 'danger');
        return;
    }
    
    localStorage.setItem('emailSettings', JSON.stringify(settings));
    
    showToast('Email settings saved successfully', 'success');
    console.log('Email Settings saved:', settings);
}

function loadEmailSettings() {
    const saved = localStorage.getItem('emailSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('smtpHost')) document.getElementById('smtpHost').value = settings.smtpHost;
        if (document.getElementById('smtpPort')) document.getElementById('smtpPort').value = settings.smtpPort;
        if (document.getElementById('smtpUsername')) document.getElementById('smtpUsername').value = settings.smtpUsername;
        if (document.getElementById('smtpPassword')) document.getElementById('smtpPassword').value = settings.smtpPassword;
        if (document.getElementById('fromEmail')) document.getElementById('fromEmail').value = settings.fromEmail;
        if (document.getElementById('fromName')) document.getElementById('fromName').value = settings.fromName;
        if (document.getElementById('enableSSL')) document.getElementById('enableSSL').checked = settings.enableSSL;
    }
}

function sendTestEmail() {
    const toEmail = prompt('Enter email address to send test email:', 'admin@alo.com');
    
    if (toEmail) {
        showToast(`Sending test email to ${toEmail}...`, 'info');
        
        // Simulate email sending
        setTimeout(() => {
            showToast(`Test email sent successfully to ${toEmail}`, 'success');
            console.log(`Test email sent to: ${toEmail}`);
        }, 1500);
    }
}

// ============================================
// PAYMENT SETTINGS FUNCTIONS
// ============================================

function savePaymentSettings(e) {
    e.preventDefault();
    
    const settings = {
        defaultCommission: document.getElementById('defaultCommission').value,
        minCommission: document.getElementById('minCommission').value,
        maxCommission: document.getElementById('maxCommission').value,
        enableCardPayment: document.getElementById('enableCardPayment').checked,
        enableMoMo: document.getElementById('enableMoMo').checked,
        enableOM: document.getElementById('enableOM').checked,
        enableBankTransfer: document.getElementById('enableBankTransfer').checked,
        stripeSecretKey: document.getElementById('stripeSecretKey').value,
        stripePublishableKey: document.getElementById('stripePublishableKey').value,
        momoApiKey: document.getElementById('momoApiKey').value,
        momoApiSecret: document.getElementById('momoApiSecret').value,
        omMerchantId: document.getElementById('omMerchantId').value,
        omApiKey: document.getElementById('omApiKey').value
    };
    
    localStorage.setItem('paymentSettings', JSON.stringify(settings));
    
    showToast('Payment settings saved successfully', 'success');
    console.log('Payment Settings saved:', settings);
}

function loadPaymentSettings() {
    const saved = localStorage.getItem('paymentSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('defaultCommission')) document.getElementById('defaultCommission').value = settings.defaultCommission;
        if (document.getElementById('minCommission')) document.getElementById('minCommission').value = settings.minCommission;
        if (document.getElementById('maxCommission')) document.getElementById('maxCommission').value = settings.maxCommission;
        if (document.getElementById('enableCardPayment')) document.getElementById('enableCardPayment').checked = settings.enableCardPayment;
        if (document.getElementById('enableMoMo')) document.getElementById('enableMoMo').checked = settings.enableMoMo;
        if (document.getElementById('enableOM')) document.getElementById('enableOM').checked = settings.enableOM;
        if (document.getElementById('enableBankTransfer')) document.getElementById('enableBankTransfer').checked = settings.enableBankTransfer;
        if (document.getElementById('stripeSecretKey')) document.getElementById('stripeSecretKey').value = settings.stripeSecretKey;
        if (document.getElementById('stripePublishableKey')) document.getElementById('stripePublishableKey').value = settings.stripePublishableKey;
        if (document.getElementById('momoApiKey')) document.getElementById('momoApiKey').value = settings.momoApiKey;
        if (document.getElementById('momoApiSecret')) document.getElementById('momoApiSecret').value = settings.momoApiSecret;
        if (document.getElementById('omMerchantId')) document.getElementById('omMerchantId').value = settings.omMerchantId;
        if (document.getElementById('omApiKey')) document.getElementById('omApiKey').value = settings.omApiKey;
    }
}

function setupPaymentToggle() {
    const enableCard = document.getElementById('enableCardPayment');
    const cardSettings = document.getElementById('cardPaymentSettings');
    
    if (enableCard && cardSettings) {
        enableCard.addEventListener('change', function() {
            cardSettings.style.display = this.checked ? 'block' : 'none';
        });
        cardSettings.style.display = enableCard.checked ? 'block' : 'none';
    }
    
    const enableMoMo = document.getElementById('enableMoMo');
    const momoSettings = document.getElementById('momoSettings');
    
    if (enableMoMo && momoSettings) {
        enableMoMo.addEventListener('change', function() {
            momoSettings.style.display = this.checked ? 'block' : 'none';
        });
        momoSettings.style.display = enableMoMo.checked ? 'block' : 'none';
    }
    
    const enableOM = document.getElementById('enableOM');
    const omSettings = document.getElementById('omSettings');
    
    if (enableOM && omSettings) {
        enableOM.addEventListener('change', function() {
            omSettings.style.display = this.checked ? 'block' : 'none';
        });
        omSettings.style.display = enableOM.checked ? 'block' : 'none';
    }
}

// ============================================
// NOTIFICATION SETTINGS FUNCTIONS
// ============================================

function saveNotificationSettings(e) {
    e.preventDefault();
    
    const settings = {
        emailNewBooking: document.getElementById('emailNewBooking').checked,
        emailBookingStatus: document.getElementById('emailBookingStatus').checked,
        emailOrderConfirmation: document.getElementById('emailOrderConfirmation').checked,
        emailPaymentReceipt: document.getElementById('emailPaymentReceipt').checked,
        emailPromotions: document.getElementById('emailPromotions').checked,
        emailNewsletter: document.getElementById('emailNewsletter').checked,
        pushNewBooking: document.getElementById('pushNewBooking').checked,
        pushOrderUpdate: document.getElementById('pushOrderUpdate').checked,
        pushPaymentAlert: document.getElementById('pushPaymentAlert').checked,
        pushPromotions: document.getElementById('pushPromotions').checked
    };
    
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    showToast('Notification settings saved successfully', 'success');
    console.log('Notification Settings saved:', settings);
}

function loadNotificationSettings() {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('emailNewBooking')) document.getElementById('emailNewBooking').checked = settings.emailNewBooking;
        if (document.getElementById('emailBookingStatus')) document.getElementById('emailBookingStatus').checked = settings.emailBookingStatus;
        if (document.getElementById('emailOrderConfirmation')) document.getElementById('emailOrderConfirmation').checked = settings.emailOrderConfirmation;
        if (document.getElementById('emailPaymentReceipt')) document.getElementById('emailPaymentReceipt').checked = settings.emailPaymentReceipt;
        if (document.getElementById('emailPromotions')) document.getElementById('emailPromotions').checked = settings.emailPromotions;
        if (document.getElementById('emailNewsletter')) document.getElementById('emailNewsletter').checked = settings.emailNewsletter;
        if (document.getElementById('pushNewBooking')) document.getElementById('pushNewBooking').checked = settings.pushNewBooking;
        if (document.getElementById('pushOrderUpdate')) document.getElementById('pushOrderUpdate').checked = settings.pushOrderUpdate;
        if (document.getElementById('pushPaymentAlert')) document.getElementById('pushPaymentAlert').checked = settings.pushPaymentAlert;
        if (document.getElementById('pushPromotions')) document.getElementById('pushPromotions').checked = settings.pushPromotions;
    }
}

// ============================================
// SECURITY SETTINGS FUNCTIONS
// ============================================

function saveSecuritySettings(e) {
    e.preventDefault();
    
    const settings = {
        sessionTimeout: document.getElementById('sessionTimeout').value,
        maxLoginAttempts: document.getElementById('maxLoginAttempts').value,
        twoFactorAuth: document.getElementById('twoFactorAuth').checked,
        captchaEnabled: document.getElementById('captchaEnabled').checked,
        recaptchaSiteKey: document.getElementById('recaptchaSiteKey').value,
        recaptchaSecretKey: document.getElementById('recaptchaSecretKey').value
    };
    
    if (!settings.sessionTimeout || !settings.maxLoginAttempts) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    localStorage.setItem('securitySettings', JSON.stringify(settings));
    
    showToast('Security settings saved successfully', 'success');
    console.log('Security Settings saved:', settings);
}

function loadSecuritySettings() {
    const saved = localStorage.getItem('securitySettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('sessionTimeout')) document.getElementById('sessionTimeout').value = settings.sessionTimeout;
        if (document.getElementById('maxLoginAttempts')) document.getElementById('maxLoginAttempts').value = settings.maxLoginAttempts;
        if (document.getElementById('twoFactorAuth')) document.getElementById('twoFactorAuth').checked = settings.twoFactorAuth;
        if (document.getElementById('captchaEnabled')) document.getElementById('captchaEnabled').checked = settings.captchaEnabled;
        if (document.getElementById('recaptchaSiteKey')) document.getElementById('recaptchaSiteKey').value = settings.recaptchaSiteKey || '';
        if (document.getElementById('recaptchaSecretKey')) document.getElementById('recaptchaSecretKey').value = settings.recaptchaSecretKey || '';
    }
}

// ============================================
// BACKUP FUNCTIONS
// ============================================

function createBackup() {
    showToast('Creating database backup...', 'info');
    
    // Simulate backup creation
    setTimeout(() => {
        const now = new Date();
        const backupName = `alo_backup_${now.toISOString().slice(0, 19).replace(/:/g, '_')}.sql`;
        const backupSize = (Math.random() * 10 + 40).toFixed(1);
        
        // Add to backup table
        const backupTableBody = document.getElementById('backupTableBody');
        if (backupTableBody) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${backupName}</td>
                <td>${backupSize} MB</td>
                <td>${now.toLocaleString()}</td>
                <td><button class="btn btn-sm btn-outline-primary download-backup"><i class="fas fa-download"></i> Download</button></td>
            `;
            backupTableBody.insertBefore(row, backupTableBody.firstChild);
            
            // Add download event listener
            row.querySelector('.download-backup').addEventListener('click', () => downloadBackup(backupName));
        }
        
        // Save backup info to localStorage
        const backups = JSON.parse(localStorage.getItem('backups') || '[]');
        backups.unshift({ name: backupName, size: backupSize, date: now.toISOString() });
        localStorage.setItem('backups', JSON.stringify(backups.slice(0, 10)));
        
        showToast(`Backup created successfully: ${backupName}`, 'success');
    }, 2000);
}

function downloadBackup(backupName) {
    // Create dummy file for download
    const content = `-- Alo Database Backup
-- Generated: ${new Date().toLocaleString()}
-- This is a sample backup file

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Sample data
INSERT INTO users VALUES (1, 'Admin User', 'admin@alo.com');
INSERT INTO users VALUES (2, 'Test User', 'test@alo.com');
`;
    
    const blob = new Blob([content], { type: 'application/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = backupName;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast(`Downloading ${backupName}`, 'success');
}

function restoreBackup() {
    const restoreFile = document.getElementById('restoreFile');
    if (!restoreFile.files || restoreFile.files.length === 0) {
        showToast('Please select a backup file to restore', 'danger');
        return;
    }
    
    const file = restoreFile.files[0];
    showToast(`Restoring from ${file.name}...`, 'info');
    
    // Simulate restore process
    setTimeout(() => {
        showToast(`Database restored successfully from ${file.name}`, 'success');
        console.log(`Restored from: ${file.name}`);
    }, 3000);
}

function clearCache() {
    if (confirm('Are you sure you want to clear the system cache? This may temporarily slow down the system.')) {
        showToast('Clearing system cache...', 'info');
        
        setTimeout(() => {
            showToast('System cache cleared successfully', 'success');
            console.log('System cache cleared');
        }, 1500);
    }
}

function loadBackupHistory() {
    const backups = JSON.parse(localStorage.getItem('backups') || '[]');
    const backupTableBody = document.getElementById('backupTableBody');
    
    if (backupTableBody && backups.length > 0) {
        backupTableBody.innerHTML = '';
        backups.forEach(backup => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${backup.name}</td>
                <td>${backup.size} MB</td>
                <td>${new Date(backup.date).toLocaleString()}</td>
                <td><button class="btn btn-sm btn-outline-primary download-backup" data-name="${backup.name}"><i class="fas fa-download"></i> Download</button></td>
            `;
            backupTableBody.appendChild(row);
            
            row.querySelector('.download-backup').addEventListener('click', () => downloadBackup(backup.name));
        });
    }
}

function setupAutoBackup() {
    const autoBackup = document.getElementById('autoBackup');
    const backupFrequency = document.getElementById('backupFrequency');
    
    if (autoBackup && backupFrequency) {
        // Load saved auto backup settings
        const savedAutoBackup = localStorage.getItem('autoBackupEnabled') === 'true';
        const savedFrequency = localStorage.getItem('backupFrequency');
        
        autoBackup.checked = savedAutoBackup;
        if (savedFrequency) backupFrequency.value = savedFrequency;
        
        // Save settings when changed
        autoBackup.addEventListener('change', function() {
            localStorage.setItem('autoBackupEnabled', this.checked);
            if (this.checked) {
                showToast(`Automatic ${backupFrequency.value} backups enabled`, 'success');
            } else {
                showToast('Automatic backups disabled', 'info');
            }
        });
        
        backupFrequency.addEventListener('change', function() {
            localStorage.setItem('backupFrequency', this.value);
            if (autoBackup.checked) {
                showToast(`Backup frequency changed to ${this.value}`, 'success');
            }
        });
    }
}

// ============================================
// FORM SUBMIT HANDLERS
// ============================================

function setupFormSubmits() {
    const generalForm = document.getElementById('generalSettingsForm');
    if (generalForm) generalForm.addEventListener('submit', saveGeneralSettings);
    
    const brandingForm = document.getElementById('brandingSettingsForm');
    if (brandingForm) brandingForm.addEventListener('submit', saveBrandingSettings);
    
    const emailForm = document.getElementById('emailSettingsForm');
    if (emailForm) emailForm.addEventListener('submit', saveEmailSettings);
    
    const paymentForm = document.getElementById('paymentSettingsForm');
    if (paymentForm) paymentForm.addEventListener('submit', savePaymentSettings);
    
    const notificationForm = document.getElementById('notificationSettingsForm');
    if (notificationForm) notificationForm.addEventListener('submit', saveNotificationSettings);
    
    const securityForm = document.getElementById('securitySettingsForm');
    if (securityForm) securityForm.addEventListener('submit', saveSecuritySettings);
}

// ============================================
// BUTTON EVENT LISTENERS
// ============================================

function setupButtonListeners() {
    const testEmailBtn = document.getElementById('testEmailBtn');
    if (testEmailBtn) testEmailBtn.addEventListener('click', sendTestEmail);
    
    const createBackupBtn = document.getElementById('createBackupBtn');
    if (createBackupBtn) createBackupBtn.addEventListener('click', createBackup);
    
    const restoreBackupBtn = document.getElementById('restoreBackupBtn');
    if (restoreBackupBtn) restoreBackupBtn.addEventListener('click', restoreBackup);
    
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    if (clearCacheBtn) clearCacheBtn.addEventListener('click', clearCache);
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
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Setup UI components
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    // Load all saved settings
    loadGeneralSettings();
    loadBrandingSettings();
    loadEmailSettings();
    loadPaymentSettings();
    loadNotificationSettings();
    loadSecuritySettings();
    loadBackupHistory();
    
    // Setup event listeners
    setupColorSync();
    setupImageUpload();
    setupPaymentToggle();
    setupAutoBackup();
    setupFormSubmits();
    setupButtonListeners();
    
    console.log('System Settings page initialized');
});