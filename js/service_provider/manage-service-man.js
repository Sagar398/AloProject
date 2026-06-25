// js/service_provider/manage-service-man.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Manage Service Man JS loaded successfully');
    
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
    // SERVICE PROVIDER DATA
    // ============================================
    const serviceProviderData = {
        name: 'John Doe',
        firstName: 'John',
        serviceType: 'Plumber',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // SERVICE MEN DATA
    // ============================================
    let serviceMenList = [
        {
            id: 1,
            serviceManId: 'SM001',
            image: 'https://via.placeholder.com/50',
            name: 'Mike Johnson',
            email: 'mike@email.com',
            mobile: '+33 111222333',
            age: 32,
            employmentStartDate: '2023-01-15',
            experience: '8 Years',
            assignedServices: 'Plumbing',
            availableDate: '2024-08-20',
            availableTime: '08:00 AM - 04:00 PM',
            status: 'Active'
        },
        {
            id: 2,
            serviceManId: 'SM002',
            image: 'https://via.placeholder.com/50',
            name: 'David Brown',
            email: 'david@email.com',
            mobile: '+33 444555666',
            age: 28,
            employmentStartDate: '2023-06-01',
            experience: '5 Years',
            assignedServices: 'Pipe Repair',
            availableDate: '2024-08-21',
            availableTime: '09:00 AM - 05:00 PM',
            status: 'Active'
        },
        {
            id: 3,
            serviceManId: 'SM003',
            image: 'https://via.placeholder.com/50',
            name: 'Tom Wilson',
            email: 'tom@email.com',
            mobile: '+33 777888999',
            age: 35,
            employmentStartDate: '2022-03-10',
            experience: '10 Years',
            assignedServices: 'Water Heater',
            availableDate: '2024-08-22',
            availableTime: '10:00 AM - 06:00 PM',
            status: 'Active'
        },
        {
            id: 4,
            serviceManId: 'SM004',
            image: 'https://via.placeholder.com/50',
            name: 'James Taylor',
            email: 'james@email.com',
            mobile: '+33 123123123',
            age: 30,
            employmentStartDate: '2024-01-20',
            experience: '3 Years',
            assignedServices: 'Carpentry',
            availableDate: '2024-08-23',
            availableTime: '08:00 AM - 02:00 PM',
            status: 'Inactive'
        }
    ];
    
    // ============================================
    // ASSIGNED JOBS DATA
    // ============================================
    const assignedJobs = [
        {
            jobId: 'JOB001',
            bookingId: '#BK002',
            serviceManId: 'SM002',
            serviceManName: 'David Brown',
            serviceManEmail: 'david@email.com',
            serviceManMobile: '+33 444555666',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            serviceName: 'Pipe Repair',
            serviceDateTime: '21/08/2024 02:00 PM',
            serviceLocation: '123 Rue de Paris, France',
            status: 'In Progress'
        },
        {
            jobId: 'JOB002',
            bookingId: '#BK004',
            serviceManId: 'SM003',
            serviceManName: 'Tom Wilson',
            serviceManEmail: 'tom@email.com',
            serviceManMobile: '+33 777888999',
            customerName: 'Pierre Dubois',
            customerEmail: 'pierre@email.com',
            customerMobile: '+33 789123456',
            serviceName: 'Plumbing',
            serviceDateTime: '23/08/2024 11:00 AM',
            serviceLocation: '45 Avenue des Champs, France',
            status: 'Assigned'
        },
        {
            jobId: 'JOB003',
            bookingId: '#BK005',
            serviceManId: 'SM001',
            serviceManName: 'Mike Johnson',
            serviceManEmail: 'mike@email.com',
            serviceManMobile: '+33 111222333',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            serviceName: 'Pipe Repair',
            serviceDateTime: '18/08/2024 03:00 PM',
            serviceLocation: '78 Boulevard Saint-Germain, France',
            status: 'Completed'
        },
        {
            jobId: 'JOB004',
            bookingId: '#BK007',
            serviceManId: 'SM004',
            serviceManName: 'James Taylor',
            serviceManEmail: 'james@email.com',
            serviceManMobile: '+33 123123123',
            customerName: 'Claire Fontaine',
            customerEmail: 'claire@email.com',
            customerMobile: '+33 888999000',
            serviceName: 'Carpentry',
            serviceDateTime: '26/08/2024 10:00 AM',
            serviceLocation: '12 Rue du Commerce, France',
            status: 'Assigned'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New service man added to your team', time: '1 hour ago', unread: true },
        { id: 2, message: 'Job JOB001 status updated to In Progress', time: '3 hours ago', unread: false }
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
    // POPULATE SERVICE FILTER
    // ============================================
    function populateServiceFilter() {
        const filterService = document.getElementById('filterServiceManService');
        if (!filterService) return;
        
        const services = [...new Set(serviceMenList.map(sm => sm.assignedServices))];
        
        let options = '<option value="">All Services</option>';
        services.forEach(service => {
            options += `<option value="${service}">${service}</option>`;
        });
        
        filterService.innerHTML = options;
    }
    
    // ============================================
    // GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        const statusMap = {
            'Active': 'success',
            'Inactive': 'inactive',
            'Pending': 'pending',
            'Assigned': 'info',
            'In Progress': 'warning',
            'Completed': 'success'
        };
        return statusMap[status] || 'secondary';
    }
    
    // ============================================
    // RENDER SERVICE MEN TABLE
    // ============================================
    function renderServiceMenTable(filteredList) {
        const tableBody = document.getElementById('serviceMenTableBody');
        if (!tableBody) return;
        
        if (filteredList.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center text-muted py-4">
                        <i class="fas fa-users-slash fa-2x mb-2 d-block"></i>
                        No service men found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        filteredList.forEach(man => {
            html += `
                <tr>
                    <td><strong>${man.serviceManId}</strong></td>
                    <td>
                        <img src="${man.image}" alt="${man.name}" class="rounded-circle" style="width: 45px; height: 45px; object-fit: cover;">
                    </td>
                    <td>${man.name}</td>
                    <td>${man.email}</td>
                    <td>${man.mobile}</td>
                    <td>${man.assignedServices}</td>
                    <td>${man.availableDate || '-'}</td>
                    <td>${man.availableTime || '-'}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-info view-service-man" data-id="${man.id}" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary edit-service-man" data-id="${man.id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-service-man" data-id="${man.id}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        attachServiceManEvents();
    }
    
    // ============================================
    // RENDER ASSIGNED JOBS TABLE
    // ============================================
    function renderAssignedJobsTable() {
        const tableBody = document.getElementById('assignedJobsTableBody');
        if (!tableBody) return;
        
        if (assignedJobs.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted py-4">
                        <i class="fas fa-tasks fa-2x mb-2 d-block"></i>
                        No assigned jobs found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        assignedJobs.forEach(job => {
            const statusClass = getStatusClass(job.status);
            
            html += `
                <tr>
                    <td><strong>${job.jobId}</strong></td>
                    <td>${job.bookingId}</td>
                    <td>${job.serviceManName}</td>
                    <td>${job.customerName}</td>
                    <td>${job.serviceName}</td>
                    <td>${job.serviceDateTime}</td>
                    <td><span class="status-badge status-${statusClass}">${job.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-info view-assign-job" data-job-id="${job.jobId}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        attachAssignJobEvents();
    }
    
    // ============================================
    // ATTACH SERVICE MAN EVENTS
    // ============================================
    function attachServiceManEvents() {
        document.querySelectorAll('.view-service-man').forEach(btn => {
            btn.addEventListener('click', function() {
                viewServiceMan(parseInt(this.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.edit-service-man').forEach(btn => {
            btn.addEventListener('click', function() {
                editServiceMan(parseInt(this.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.delete-service-man').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteServiceMan(parseInt(this.getAttribute('data-id')));
            });
        });
    }
    
    // ============================================
    // ATTACH ASSIGN JOB EVENTS
    // ============================================
    function attachAssignJobEvents() {
        document.querySelectorAll('.view-assign-job').forEach(btn => {
            btn.addEventListener('click', function() {
                viewAssignedJob(this.getAttribute('data-job-id'));
            });
        });
    }
    
    // ============================================
    // VIEW SERVICE MAN
    // ============================================
    function viewServiceMan(id) {
        const man = serviceMenList.find(sm => sm.id === id);
        if (!man) return;
        
        const content = document.getElementById('viewServiceManContent');
        content.innerHTML = `
            <div class="row">
                <div class="col-md-4 text-center">
                    <img src="${man.image}" alt="${man.name}" class="rounded-circle mb-3" style="width: 150px; height: 150px; object-fit: cover;">
                    <h5>${man.name}</h5>
                    <span class="status-badge status-${getStatusClass(man.status)}">${man.status}</span>
                </div>
                <div class="col-md-8">
                    <h6 class="fw-bold">Service Man Details</h6>
                    <div class="row mb-2"><div class="col-5 fw-semibold">ID:</div><div class="col-7">${man.serviceManId}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Email:</div><div class="col-7">${man.email}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Mobile:</div><div class="col-7">${man.mobile}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Age:</div><div class="col-7">${man.age || 'N/A'}</div></div>
                    
                    <h6 class="fw-bold mt-3">Professional Details</h6>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Start Date:</div><div class="col-7">${man.employmentStartDate || 'N/A'}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Experience:</div><div class="col-7">${man.experience || 'N/A'}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Service:</div><div class="col-7">${man.assignedServices}</div></div>
                    
                    <h6 class="fw-bold mt-3">Availability</h6>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Date:</div><div class="col-7">${man.availableDate || 'N/A'}</div></div>
                    <div class="row mb-2"><div class="col-5 fw-semibold">Time:</div><div class="col-7">${man.availableTime || 'N/A'}</div></div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('viewServiceManModal'));
        modal.show();
    }
    
    // ============================================
    // VIEW ASSIGNED JOB
    // ============================================
    function viewAssignedJob(jobId) {
        const job = assignedJobs.find(j => j.jobId === jobId);
        if (!job) return;
        
        const content = document.getElementById('viewAssignJobContent');
        content.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Service Man Details</h6>
                    <div class="mb-2"><strong>Name:</strong> ${job.serviceManName}</div>
                    <div class="mb-2"><strong>Email:</strong> ${job.serviceManEmail}</div>
                    <div class="mb-2"><strong>Mobile:</strong> ${job.serviceManMobile}</div>
                    
                    <h6 class="fw-bold mb-3 mt-4">Customer Details</h6>
                    <div class="mb-2"><strong>Name:</strong> ${job.customerName}</div>
                    <div class="mb-2"><strong>Email:</strong> ${job.customerEmail}</div>
                    <div class="mb-2"><strong>Mobile:</strong> ${job.customerMobile}</div>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Assign Job Details</h6>
                    <div class="mb-2"><strong>Booking ID:</strong> ${job.bookingId}</div>
                    <div class="mb-2"><strong>Service:</strong> ${job.serviceName}</div>
                    <div class="mb-2"><strong>Date & Time:</strong> ${job.serviceDateTime}</div>
                    <div class="mb-2"><strong>Location:</strong> ${job.serviceLocation}</div>
                    <div class="mb-2"><strong>Status:</strong> <span class="status-badge status-${getStatusClass(job.status)}">${job.status}</span></div>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('viewAssignJobModal'));
        modal.show();
    }
    
    // ============================================
    // EDIT SERVICE MAN
    // ============================================
    function editServiceMan(id) {
        const man = serviceMenList.find(sm => sm.id === id);
        if (!man) return;
        
        document.getElementById('serviceManModalTitle').textContent = 'Edit Service Man';
        document.getElementById('serviceManId').value = man.id;
        document.getElementById('serviceManName').value = man.name;
        document.getElementById('serviceManAge').value = man.age || '';
        document.getElementById('serviceManEmail').value = man.email;
        document.getElementById('serviceManMobile').value = man.mobile;
        document.getElementById('employmentStartDate').value = man.employmentStartDate || '';
        document.getElementById('serviceManExperience').value = man.experience || '';
        document.getElementById('assignedServices').value = man.assignedServices;
        document.getElementById('serviceManAvailableDate').value = man.availableDate || '';
        document.getElementById('serviceManAvailableTime').value = man.availableTime || '';
        document.getElementById('serviceManImagePreview').src = man.image;
        
        const modal = new bootstrap.Modal(document.getElementById('serviceManModal'));
        modal.show();
    }
    
    // ============================================
    // DELETE SERVICE MAN
    // ============================================
    function deleteServiceMan(id) {
        const man = serviceMenList.find(sm => sm.id === id);
        if (!man) return;
        
        if (confirm(`Are you sure you want to delete "${man.name}"? This action cannot be undone.`)) {
            serviceMenList = serviceMenList.filter(sm => sm.id !== id);
            populateServiceFilter();
            applyServiceManFilters();
            showToast(`"${man.name}" has been deleted successfully.`, 'danger');
        }
    }
    
    // ============================================
    // SAVE SERVICE MAN
    // ============================================
    function saveServiceMan() {
        const serviceManId = document.getElementById('serviceManId').value;
        const name = document.getElementById('serviceManName').value;
        const email = document.getElementById('serviceManEmail').value;
        const mobile = document.getElementById('serviceManMobile').value;
        
        if (!name || !email || !mobile) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const manData = {
            name: name,
            age: document.getElementById('serviceManAge').value,
            email: email,
            mobile: mobile,
            employmentStartDate: document.getElementById('employmentStartDate').value,
            experience: document.getElementById('serviceManExperience').value,
            assignedServices: document.getElementById('assignedServices').value,
            availableDate: document.getElementById('serviceManAvailableDate').value,
            availableTime: document.getElementById('serviceManAvailableTime').value
        };
        
        if (serviceManId) {
            const man = serviceMenList.find(sm => sm.id === parseInt(serviceManId));
            if (man) {
                Object.assign(man, manData);
                showToast(`"${name}" updated successfully.`, 'success');
            }
        } else {
            const newMan = {
                id: Date.now(),
                serviceManId: 'SM' + String(serviceMenList.length + 1).padStart(3, '0'),
                image: 'https://via.placeholder.com/50',
                status: 'Active',
                ...manData
            };
            serviceMenList.push(newMan);
            showToast(`"${name}" added successfully.`, 'success');
        }
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('serviceManModal'));
        modal.hide();
        resetServiceManForm();
        populateServiceFilter();
        applyServiceManFilters();
    }
    
    // ============================================
    // RESET SERVICE MAN FORM
    // ============================================
    function resetServiceManForm() {
        document.getElementById('serviceManId').value = '';
        document.getElementById('serviceManName').value = '';
        document.getElementById('serviceManAge').value = '';
        document.getElementById('serviceManEmail').value = '';
        document.getElementById('serviceManMobile').value = '';
        document.getElementById('employmentStartDate').value = '';
        document.getElementById('serviceManExperience').value = '';
        document.getElementById('assignedServices').value = '';
        document.getElementById('serviceManAvailableDate').value = '';
        document.getElementById('serviceManAvailableTime').value = '';
        document.getElementById('serviceManImagePreview').src = 'https://via.placeholder.com/120';
        document.getElementById('serviceManModalTitle').textContent = 'Add Service Man';
    }
    
    // ============================================
    // APPLY SERVICE MAN FILTERS
    // ============================================
    function applyServiceManFilters() {
        const searchQuery = document.getElementById('searchServiceMan').value.toLowerCase().trim();
        const filterService = document.getElementById('filterServiceManService').value;
        const filterStatus = document.getElementById('filterServiceManStatus').value;
        
        let filtered = serviceMenList;
        
        if (searchQuery) {
            filtered = filtered.filter(sm => 
                sm.name.toLowerCase().includes(searchQuery) ||
                sm.email.toLowerCase().includes(searchQuery) ||
                sm.assignedServices.toLowerCase().includes(searchQuery)
            );
        }
        
        if (filterService) {
            filtered = filtered.filter(sm => sm.assignedServices === filterService);
        }
        
        if (filterStatus === 'active') {
            filtered = filtered.filter(sm => sm.status === 'Active');
        } else if (filterStatus === 'inactive') {
            filtered = filtered.filter(sm => sm.status === 'Inactive');
        }
        
        renderServiceMenTable(filtered);
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
        document.getElementById('addServiceManBtn').addEventListener('click', function() {
            resetServiceManForm();
            const modal = new bootstrap.Modal(document.getElementById('serviceManModal'));
            modal.show();
        });
        
        document.getElementById('saveServiceManBtn').addEventListener('click', saveServiceMan);
        
        document.getElementById('serviceManModal').addEventListener('hidden.bs.modal', resetServiceManForm);
        
        document.getElementById('searchServiceMan').addEventListener('input', applyServiceManFilters);
        document.getElementById('filterServiceManService').addEventListener('change', applyServiceManFilters);
        document.getElementById('filterServiceManStatus').addEventListener('change', applyServiceManFilters);
        
        const serviceManImage = document.getElementById('serviceManImage');
        if (serviceManImage) {
            serviceManImage.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.getElementById('serviceManImagePreview').src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeManageServiceMan() {
        console.log('Initializing manage service man...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateServiceFilter();
        renderServiceMenTable(serviceMenList);
        renderAssignedJobsTable();
        attachFormEvents();
        console.log('Manage service man initialization complete');
    }
    
    initializeManageServiceMan();
    
});