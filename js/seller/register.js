// js/seller/register.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Seller Register JS loaded successfully');
    
    // ============================================
    // DOM ELEMENTS
    // ============================================
    const registrationForm = document.getElementById('registrationForm');
    const progressBar = document.getElementById('progressBar');
    const stepContents = document.querySelectorAll('.step-content');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    let currentStep = 1;
    const totalSteps = 4;
    
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
    // IMAGE PREVIEW - SELLER
    // ============================================
    const sellerImage = document.getElementById('sellerImage');
    const sellerImagePreview = document.getElementById('sellerImagePreview');
    
    if (sellerImage && sellerImagePreview) {
        sellerImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    sellerImagePreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ============================================
    // IMAGE PREVIEW - SHOP
    // ============================================
    const shopImage = document.getElementById('shopImage');
    const shopImagePreview = document.getElementById('shopImagePreview');
    
    if (shopImage && shopImagePreview) {
        shopImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    shopImagePreview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ============================================
    // UPDATE STEP UI
    // ============================================
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
    
    // ============================================
    // SHOW STEP
    // ============================================
    function showStep(step) {
        stepContents.forEach((content, index) => {
            content.style.display = (index + 1 === step) ? 'block' : 'none';
        });
        
        updateStepUI(step);
        currentStep = step;
        
        // Scroll to top of form
        document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth' });
    }
    
    // ============================================
    // VALIDATE STEP
    // ============================================
    function validateStep(step) {
        let isValid = true;
        
        switch(step) {
            case 1:
                // Validate Seller Details
                const sellerName = document.getElementById('sellerName');
                const sellerEmail = document.getElementById('sellerEmail');
                const sellerMobile = document.getElementById('sellerMobile');
                
                [sellerName, sellerEmail, sellerMobile].forEach(field => field.classList.remove('is-invalid'));
                
                if (!sellerName.value.trim()) {
                    sellerName.classList.add('is-invalid');
                    isValid = false;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!sellerEmail.value.trim() || !emailRegex.test(sellerEmail.value.trim())) {
                    sellerEmail.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!sellerMobile.value.trim()) {
                    sellerMobile.classList.add('is-invalid');
                    isValid = false;
                }
                break;
                
            case 2:
                // Validate Shop Details
                const shopName = document.getElementById('shopName');
                const shopAddressLine1 = document.getElementById('shopAddressLine1');
                const shopCountry = document.getElementById('shopCountry');
                const shopCity = document.getElementById('shopCity');
                const shopPostalCode = document.getElementById('shopPostalCode');
                
                [shopName, shopAddressLine1, shopCountry, shopCity, shopPostalCode].forEach(field => {
                    field.classList.remove('is-invalid');
                });
                
                if (!shopName.value.trim()) {
                    shopName.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!shopAddressLine1.value.trim()) {
                    shopAddressLine1.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!shopCountry.value) {
                    shopCountry.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!shopCity.value) {
                    shopCity.classList.add('is-invalid');
                    isValid = false;
                }
                
                if (!shopPostalCode.value.trim()) {
                    shopPostalCode.classList.add('is-invalid');
                    isValid = false;
                }
                break;
                
            case 3:
                // Validate Professional Details
                const serviceType = document.getElementById('serviceType');
                
                serviceType.classList.remove('is-invalid');
                
                if (!serviceType.value) {
                    serviceType.classList.add('is-invalid');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    // ============================================
    // NEXT BUTTON HANDLERS
    // ============================================
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    showStep(currentStep + 1);
                }
            }
        });
    });
    
    // ============================================
    // PREVIOUS BUTTON HANDLERS
    // ============================================
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate Step 4
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const termsCondition = document.getElementById('termsCondition');
            const privacyPolicy = document.getElementById('privacyPolicy');
            let isValid = true;
            
            [password, confirmPassword].forEach(field => field.classList.remove('is-invalid'));
            
            if (!password.value.trim() || password.value.trim().length < 8) {
                password.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else if (password.value.trim() !== confirmPassword.value.trim()) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!termsCondition.checked) {
                termsCondition.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!privacyPolicy.checked) {
                privacyPolicy.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Collect all form data
                const formData = {
                    // Step 1: Seller Details
                    sellerName: document.getElementById('sellerName').value,
                    sellerEmail: document.getElementById('sellerEmail').value,
                    sellerMobile: document.getElementById('sellerMobile').value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    sellerDescription: document.getElementById('sellerDescription').value,
                    
                    // Step 2: Shop Details
                    shopName: document.getElementById('shopName').value,
                    shopEmail: document.getElementById('shopEmail').value,
                    shopMobile: document.getElementById('shopMobile').value,
                    availableDate: document.getElementById('availableDate').value,
                    availableTime: document.getElementById('availableTime').value,
                    shopAddressLine1: document.getElementById('shopAddressLine1').value,
                    shopAddressLine2: document.getElementById('shopAddressLine2').value,
                    shopCountry: document.getElementById('shopCountry').value,
                    shopCity: document.getElementById('shopCity').value,
                    shopPostalCode: document.getElementById('shopPostalCode').value,
                    shopLatitude: document.getElementById('shopLatitude').value,
                    shopLongitude: document.getElementById('shopLongitude').value,
                    shopDescription: document.getElementById('shopDescription').value,
                    
                    // Step 3: Professional Details
                    serviceType: document.getElementById('serviceType').value,
                    
                    // Step 4: Credentials
                    password: password.value,
                    termsCondition: termsCondition.checked,
                    privacyPolicy: privacyPolicy.checked
                };
                
                console.log('Seller registration data:', formData);
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Registration successful! Your account is pending admin approval. You will receive a confirmation email.');
                    window.location.href = 'login.html';
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // ============================================
    // INITIALIZE
    // ============================================
    showStep(1);
    
});