// js/seller/my-items.js

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('My Items JS loaded successfully');
    
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
    // SHOP DATA
    // ============================================
    const shopData = {
        shopName: 'Paris Hardware Store',
        sellerName: 'Pierre Martin',
        shopType: 'Hardware',
        profileImage: 'https://via.placeholder.com/60'
    };
    
    // ============================================
    // ITEMS DATA
    // ============================================
    let itemsList = [
        {
            id: 1,
            itemId: 'ITM001',
            itemName: 'PVC Pipe 2 inch',
            itemPrice: 25,
            stockQuantity: 100,
            category: 'Plumbing',
            subCategory: 'Pipes',
            discountType: '',
            discountValue: 0,
            description: 'High quality PVC pipe for plumbing applications',
            image: 'https://via.placeholder.com/50',
            status: 'Active',
            createdAt: '2024-08-15'
        },
        {
            id: 2,
            itemId: 'ITM002',
            itemName: 'Copper Wire 2.5mm',
            itemPrice: 45,
            stockQuantity: 200,
            category: 'Electrical',
            subCategory: 'Wires',
            discountType: 'Percentage',
            discountValue: 10,
            description: '2.5mm copper electrical wire, 100m roll',
            image: 'https://via.placeholder.com/50',
            status: 'Active',
            createdAt: '2024-08-16'
        },
        {
            id: 3,
            itemId: 'ITM003',
            itemName: 'Wall Paint White',
            itemPrice: 35,
            stockQuantity: 50,
            category: 'Paint',
            subCategory: '',
            discountType: 'Amount',
            discountValue: 5,
            description: 'Premium white wall paint, 5L bucket',
            image: 'https://via.placeholder.com/50',
            status: 'Active',
            createdAt: '2024-08-17'
        },
        {
            id: 4,
            itemId: 'ITM004',
            itemName: 'Hammer Set',
            itemPrice: 30,
            stockQuantity: 75,
            category: 'Tools',
            subCategory: 'Tools',
            discountType: '',
            discountValue: 0,
            description: 'Professional hammer set with 3 different sizes',
            image: 'https://via.placeholder.com/50',
            status: 'Active',
            createdAt: '2024-08-18'
        },
        {
            id: 5,
            itemId: 'ITM005',
            itemName: 'Cement Bag 50kg',
            itemPrice: 12,
            stockQuantity: 300,
            category: 'Building Materials',
            subCategory: '',
            discountType: 'Percentage',
            discountValue: 15,
            description: 'Portland cement 50kg bag for construction',
            image: 'https://via.placeholder.com/50',
            status: 'Inactive',
            createdAt: '2024-08-19'
        },
        {
            id: 6,
            itemId: 'ITM006',
            itemName: 'Pipe Fittings Set',
            itemPrice: 18,
            stockQuantity: 150,
            category: 'Plumbing',
            subCategory: 'Fittings',
            discountType: '',
            discountValue: 0,
            description: 'Complete set of pipe fittings including elbows, tees, and couplings',
            image: 'https://via.placeholder.com/50',
            status: 'Active',
            createdAt: '2024-08-20'
        }
    ];
    
    // ============================================
    // NOTIFICATIONS DATA
    // ============================================
    const notifications = [
        { id: 1, message: 'Item "PVC Pipe 2 inch" stock is running low', time: '1 hour ago', unread: true },
        { id: 2, message: 'New item added to your inventory', time: '3 hours ago', unread: false }
    ];
    
    // ============================================
    // POPULATE SIDEBAR PROFILE
    // ============================================
    function populateSidebarProfile() {
        document.getElementById('sidebarShopName').textContent = shopData.shopName;
        document.getElementById('sidebarShopType').textContent = shopData.shopType;
        document.getElementById('sidebarProfileImg').src = shopData.profileImage;
    }
    
    // ============================================
    // POPULATE TOP BAR
    // ============================================
    function populateTopBar() {
        document.getElementById('topBarUserName').textContent = shopData.sellerName;
        document.getElementById('topBarUserImg').src = shopData.profileImage;
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
            notifications.forEach(n => {
                html += `<li><a class="dropdown-item ${n.unread ? 'fw-bold' : ''}" href="#"><small class="text-muted d-block">${n.time}</small>${n.message}</a></li>`;
            });
            html += '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item text-center" href="#">View All</a></li>';
            notificationList.innerHTML = html;
        }
    }
    
    // ============================================
    // POPULATE CATEGORY FILTER
    // ============================================
    function populateCategoryFilter() {
        const filterCategory = document.getElementById('filterCategory');
        const categories = [...new Set(itemsList.map(i => i.category))];
        let options = '<option value="">All Categories</option>';
        categories.forEach(c => { options += `<option value="${c}">${c}</option>`; });
        filterCategory.innerHTML = options;
    }
    
    // ============================================
    // CALCULATE TOTAL PRICE
    // ============================================
    function calculateTotalPrice() {
        const itemPrice = parseFloat(document.getElementById('itemPrice').value) || 0;
        const stockQuantity = parseInt(document.getElementById('stockQuantity').value) || 0;
        const discountType = document.getElementById('discountType').value;
        const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
        
        let total = itemPrice * stockQuantity;
        
        if (discountType === 'Amount') {
            total -= discountValue;
        } else if (discountType === 'Percentage') {
            total -= (total * discountValue / 100);
        }
        
        document.getElementById('totalPrice').value = '$' + total.toFixed(2);
    }
    
    // ============================================
    // GET STATUS CLASS
    // ============================================
    function getStatusClass(status) {
        return status === 'Active' ? 'success' : 'inactive';
    }
    
    // ============================================
    // RENDER ITEMS TABLE
    // ============================================
    function renderItemsTable(filteredList) {
        const tableBody = document.getElementById('itemsTableBody');
        if (!tableBody) return;
        
        if (filteredList.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10" class="text-center text-muted py-4"><i class="fas fa-box-open fa-2x mb-2 d-block"></i>No items found</td></tr>`;
            return;
        }
        
        let html = '';
        filteredList.forEach(item => {
            const totalPrice = item.itemPrice * item.stockQuantity;
            const discountText = item.discountType ? (item.discountType === 'Percentage' ? item.discountValue + '%' : '$' + item.discountValue) : '-';
            const statusClass = getStatusClass(item.status);
            
            html += `
                <tr>
                    <td><strong>${item.itemId}</strong></td>
                    <td><img src="${item.image}" alt="${item.itemName}" class="rounded" style="width: 45px; height: 45px; object-fit: cover;"></td>
                    <td>${item.itemName}</td>
                    <td>$${item.itemPrice}</td>
                    <td>${item.stockQuantity}</td>
                    <td>$${totalPrice.toFixed(2)}</td>
                    <td>${discountText}</td>
                    <td>${item.category}</td>
                    <td><span class="status-badge status-${statusClass}">${item.status}</span></td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-outline-primary edit-item" data-id="${item.id}" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-outline-danger delete-item" data-id="${item.id}" title="Delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        attachTableEvents();
    }
    
    // ============================================
    // ATTACH TABLE EVENTS
    // ============================================
    function attachTableEvents() {
        document.querySelectorAll('.edit-item').forEach(btn => {
            btn.addEventListener('click', function() { editItem(parseInt(this.getAttribute('data-id'))); });
        });
        document.querySelectorAll('.delete-item').forEach(btn => {
            btn.addEventListener('click', function() { deleteItem(parseInt(this.getAttribute('data-id'))); });
        });
    }
    
    // ============================================
    // EDIT ITEM
    // ============================================
    function editItem(id) {
        const item = itemsList.find(i => i.id === id);
        if (!item) return;
        
        document.getElementById('itemModalTitle').textContent = 'Edit Item';
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.itemName;
        document.getElementById('itemPrice').value = item.itemPrice;
        document.getElementById('stockQuantity').value = item.stockQuantity;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemSubCategory').value = item.subCategory;
        document.getElementById('discountType').value = item.discountType;
        document.getElementById('discountValue').value = item.discountValue;
        document.getElementById('itemDescription').value = item.description;
        document.getElementById('itemImagePreview').src = item.image;
        
        if (item.discountType) {
            document.getElementById('discountValueContainer').style.display = 'block';
        }
        calculateTotalPrice();
        
        const modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();
    }
    
    // ============================================
    // DELETE ITEM
    // ============================================
    function deleteItem(id) {
        const item = itemsList.find(i => i.id === id);
        if (!item) return;
        
        if (confirm(`Are you sure you want to delete "${item.itemName}"?`)) {
            itemsList = itemsList.filter(i => i.id !== id);
            populateCategoryFilter();
            applyFilters();
            showToast(`"${item.itemName}" deleted successfully.`, 'danger');
        }
    }
    
    // ============================================
    // SAVE ITEM
    // ============================================
    function saveItem() {
        const itemId = document.getElementById('itemId').value;
        const itemName = document.getElementById('itemName').value.trim();
        const itemPrice = document.getElementById('itemPrice').value;
        const stockQuantity = document.getElementById('stockQuantity').value;
        const category = document.getElementById('itemCategory').value;
        
        if (!itemName || !itemPrice || !stockQuantity || !category) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const itemData = {
            itemName: itemName,
            itemPrice: parseFloat(itemPrice),
            stockQuantity: parseInt(stockQuantity),
            category: category,
            subCategory: document.getElementById('itemSubCategory').value,
            discountType: document.getElementById('discountType').value,
            discountValue: parseFloat(document.getElementById('discountValue').value) || 0,
            description: document.getElementById('itemDescription').value
        };
        
        if (itemId) {
            const item = itemsList.find(i => i.id === parseInt(itemId));
            if (item) {
                Object.assign(item, itemData);
                showToast(`"${itemName}" updated successfully.`, 'success');
            }
        } else {
            const newItem = {
                id: Date.now(),
                itemId: 'ITM' + String(itemsList.length + 1).padStart(3, '0'),
                image: 'https://via.placeholder.com/50',
                status: 'Active',
                createdAt: new Date().toISOString().split('T')[0],
                ...itemData
            };
            itemsList.push(newItem);
            showToast(`"${itemName}" added successfully.`, 'success');
        }
        
        bootstrap.Modal.getInstance(document.getElementById('itemModal')).hide();
        resetItemForm();
        populateCategoryFilter();
        applyFilters();
    }
    
    // ============================================
    // RESET ITEM FORM
    // ============================================
    function resetItemForm() {
        document.getElementById('itemId').value = '';
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('stockQuantity').value = '';
        document.getElementById('itemCategory').value = '';
        document.getElementById('itemSubCategory').value = '';
        document.getElementById('discountType').value = '';
        document.getElementById('discountValue').value = '';
        document.getElementById('itemDescription').value = '';
        document.getElementById('totalPrice').value = '';
        document.getElementById('itemImagePreview').src = 'https://via.placeholder.com/150';
        document.getElementById('itemModalTitle').textContent = 'Add New Item';
        document.getElementById('discountValueContainer').style.display = 'none';
    }
    
    // ============================================
    // APPLY FILTERS
    // ============================================
    function applyFilters() {
        const search = document.getElementById('searchItem').value.toLowerCase().trim();
        const category = document.getElementById('filterCategory').value;
        const status = document.getElementById('filterStatus').value;
        
        let filtered = itemsList;
        if (search) filtered = filtered.filter(i => i.itemName.toLowerCase().includes(search));
        if (category) filtered = filtered.filter(i => i.category === category);
        if (status === 'active') filtered = filtered.filter(i => i.status === 'Active');
        if (status === 'inactive') filtered = filtered.filter(i => i.status === 'Inactive');
        
        renderItemsTable(filtered);
    }
    
    // ============================================
    // SHOW TOAST
    // ============================================
    function showToast(message, type) {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999;';
            document.body.appendChild(container);
        }
        const bg = type === 'success' ? 'bg-success' : 'bg-danger';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-trash';
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white ${bg} border-0`;
        toast.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="fas ${icon} me-2"></i>${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
        container.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    function attachFormEvents() {
        document.getElementById('addItemBtn').addEventListener('click', () => {
            resetItemForm();
            new bootstrap.Modal(document.getElementById('itemModal')).show();
        });
        document.getElementById('saveItemBtn').addEventListener('click', saveItem);
        document.getElementById('itemModal').addEventListener('hidden.bs.modal', resetItemForm);
        document.getElementById('searchItem').addEventListener('input', applyFilters);
        document.getElementById('filterCategory').addEventListener('change', applyFilters);
        document.getElementById('filterStatus').addEventListener('change', applyFilters);
        
        document.getElementById('discountType').addEventListener('change', function() {
            document.getElementById('discountValueContainer').style.display = this.value ? 'block' : 'none';
            if (!this.value) document.getElementById('discountValue').value = '';
            calculateTotalPrice();
        });
        
        ['itemPrice', 'stockQuantity', 'discountValue'].forEach(id => {
            document.getElementById(id).addEventListener('input', calculateTotalPrice);
        });
        
        document.getElementById('itemImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(ev) { document.getElementById('itemImagePreview').src = ev.target.result; };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ============================================
    // INITIALIZE
    // ============================================
    function initialize() {
        populateSidebarProfile();
        populateTopBar();
        populateNotifications();
        populateCategoryFilter();
        renderItemsTable(itemsList);
        attachFormEvents();
    }
    
    initialize();
});