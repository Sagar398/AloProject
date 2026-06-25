// js/service-provider-register.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- DOM Element References ---
    const registrationForm = document.getElementById('registrationForm');
    const progressBar = document.getElementById('progressBar');
    const stepContents = document.querySelectorAll('.step-content');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const individualRadio = document.getElementById('individual');
    const companyRadio = document.getElementById('company');
    const companyAddressSection = document.getElementById('companyAddressSection');
    const profileImageInput = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');
    
    let currentStep = 1;
    const totalSteps = 4;
    
    // --- Toggle Password Visibility ---
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
    
    // --- Profile Image Preview ---
    if (profileImageInput && profilePreview) {
        profileImageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // --- Toggle Company Address Section ---
    function toggleCompanyAddress() {
        if (companyRadio && companyRadio.checked) {
            companyAddressSection.style.display = 'block';
        } else {
            companyAddressSection.style.display = 'none';
        }
    }
    
    if (individualRadio && companyRadio) {
        individualRadio.addEventListener('change', toggleCompanyAddress);
        companyRadio.addEventListener('change', toggleCompanyAddress);
    }
    
    // --- Update Step Indicators and Progress Bar ---
    function updateStepUI(step) {
        // Update progress bar
        const progressWidth = (step / totalSteps) * 100;
        progressBar.style.width = progressWidth + '%';
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber === step) {
                indicator.classList.add('active');
            } else if (stepNumber < step) {
                indicator.classList.add('completed');
            }
        });
    }
    
    // --- Show Step ---
    function showStep(step) {
        stepContents.forEach((content, index) => {
            if (index + 1 === step) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
        
        updateStepUI(step);
        currentStep = step;
        
        // Scroll to top of form
        document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth' });
    }
    
    // --- Validate Current Step ---
    function validateStep(step) {
        let isValid = true;
        
        switch(step) {
            case 1:
                // Validate Basic Details
                const serviceProviderName = document.getElementById('serviceProviderName');
                const emailAddress = document.getElementById('emailAddress');
                const mobileNumber = document.getElementById('mobileNumber');
                
                // Reset validation
                [serviceProviderName, emailAddress, mobileNumber].forEach(field => {
                    field.classList.remove('is-invalid');
                });
                
                if (!serviceProviderName.value.trim()) {
                    serviceProviderName.classList.add('is-invalid');
                    isValid = false;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailAddress.value.trim() || !emailRegex.test(emailAddress.value.trim())) {
                    emailAddress.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!mobileNumber.value.trim()) {
                    mobileNumber.classList.add('is-invalid');
                    isValid = false;
                }
                break;
                
            case 2:
                // Validate Address Details
                const addressLine1 = document.getElementById('addressLine1');
                const country = document.getElementById('country');
                const city = document.getElementById('city');
                const postalCode = document.getElementById('postalCode');
                
                // Reset validation
                [addressLine1, country, city, postalCode].forEach(field => {
                    field.classList.remove('is-invalid');
                });
                
                if (!addressLine1.value.trim()) {
                    addressLine1.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!country.value) {
                    country.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!city.value) {
                    city.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!postalCode.value.trim()) {
                    postalCode.classList.add('is-invalid');
                    isValid = false;
                }
                break;
                
            case 3:
                // Validate Professional Details
                const experience = document.getElementById('experience');
                const skills = document.getElementById('skills');
                
                // Reset validation
                [experience, skills].forEach(field => {
                    field.classList.remove('is-invalid');
                });
                
                if (!experience.value.trim()) {
                    experience.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!skills.value.trim()) {
                    skills.classList.add('is-invalid');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    // --- Next Button Click Handlers ---
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                }
            }
        });
    });
    
    // --- Previous Button Click Handlers ---
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    // --- Form Submission ---
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate Step 4 fields
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const termsCondition = document.getElementById('termsCondition');
            const privacyPolicy = document.getElementById('privacyPolicy');
            let isValid = true;
            
            // Reset validation
            [password, confirmPassword].forEach(field => {
                field.classList.remove('is-invalid');
            });
            
            // Password validation
            if (!password.value.trim() || password.value.trim().length < 8) {
                password.classList.add('is-invalid');
                isValid = false;
            }
            
            // Confirm password validation
            if (!confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else if (password.value.trim() !== confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                const feedback = confirmPassword.parentElement.parentElement.querySelector('.invalid-feedback');
                if (!feedback) {
                    const div = document.createElement('div');
                    div.className = 'invalid-feedback';
                    div.textContent = 'Passwords do not match.';
                    confirmPassword.parentElement.parentElement.appendChild(div);
                }
                isValid = false;
            }
            
            // Terms and conditions validation
            if (!termsCondition.checked) {
                termsCondition.classList.add('is-invalid');
                isValid = false;
            }
            
            // Privacy policy validation
            if (!privacyPolicy.checked) {
                privacyPolicy.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Collect all form data
                const formData = {
                    // Step 1: Basic Details
                    profileImage: profileImageInput.files[0] ? profileImageInput.files[0].name : null,
                    serviceProviderName: document.getElementById('serviceProviderName').value,
                    emailAddress: document.getElementById('emailAddress').value,
                    mobileNumber: document.getElementById('mobileNumber').value,
                    providerType: document.querySelector('input[name="providerType"]:checked').value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    
                    // Step 2: Address Details
                    addressLine1: document.getElementById('addressLine1').value,
                    addressLine2: document.getElementById('addressLine2').value,
                    country: document.getElementById('country').value,
                    city: document.getElementById('city').value,
                    postalCode: document.getElementById('postalCode').value,
                    latitude: document.getElementById('latitude').value,
                    longitude: document.getElementById('longitude').value,
                    
                    // Company Address Details
                    companyAddressLine1: document.getElementById('companyAddressLine1').value,
                    companyAddressLine2: document.getElementById('companyAddressLine2').value,
                    companyCountry: document.getElementById('companyCountry').value,
                    companyCity: document.getElementById('companyCity').value,
                    companyPostalCode: document.getElementById('companyPostalCode').value,
                    companyLatitude: document.getElementById('companyLatitude').value,
                    companyLongitude: document.getElementById('companyLongitude').value,
                    
                    // Step 3: Professional Details
                    experience: document.getElementById('experience').value,
                    skills: document.getElementById('skills').value,
                    providerDescription: document.getElementById('providerDescription').value,
                    
                    // Step 4: Credentials
                    password: password.value,
                    termsCondition: termsCondition.checked,
                    privacyPolicy: privacyPolicy.checked
                };
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    console.log('Registration data:', formData);
                    alert('Registration successful! Your account is pending admin approval. You will receive a confirmation email.');
                    window.location.href = 'login.html';
                    
                    // Reset button state (in case of error)
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // --- Initialize ---
    toggleCompanyAddress();
    showStep(1);
    
});