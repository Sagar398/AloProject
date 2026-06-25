/* ============================================
   Inventory Management JavaScript
   For: manage-inventory.html
   ============================================ */

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : (type === 'danger' ? 'danger' : 'info')} border-0`;
    toast.setAttribute('role', 'alert');
    toast.style.marginTop = '10px';
    toast.style.minWidth = '250px';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : (type === 'danger' ? 'fa-exclamation-circle' : 'fa-info-circle')} me-2"></i>
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

function formatDateShort(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
}

function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================
// SAMPLE DATA
// ============================================

// Shops data for dropdown
let shopsData = [
    { id: 1, name: 'Tool World', email: 'sales@toolworld.com', mobile: '+1 234 567 8910', address: '123 Main St, New York, USA' },
    { id: 2, name: 'Electro Hub', email: 'info@electrohub.com', mobile: '+1 234 567 8911', address: '456 Oak Ave, Los Angeles, USA' },
    { id: 3, name: 'Furniture Craft', email: 'sales@furniturecraft.com', mobile: '+1 234 567 8912', address: '789 Pine St, Chicago, USA' },
    { id: 4, name: 'Paint Pro', email: 'info@paintpro.com', mobile: '+1 234 567 8913', address: '321 Cedar Ln, Houston, USA' },
    { id: 5, name: 'Plumbing Supply Co', email: 'sales@plumbingsupply.com', mobile: '+1 234 567 8914', address: '555 Water St, Phoenix, USA' }
];

// Inventory Items Data
let inventoryData = [
    {
        id: 1,
        itemName: 'Professional Hammer',
        shopId: 1,
        shopName: 'Tool World',
        category: 'tools',
        subCategory: 'Hand Tools',
        price: 24.99,
        stock: 50,
        description: 'High-quality professional hammer with anti-slip grip',
        discountType: 'none',
        discountValue: 0,
        status: 'active',
        createdAt: '2024-01-15 10:30:00',
        image: 'https://via.placeholder.com/100?text=Hammer'
    },
    {
        id: 2,
        itemName: 'Screwdriver Set',
        shopId: 1,
        shopName: 'Tool World',
        category: 'tools',
        subCategory: 'Hand Tools',
        price: 39.99,
        stock: 30,
        description: '8-piece screwdriver set with magnetic tips',
        discountType: 'percentage',
        discountValue: 10,
        status: 'active',
        createdAt: '2024-01-15 11:00:00',
        image: 'https://via.placeholder.com/100?text=Screwdriver'
    },
    {
        id: 3,
        itemName: 'Wireless Mouse',
        shopId: 2,
        shopName: 'Electro Hub',
        category: 'electronics',
        subCategory: 'Computer Accessories',
        price: 29.99,
        stock: 100,
        description: 'Ergonomic wireless mouse with USB receiver',
        discountType: 'none',
        discountValue: 0,
        status: 'active',
        createdAt: '2024-01-20 09:15:00',
        image: 'https://via.placeholder.com/100?text=Mouse'
    },
    {
        id: 4,
        itemName: 'USB Cable',
        shopId: 2,
        shopName: 'Electro Hub',
        category: 'electronics',
        subCategory: 'Cables',
        price: 12.99,
        stock: 200,
        description: '6ft USB-C to USB-C charging cable',
        discountType: 'percentage',
        discountValue: 15,
        status: 'active',
        createdAt: '2024-01-20 09:30:00',
        image: 'https://via.placeholder.com/100?text=USB+Cable'
    },
    {
        id: 5,
        itemName: 'Wooden Chair',
        shopId: 3,
        shopName: 'Furniture Craft',
        category: 'furniture',
        subCategory: 'Chairs',
        price: 149.99,
        stock: 25,
        description: 'Handcrafted wooden chair with cushion seat',
        discountType: 'amount',
        discountValue: 20,
        status: 'active',
        createdAt: '2024-01-25 14:00:00',
        image: 'https://via.placeholder.com/100?text=Chair'
    },
    {
        id: 6,
        itemName: 'Coffee Table',
        shopId: 3,
        shopName: 'Furniture Craft',
        category: 'furniture',
        subCategory: 'Tables',
        price: 299.99,
        stock: 15,
        description: 'Modern coffee table with storage',
        discountType: 'none',
        discountValue: 0,
        status: 'inactive',
        createdAt: '2024-01-25 14:30:00',
        image: 'https://via.placeholder.com/100?table=Coffee+Table'
    },
    {
        id: 7,
        itemName: 'Interior Paint',
        shopId: 4,
        shopName: 'Paint Pro',
        category: 'paint',
        subCategory: 'Wall Paint',
        price: 45.99,
        stock: 80,
        description: 'Premium interior paint, washable finish',
        discountType: 'percentage',
        discountValue: 5,
        status: 'active',
        createdAt: '2024-02-01 10:00:00',
        image: 'https://via.placeholder.com/100?text=Paint'
    },
    {
        id: 8,
        itemName: 'Paint Brush Set',
        shopId: 4,
        shopName: 'Paint Pro',
        category: 'paint',
        subCategory: 'Brushes',
        price: 19.99,
        stock: 5,
        description: '5-piece paint brush set for various sizes',
        discountType: 'none',
        discountValue: 0,
        status: 'active',
        createdAt: '2024-02-01 10:30:00',
        image: 'https://via.placeholder.com/100?text=Brushes'
    },
    {
        id: 9,
        itemName: 'Pipe Wrench',
        shopId: 5,
        shopName: 'Plumbing Supply Co',
        category: 'plumbing',
        subCategory: 'Tools',
        price: 34.99,
        stock: 60,
        description: 'Heavy-duty pipe wrench, 14-inch',
        discountType: 'none',
        discountValue: 0,
        status: 'active',
        createdAt: '2024-02-05 11:00:00',
        image: 'https://via.placeholder.com/100?text=Wrench'
    },
    {
        id: 10,
        itemName: 'Plunger',
        shopId: 5,
        shopName: 'Plumbing Supply Co',
        category: 'plumbing',
        subCategory: 'Tools',
        price: 14.99,
        stock: 100,
        description: 'Standard toilet plunger with handle',
        discountType: 'percentage',
        discountValue: 10,
        status: 'active',
        createdAt: '2024-02-05 11:30:00',
        image: 'https://via.placeholder.com/100?text=Plunger'
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentInventoryPage = 1;
const inventoryPerPage = 8;

// Filters
let inventoryFilters = {
    search: '',
    shopId: 'all',
    category: 'all',
    status: 'all',
    minStock: '',
    maxStock: ''
};

// ============================================
// INVENTORY STATISTICS
// ============================================

function updateInventoryStats() {
    const total = inventoryData.length;
    const uniqueShops = [...new Set(inventoryData.map(item => item.shopId))].length;
    const totalStockValue = inventoryData.reduce((sum, item) => {
        let finalPrice = calculateFinalPrice(item.price, item.discountType, item.discountValue);
        return sum + (finalPrice * item.stock);
    }, 0);
    const lowStock = inventoryData.filter(item => item.stock < 10 && item.status === 'active').length;
    
    const totalItemsEl = document.getElementById('totalItems');
    const totalShopsEl = document.getElementById('totalShops');
    const totalStockValueEl = document.getElementById('totalStockValue');
    const lowStockItemsEl = document.getElementById('lowStockItems');
    
    if (totalItemsEl) totalItemsEl.textContent = total;
    if (totalShopsEl) totalShopsEl.textContent = uniqueShops;
    if (totalStockValueEl) totalStockValueEl.textContent = formatCurrency(totalStockValue);
    if (lowStockItemsEl) lowStockItemsEl.textContent = lowStock;
}

function calculateFinalPrice(price, discountType, discountValue) {
    if (discountType === 'percentage') {
        return price - (price * discountValue / 100);
    } else if (discountType === 'amount') {
        return price - discountValue;
    }
    return price;
}

function calculateDiscountAmount(price, discountType, discountValue) {
    if (discountType === 'percentage') {
        return price * discountValue / 100;
    } else if (discountType === 'amount') {
        return discountValue;
    }
    return 0;
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterInventory() {
    return inventoryData.filter(item => {
        if (inventoryFilters.search && !item.itemName.toLowerCase().includes(inventoryFilters.search) &&
            !item.shopName.toLowerCase().includes(inventoryFilters.search)) {
            return false;
        }
        if (inventoryFilters.shopId !== 'all' && item.shopId != inventoryFilters.shopId) {
            return false;
        }
        if (inventoryFilters.category !== 'all' && item.category !== inventoryFilters.category) {
            return false;
        }
        if (inventoryFilters.status !== 'all' && item.status !== inventoryFilters.status) {
            return false;
        }
        if (inventoryFilters.minStock && item.stock < parseInt(inventoryFilters.minStock)) {
            return false;
        }
        if (inventoryFilters.maxStock && item.stock > parseInt(inventoryFilters.maxStock)) {
            return false;
        }
        return true;
    });
}

// ============================================
// LOAD SHOPS DROPDOWN
// ============================================

function loadShopsDropdown() {
    const shopFilter = document.getElementById('shopFilter');
    const itemShopSelect = document.getElementById('itemShopId');
    
    if (shopFilter) {
        shopFilter.innerHTML = '<option value="all">All Shops</option>';
        shopsData.forEach(shop => {
            shopFilter.innerHTML += `<option value="${shop.id}">${escapeHtml(shop.name)}</option>`;
        });
    }
    
    if (itemShopSelect) {
        itemShopSelect.innerHTML = '<option value="">Select Shop</option>';
        shopsData.forEach(shop => {
            itemShopSelect.innerHTML += `<option value="${shop.id}">${escapeHtml(shop.name)}</option>`;
        });
    }
}

// ============================================
// RENDER INVENTORY TABLE
// ============================================

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    let filteredData = filterInventory();
    const totalPages = Math.ceil(filteredData.length / inventoryPerPage);
    const start = (currentInventoryPage - 1) * inventoryPerPage;
    const pageData = filteredData.slice(start, start + inventoryPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="text-center py-5">No inventory items found</td></tr>';
        renderInventoryPagination(totalPages);
        return;
    }
    
    pageData.forEach(item => {
        const finalPrice = calculateFinalPrice(item.price, item.discountType, item.discountValue);
        const discountAmount = calculateDiscountAmount(item.price, item.discountType, item.discountValue);
        const totalPrice = finalPrice * item.stock;
        const statusClass = item.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = item.status === 'active' ? 'Active' : 'Inactive';
        const lowStockClass = item.stock < 10 ? 'text-danger fw-bold' : '';
        
        const categoryNames = {
            'tools': 'Tools & Hardware',
            'electronics': 'Electronics',
            'furniture': 'Furniture',
            'paint': 'Paint & Supplies',
            'plumbing': 'Plumbing Supplies',
            'electrical': 'Electrical Supplies'
        };
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>
                <img src="${item.image}" class="rounded" width="50" height="50" style="object-fit: cover;" onerror="this.src='https://via.placeholder.com/50'">
            </td>
            <td><strong>${escapeHtml(item.itemName)}</strong><br><small class="text-muted">${escapeHtml(item.subCategory || '')}</small></td>
            <td>${escapeHtml(item.shopName)}</td>
            <td>${categoryNames[item.category] || item.category}</td>
            <td>${formatCurrency(finalPrice)}</td>
            <td><span class="${lowStockClass}">${item.stock}</span></td>
            <td>${formatCurrency(totalPrice)}</td>
            <td>${discountAmount > 0 ? formatCurrency(discountAmount) : '-'}</td>
            <td>${formatDateShort(item.createdAt)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewItem(${item.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editItem(${item.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderInventoryPagination(totalPages);
}

function renderInventoryPagination(totalPages) {
    const pagination = document.getElementById('inventoryPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentInventoryPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeInventoryPage(${currentInventoryPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentInventoryPage - 2 && i <= currentInventoryPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentInventoryPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeInventoryPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentInventoryPage - 3 || i === currentInventoryPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentInventoryPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeInventoryPage(${currentInventoryPage + 1}); return false;">Next</a>
    </li>`;
}

