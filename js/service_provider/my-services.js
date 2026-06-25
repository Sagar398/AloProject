// js/service_provider/my-services.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('My Services JS loaded successfully');
    
    // ============================================
    // SIDEBAR TOGGLE (Mobile)
    // ============================================
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('active');
            }
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // ============================================
    // SERVICE PROVIDER DATA
    // ============================================
    const serviceProviderData = {
        name: 'John Doe',
        firstName: 'John',
        serviceType: 'Plumber',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // MY SERVICES DATA
    // ============================================
    let myServices = [
        {
            id: 1,
            serviceId: 'SRV001',
            serviceName: 'Plumbing',
            category: 'Home Services',
            subCategory: 'Pipe Repair',
            description: 'General plumbing services including pipe repair and installation',
            image: 'https://via.placeholder.com/50',
            status: 'Active'
        },
        {
            id: 2,
            serviceId: 'SRV002',
            serviceName: 'Water Heater',
            category: 'Home Services',
            subCategory: 'Installation',
            description: 'Water heater installation and maintenance services',
            image: 'https://via.placeholder.com/50',
            status: 'Active'
        },
        {
            id: 3,
            serviceId: 'SRV003',
            serviceName: 'Painting',
            category: 'Home Services',
            subCategory: 'Interior',
            description: 'Interior painting services for residential properties',
            image: 'https://via.placeholder.com/50',
            status: 'Inactive'
        },
        {
            id: 4,
            serviceId: 'SRV004',
            serviceName: 'Electrician',
            category: 'Electronics',
            subCategory: 'Wiring',
            description: 'Electrical wiring and installation services',
            image: 'https://via.placeholder.com/50',
            status: 'Active'
        },
        {
            id: 5,
            serviceId: 'SRV005',
            serviceName: 'Carpentry',
            category: 'Construction',
            subCategory: 'Furniture',
            description: 'Custom furniture making and woodwork services',
            image: 'https://via.placeholder.com/50',
            status: 'Active'
        }
    ];
    
    // ============================================
    // AVAILABLE SERVICES FOR DROPDOWN
    // ============================================
    const availableServices = [
        { name: 'Mason', category: 'Construction' },
        { name: 'Plumber', category: 'Home Services' },
        { name: 'Painter', category: 'Home Services' },
        { name: 'Carpenter', category: 'Construction' },
        { name: 'Tiler', category: 'Construction' },
        { name: 'Air Conditioner', category: 'Electronics' },
        { name: 'Towing', category: 'Automotive' },
        { name: 'Electrician', category: 'Home Services' },
        { name: 'Domestic Gas', category: 'Home Services' },
        { name: 'Household', category: 'Home Services' },
        { name: 'Driver', category: 'Automotive' },
        { name: 'Water Proofer', category: 'Construction' }
    ];
    
    // ============================================
    // SUB CATEGORIES DATA
    // ============================================
    const subCategories = {
        'Plumbing': ['Pipe Repair', 'Installation', 'Maintenance', 'Emergency'],
        'Water Heater': ['Installation', 'Repair', 'Maintenance'],
        'Painting': ['Interior', 'Exterior', 'Wall Texturing'],
        'Electrician': ['Wiring', 'Installation', 'Repair', 'Safety Inspection'],
        'Carpentry': ['Furniture', 'Framework', 'Repair', 'Custom Design'],
        'Mason': ['Brick Work', 'Stone Work', 'Concrete', 'Repair'],
        'Tiler': ['Floor Tiling', 'Wall Tiling', 'Mosaic'],
        'Air Conditioner': ['Installation', 'Repair', 'Maintenance', 'Cleaning'],
        'Towing': ['Light Duty', 'Heavy Duty', 'Emergency'],
        'Domestic Gas': ['Installation', 'Maintenance', 'Safety Check'],
        'Household': ['Cleaning', 'Maintenance', 'Organization'],
        'Driver': ['Personal', 'Commercial', 'Chauffeur'],
        'Water Proofer': ['Roof', 'Basement', 'Exterior Wall']
    };
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'Service "Plumbing" has been activated', time: '2 hours ago', unread: true },
        { id: 2, message: 'New sub-category added to your services', time: 'Yesterday', unread: false }
    ];
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        const sidebarProviderName = document.getElementById('sidebarProviderName');
        const sidebarProviderService = document.getElementById('sidebarProviderService');
        const sidebarProfileImg = document.getElementById('sidebarProfileImg');
        
        if (sidebarProviderName) sidebarProviderName.textContent = serviceProviderData.name;
        if (sidebarProviderService) sidebarProviderService.textContent = serviceProviderData.serviceType;
        if (sidebarProfileImg) sidebarProfileImg.src = serviceProviderData.profileImage;
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        const topBarUserName = document.getElementById('topBarUserName');
        const topBarUserImg = document.getElementById('topBarUserImg');
        
        if (topBarUserName) topBarUserName.textContent = serviceProviderData.name;
        if (topBarUserImg) topBarUserImg.src = serviceProviderData.profileImage;
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
    // POPULATE CATEGORY FILTER
    // ============================================
    function populateCategoryFilter() {
        const filterMyCategory = document.getElementById('filterMyCategory');
        if (!filterMyCategory) return;
        
        const categories = [...new Set(myServices.map(s => s.category))];
        
        let options = '<option value="">All Categories</option>';
        categories.forEach(category => {
            options += `<option value="${category}">${category}</option>`;
        });
        
        filterMyCategory.innerHTML = options;
    }
    
    // ============================================
    // POPULATE SERVICE NAME DROPDOWN IN MODAL
    // ============================================
    function populateServiceNameDropdown() {
        const serviceNameSelect = document.getElementById('serviceName');
        if (!serviceNameSelect) return;
        
        let options = '<option value="">Select Service</option>';
        availableServices.forEach(service => {
            options += `<option value="${service.name}" data-category="${service.category}">${service.name}</option>`;
        });
        
        serviceNameSelect.innerHTML = options;
        
        // Add change event
        serviceNameSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const category = selectedOption.getAttribute('data-category');
            const serviceName = this.value;
            
            document.getElementById('serviceCategory').value = category || '';
            
            // Populate sub categories
            populateSubCategories(serviceName);
        });
    }
    
    // ============================================
    // POPULATE SUB CATEGORIES
    // ============================================
    function populateSubCategories(serviceName) {
        const subCategorySelect = document.getElementById('serviceSubCategory');
        if (!subCategorySelect) return;
        
        let options = '<option value="">Select Sub Category</option>';
        
        if (serviceName && subCategories[serviceName]) {
            subCategories[serviceName].forEach(sub => {
                options += `<option value="${sub}">${sub}</option>`;
            });
        }
        
        subCategorySelect.innerHTML = options;
    }
    
    // ============================================
    // RENDER MY SERVICES TABLE
    // ============================================
    function renderMyServices(filteredServices) {
        const tableBody = document.getElementById('myServicesTableBody');
        if (!tableBody) return;
        
        if (filteredServices.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                        No services found. <a href="select-services.html">Add new services</a>
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        filteredServices.forEach(service => {
            const statusClass = service.status === 'Active' ? 'status-success' : 'status-inactive';
            
            html += `
                <tr>
                    <td><strong>${service.serviceId}</strong></td>
                    <td>
                        <img src="${service.image}" alt="${service.serviceName}" class="rounded" style="width: 40px; height: 40px; object-fit: cover;">
                    </td>
                    <td>${service.serviceName}</td>
                    <td>${service.category}</td>
                    <td>${service.subCategory}</td>
                    <td>
                        <span class="status-badge ${statusClass}">${service.status}</span>
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-info view-service" data-id="${service.id}" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-primary edit-service" data-id="${service.id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-service" data-id="${service.id}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        
        // Attach event listeners
        attachTableButtonEvents();
    }
    
    // ============================================
    // ATTACH TABLE BUTTON EVENTS
    // ============================================
    function attachTableButtonEvents() {
        // View service
        document.querySelectorAll('.view-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                viewService(serviceId);
            });
        });
        
        // Edit service
        document.querySelectorAll('.edit-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                editService(serviceId);
            });
        });
        
        // Delete service
        document.querySelectorAll('.delete-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                deleteService(serviceId);
            });
        });
    }
    
    // ============================================
    // VIEW SERVICE
    // ============================================
    function viewService(serviceId) {
        const service = myServices.find(s => s.id === serviceId);
        if (!service) return;
        
        const statusClass = service.status === 'Active' ? 'status-success' : 'status-inactive';
        
        const viewContent = document.getElementById('viewServiceContent');
        viewContent.innerHTML = `
            <div class="text-center mb-3">
                <img src="${service.image}" alt="${service.serviceName}" class="rounded" style="width: 100px; height: 100px; object-fit: cover;">
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Service ID:</div>
                <div class="col-7">${service.serviceId}</div>
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Service Name:</div>
                <div class="col-7">${service.serviceName}</div>
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Category:</div>
                <div class="col-7">${service.category}</div>
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Sub Category:</div>
                <div class="col-7">${service.subCategory}</div>
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Status:</div>
                <div class="col-7"><span class="status-badge ${statusClass}">${service.status}</span></div>
            </div>
            <div class="row mb-2">
                <div class="col-5 fw-semibold">Description:</div>
                <div class="col-7">${service.description || 'N/A'}</div>
            </div>
        `;
        
        const viewModal = new bootstrap.Modal(document.getElementById('viewServiceModal'));
        viewModal.show();
    }
    
    // ============================================
    // EDIT SERVICE
    // ============================================
    function editService(serviceId) {
        const service = myServices.find(s => s.id === serviceId);
        if (!service) return;
        
        document.getElementById('serviceModalTitle').textContent = 'Edit Service';
        document.getElementById('serviceId').value = service.id;
        document.getElementById('serviceName').value = service.serviceName;
        document.getElementById('serviceCategory').value = service.category;
        document.getElementById('serviceDescription').value = service.description || '';
        document.getElementById('serviceStatus').value = service.status;
        document.getElementById('serviceImagePreview').src = service.image;
        
        populateSubCategories(service.serviceName);
        document.getElementById('serviceSubCategory').value = service.subCategory;
        
        const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
        serviceModal.show();
    }
    
    // ============================================
    // DELETE SERVICE
    // ============================================
    function deleteService(serviceId) {
        const service = myServices.find(s => s.id === serviceId);
        if (!service) return;
        
        if (confirm(`Are you sure you want to delete "${service.serviceName}" from your services? This action cannot be undone.`)) {
            myServices = myServices.filter(s => s.id !== serviceId);
            populateCategoryFilter();
            applyFilters();
            showToast(`"${service.serviceName}" has been deleted successfully.`, 'danger');
            console.log('Service deleted:', service);
        }
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const searchQuery = document.getElementById('searchMyService').value.toLowerCase().trim();
        const filterCategory = document.getElementById('filterMyCategory').value;
        const filterStatus = document.getElementById('filterMyStatus').value;
        
        let filtered = myServices;
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(service => 
                service.serviceName.toLowerCase().includes(searchQuery) ||
                service.category.toLowerCase().includes(searchQuery) ||
                service.subCategory.toLowerCase().includes(searchQuery) ||
                service.serviceId.toLowerCase().includes(searchQuery)
            );
        }
        
        // Filter by category
        if (filterCategory) {
            filtered = filtered.filter(service => service.category === filterCategory);
        }
        
        // Filter by status
        if (filterStatus === 'active') {
            filtered = filtered.filter(service => service.status === 'Active');
        } else if (filterStatus === 'inactive') {
            filtered = filtered.filter(service => service.status === 'Inactive');
        }
        
        renderMyServices(filtered);
    }
    
    // ============================================
    // SAVE SERVICE (ADD/EDIT)
    // ============================================
    function saveService() {
        const serviceId = document.getElementById('serviceId').value;
        const serviceName = document.getElementById('serviceName').value;
        const serviceCategory = document.getElementById('serviceCategory').value;
        const serviceSubCategory = document.getElementById('serviceSubCategory').value;
        const serviceDescription = document.getElementById('serviceDescription').value;
        const serviceStatus = document.getElementById('serviceStatus').value;
        
        // Validation
        if (!serviceName) {
            alert('Please select a service name.');
            return;
        }
        
        if (!serviceSubCategory) {
            alert('Please select a sub category.');
            return;
        }
        
        if (serviceId) {
            // Edit existing service
            const service = myServices.find(s => s.id === parseInt(serviceId));
            if (service) {
                service.serviceName = serviceName;
                service.category = serviceCategory;
                service.subCategory = serviceSubCategory;
                service.description = serviceDescription;
                service.status = serviceStatus;
                showToast(`"${serviceName}" has been updated successfully.`, 'success');
            }
        } else {
            // Add new service
            const newService = {
                id: Date.now(),
                serviceId: 'SRV' + String(myServices.length + 1).padStart(3, '0'),
                serviceName: serviceName,
                category: serviceCategory,
                subCategory: serviceSubCategory,
                description: serviceDescription,
                image: 'https://via.placeholder.com/50',
                status: 'Active'
            };
            
            myServices.push(newService);
            showToast(`"${serviceName}" has been added to your services successfully.`, 'success');
        }
        
        // Close modal
        const serviceModal = bootstrap.Modal.getInstance(document.getElementById('serviceModal'));
        serviceModal.hide();
        
        // Refresh table
        populateCategoryFilter();
        applyFilters();
        
        // Reset form
        resetServiceForm();
    }
    
    // ============================================
    // RESET SERVICE FORM
    // ============================================
    function resetServiceForm() {
        document.getElementById('serviceId').value = '';
        document.getElementById('serviceName').value = '';
        document.getElementById('serviceCategory').value = '';
        document.getElementById('serviceSubCategory').innerHTML = '<option value="">Select Sub Category</option>';
        document.getElementById('serviceDescription').value = '';
        document.getElementById('serviceStatus').value = 'Active';
        document.getElementById('serviceImagePreview').src = 'https://via.placeholder.com/100';
        document.getElementById('serviceModalTitle').textContent = 'Add Service';
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
        
        const bgClass = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-warning text-dark';
        const iconClass = type === 'success' ? 'fa-check-circle' : type === 'danger' ? 'fa-trash' : 'fa-exclamation-circle';
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bgClass} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${iconClass} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', function() {
            toast.remove();
        });
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFilterEvents() {
        const searchMyService = document.getElementById('searchMyService');
        const filterMyCategory = document.getElementById('filterMyCategory');
        const filterMyStatus = document.getElementById('filterMyStatus');
        
        if (searchMyService) searchMyService.addEventListener('input', applyFilters);
        if (filterMyCategory) filterMyCategory.addEventListener('change', applyFilters);
        if (filterMyStatus) filterMyStatus.addEventListener('change', applyFilters);
    }
    
    function attachModalEvents() {
        // Save button in modal
        const saveServiceBtn = document.getElementById('saveServiceBtn');
        if (saveServiceBtn) {
            saveServiceBtn.addEventListener('click', saveService);
        }
        
        // Reset form when Add New Service button is clicked
        const addNewBtn = document.querySelector('a[href="select-services.html"]');
        if (addNewBtn) {
            // Don't prevent default for the Add New Service link
        }
        
        // Reset form when modal is opened for adding
        const serviceModal = document.getElementById('serviceModal');
        if (serviceModal) {
            serviceModal.addEventListener('hidden.bs.modal', resetServiceForm);
        }
        
        // Service image upload
        const serviceImage = document.getElementById('serviceImage');
        const serviceImagePreview = document.getElementById('serviceImagePreview');
        if (serviceImage && serviceImagePreview) {
            serviceImage.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        serviceImagePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeMyServices() {
        console.log('Initializing my services...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateCategoryFilter();
        populateServiceNameDropdown();
        renderMyServices(myServices);
        attachFilterEvents();
        attachModalEvents();
        console.log('My services initialization complete');
    }
    
    // Call the main function
    initializeMyServices();
    
});