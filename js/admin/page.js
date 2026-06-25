/* ============================================
   Pages Management JavaScript
   For: pages.html
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

// Sample Pages Data
let pagesData = [
    {
        id: 1,
        name: 'Terms & Conditions',
        slug: 'terms-and-conditions',
        title: 'Terms and Conditions',
        content: '<h2>Terms and Conditions</h2><p>Welcome to Alo. By using our services, you agree to these terms. Please read them carefully.</p><h3>1. Acceptance of Terms</h3><p>By accessing or using the Alo platform, you agree to be bound by these Terms and Conditions.</p><h3>2. Description of Service</h3><p>Alo provides an on-demand service platform connecting customers with service providers.</p><h3>3. User Accounts</h3><p>You must create an account to use certain features. You are responsible for maintaining the confidentiality of your account.</p><h3>4. Payments</h3><p>All payments are processed securely through our payment partners. Fees are displayed before booking.</p><h3>5. Cancellation Policy</h3><p>Cancellations made within 2 hours of scheduled service may incur a fee.</p><h3>6. Limitation of Liability</h3><p>Alo is not liable for any indirect damages arising from use of our services.</p>',
        metaDescription: 'Read our terms and conditions for using Alo services. Learn about user agreements, payment terms, and cancellation policies.',
        status: 'active',
        lastUpdated: '2024-01-15 10:30:00'
    },
    {
        id: 2,
        name: 'Privacy Policy',
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: '<h2>Privacy Policy</h2><p>Your privacy is important to us. This policy explains how we collect and use your data.</p><h3>Information We Collect</h3><p>We collect personal information including name, email, phone number, and location data.</p><h3>How We Use Your Information</h3><p>We use your information to provide services, process payments, and improve our platform.</p><h3>Data Security</h3><p>We implement security measures to protect your personal information from unauthorized access.</p><h3>Third-Party Sharing</h3><p>We do not sell your personal information to third parties.</p><h3>Cookies</h3><p>We use cookies to enhance your browsing experience on our platform.</p><h3>Your Rights</h3><p>You have the right to access, correct, or delete your personal information.</p>',
        metaDescription: 'Learn about how we protect your privacy on Alo platform. Read our data collection, usage, and security practices.',
        status: 'active',
        lastUpdated: '2024-01-20 14:15:00'
    },
    {
        id: 3,
        name: 'Contact Us',
        slug: 'contact-us',
        title: 'Contact Us',
        content: '<h2>Contact Us</h2><p>We\'re here to help! Reach out to our support team through any of the following channels.</p><h3>Customer Support</h3><p>Email: support@alo.com<br>Phone: +1 234 567 8900<br>Hours: Monday-Friday, 9 AM - 6 PM EST</p><h3>Business Inquiries</h3><p>Email: business@alo.com</p><h3>Partnership Opportunities</h3><p>Email: partners@alo.com</p><h3>Office Address</h3><p>123 Service Street, Suite 100<br>New York, NY 10001<br>United States</p>',
        metaDescription: 'Contact Alo support team for any assistance. Find our customer support email, phone number, and office address.',
        status: 'active',
        lastUpdated: '2024-02-01 09:00:00'
    },
    {
        id: 4,
        name: 'About Us',
        slug: 'about-us',
        title: 'About Alo',
        content: '<h2>About Alo</h2><p>Alo is a leading on-demand service platform connecting customers with trusted professionals.</p><h3>Our Mission</h3><p>To make quality services accessible to everyone, anytime, anywhere.</p><h3>Our Vision</h3><p>To become the world\'s most trusted on-demand service platform.</p><h3>Our Story</h3><p>Founded in 2024, Alo started with a simple idea: make it easy for people to find and book reliable services.</p><h3>Why Choose Alo?</h3><p>- Verified professionals<br>- Transparent pricing<br>- 24/7 customer support<br>- Secure payments<br>- Satisfaction guaranteed</p>',
        metaDescription: 'Learn more about Alo and our mission. Discover our story, values, and why we are the leading on-demand service platform.',
        status: 'inactive',
        lastUpdated: '2024-02-10 11:30:00'
    }
];

// Sample FAQ Data
let faqData = [
    {
        id: 1,
        question: 'How do I book a service?',
        answer: 'To book a service, simply open the Alo app or website, select the service you need, choose a convenient time slot, provide your location details, and confirm your booking. You will receive a confirmation email and SMS with the booking details.',
        category: 'booking',
        status: 'active',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
    },
    {
        id: 2,
        question: 'What payment methods are accepted?',
        answer: 'We accept various payment methods including Credit/Debit Cards (VISA, Mastercard, American Express), Mobile Money (MoMo), OM (Orange Money), and Bank Transfers. All payments are processed securely through our encrypted payment gateway.',
        category: 'payment',
        status: 'active',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-12'
    },
    {
        id: 3,
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking up to 2 hours before the scheduled time for a full refund. Cancellations made within 2 hours of the scheduled service may incur a cancellation fee of up to 50% of the service cost. To cancel, go to "My Bookings" and click on the cancel button.',
        category: 'booking',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: 4,
        question: 'How do I become a service provider?',
        answer: 'To become a service provider, visit our website and click on "Become a Provider". Complete the registration form, submit required documents (ID proof, business license, insurance), and undergo our verification process. Once approved, you can start offering your services on the Alo platform.',
        category: 'service',
        status: 'active',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-18'
    },
    {
        id: 5,
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data security very seriously. All your personal information is encrypted using industry-standard SSL technology. We never share your personal data with third parties without your consent. Our platform is regularly audited for security compliance.',
        category: 'account',
        status: 'inactive',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20'
    },
    {
        id: 6,
        question: 'How long does it take for a service provider to arrive?',
        answer: 'Arrival time depends on the service type and your location. Most service providers arrive within 30-60 minutes of booking confirmation for emergency services. For scheduled services, the provider will arrive at your selected time slot. You can track the provider\'s location in real-time through the app.',
        category: 'service',
        status: 'active',
        createdAt: '2024-01-22',
        updatedAt: '2024-01-22'
    },
    {
        id: 7,
        question: 'What if I\'m not satisfied with the service?',
        answer: 'Customer satisfaction is our top priority. If you\'re not satisfied with the service, you can rate the service provider and file a complaint through the app. Our support team will investigate the issue within 24 hours and provide a resolution, which may include a partial refund, full refund, or re-service at no additional cost.',
        category: 'general',
        status: 'active',
        createdAt: '2024-01-25',
        updatedAt: '2024-01-25'
    },
    {
        id: 8,
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your registered email address, and we will send you a password reset link. Click on the link in the email, enter your new password, and confirm it. You can then log in with your new password.',
        category: 'account',
        status: 'active',
        createdAt: '2024-01-28',
        updatedAt: '2024-01-28'
    },
    {
        id: 9,
        question: 'Are there any membership fees?',
        answer: 'No, Alo does not charge any membership fees. You only pay for the services you book. There are no hidden charges or subscription fees. All costs are displayed upfront before you confirm your booking.',
        category: 'payment',
        status: 'active',
        createdAt: '2024-02-01',
        updatedAt: '2024-02-01'
    },
    {
        id: 10,
        question: 'Can I schedule a service in advance?',
        answer: 'Yes, you can schedule services up to 30 days in advance. Simply select your desired date and time slot during the booking process. You will receive a reminder notification 24 hours before your scheduled service.',
        category: 'booking',
        status: 'active',
        createdAt: '2024-02-05',
        updatedAt: '2024-02-05'
    }
];

// ============================================
// PAGINATION VARIABLES
// ============================================
let currentFaqPage = 1;
const faqPerPage = 5;

// FAQ Filters
let faqFilters = {
    search: '',
    category: 'all',
    status: 'all'
};

// CKEditor instance
let pageEditor = null;

// ============================================
// STATIC PAGES FUNCTIONS
// ============================================

function renderPagesTable() {
    const tbody = document.getElementById('pagesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    pagesData.forEach(page => {
        const statusClass = page.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = page.status === 'active' ? 'Active' : 'Inactive';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${page.id}</td>
            <td>
                <div>
                    <div class="fw-bold">${escapeHtml(page.name)}</div>
                    <small class="text-muted">/${page.slug}</small>
                </div>
            </td>
            <td>${formatDateTime(page.lastUpdated)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editPage(${page.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success" onclick="previewPage(${page.id})" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editPage(pageId) {
    const page = pagesData.find(p => p.id === pageId);
    if (!page) return;
    
    document.getElementById('editPageModalTitle').innerHTML = `<i class="fas fa-edit"></i> Edit ${escapeHtml(page.name)}`;
    document.getElementById('editPageId').value = page.id;
    document.getElementById('pageTitle').value = page.title;
    document.getElementById('pageSlug').value = page.slug;
    document.getElementById('pageStatus').value = page.status;
    document.getElementById('pageMetaDescription').value = page.metaDescription || '';
    
    // Initialize or update CKEditor
    const textarea = document.querySelector('#pageContent');
    if (pageEditor) {
        pageEditor.setData(page.content);
    } else if (textarea && typeof ClassicEditor !== 'undefined') {
        ClassicEditor
            .create(textarea, {
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                    ]
                }
            })
            .then(editor => {
                pageEditor = editor;
                editor.setData(page.content);
            })
            .catch(error => {
                console.error('CKEditor error:', error);
                // Fallback: just use textarea
                textarea.value = page.content;
            });
    } else {
        textarea.value = page.content;
    }
    
    new bootstrap.Modal(document.getElementById('editPageModal')).show();
}

function savePage() {
    const id = document.getElementById('editPageId').value;
    const title = document.getElementById('pageTitle').value;
    const status = document.getElementById('pageStatus').value;
    const metaDescription = document.getElementById('pageMetaDescription').value;
    let content = '';
    
    if (pageEditor) {
        content = pageEditor.getData();
    } else {
        content = document.getElementById('pageContent').value;
    }
    
    if (!title || !content) {
        showToast('Please fill all required fields (Title and Content)', 'danger');
        return;
    }
    
    // Generate slug from title
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    
    if (id) {
        // Update existing
        const index = pagesData.findIndex(p => p.id == id);
        if (index !== -1) {
            const oldName = pagesData[index].name;
            pagesData[index] = {
                ...pagesData[index],
                title: title,
                name: title,
                slug: slug,
                content: content,
                status: status,
                metaDescription: metaDescription,
                lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' ')
            };
            showToast(`Page "${title}" updated successfully`, 'success');
        }
    } else {
        // Add new page
        const newId = pagesData.length + 1;
        pagesData.push({
            id: newId,
            name: title,
            slug: slug,
            title: title,
            content: content,
            status: status,
            metaDescription: metaDescription,
            lastUpdated: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
        showToast(`Page "${title}" added successfully`, 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('editPageModal')).hide();
    renderPagesTable();
}

function previewPage(pageId) {
    const page = pagesData.find(p => p.id === pageId);
    if (!page) return;
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${escapeHtml(page.title)} - Alo</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${escapeHtml(page.metaDescription || '')}">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background: #f5f7fa;
                    padding: 40px 0;
                }
                .preview-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 5px 30px rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                .preview-header {
                    background: linear-gradient(135deg, #4361ee, #3f37c9);
                    color: white;
                    padding: 30px;
                }
                .preview-header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .preview-header small {
                    opacity: 0.8;
                    margin-top: 10px;
                    display: block;
                }
                .preview-content {
                    padding: 40px;
                }
                .preview-content h2 {
                    color: #4361ee;
                    margin-top: 20px;
                    margin-bottom: 15px;
                }
                .preview-content h3 {
                    color: #333;
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                .preview-content p {
                    line-height: 1.6;
                    color: #555;
                    margin-bottom: 15px;
                }
                .meta-info {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 30px;
                    font-size: 13px;
                    color: #6c757d;
                    border-top: 1px solid #e0e0e0;
                }
                @media (max-width: 768px) {
                    .preview-container {
                        margin: 20px;
                    }
                    .preview-content {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="preview-container">
                <div class="preview-header">
                    <h1>${escapeHtml(page.title)}</h1>
                    <small>Last updated: ${formatDateTime(page.lastUpdated)}</small>
                </div>
                <div class="preview-content">
                    ${page.content}
                    <div class="meta-info">
                        <strong>Meta Description:</strong> ${escapeHtml(page.metaDescription || 'No meta description provided')}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `);
    previewWindow.document.close();
}

// ============================================
// FAQ MANAGEMENT FUNCTIONS
// ============================================

function renderFaqTable() {
    const tbody = document.getElementById('faqTableBody');
    if (!tbody) return;
    
    let filteredData = faqData.filter(faq => {
        if (faqFilters.search && !faq.question.toLowerCase().includes(faqFilters.search)) {
            return false;
        }
        if (faqFilters.category !== 'all' && faq.category !== faqFilters.category) {
            return false;
        }
        if (faqFilters.status !== 'all' && faq.status !== faqFilters.status) {
            return false;
        }
        return true;
    });
    
    const totalPages = Math.ceil(filteredData.length / faqPerPage);
    const start = (currentFaqPage - 1) * faqPerPage;
    const pageData = filteredData.slice(start, start + faqPerPage);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-5">No FAQs found</td></tr>';
        renderFaqPagination(totalPages);
        return;
    }
    
    pageData.forEach(faq => {
        const statusClass = faq.status === 'active' ? 'status-success' : 'status-inactive';
        const statusText = faq.status === 'active' ? 'Active' : 'Inactive';
        const categoryClass = `faq-category ${faq.category}`;
        const categoryName = faq.category.charAt(0).toUpperCase() + faq.category.slice(1);
        
        // Strip HTML tags for preview
        const plainAnswer = faq.answer.replace(/<[^>]*>/g, '');
        const answerPreview = plainAnswer.length > 100 ? plainAnswer.substring(0, 100) + '...' : plainAnswer;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${faq.id}</td>
            <td><strong>${escapeHtml(faq.question)}</strong></td>
            <td><span class="answer-preview" title="${escapeHtml(plainAnswer)}">${escapeHtml(answerPreview)}</span></td>
            <td>
                <span class="${categoryClass}">${categoryName}</span>
                <span class="status-badge ${statusClass} ms-2">${statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-outline-info me-1" onclick="viewFaq(${faq.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="editFaq(${faq.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteFaq(${faq.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    renderFaqPagination(totalPages);
}

function renderFaqPagination(totalPages) {
    const pagination = document.getElementById('faqPagination');
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    
    pagination.innerHTML += `<li class="page-item ${currentFaqPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeFaqPage(${currentFaqPage - 1}); return false;">Previous</a>
    </li>`;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentFaqPage - 2 && i <= currentFaqPage + 2)) {
            pagination.innerHTML += `<li class="page-item ${currentFaqPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changeFaqPage(${i}); return false;">${i}</a>
            </li>`;
        } else if (i === currentFaqPage - 3 || i === currentFaqPage + 3) {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    pagination.innerHTML += `<li class="page-item ${currentFaqPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="changeFaqPage(${currentFaqPage + 1}); return false;">Next</a>
    </li>`;
}

function changeFaqPage(page) {
    currentFaqPage = page;
    renderFaqTable();
}

function addFaq() {
    document.getElementById('faqModalTitle').innerHTML = '<i class="fas fa-question-circle"></i> Add FAQ';
    document.getElementById('editFaqId').value = '';
    document.getElementById('faqQuestion').value = '';
    document.getElementById('faqAnswer').value = '';
    document.getElementById('faqCategory').value = 'general';
    document.getElementById('faqStatus').value = 'active';
    
    new bootstrap.Modal(document.getElementById('faqModal')).show();
}

function editFaq(faqId) {
    const faq = faqData.find(f => f.id === faqId);
    if (!faq) return;
    
    document.getElementById('faqModalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit FAQ';
    document.getElementById('editFaqId').value = faq.id;
    document.getElementById('faqQuestion').value = faq.question;
    document.getElementById('faqAnswer').value = faq.answer;
    document.getElementById('faqCategory').value = faq.category;
    document.getElementById('faqStatus').value = faq.status;
    
    new bootstrap.Modal(document.getElementById('faqModal')).show();
}

function saveFaq() {
    const id = document.getElementById('editFaqId').value;
    const question = document.getElementById('faqQuestion').value;
    const answer = document.getElementById('faqAnswer').value;
    const category = document.getElementById('faqCategory').value;
    const status = document.getElementById('faqStatus').value;
    
    if (!question || !answer) {
        showToast('Please fill all required fields (Question and Answer)', 'danger');
        return;
    }
    
    const now = new Date().toISOString().slice(0, 10);
    
    if (id) {
        // Update existing
        const index = faqData.findIndex(f => f.id == id);
        if (index !== -1) {
            faqData[index] = {
                ...faqData[index],
                question: question.trim(),
                answer: answer.trim(),
                category: category,
                status: status,
                updatedAt: now
            };
            showToast('FAQ updated successfully', 'success');
        }
    } else {
        // Add new
        const newId = faqData.length + 1;
        faqData.push({
            id: newId,
            question: question.trim(),
            answer: answer.trim(),
            category: category,
            status: status,
            createdAt: now,
            updatedAt: now
        });
        showToast('FAQ added successfully', 'success');
    }
    
    bootstrap.Modal.getInstance(document.getElementById('faqModal')).hide();
    renderFaqTable();
}

function viewFaq(faqId) {
    const faq = faqData.find(f => f.id === faqId);
    if (!faq) return;
    
    const categoryClass = `faq-category ${faq.category}`;
    const categoryName = faq.category.charAt(0).toUpperCase() + faq.category.slice(1);
    const statusClass = faq.status === 'active' ? 'status-success' : 'status-inactive';
    const statusText = faq.status === 'active' ? 'Active' : 'Inactive';
    
    const modalBody = document.getElementById('viewFaqBody');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="card">
                <div class="card-header bg-light">
                    <h5 class="mb-0">${escapeHtml(faq.question)}</h5>
                </div>
                <div class="card-body">
                    <div class="mb-4">
                        <strong>Answer:</strong>
                        <div class="mt-3 p-3 bg-light rounded">
                            ${faq.answer}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-2">
                            <strong>Category:</strong><br>
                            <span class="${categoryClass} d-inline-block mt-1">${categoryName}</span>
                        </div>
                        <div class="col-md-4 mb-2">
                            <strong>Status:</strong><br>
                            <span class="status-badge ${statusClass} d-inline-block mt-1">${statusText}</span>
                        </div>
                        <div class="col-md-4 mb-2">
                            <strong>Created:</strong><br>
                            <div>${formatDateShort(faq.createdAt)}</div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <strong>Last Updated:</strong><br>
                            <div>${formatDateShort(faq.updatedAt)}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    new bootstrap.Modal(document.getElementById('viewFaqModal')).show();
}

function deleteFaq(faqId) {
    document.getElementById('deleteItemId').value = faqId;
    document.getElementById('deleteItemType').value = 'faq';
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDelete() {
    const id = parseInt(document.getElementById('deleteItemId').value);
    const type = document.getElementById('deleteItemType').value;
    
    if (type === 'faq') {
        const index = faqData.findIndex(f => f.id === id);
        if (index !== -1) {
            const deletedFaq = faqData[index];
            faqData.splice(index, 1);
            showToast(`FAQ "${deletedFaq.question.substring(0, 50)}..." deleted successfully`, 'success');
            
            // Adjust pagination
            const remainingItems = faqData.filter(f => {
                if (faqFilters.search && !f.question.toLowerCase().includes(faqFilters.search)) return false;
                if (faqFilters.category !== 'all' && f.category !== faqFilters.category) return false;
                if (faqFilters.status !== 'all' && f.status !== faqFilters.status) return false;
                return true;
            }).length;
            
            const totalPages = Math.ceil(remainingItems / faqPerPage);
            if (currentFaqPage > totalPages && totalPages > 0) {
                currentFaqPage = totalPages;
            } else if (totalPages === 0) {
                currentFaqPage = 1;
            }
            
            renderFaqTable();
        }
    }
    
    bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
}

// ============================================
// FAQ FILTERS SETUP (Add filters to FAQ tab)
// ============================================

function setupFaqFilters() {
    // Create filter bar dynamically if it doesn't exist
    const faqTab = document.getElementById('faqContent');
    const addButtonDiv = faqTab.querySelector('.mb-4.text-end');
    
    // Check if filter bar already exists
    if (!document.getElementById('faqFilterBar')) {
        const filterBar = document.createElement('div');
        filterBar.id = 'faqFilterBar';
        filterBar.className = 'data-table mb-4';
        filterBar.innerHTML = `
            <div class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">Search FAQ</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input type="text" class="form-control" id="faqSearch" placeholder="Search by question...">
                    </div>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Category</label>
                    <select class="form-select" id="faqCategoryFilter">
                        <option value="all">All Categories</option>
                        <option value="general">General</option>
                        <option value="booking">Booking</option>
                        <option value="payment">Payment</option>
                        <option value="service">Service</option>
                        <option value="account">Account</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Status</label>
                    <select class="form-select" id="faqStatusFilter">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">&nbsp;</label>
                    <button class="btn btn-outline-secondary w-100" id="resetFaqFiltersBtn">
                        <i class="fas fa-undo-alt"></i> Reset
                    </button>
                </div>
            </div>
        `;
        
        // Insert filter bar after the add button div
        addButtonDiv.insertAdjacentElement('afterend', filterBar);
    }
    
    // Setup event listeners
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            faqFilters.search = e.target.value.toLowerCase();
            currentFaqPage = 1;
            renderFaqTable();
        });
    }
    
    const categoryFilter = document.getElementById('faqCategoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            faqFilters.category = e.target.value;
            currentFaqPage = 1;
            renderFaqTable();
        });
    }
    
    const statusFilter = document.getElementById('faqStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            faqFilters.status = e.target.value;
            currentFaqPage = 1;
            renderFaqTable();
        });
    }
    
    const resetBtn = document.getElementById('resetFaqFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFaqFilters);
    }
}

function resetFaqFilters() {
    faqFilters = { search: '', category: 'all', status: 'all' };
    currentFaqPage = 1;
    
    const searchInput = document.getElementById('faqSearch');
    const categoryFilter = document.getElementById('faqCategoryFilter');
    const statusFilter = document.getElementById('faqStatusFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    if (statusFilter) statusFilter.value = 'all';
    
    renderFaqTable();
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
// MAKE FUNCTIONS GLOBAL FOR ONCLICK
// ============================================
window.editPage = editPage;
window.previewPage = previewPage;
window.addFaq = addFaq;
window.editFaq = editFaq;
window.viewFaq = viewFaq;
window.deleteFaq = deleteFaq;
window.changeFaqPage = changeFaqPage;

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Setup common elements
    setupSidebarToggle();
    setupDarkModeToggle();
    loadDarkModePreference();
    
    // Initialize tables
    renderPagesTable();
    renderFaqTable();
    
    // Setup FAQ filters
    setupFaqFilters();
    
    // Setup button event listeners
    const addFaqBtn = document.getElementById('addFaqBtn');
    if (addFaqBtn) {
        addFaqBtn.addEventListener('click', addFaq);
    }
    
    const saveFaqBtn = document.getElementById('saveFaqBtn');
    if (saveFaqBtn) {
        saveFaqBtn.addEventListener('click', saveFaq);
    }
    
    const savePageBtn = document.getElementById('savePageBtn');
    if (savePageBtn) {
        savePageBtn.addEventListener('click', savePage);
    }
    
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
});