// js/service_provider/booking-list.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Booking List JS loaded successfully');
    
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
    const serviceMen = [
        { id: 1, name: 'Mike Johnson', email: 'mike@email.com', mobile: '+33 111222333' },
        { id: 2, name: 'David Brown', email: 'david@email.com', mobile: '+33 444555666' },
        { id: 3, name: 'Tom Wilson', email: 'tom@email.com', mobile: '+33 777888999' },
        { id: 4, name: 'James Taylor', email: 'james@email.com', mobile: '+33 123123123' }
    ];
    
    // ============================================
    // ALL BOOKINGS DATA
    // ============================================
    const allBookings = [
        {
            bookingId: '#BK001',
            customerName: 'Alice Martin',
            customerEmail: 'alice@email.com',
            customerMobile: '+33 123456789',
            serviceName: 'Plumbing',
            serviceDateTime: '20/08/2024 10:00 AM',
            serviceMan: '-',
            serviceManDetails: null,
            paymentAmount: 150,
            paymentMethod: 'OM',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024 09:00 AM',
            bookingStatus: 'Pending',
            diagnosticIssue: null,
            requiredItems: null
        },
        {
            bookingId: '#BK002',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            serviceName: 'Pipe Repair',
            serviceDateTime: '21/08/2024 02:00 PM',
            serviceMan: 'David Brown',
            serviceManDetails: { name: 'David Brown', email: 'david@email.com', mobile: '+33 444555666' },
            paymentAmount: 200,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024 11:00 AM',
            bookingStatus: 'Confirmed',
            diagnosticIssue: { name: 'Leaking Pipe', description: 'Water leaking from kitchen sink pipe' },
            requiredItems: [{ name: 'PVC Pipe', quantity: 2, price: 25 }, { name: 'Pipe Sealant', quantity: 1, price: 15 }]
        },
        {
            bookingId: '#BK003',
            customerName: 'Sophie Laurent',
            customerEmail: 'sophie@email.com',
            customerMobile: '+33 456789123',
            serviceName: 'Water Heater',
            serviceDateTime: '22/08/2024 09:00 AM',
            serviceMan: '-',
            serviceManDetails: null,
            paymentAmount: 300,
            paymentMethod: 'VISA',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024 02:00 PM',
            bookingStatus: 'Pending',
            diagnosticIssue: null,
            requiredItems: null
        },
        {
            bookingId: '#BK004',
            customerName: 'Pierre Dubois',
            customerEmail: 'pierre@email.com',
            customerMobile: '+33 789123456',
            serviceName: 'Plumbing',
            serviceDateTime: '23/08/2024 11:00 AM',
            serviceMan: 'Tom Wilson',
            serviceManDetails: { name: 'Tom Wilson', email: 'tom@email.com', mobile: '+33 777888999' },
            paymentAmount: 450,
            paymentMethod: 'OM',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '19/08/2024 04:00 PM',
            bookingStatus: 'Upcoming',
            diagnosticIssue: { name: 'Clogged Drain', description: 'Bathroom drain completely clogged' },
            requiredItems: [{ name: 'Drain Snake', quantity: 1, price: 40 }, { name: 'Drain Cleaner', quantity: 2, price: 20 }]
        },
        {
            bookingId: '#BK005',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            serviceName: 'Pipe Repair',
            serviceDateTime: '18/08/2024 03:00 PM',
            serviceMan: 'Mike Johnson',
            serviceManDetails: { name: 'Mike Johnson', email: 'mike@email.com', mobile: '+33 111222333' },
            paymentAmount: 175,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '17/08/2024 10:00 AM',
            bookingStatus: 'Completed',
            diagnosticIssue: { name: 'Broken Valve', description: 'Main water valve needs replacement' },
            requiredItems: [{ name: 'Water Valve', quantity: 1, price: 50 }, { name: 'Teflon Tape', quantity: 1, price: 5 }]
        },
        {
            bookingId: '#BK006',
            customerName: 'Jean Dupont',
            customerEmail: 'jean@email.com',
            customerMobile: '+33 555666777',
            serviceName: 'Electrician',
            serviceDateTime: '25/08/2024 01:00 PM',
            serviceMan: '-',
            serviceManDetails: null,
            paymentAmount: 250,
            paymentMethod: 'VISA',
            paymentStatus: 'Pending',
            location: 'France',
            bookingAt: '20/08/2024 08:00 AM',
            bookingStatus: 'Pending',
            diagnosticIssue: null,
            requiredItems: null
        },
        {
            bookingId: '#BK007',
            customerName: 'Claire Fontaine',
            customerEmail: 'claire@email.com',
            customerMobile: '+33 888999000',
            serviceName: 'Carpentry',
            serviceDateTime: '26/08/2024 10:00 AM',
            serviceMan: 'James Taylor',
            serviceManDetails: { name: 'James Taylor', email: 'james@email.com', mobile: '+33 123123123' },
            paymentAmount: 600,
            paymentMethod: 'OM',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '20/08/2024 09:00 AM',
            bookingStatus: 'Confirmed',
            diagnosticIssue: { name: 'Broken Door Frame', description: 'Front door frame cracked' },
            requiredItems: [{ name: 'Wood Frame', quantity: 1, price: 120 }, { name: 'Screws Pack', quantity: 1, price: 10 }]
        },
        {
            bookingId: '#BK008',
            customerName: 'Michel Blanc',
            customerEmail: 'michel@email.com',
            customerMobile: '+33 444333222',
            serviceName: 'Painting',
            serviceDateTime: '15/08/2024 09:00 AM',
            serviceMan: 'David Brown',
            serviceManDetails: { name: 'David Brown', email: 'david@email.com', mobile: '+33 444555666' },
            paymentAmount: 400,
            paymentMethod: 'MoMo',
            paymentStatus: 'Success',
            location: 'France',
            bookingAt: '14/08/2024 12:00 PM',
            bookingStatus: 'Completed',
            diagnosticIssue: { name: 'Wall Cracks', description: 'Living room wall has cracks and peeling paint' },
            requiredItems: [{ name: 'Paint Gallon', quantity: 3, price: 40 }, { name: 'Putty', quantity: 2, price: 15 }]
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New booking request from Alice Martin', time: '10 min ago', unread: true },
        { id: 2, message: 'Booking #BK002 confirmed successfully', time: '1 hour ago', unread: false },
        { id: 3, message: 'Customer left a review for booking #BK005', time: '3 hours ago', unread: true }
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
        const filterService = document.getElementById('filterService');
        if (!filterService) return;
        
        const services = [...new Set(allBookings.map(b => b.serviceName))];
        
        let options = '<option value="">All Services</option>';
        services.forEach(service => {
            options += `<option value="${service}">${service}</option>`;
        });
        
        filterService.innerHTML = options;
    }
    
    // ============================================
    // GET BOOKINGS BY STATUS
    // ============================================
    function getBookingsByStatus(status) {
        return allBookings.filter(b => b.bookingStatus === status);
    }
    
    // ============================================
    // GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        const statusMap = {
            'Success': 'success',
            'Pending': 'pending',
            'Failed': 'danger',
            'Confirmed': 'success',
            'Upcoming': 'info',
            'Completed': 'success'
        };
        return statusMap[status] || 'secondary';
    }
    
    // ============================================
    // RENDER BOOKINGS TABLE
    // ============================================
    function renderBookingsTable(tableBodyId, bookings) {
        const tableBody = document.getElementById(tableBodyId);
        if (!tableBody) return;
        
        if (bookings.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="13" class="text-center text-muted py-4">
                        <i class="fas fa-inbox fa-2x mb-2 d-block"></i>
                        No bookings found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        bookings.forEach(booking => {
            const paymentStatusClass = getStatusClass(booking.paymentStatus);
            const bookingStatusClass = getStatusClass(booking.bookingStatus);
            
            html += `
                <tr>
                    <td><strong>${booking.bookingId}</strong></td>
                    <td>${booking.customerName}</td>
                    <td>${booking.customerEmail}</td>
                    <td>${booking.customerMobile}</td>
                    <td>${booking.serviceName}</td>
                    <td>${booking.serviceDateTime}</td>
                    <td>${booking.serviceMan}</td>
                    <td>$${booking.paymentAmount}</td>
                    <td><span class="status-badge status-${paymentStatusClass}">${booking.paymentStatus}</span></td>
                    <td>${booking.location}</td>
                    <td>${booking.bookingAt}</td>
                    <td><span class="status-badge status-${bookingStatusClass}">${booking.bookingStatus}</span></td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-info view-booking" data-booking-id="${booking.bookingId}" title="View">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${booking.bookingStatus === 'Pending' ? 
                                `<button class="btn btn-sm btn-outline-primary assign-service-man" data-booking-id="${booking.bookingId}" title="Assign Service Man">
                                    <i class="fas fa-user-plus"></i>
                                </button>` : ''
                            }
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        
        // Attach event listeners
        attachBookingEvents();
    }
    
    // ============================================
    // RENDER ALL TABLES
    // ============================================
    function renderAllTables() {
        const searchQuery = document.getElementById('searchBooking').value.toLowerCase().trim();
        const filterService = document.getElementById('filterService').value;
        const filterDate = document.getElementById('filterDate').value;
        
        // Filter bookings
        let filteredBookings = allBookings;
        
        if (searchQuery) {
            filteredBookings = filteredBookings.filter(b => 
                b.bookingId.toLowerCase().includes(searchQuery) ||
                b.customerName.toLowerCase().includes(searchQuery) ||
                b.serviceName.toLowerCase().includes(searchQuery)
            );
        }
        
        if (filterService) {
            filteredBookings = filteredBookings.filter(b => b.serviceName === filterService);
        }
        
        if (filterDate) {
            const now = new Date();
            filteredBookings = filteredBookings.filter(b => {
                const bookingDate = new Date(b.serviceDateTime);
                switch(filterDate) {
                    case 'today':
                        return bookingDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                        const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                        return bookingDate >= weekStart && bookingDate <= weekEnd;
                    case 'month':
                        return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            });
        }
        
        // Render each table
        const pending = filteredBookings.filter(b => b.bookingStatus === 'Pending');
        const confirmed = filteredBookings.filter(b => b.bookingStatus === 'Confirmed');
        const upcoming = filteredBookings.filter(b => b.bookingStatus === 'Upcoming');
        const completed = filteredBookings.filter(b => b.bookingStatus === 'Completed');
        
        renderBookingsTable('pendingBookingsTable', pending);
        renderBookingsTable('confirmedBookingsTable', confirmed);
        renderBookingsTable('upcomingBookingsTable', upcoming);
        renderBookingsTable('completedBookingsTable', completed);
        
        // Update counts
        updateCounts(pending.length, confirmed.length, upcoming.length, completed.length);
    }
    
    // ============================================
    // UPDATE COUNTS
    // ============================================
    function updateCounts(pending, confirmed, upcoming, completed) {
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('confirmedCount').textContent = confirmed;
        document.getElementById('upcomingCount').textContent = upcoming;
        document.getElementById('completedCount').textContent = completed;
        
        // Update sidebar badge
        const bookingBadge = document.getElementById('bookingBadge');
        if (bookingBadge) {
            bookingBadge.textContent = pending;
        }
    }
    
    // ============================================
    // ATTACH BOOKING EVENTS
    // ============================================
    function attachBookingEvents() {
        // View booking
        document.querySelectorAll('.view-booking').forEach(button => {
            button.removeEventListener('click', viewBookingHandler);
            button.addEventListener('click', viewBookingHandler);
        });
        
        // Assign service man
        document.querySelectorAll('.assign-service-man').forEach(button => {
            button.removeEventListener('click', assignServiceManHandler);
            button.addEventListener('click', assignServiceManHandler);
        });
    }
    
    function viewBookingHandler() {
        const bookingId = this.getAttribute('data-booking-id');
        viewBookingDetails(bookingId);
    }
    
    function assignServiceManHandler() {
        const bookingId = this.getAttribute('data-booking-id');
        openAssignModal(bookingId);
    }
    
    // ============================================
    // VIEW BOOKING DETAILS
    // ============================================
    function viewBookingDetails(bookingId) {
        const booking = allBookings.find(b => b.bookingId === bookingId);
        if (!booking) return;
        
        const paymentStatusClass = getStatusClass(booking.paymentStatus);
        const bookingStatusClass = getStatusClass(booking.bookingStatus);
        
        let itemsHtml = 'N/A';
        if (booking.requiredItems && booking.requiredItems.length > 0) {
            itemsHtml = '<ul class="list-group">';
            booking.requiredItems.forEach(item => {
                itemsHtml += `<li class="list-group-item d-flex justify-content-between">
                    ${item.name} x${item.quantity} 
                    <span>$${item.price * item.quantity}</span>
                </li>`;
            });
            itemsHtml += '</ul>';
        }
        
        const viewContent = document.getElementById('viewBookingContent');
        viewContent.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Customer Details</h6>
                    <div class="mb-2"><strong>Name:</strong> ${booking.customerName}</div>
                    <div class="mb-2"><strong>Email:</strong> ${booking.customerEmail}</div>
                    <div class="mb-2"><strong>Mobile:</strong> ${booking.customerMobile}</div>
                    
                    <h6 class="fw-bold mb-3 mt-4">Booking Details</h6>
                    <div class="mb-2"><strong>Service:</strong> ${booking.serviceName}</div>
                    <div class="mb-2"><strong>Date & Time:</strong> ${booking.serviceDateTime}</div>
                    <div class="mb-2"><strong>Location:</strong> ${booking.location}</div>
                    <div class="mb-2"><strong>Status:</strong> <span class="status-badge status-${bookingStatusClass}">${booking.bookingStatus}</span></div>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold mb-3">Payment Details</h6>
                    <div class="mb-2"><strong>Amount:</strong> $${booking.paymentAmount}</div>
                    <div class="mb-2"><strong>Method:</strong> ${booking.paymentMethod}</div>
                    <div class="mb-2"><strong>Status:</strong> <span class="status-badge status-${paymentStatusClass}">${booking.paymentStatus}</span></div>
                    
                    <h6 class="fw-bold mb-3 mt-4">Service Man</h6>
                    <div class="mb-2"><strong>Name:</strong> ${booking.serviceManDetails ? booking.serviceManDetails.name : 'Not Assigned'}</div>
                    ${booking.serviceManDetails ? 
                        `<div class="mb-2"><strong>Email:</strong> ${booking.serviceManDetails.email}</div>
                         <div class="mb-2"><strong>Mobile:</strong> ${booking.serviceManDetails.mobile}</div>` : ''}
                    
                    <h6 class="fw-bold mb-3 mt-4">Diagnostic Issue</h6>
                    <div class="mb-2"><strong>Name:</strong> ${booking.diagnosticIssue ? booking.diagnosticIssue.name : 'Not yet diagnosed'}</div>
                    <div class="mb-2"><strong>Description:</strong> ${booking.diagnosticIssue ? booking.diagnosticIssue.description : 'N/A'}</div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h6 class="fw-bold mb-3">Required Items</h6>
                    ${itemsHtml}
                </div>
            </div>
        `;
        
        const viewModal = new bootstrap.Modal(document.getElementById('viewBookingModal'));
        viewModal.show();
    }
    
    // ============================================
    // OPEN ASSIGN MODAL
    // ============================================
    function openAssignModal(bookingId) {
        document.getElementById('assignBookingId').value = bookingId;
        
        // Populate service men dropdown
        const serviceManSelect = document.getElementById('serviceManSelect');
        let options = '<option value="">Select Service Man</option>';
        serviceMen.forEach(man => {
            options += `<option value="${man.id}">${man.name} (${man.mobile})</option>`;
        });
        serviceManSelect.innerHTML = options;
        
        const assignModal = new bootstrap.Modal(document.getElementById('assignServiceManModal'));
        assignModal.show();
    }
    
    // ============================================
    // CONFIRM ASSIGN
    // ============================================
    function confirmAssign() {
        const bookingId = document.getElementById('assignBookingId').value;
        const serviceManId = document.getElementById('serviceManSelect').value;
        const note = document.getElementById('assignNote').value;
        
        if (!serviceManId) {
            alert('Please select a service man.');
            return;
        }
        
        const booking = allBookings.find(b => b.bookingId === bookingId);
        const serviceMan = serviceMen.find(m => m.id === parseInt(serviceManId));
        
        if (booking && serviceMan) {
            booking.serviceMan = serviceMan.name;
            booking.serviceManDetails = {
                name: serviceMan.name,
                email: serviceMan.email,
                mobile: serviceMan.mobile
            };
            booking.bookingStatus = 'Confirmed';
            
            // Close modal
            const assignModal = bootstrap.Modal.getInstance(document.getElementById('assignServiceManModal'));
            assignModal.hide();
            
            // Refresh tables
            renderAllTables();
            
            showToast(`Service Man "${serviceMan.name}" assigned to booking ${bookingId}`, 'success');
        }
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
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFilterEvents() {
        const searchBooking = document.getElementById('searchBooking');
        const filterService = document.getElementById('filterService');
        const filterDate = document.getElementById('filterDate');
        
        if (searchBooking) searchBooking.addEventListener('input', renderAllTables);
        if (filterService) filterService.addEventListener('change', renderAllTables);
        if (filterDate) filterDate.addEventListener('change', renderAllTables);
    }
    
    function attachModalEvents() {
        const confirmAssignBtn = document.getElementById('confirmAssignBtn');
        if (confirmAssignBtn) {
            confirmAssignBtn.addEventListener('click', confirmAssign);
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeBookingList() {
        console.log('Initializing booking list...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateServiceFilter();
        renderAllTables();
        attachFilterEvents();
        attachModalEvents();
        console.log('Booking list initialization complete');
    }
    
    initializeBookingList();
    
});