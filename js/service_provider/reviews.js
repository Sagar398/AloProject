// js/service_provider/reviews.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Reviews JS loaded successfully');
    
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
    // REVIEWS DATA
    // ============================================
    const reviewsList = [
        {
            id: 1,
            reviewId: 'REV001',
            customerName: 'Alice Martin',
            customerEmail: 'alice@email.com',
            customerMobile: '+33 123456789',
            rating: 5,
            reviewFor: 'Service Provider',
            reviewForName: 'John Doe',
            description: 'Excellent service! John was very professional and fixed the plumbing issue quickly. Highly recommended!'
        },
        {
            id: 2,
            reviewId: 'REV002',
            customerName: 'Robert Smith',
            customerEmail: 'robert@email.com',
            customerMobile: '+33 987654321',
            rating: 4,
            reviewFor: 'Service Man',
            reviewForName: 'David Brown',
            description: 'David did a great job repairing the pipe. He was punctual and explained everything clearly.'
        },
        {
            id: 3,
            reviewId: 'REV003',
            customerName: 'Sophie Laurent',
            customerEmail: 'sophie@email.com',
            customerMobile: '+33 456789123',
            rating: 5,
            reviewFor: 'Service Provider',
            reviewForName: 'John Doe',
            description: 'Very satisfied with the overall service. The booking process was smooth and the service was top-notch.'
        },
        {
            id: 4,
            reviewId: 'REV004',
            customerName: 'Pierre Dubois',
            customerEmail: 'pierre@email.com',
            customerMobile: '+33 789123456',
            rating: 4,
            reviewFor: 'Service Man',
            reviewForName: 'Tom Wilson',
            description: 'Tom was knowledgeable and efficient. He fixed the clogged drain in no time. Good work!'
        },
        {
            id: 5,
            reviewId: 'REV005',
            customerName: 'Marie Claire',
            customerEmail: 'marie@email.com',
            customerMobile: '+33 321654987',
            rating: 5,
            reviewFor: 'Service Man',
            reviewForName: 'Mike Johnson',
            description: 'Mike was amazing! He replaced the water valve perfectly and cleaned up after the job. Will definitely use again.'
        },
        {
            id: 6,
            reviewId: 'REV006',
            customerName: 'Jean Dupont',
            customerEmail: 'jean@email.com',
            customerMobile: '+33 555666777',
            rating: 3,
            reviewFor: 'Service Provider',
            reviewForName: 'John Doe',
            description: 'Service was okay but took longer than expected. The quality of work was good though.'
        },
        {
            id: 7,
            reviewId: 'REV007',
            customerName: 'Claire Fontaine',
            customerEmail: 'claire@email.com',
            customerMobile: '+33 888999000',
            rating: 5,
            reviewFor: 'Service Man',
            reviewForName: 'James Taylor',
            description: 'James crafted a beautiful custom door frame. His carpentry skills are exceptional. Very happy with the result!'
        },
        {
            id: 8,
            reviewId: 'REV008',
            customerName: 'Michel Blanc',
            customerEmail: 'michel@email.com',
            customerMobile: '+33 444333222',
            rating: 4,
            reviewFor: 'Service Provider',
            reviewForName: 'John Doe',
            description: 'Good overall experience. The team was responsive and the pricing was fair.'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'New 5-star review from Alice Martin', time: '10 min ago', unread: true },
        { id: 2, message: 'Your overall rating has increased to 4.5', time: '1 hour ago', unread: false }
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
    // UPDATE SUMMARY COUNTS
    // ============================================
    function updateSummaryCounts() {
        const totalReviews = reviewsList.length;
        const serviceProviderCount = reviewsList.filter(r => r.reviewFor === 'Service Provider').length;
        const serviceManCount = reviewsList.filter(r => r.reviewFor === 'Service Man').length;
        
        document.getElementById('totalReviews').textContent = totalReviews;
        document.getElementById('serviceProviderReviews').textContent = serviceProviderCount;
        document.getElementById('serviceManReviews').textContent = serviceManCount;
    }
    
    // ============================================
    // RENDER STARS
    // ============================================
    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star text-warning"></i>';
            } else if (i - 0.5 === rating) {
                stars += '<i class="fas fa-star-half-alt text-warning"></i>';
            } else {
                stars += '<i class="far fa-star text-warning"></i>';
            }
        }
        return stars;
    }
    
    // ============================================
    // RENDER REVIEWS TABLE
    // ============================================
    function renderReviewsTable(filteredList) {
        const tableBody = document.getElementById('reviewsTableBody');
        if (!tableBody) return;
        
        if (filteredList.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        <i class="fas fa-star-half-alt fa-2x mb-2 d-block"></i>
                        No reviews found
                    </td>
                </tr>
            `;
            return;
        }
        
        let html = '';
        filteredList.forEach(review => {
            html += `
                <tr>
                    <td><strong>${review.reviewId}</strong></td>
                    <td>${review.customerName}</td>
                    <td>${review.customerEmail}</td>
                    <td>${review.customerMobile}</td>
                    <td>
                        <div class="text-nowrap">
                            ${renderStars(review.rating)}
                            <span class="ms-1">(${review.rating})</span>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${review.reviewFor === 'Service Provider' ? 'status-info' : 'status-warning'}" style="background: ${review.reviewFor === 'Service Provider' ? '#d1ecf1' : '#fff3cd'}; color: ${review.reviewFor === 'Service Provider' ? '#0c5460' : '#856404'};">
                            ${review.reviewFor}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-info view-review" data-id="${review.id}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        
        // Attach event listeners
        document.querySelectorAll('.view-review').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                viewReviewDetails(id);
            });
        });
    }
    
    // ============================================
    // VIEW REVIEW DETAILS
    // ============================================
    function viewReviewDetails(id) {
        const review = reviewsList.find(r => r.id === id);
        if (!review) return;
        
        const content = document.getElementById('viewReviewContent');
        content.innerHTML = `
            <div class="row mb-3">
                <div class="col-12">
                    <h6 class="fw-bold">Customer Details</h6>
                    <div class="mb-1"><strong>Name:</strong> ${review.customerName}</div>
                    <div class="mb-1"><strong>Email:</strong> ${review.customerEmail}</div>
                    <div class="mb-1"><strong>Mobile:</strong> ${review.customerMobile}</div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <h6 class="fw-bold">Review For</h6>
                    <div class="mb-1"><strong>Type:</strong> ${review.reviewFor}</div>
                    <div class="mb-1"><strong>Name:</strong> ${review.reviewForName}</div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <h6 class="fw-bold">Rating Details</h6>
                    <div class="mb-1">
                        <strong>Rating:</strong> 
                        <span class="ms-1">${renderStars(review.rating)} (${review.rating}/5)</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <h6 class="fw-bold">Review Description</h6>
                    <p class="mb-0">${review.description || 'No description provided.'}</p>
                </div>
            </div>
        `;
        
        const modal = new bootstrap.Modal(document.getElementById('viewReviewModal'));
        modal.show();
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const searchQuery = document.getElementById('searchReview').value.toLowerCase().trim();
        const filterReviewFor = document.getElementById('filterReviewFor').value;
        const filterRating = document.getElementById('filterRating').value;
        
        let filtered = reviewsList;
        
        if (searchQuery) {
            filtered = filtered.filter(r => 
                r.customerName.toLowerCase().includes(searchQuery) ||
                r.customerEmail.toLowerCase().includes(searchQuery) ||
                r.reviewForName.toLowerCase().includes(searchQuery)
            );
        }
        
        if (filterReviewFor !== 'all') {
            filtered = filtered.filter(r => r.reviewFor === filterReviewFor);
        }
        
        if (filterRating !== 'all') {
            filtered = filtered.filter(r => r.rating === parseInt(filterRating));
        }
        
        renderReviewsTable(filtered);
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
    function attachFilterEvents() {
        document.getElementById('searchReview').addEventListener('input', applyFilters);
        document.getElementById('filterReviewFor').addEventListener('change', applyFilters);
        document.getElementById('filterRating').addEventListener('change', applyFilters);
    }
    
    // ============================================
    // INITIALIZE ALL
    // ============================================
    function initializeReviews() {
        console.log('Initializing reviews...');
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        updateSummaryCounts();
        renderReviewsTable(reviewsList);
        attachFilterEvents();
        console.log('Reviews initialization complete');
    }
    
    initializeReviews();
    
});