function changeInventoryPage(page) {
    currentInventoryPage = page;
    renderInventoryTable();
}

// ============================================
// VIEW ITEM DETAILS
// ============================================

function viewItem(itemId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (!item) return;
    
    const modalBody = document.getElementById('viewItemBody');
    if (!modalBody) return;
    
    const finalPrice = calculateFinalPrice(item.price, item.discountType, item.discountValue);
    const discountAmount = calculateDiscountAmount(item.price, item.discountType, item.discountValue);
    const totalValue = finalPrice * item.stock;
    
    const categoryNames = {
        'tools': 'Tools & Hardware',
        'electronics': 'Electronics',
        'furniture': 'Furniture',
        'paint': 'Paint & Supplies',
        'plumbing': 'Plumbing Supplies',
        'electrical': 'Electrical Supplies'
    };
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <img src="${item.image}" class="rounded mb-3" width="150" height="150" style="object-fit: cover;" onerror="this.src='https://via.placeholder.com/150'">
            </div>
            <div class="col-md-8">
                <h4>${escapeHtml(item.itemName)}</h4>
                <p class="text-muted">${escapeHtml(item.shopName)}</p>
                
                <div class="row mt-3">
                    <div class="col-md-6">
                        <strong>Category:</strong> ${categoryNames[item.category] || item.category}<br>
                        <strong>Sub-Category:</strong> ${escapeHtml(item.subCategory || 'N/A')}<br>
                        <strong>Unit Price:</strong> ${formatCurrency(item.price)}
                    </div>
                    <div class="col-md-6">
                        <strong>Stock Quantity:</strong> ${item.stock}<br>
                        <strong>Status:</strong> <span class="status-badge ${item.status === 'active' ? 'status-success' : 'status-inactive'}">${item.status === 'active' ? 'Active' : 'Inactive'}</span><br>
                        <strong>Created:</strong> ${formatDateTime(item.createdAt)}
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <strong>Description:</strong>
                        <p>${escapeHtml(item.description) || 'No description provided.'}</p>
                    </div>
                </div>
                
                <h6 class="mt-3 text-primary">Price Breakdown</h6>
                <table class="table table-bordered">
                    <tr><th>Item Price</th><td>${formatCurrency(item.price)}</td></tr>
                    ${discountAmount > 0 ? `<tr><th>Discount (${item.discountType === 'percentage' ? item.discountValue + '%' : formatCurrency(item.discountValue)})</th><td class="text-danger">-${formatCurrency(discountAmount)}</td></tr>` : ''}
                    <tr class="table-active"><th>Final Price (per unit)</th><th>${formatCurrency(finalPrice)}</th></tr>
                    <tr><th>Stock Quantity</th><td>${item.stock}</td></tr>
                    <tr class="table-primary"><th>Total Stock Value</th><th>${formatCurrency(totalValue)}</th></tr>
                </table>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('viewItemModal')).show();
}

