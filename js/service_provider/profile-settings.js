// js/service_provider/profile-settings.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Profile Settings JS loaded successfully');
    
    // ============================================
    // SIDEBAR TOGGLE (Mobile)
    // ============================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // ============================================
    // TOGGLE PASSWORD VISIBILITY
    // ============================================
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    });
    
    // ============================================
    // PROFILE DATA
    // ============================================
    const profileData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        mobile: '+33 612345678',
        gender: 'Male',
        providerType: 'Individual',
        profileImage: 'https://via.placeholder.com/120',
        // Address Details
        addressLine1: '123 Rue de la Paix',
        addressLine2: 'Apt 4B',
        country: 'France',
        city: 'Paris',
        postalCode: '75001',
        latitude: '48.8566',
        longitude: '2.3522',
        // Company Details
        companyAddressLine1: '456 Avenue des Champs',
        companyAddressLine2: 'Suite 10',
        companyCountry: 'France',
        companyCity: 'Paris',
        companyPostalCode: '75008',
        companyLatitude: '48.8698',
        companyLongitude: '2.3075',
        // Professional Details
        experience: '8 Years',
        skills: 'Plumbing, Pipe Repair, Water Heater Installation, Drain Cleaning',
        providerDescription: 'Experienced plumber with over 8 years of expertise in residential and commercial plumbing services.'
    };
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'Your profile was updated successfully', time: '1 day ago', unread: false }
    ];
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        const sidebarProviderName = document.getElementById('sidebarProviderName');
        const sidebarProviderService = document.getElementById('sidebarProviderService');
        const sidebarProfileImg = document.getElementById('sidebarProfileImg');
        
        if (sidebarProviderName) sidebarProviderName.textContent = profileData.firstName + ' ' + profileData.lastName;
        if (sidebarProviderService) sidebarProviderService.textContent = 'Plumber';
        if (sidebarProfileImg) sidebarProfileImg.src = profileData.profileImage;
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        const topBarUserName = document.getElementById('topBarUserName');
        const topBarUserImg = document.getElementById('topBarUserImg');
        
        if (topBarUserName) topBarUserName.textContent = profileData.firstName + ' ' + profileData.lastName;
        if (topBarUserImg) topBarUserImg.src = profileData.profileImage;
    }
    
    // ============================================
    // POPULATE NOTIFICATIONS
    // ============================================
    function populateNotifications() {
        const notificationCount = document.getElementById('notificationCount');
        const notificationList = document.getElementById('notificationList');
        
        const unreadCount = notifications.filter(n => n.unread).length;
        
        if (notificationCount) {
            notificationCount.textContent = unreadCount;
            if (unreadCount === 0) notificationCount.style.display = 'none';
        }
        
        if (notificationList) {
            let html = '';
            notifications.forEach(notification => {
                html += `
                    <li>
                        <a class="dropdown-item ${notification.unread ? 'fw-bold' : ''}" href="#">
                            <small class="text-muted d-block">${notification.time}</small>
                            ${notification.message}
                        </a>
                    </li>
                `;
            });
            html += '<li><hr class="dropdown-divider"></li>';
            html += '<li><a class="dropdown-item text-center" href="#">View All Notifications</a></li>';
            notificationList.innerHTML = html;
        }
    }
    
    // ============================================
    // POPULATE BASIC DETAILS FORM
    // ============================================
    function populateBasicDetails() {
        document.getElementById('firstName').value = profileData.firstName;
        document.getElementById('lastName').value = profileData.lastName;
        document.getElementById('emailAddress').value = profileData.email;
        document.getElementById('mobileNumber').value = profileData.mobile;
        
        // Set gender
        const genderRadio = document.querySelector(`input[name="gender"][value="${profileData.gender}"]`);
        if (genderRadio) genderRadio.checked = true;
        
        // Set provider type
        const providerRadio = document.querySelector(`input[name="providerType"][value="${profileData.providerType}"]`);
        if (providerRadio) providerRadio.checked = true;
        
        // Set profile image
        document.getElementById('profileImagePreview').src = profileData.profileImage;
    }
    
    // ============================================
    // POPULATE ADDRESS DETAILS FORM
    // ============================================
    function populateAddressDetails() {
        document.getElementById('addressLine1').value = profileData.addressLine1;
        document.getElementById('addressLine2').value = profileData.addressLine2;
        document.getElementById('country').value = profileData.country;
        document.getElementById('city').value = profileData.city;
        document.getElementById('postalCode').value = profileData.postalCode;
        document.getElementById('latitude').value = profileData.latitude;
        document.getElementById('longitude').value = profileData.longitude;
    }
    
    // ============================================
    // POPULATE COMPANY DETAILS FORM
    // ============================================
    function populateCompanyDetails() {
        document.getElementById('companyAddressLine1').value = profileData.companyAddressLine1;
        document.getElementById('companyAddressLine2').value = profileData.companyAddressLine2;
        document.getElementById('companyCountry').value = profileData.companyCountry;
        document.getElementById('companyCity').value = profileData.companyCity;
        document.getElementById('companyPostalCode').value = profileData.companyPostalCode;
        document.getElementById('companyLatitude').value = profileData.companyLatitude;
        document.getElementById('companyLongitude').value = profileData.companyLongitude;
    }
    
    // ============================================
    // POPULATE PROFESSIONAL DETAILS FORM
    // ============================================
    function populateProfessionalDetails() {
        document.getElementById('experience').value = profileData.experience;
        document.getElementById('skills').value = profileData.skills;
        document.getElementById('providerDescription').value = profileData.providerDescription;
    }
    
    // ============================================
    // UPDATE BASIC DETAILS
    // ============================================
    function updateBasicDetails() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('emailAddress').value.trim();
        const mobile = document.getElementById('mobileNumber').value.trim();
        
        if (!firstName || !lastName || !email || !mobile) {
            alert('Please fill in all required fields.');
            return;
        }
        
        profileData.firstName = firstName;
        profileData.lastName = lastName;
        profileData.email = email;
        profileData.mobile = mobile;
        
        const genderRadio = document.querySelector('input[name="gender"]:checked');
        if (genderRadio) profileData.gender = genderRadio.value;
        
        const providerRadio = document.querySelector('input[name="providerType"]:checked');
        if (providerRadio) profileData.providerType = providerRadio.value;
        
        populateSidebarProfile();
        populateTopBar();
        showToast('Basic details updated successfully!', 'success');
    }
    
    // ============================================
    // UPDATE ADDRESS DETAILS
    // ============================================
    function updateAddressDetails() {
        const addressLine1 = document.getElementById('addressLine1').value.trim();
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postalCode').value.trim();
        
        if (!addressLine1 || !country || !city || !postalCode) {
            alert('Please fill in all required fields.');
            return;
        }
        
        profileData.addressLine1 = addressLine1;
        profileData.addressLine2 = document.getElementById('addressLine2').value;
        profileData.country = country;
        profileData.city = city;
        profileData.postalCode = postalCode;
        profileData.latitude = document.getElementById('latitude').value;
        profileData.longitude = document.getElementById('longitude').value;
        
        showToast('Address details updated successfully!', 'success');
    }
    
    // ============================================
    // UPDATE COMPANY DETAILS
    // ============================================
    function updateCompanyDetails() {
        profileData.companyAddressLine1 = document.getElementById('companyAddressLine1').value;
        profileData.companyAddressLine2 = document.getElementById('companyAddressLine2').value;
        profileData.companyCountry = document.getElementById('companyCountry').value;
        profileData.companyCity = document.getElementById('companyCity').value;
        profileData.companyPostalCode = document.getElementById('companyPostalCode').value;
        profileData.companyLatitude = document.getElementById('companyLatitude').value;
        profileData.companyLongitude = document.getElementById('companyLongitude').value;
        
        showToast('Company details updated successfully!', 'success');
    }
    
    // ============================================
    // UPDATE PROFESSIONAL DETAILS
    // ============================================
    function updateProfessionalDetails() {
        profileData.experience = document.getElementById('experience').value;
        profileData.skills = document.getElementById('skills').value;
        profileData.providerDescription = document.getElementById('providerDescription').value;
        
        showToast('Professional details updated successfully!', 'success');
    }
    
    // ============================================
    // UPDATE PASSWORD
    // ============================================
    function updatePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!currentPassword) {
            alert('Please enter your current password.');
            return;
        }
        
        if (!newPassword || newPassword.length < 8) {
            alert('New password must be at least 8 characters long.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
        
        // Reset form
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        showToast('Password updated successfully!', 'success');
    }
    
    // ============================================
    // SHOW TOAST MESSAGE
    // ============================================
    function showToast(message, type) {
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999;';
            document.body.appendChild(toastContainer);
        }
        
        const bgClass = type === 'success' ? 'bg-success' : 'bg-warning text-dark';
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bgClass} border-0`;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${iconClass} me-2"></i>${message}
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
    // EVENT LISTENERS
    // ============================================
    function attachFormEvents() {
        // Profile image upload
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.getElementById('profileImagePreview').src = event.target.result;
                        profileData.profileImage = event.target.result;
                        document.getElementById('sidebarProfileImg').src = event.target.result;
                        document.getElementById('topBarUserImg').src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Update buttons
        document.getElementById('updateBasicDetails').addEventListener('click', updateBasicDetails);
        document.getElementById('updateAddressDetails').addEventListener('click', updateAddressDetails);
        document.getElementById('updateCompanyDetails').addEventListener('click', updateCompanyDetails);
        document.getElementById('updateProfessionalDetails').addEventListener('click', updateProfessionalDetails);
        document.getElementById('updatePasswordBtn').addEventListener('click', updatePassword);
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeProfileSettings() {
        console.log('Initializing profile settings...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateBasicDetails();
        populateAddressDetails();
        populateCompanyDetails();
        populateProfessionalDetails();
        attachFormEvents();
        console.log('Profile settings initialization complete');
    }
    
    initializeProfileSettings();
    
});