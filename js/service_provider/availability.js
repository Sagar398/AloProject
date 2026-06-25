// js/service_provider/availability.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Availability JS loaded successfully');
    
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
    // AVAILABILITY DATA
    // ============================================
    let availabilityList = [
        {
            id: 1,
            availabilityId: 'AVL001',
            availableDay: 'Tuesday',
            availableDate: '2024-08-20',
            startTime: '08:00',
            endTime: '12:00',
            specialCondition: '',
            status: 'Active'
        },
        {
            id: 2,
            availabilityId: 'AVL002',
            availableDay: 'Tuesday',
            availableDate: '2024-08-20',
            startTime: '13:00',
            endTime: '17:00',
            specialCondition: '',
            status: 'Active'
        },
        {
            id: 3,
            availabilityId: 'AVL003',
            availableDay: 'Wednesday',
            availableDate: '2024-08-21',
            startTime: '09:00',
            endTime: '18:00',
            specialCondition: '',
            status: 'Active'
        },
        {
            id: 4,
            availabilityId: 'AVL004',
            availableDay: 'Thursday',
            availableDate: '2024-08-22',
            startTime: '08:00',
            endTime: '14:00',
            specialCondition: 'Half day only',
            status: 'Active'
        },
        {
            id: 5,
            availabilityId: 'AVL005',
            availableDay: 'Friday',
            availableDate: '2024-08-23',
            startTime: '10:00',
            endTime: '16:00',
            specialCondition: '',
            status: 'Inactive'
        },
        {
            id: 6,
            availabilityId: 'AVL006',
            availableDay: 'Sunday',
            availableDate: '2024-08-25',
            startTime: '08:00',
            endTime: '12:00',
            specialCondition: 'Public Holiday - Limited hours',
            status: 'Active'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New availability slot added successfully', time: '30 min ago', unread: true },
        { id: 2, message: 'Reminder: Update your availability for next week', time: '2 hours ago', unread: false }
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
    // FORMAT DATE FOR DISPLAY
    // ============================================
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
    
    // ============================================
    // FORMAT TIME FOR DISPLAY
    // ============================================
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minutes} ${ampm}`;
    }
    
    // ============================================
    // GET DAY NAME FROM DATE
    // ============================================
    function getDayNameFromDate(dateString) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        return days[date.getDay()];
    }
    
    // ============================================
    // AUTO-FILL DAY WHEN DATE IS SELECTED
    // ============================================
    function autoFillDay() {
        const availableDate = document.getElementById('availableDate');
        const availableDay = document.getElementById('availableDay');
        
        if (availableDate && availableDay && availableDate.value) {
            const dayName = getDayNameFromDate(availableDate.value);
            availableDay.value = dayName;
        }
    }
    
    // ============================================
    // RENDER AVAILABILITY TABLE
    // ============================================
    function renderAvailabilityTable() {
        const tableBody = document.getElementById('availabilityTableBody');
        if (!tableBody) return;
        
        if (availabilityList.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-muted py-4">
                        <i class="fas fa-calendar-times fa-2x mb-2 d-block"></i>
                        No availability slots set. Click "Add Availability" to create one.
                    </td>
                </tr>
            `;
            return;
        }
        
        // Sort by date and start time
        const sortedList = [...availabilityList].sort((a, b) => {
            if (a.availableDate === b.availableDate) {
                return a.startTime.localeCompare(b.startTime);
            }
            return a.availableDate.localeCompare(b.availableDate);
        });
        
        let html = '';
        sortedList.forEach(slot => {
            const statusClass = slot.status === 'Active' ? 'status-success' : 'status-inactive';
            
            html += `
                <tr>
                    <td><strong>${slot.availabilityId}</strong></td>
                    <td>${slot.availableDay}</td>
                    <td>${formatDate(slot.availableDate)}</td>
                    <td>${formatTime(slot.startTime)}</td>
                    <td>${formatTime(slot.endTime)}</td>
                    <td>${slot.specialCondition || '-'}</td>
                    <td>
                        <span class="status-badge ${statusClass}">${slot.status}</span>
                    </td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary edit-availability" data-id="${slot.id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-availability" data-id="${slot.id}" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        
        // Attach event listeners
        attachTableEvents();
    }
    
    // ============================================
    // ATTACH TABLE EVENTS
    // ============================================
    function attachTableEvents() {
        // Edit availability
        document.querySelectorAll('.edit-availability').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editAvailability(id);
            });
        });
        
        // Delete availability
        document.querySelectorAll('.delete-availability').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteAvailability(id);
            });
        });
    }
    
    // ============================================
    // EDIT AVAILABILITY
    // ============================================
    function editAvailability(id) {
        const slot = availabilityList.find(a => a.id === id);
        if (!slot) return;
        
        document.getElementById('availabilityModalTitle').textContent = 'Edit Availability';
        document.getElementById('availabilityId').value = slot.id;
        document.getElementById('availableDay').value = slot.availableDay;
        document.getElementById('availableDate').value = slot.availableDate;
        document.getElementById('startTime').value = slot.startTime;
        document.getElementById('endTime').value = slot.endTime;
        document.getElementById('specialCondition').value = slot.specialCondition || '';
        
        const modal = new bootstrap.Modal(document.getElementById('availabilityModal'));
        modal.show();
    }
    
    // ============================================
    // DELETE AVAILABILITY
    // ============================================
    function deleteAvailability(id) {
        const slot = availabilityList.find(a => a.id === id);
        if (!slot) return;
        
        if (confirm(`Are you sure you want to delete availability slot ${slot.availabilityId} for ${slot.availableDay} ${formatDate(slot.availableDate)}?`)) {
            availabilityList = availabilityList.filter(a => a.id !== id);
            renderAvailabilityTable();
            showToast(`Availability slot ${slot.availabilityId} deleted successfully.`, 'danger');
        }
    }
    
    // ============================================
    // SAVE AVAILABILITY (ADD/EDIT)
    // ============================================
    function saveAvailability() {
        const availabilityId = document.getElementById('availabilityId').value;
        const availableDay = document.getElementById('availableDay').value;
        const availableDate = document.getElementById('availableDate').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const specialCondition = document.getElementById('specialCondition').value;
        
        // Validation
        if (!availableDay) {
            alert('Please select an available day.');
            return;
        }
        
        if (!availableDate) {
            alert('Please select an available date.');
            return;
        }
        
        if (!startTime) {
            alert('Please select a start time.');
            return;
        }
        
        if (!endTime) {
            alert('Please select an end time.');
            return;
        }
        
        if (startTime >= endTime) {
            alert('End time must be after start time.');
            return;
        }
        
        // Check for overlapping slots on the same date
        const overlapping = availabilityList.filter(a => {
            if (availabilityId && a.id === parseInt(availabilityId)) return false;
            if (a.availableDate !== availableDate) return false;
            return (startTime < a.endTime && endTime > a.startTime);
        });
        
        if (overlapping.length > 0) {
            alert('This time slot overlaps with an existing availability. Please choose a different time.');
            return;
        }
        
        if (availabilityId) {
            // Edit existing
            const slot = availabilityList.find(a => a.id === parseInt(availabilityId));
            if (slot) {
                slot.availableDay = availableDay;
                slot.availableDate = availableDate;
                slot.startTime = startTime;
                slot.endTime = endTime;
                slot.specialCondition = specialCondition;
                showToast(`Availability slot ${slot.availabilityId} updated successfully.`, 'success');
            }
        } else {
            // Add new
            const newSlot = {
                id: Date.now(),
                availabilityId: 'AVL' + String(availabilityList.length + 1).padStart(3, '0'),
                availableDay: availableDay,
                availableDate: availableDate,
                startTime: startTime,
                endTime: endTime,
                specialCondition: specialCondition,
                status: 'Active'
            };
            
            availabilityList.push(newSlot);
            showToast(`New availability slot ${newSlot.availabilityId} added successfully.`, 'success');
        }
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('availabilityModal'));
        modal.hide();
        
        // Refresh table
        renderAvailabilityTable();
        
        // Reset form
        resetAvailabilityForm();
    }
    
    // ============================================
    // RESET AVAILABILITY FORM
    // ============================================
    function resetAvailabilityForm() {
        document.getElementById('availabilityId').value = '';
        document.getElementById('availableDay').value = '';
        document.getElementById('availableDate').value = '';
        document.getElementById('startTime').value = '';
        document.getElementById('endTime').value = '';
        document.getElementById('specialCondition').value = '';
        document.getElementById('availabilityModalTitle').textContent = 'Add Availability';
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
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFormEvents() {
        // Add availability button
        const addAvailabilityBtn = document.getElementById('addAvailabilityBtn');
        if (addAvailabilityBtn) {
            addAvailabilityBtn.addEventListener('click', function() {
                resetAvailabilityForm();
                const modal = new bootstrap.Modal(document.getElementById('availabilityModal'));
                modal.show();
            });
        }
        
        // Save button
        const saveAvailabilityBtn = document.getElementById('saveAvailabilityBtn');
        if (saveAvailabilityBtn) {
            saveAvailabilityBtn.addEventListener('click', saveAvailability);
        }
        
        // Reset form when modal is hidden
        const availabilityModal = document.getElementById('availabilityModal');
        if (availabilityModal) {
            availabilityModal.addEventListener('hidden.bs.modal', resetAvailabilityForm);
        }
        
        // Set min date to today
        const availableDateInput = document.getElementById('availableDate');
        if (availableDateInput) {
            const today = new Date().toISOString().split('T')[0];
            availableDateInput.setAttribute('min', today);
            
            // Auto-fill day when date changes
            availableDateInput.addEventListener('change', autoFillDay);
        }
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeAvailability() {
        console.log('Initializing availability...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        renderAvailabilityTable();
        attachFormEvents();
        console.log('Availability initialization complete');
    }
    
    initializeAvailability();
    
});