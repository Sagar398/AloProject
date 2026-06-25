// js/service_provider/select-services.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Select Services JS loaded successfully');
    
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
        profileImage: 'https://via.placeholder.com/60',
        myServices: [
            { id: 1, name: 'Plumbing', category: 'Home Services', description: 'General plumbing services' },
            { id: 2, name: 'Pipe Repair', category: 'Home Services', description: 'Pipe repair and maintenance' }
        ]
    };
    
    // ============================================
    // AVAILABLE SERVICES DATA
    // ============================================
    const availableServices = [
        {
            id: 1,
            serviceName: 'Mason',
            category: 'Construction',
            description: 'Brick, stone, and concrete work for buildings and structures.',
            icon: 'fa-hard-hat',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 2,
            serviceName: 'Plumber',
            category: 'Home Services',
            description: 'Installation and repair of water supply, drainage, and heating systems.',
            icon: 'fa-wrench',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 3,
            serviceName: 'Painter',
            category: 'Home Services',
            description: 'Interior and exterior painting for residential and commercial properties.',
            icon: 'fa-paint-roller',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 4,
            serviceName: 'Carpenter',
            category: 'Construction',
            description: 'Woodwork, furniture making, and structural framework construction.',
            icon: 'fa-hammer',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 5,
            serviceName: 'Tiler',
            category: 'Construction',
            description: 'Floor and wall tiling for bathrooms, kitchens, and other areas.',
            icon: 'fa-border-all',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 6,
            serviceName: 'Air Conditioner',
            category: 'Electronics',
            description: 'Installation, maintenance, and repair of air conditioning systems.',
            icon: 'fa-snowflake',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 7,
            serviceName: 'Towing',
            category: 'Automotive',
            description: 'Vehicle towing and roadside assistance services.',
            icon: 'fa-truck',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 8,
            serviceName: 'Electrician',
            category: 'Home Services',
            description: 'Electrical wiring, installation, and repair services.',
            icon: 'fa-bolt',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 9,
            serviceName: 'Domestic Gas',
            category: 'Home Services',
            description: 'Gas appliance installation, maintenance, and safety inspections.',
            icon: 'fa-fire',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 10,
            serviceName: 'Household',
            category: 'Home Services',
            description: 'General household cleaning and maintenance services.',
            icon: 'fa-home',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 11,
            serviceName: 'Driver',
            category: 'Automotive',
            description: 'Professional driving services for personal or commercial needs.',
            icon: 'fa-car',
            image: 'https://via.placeholder.com/80'
        },
        {
            id: 12,
            serviceName: 'Water Proofer',
            category: 'Construction',
            description: 'Waterproofing solutions for buildings, roofs, and basements.',
            icon: 'fa-water',
            image: 'https://via.placeholder.com/80'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New service available in your area', time: '1 hour ago', unread: true },
        { id: 2, message: 'Your service list has been updated', time: '3 hours ago', unread: false }
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
        const filterCategory = document.getElementById('filterCategory');
        if (!filterCategory) return;
        
        const categories = [...new Set(availableServices.map(s => s.category))];
        
        let options = '<option value="">All Categories</option>';
        categories.forEach(category => {
            options += `<option value="${category}">${category}</option>`;
        });
        
        filterCategory.innerHTML = options;
    }
    
    // ============================================
    // CHECK IF SERVICE IS SELECTED
    // ============================================
    function isServiceSelected(serviceName) {
        return serviceProviderData.myServices.some(s => s.name === serviceName);
    }
    
    // ============================================
    // UPDATE SELECTED COUNT
    // ============================================
    function updateSelectedCount() {
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            const count = serviceProviderData.myServices.length;
            selectedCount.textContent = count;
        }
    }
    
    // ============================================
    // RENDER SERVICES GRID
    // ============================================
    function renderServices(filteredServices) {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;
        
        if (filteredServices.length === 0) {
            servicesGrid.innerHTML = `
                <div class="col-12 text-center text-muted py-5">
                    <i class="fas fa-search fa-2x mb-3"></i>
                    <p>No services found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        filteredServices.forEach(service => {
            const selected = isServiceSelected(service.serviceName);
            
            html += `
                <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="stat-card service-select-card ${selected ? 'border border-primary' : ''}" style="height: 100%;">
                        <div class="text-center mb-3">
                            <div class="stat-icon mx-auto mb-3" style="background: ${selected ? 'rgba(67, 97, 238, 0.1)' : 'rgba(108, 117, 125, 0.1)'}; color: ${selected ? 'var(--primary-color)' : 'var(--gray-color)'};">
                                <i class="fas ${service.icon}"></i>
                            </div>
                            <h6 class="mb-1">${service.serviceName}</h6>
                            <small class="text-muted d-block mb-2">
                                <i class="fas fa-tag me-1"></i>${service.category}
                            </small>
                            <p class="text-muted small mb-3">${service.description}</p>
                        </div>
                        <div class="text-center">
                            ${selected ? 
                                `<button class="btn btn-outline-secondary btn-sm w-100 remove-service" data-service-name="${service.serviceName}">
                                    <i class="fas fa-check me-1"></i> Selected
                                </button>` :
                                `<button class="btn btn-primary btn-sm w-100 add-service" data-service-name="${service.serviceName}" data-service-category="${service.category}" data-service-description="${service.description}">
                                    <i class="fas fa-plus-circle me-1"></i> Add Service
                                </button>`
                            }
                        </div>
                    </div>
                </div>
            `;
        });
        
        servicesGrid.innerHTML = html;
        
        // Add event listeners
        attachServiceButtonEvents();
    }
    
    // ============================================
    // ATTACH SERVICE BUTTON EVENTS
    // ============================================
    function attachServiceButtonEvents() {
        // Add service buttons
        document.querySelectorAll('.add-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service-name');
                const serviceCategory = this.getAttribute('data-service-category');
                const serviceDescription = this.getAttribute('data-service-description');
                
                addService(serviceName, serviceCategory, serviceDescription);
            });
        });
        
        // Remove service buttons
        document.querySelectorAll('.remove-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service-name');
                removeService(serviceName);
            });
        });
    }
    
    // ============================================
    // ADD SERVICE
    // ============================================
    function addService(serviceName, category, description) {
        const newService = {
            id: Date.now(),
            name: serviceName,
            category: category,
            description: description
        };
        
        serviceProviderData.myServices.push(newService);
        updateSelectedCount();
        
        // Re-render with current filters
        applyFilters();
        
        // Show success message
        showToast(`"${serviceName}" added to your services successfully!`, 'success');
        
        console.log('Service added:', newService);
    }
    
    // ============================================
    // REMOVE SERVICE
    // ============================================
    function removeService(serviceName) {
        serviceProviderData.myServices = serviceProviderData.myServices.filter(s => s.name !== serviceName);
        updateSelectedCount();
        
        // Re-render with current filters
        applyFilters();
        
        // Show message
        showToast(`"${serviceName}" removed from your services.`, 'warning');
        
        console.log('Service removed:', serviceName);
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const searchQuery = document.getElementById('searchService').value.toLowerCase().trim();
        const filterCategory = document.getElementById('filterCategory').value;
        const filterStatus = document.getElementById('filterStatus').value;
        
        let filtered = availableServices;
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(service => 
                service.serviceName.toLowerCase().includes(searchQuery) ||
                service.category.toLowerCase().includes(searchQuery) ||
                service.description.toLowerCase().includes(searchQuery)
            );
        }
        
        // Filter by category
        if (filterCategory) {
            filtered = filtered.filter(service => service.category === filterCategory);
        }
        
        // Filter by status
        if (filterStatus === 'available') {
            filtered = filtered.filter(service => !isServiceSelected(service.serviceName));
        } else if (filterStatus === 'selected') {
            filtered = filtered.filter(service => isServiceSelected(service.serviceName));
        }
        
        renderServices(filtered);
    }
    
    // ============================================
    // SHOW TOAST MESSAGE
    // ============================================
    function showToast(message, type) {
        // Create toast container if not exists
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999;';
            document.body.appendChild(toastContainer);
        }
        
        const bgClass = type === 'success' ? 'bg-success' : 'bg-warning text-dark';
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bgClass} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
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
        const searchService = document.getElementById('searchService');
        const filterCategory = document.getElementById('filterCategory');
        const filterStatus = document.getElementById('filterStatus');
        
        if (searchService) {
            searchService.addEventListener('input', applyFilters);
        }
        
        if (filterCategory) {
            filterCategory.addEventListener('change', applyFilters);
        }
        
        if (filterStatus) {
            filterStatus.addEventListener('change', applyFilters);
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeSelectServices() {
        console.log('Initializing select services...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateCategoryFilter();
        updateSelectedCount();
        renderServices(availableServices);
        attachFilterEvents();
        console.log('Select services initialization complete');
    }
    
    // Call the main function
    initializeSelectServices();
    
});