// ============================================
// ADD/EDIT ITEM FUNCTIONS
// ============================================

function addItem() {
    document.getElementById('itemModalTitle').innerHTML = '<i class="fas fa-box"></i> Add New Item';
    document.getElementById('editItemId').value = '';
    document.getElementById('itemShopId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemCategory').value = '';
    document.getElementById('itemSubCategory').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemStock').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('discountType').value = 'none';
    document.getElementById('discountValue').value = '';
    document.getElementById('itemStatus').value = 'active';
    document.getElementById('itemImagePreview').src = 'https://via.placeholder.com/150?text=Item+Image';
    
    document.getElementById('shopInfoDisplay').style.display = 'none';
    document.getElementById('defaultUnitPrice').value = '';
    updatePriceDisplay();
    
    new bootstrap.Modal(document.getElementById('itemModal')).show();
}

function editItem(itemId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('itemModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Item';
    document.getElementById('editItemId').value = item.id;
    document.getElementById('itemShopId').value = item.shopId;
    document.getElementById('itemName').value = item.itemName;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemSubCategory').value = item.subCategory || '';
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemStock').value = item.stock;
    document.getElementById('itemDescription').value = item.description || '';
    document.getElementById('discountType').value = item.discountType;
    document.getElementById('discountValue').value = item.discountValue;
    document.getElementById('itemStatus').value = item.status;
    document.getElementById('itemImagePreview').src = item.image;
    
    // Load shop info
    const selectedShop = shopsData.find(s => s.id === item.shopId);
    if (selectedShop) {
        document.getElementById('displayShopName').textContent = selectedShop.name;
        document.getElementById('displayShopEmail').textContent = selectedShop.email;
        document.getElementById('displayShopMobile').textContent = selectedShop.mobile;
        document.getElementById('displayShopAddress').textContent = selectedShop.address;
        document.getElementById('shopInfoDisplay').style.display = 'block';
    }
    
    document.getElementById('defaultUnitPrice').value = formatCurrency(item.price);
    updatePriceDisplay();
    
    new bootstrap.Modal(document.getElementById('itemModal')).show();
}

function updatePriceDisplay() {
    const price = parseFloat(document.getElementById('itemPrice').value) || 0;
    const discountType = document.getElementById('discountType').value;
    const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
    
    let discountAmount = 0;
    let finalPrice = price;
    
    if (discountType === 'percentage') {
        discountAmount = price * discountValue / 100;
        finalPrice = price - discountAmount;
    } else if (discountType === 'amount') {
        discountAmount = discountValue;
        finalPrice = price - discountAmount;
    }
    
    document.getElementById('displayItemPrice').textContent = formatCurrency(price);
    document.getElementById('displayDiscount').textContent = formatCurrency(discountAmount);
    document.getElementById('displayFinalPrice').textContent = formatCurrency(finalPrice);
}

function onShopSelect() {
    const shopId = document.getElementById('itemShopId').value;
    if (shopId) {
        const selectedShop = shopsData.find(s => s.id == shopId);
        if (selectedShop) {
            document.getElementById('displayShopName').textContent = selectedShop.name;
            document.getElementById('displayShopEmail').textContent = selectedShop.email;
            document.getElementById('displayShopMobile').textContent = selectedShop.mobile;
            document.getElementById('displayShopAddress').textContent = selectedShop.address;
            document.getElementById('shopInfoDisplay').style.display = 'block';
        }
    } else {
        document.getElementById('shopInfoDisplay').style.display = 'none';
    }
}

function saveItem() {
    const id = document.getElementById('editItemId').value;
    const shopId = document.getElementById('itemShopId').value;
    const itemName = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const subCategory = document.getElementById('itemSubCategory').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const stock = parseInt(document.getElementById('itemStock').value);
    const description = document.getElementById('itemDescription').value;
    const discountType = document.getElementById('discountType').value;
    const discountValue = parseFloat(document.getElementById('discountValue').value);
    const status = document.getElementById('itemStatus').value;
    
    if (!shopId || !itemName || !category || !price || isNaN(stock)) {
        showToast('Please fill all required fields', 'danger');
        return;
    }
    
    if (price <= 0) {
        showToast('Price must be greater than 0', 'danger');
        return;
    }
    
    if (stock < 0) {
        showToast('Stock quantity cannot be negative', 'danger');
        return;
    }
    
    const selectedShop = shopsData.find(s => s.id == shopId);
    const shopName = selectedShop ? selectedShop.name : '';
    
    if (id) {
        // Update existing
        const index = inventoryData.findIndex(i => i.id == id);
        if (index !== -1) {
            inventoryData[index] = {
                ...inventoryData[index],
                shopId: parseInt(shopId),
                shopName: shopName,
                itemName: itemName.trim(),
                category: category,
                subCategory: subCategory,
                price: price,
                stock: stock,
                description: description,
                discountType: discountType,
                discountValue: discountValue,
                status: status
            };
            showToast('Item updated successfully', 'success');
        }
    } else {
        // Add new
        const newId = inventoryData.length + 1;
        inventoryData.push({
            id: newId,
            shopId: parseInt(shopId),
            shopName: shopName,
            itemName: itemName.trim(),
            category: category,
            subCategory: subCategory,
            price: price,
            stock: stock,
            description: description,
            discountType: discountType,
            discountValue: discountValue,
            status: status,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            image: 'https://via.placeholder.com/100?text=' + encodeURIComponent(itemName)
        });
        showToast('Item added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('itemModal')).hide();
    updateInventoryStats();
    renderInventoryTable();
}

// ============================================
// DELETE ITEM
// ============================================

function deleteItem(itemId) {
    document.getElementById('deleteItemId').value = itemId;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteItem() {
    const itemId = parseInt(document.getElementById('deleteItemId').value);
    const index = inventoryData.findIndex(i => i.id === itemId);
    
    if (index !== -1) {
        const deletedItem = inventoryData[index];
        inventoryData.splice(index, 1);
        showToast(`Item "${deletedItem.itemName}" deleted successfully`, 'success');
        
        const remainingItems = filterInventory().length;
        const totalPages = Math.ceil(remainingItems / inventoryPerPage);
        if (currentInventoryPage > totalPages && totalPages > 0) {
            currentInventoryPage = totalPages;
        } else if (totalPages === 0) {
            currentInventoryPage = 1;
        }
        
        updateInventoryStats();
        renderInventoryTable();
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// EXPORT INVENTORY
// ============================================

function exportInventory() {
    const filteredData = filterInventory();
    let csvContent = "ID,Item Name,Shop Name,Category,Sub-Category,Unit Price,Stock Quantity,Total Value,Discount,Final Price,Status,Created Date\n";
    
    filteredData.forEach(item => {
        const finalPrice = calculateFinalPrice(item.price, item.discountType, item.discountValue);
        const discountAmount = calculateDiscountAmount(item.price, item.discountType, item.discountValue);
        const totalValue = finalPrice * item.stock;
        
        csvContent += `"${item.id}","${item.itemName}","${item.shopName}","${item.category}","${item.subCategory || ''}","${item.price}","${item.stock}","${totalValue.toFixed(2)}","${discountAmount.toFixed(2)}","${finalPrice.toFixed(2)}","${item.status}","${item.createdAt}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_export_${new Date().toISOString().slice(0,19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Inventory exported successfully', 'success');
}

// ============================================
// LOW STOCK ALERT
// ============================================

function checkLowStock() {
    const lowStockItems = inventoryData.filter(item => item.stock < 10 && item.status === 'active');
    
    if (lowStockItems.length > 0) {
        const lowStockBody = document.getElementById('lowStockBody');
        if (lowStockBody) {
            let itemsHtml = '<div class="list-group">';
            lowStockItems.forEach(item => {
                itemsHtml += `
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${escapeHtml(item.itemName)}</strong><br>
                                <small class="text-muted">${escapeHtml(item.shopName)}</small>
                            </div>
                            <div class="text-danger fw-bold">
                                Stock: ${item.stock}
                            </div>
                            <div>
                                <input type="number" class="form-control form-control-sm" id="restock_${item.id}" placeholder="Add quantity" style="width: 100px;">
                            </div>
                        </div>
                    </div>
                `;
            });
            itemsHtml += '</div>';
            lowStockBody.innerHTML = itemsHtml;
        }
        
        new bootstrap.Modal(document.getElementById('lowStockModal')).show();
    } else {
        showToast('No low stock items found', 'info');
    }
}

function restockItems() {
    const lowStockItems = inventoryData.filter(item => item.stock < 10 && item.status === 'active');
    let restocked = false;
    
    lowStockItems.forEach(item => {
        const restockInput = document.getElementById(`restock_${item.id}`);
        if (restockInput && restockInput.value) {
            const addQuantity = parseInt(restockInput.value);
            if (addQuantity > 0) {
                const index = inventoryData.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    inventoryData[index].stock += addQuantity;
                    restocked = true;
                }
            }
        }
    });
    
    if (restocked) {
        showToast('Stock updated successfully', 'success');
        updateInventoryStats();
        renderInventoryTable();
    } else {
        showToast('Please enter quantities to restock', 'warning');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('lowStockModal')).hide();
}

// ============================================
// RESET FILTERS
// ============================================

function resetInventoryFilters() {
    inventoryFilters = {
        search: '',
        shopId: 'all',
        category: 'all',
        status: 'all',
        minStock: '',
        maxStock: ''
    };
    currentInventoryPage = 1;
    
    const searchInput = document.getElementById('searchItem');
    const shopFilter = document.getElementById('shopFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('itemStatusFilter');
    const minStock = document.getElementById('minStock');
    const maxStock = document.getElementById('maxStock');
    
    if (searchInput) searchInput.value = '';
    if (shopFilter) shopFilter.value = 'all';
    if (categoryFilter) categoryFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    if (minStock) minStock.value = '';
    if (maxStock) maxStock.value = '';
    
    renderInventoryTable();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupInventoryEventListeners() {
    const searchInput = document.getElementById('searchItem');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            inventoryFilters.search = e.target.value.toLowerCase();
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const shopFilter = document.getElementById('shopFilter');
    if (shopFilter) {
        shopFilter.addEventListener('change', function(e) {
            inventoryFilters.shopId = e.target.value;
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            inventoryFilters.category = e.target.value;
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const statusFilter = document.getElementById('itemStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            inventoryFilters.status = e.target.value;
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const minStock = document.getElementById('minStock');
    if (minStock) {
        minStock.addEventListener('change', function(e) {
            inventoryFilters.minStock = e.target.value;
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const maxStock = document.getElementById('maxStock');
    if (maxStock) {
        maxStock.addEventListener('change', function(e) {
            inventoryFilters.maxStock = e.target.value;
            currentInventoryPage = 1;
            renderInventoryTable();
        });
    }
    
    const resetBtn = document.getElementById('resetInventoryFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetInventoryFilters);
    }
    
    const addBtn = document.getElementById('addItemBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addItem);
    }
    
    const saveBtn = document.getElementById('saveItemBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveItem);
    }
    
    const exportBtn = document.getElementById('exportInventoryBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportInventory);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDeleteItem);
    }
    
    // Shop select change
    const shopSelect = document.getElementById('itemShopId');
    if (shopSelect) {
        shopSelect.addEventListener('change', onShopSelect);
    }
    
    // Price calculation listeners
    const priceInput = document.getElementById('itemPrice');
    const discountTypeSelect = document.getElementById('discountType');
    const discountValueInput = document.getElementById('discountValue');
    
    if (priceInput) {
        priceInput.addEventListener('input', updatePriceDisplay);
        priceInput.addEventListener('change', function() {
            document.getElementById('defaultUnitPrice').value = formatCurrency(parseFloat(this.value) || 0);
        });
    }
    if (discountTypeSelect) discountTypeSelect.addEventListener('change', updatePriceDisplay);
    if (discountValueInput) discountValueInput.addEventListener('input', updatePriceDisplay);
    
    // Image upload
    const uploadBtn = document.getElementById('uploadItemImageBtn');
    const imageInput = document.getElementById('itemImage');
    const imagePreview = document.getElementById('itemImagePreview');
    
    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        imagePreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    showToast('Please select an image file', 'danger');
                }
            }
        });
    }
}

// ============================================
// SIDEBAR & DARK MODE FUNCTIONS
// ============================================

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }
}

function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
}

function loadDarkModePreference() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
}

// ============================================
// MAKE FUNCTIONS GLOBAL
// ============================================
window.viewItem = viewItem;
window.editItem = editItem;
window.deleteItem = deleteItem;
window.changeInventoryPage = changeInventoryPage;
window.restockItems = restockItems;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    loadShopsDropdown();
    updateInventoryStats();
    renderInventoryTable();
    setupInventoryEventListeners();
    
    // Check low stock on load (optional)
    setTimeout(() => {
        const lowStockCount = inventoryData.filter(item => item.stock < 10 && item.status === 'active').length;
        if (lowStockCount > 0) {
            const lowStockBadge = document.querySelector('.fa-bell + .badge');
            if (lowStockBadge) {
                lowStockBadge.textContent = lowStockCount;
            }
        }
    }, 100);
});