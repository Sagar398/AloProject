/* ============================================
   Theme Manager - Dark/Light Mode System
   For: All Pages (Admin Panels, Customer, etc.)
   ============================================ */

// ============================================
// THEME CONFIGURATION
// ============================================

const ThemeConfig = {
    // Theme keys
    STORAGE_KEY: 'alo_theme_preference',
    THEME_LIGHT: 'light',
    THEME_DARK: 'dark',
    THEME_AUTO: 'auto',
    
    // CSS variables for dark mode
    darkModeVariables: {
        '--primary-color': '#4361ee',
        '--primary-dark': '#3a0ca3',
        '--secondary-color': '#3f37c9',
        '--success-color': '#4caf50',
        '--danger-color': '#f44336',
        '--warning-color': '#ff9800',
        '--info-color': '#2196f3',
        '--dark-color': '#1a1a2e',
        '--light-color': '#f8f9fa',
        '--gray-color': '#adb5bd',
        '--white': '#ffffff',
        '--black': '#000000',
        '--shadow': '0 5px 30px rgba(0, 0, 0, 0.3)',
        '--bg-body': '#121212',
        '--bg-card': '#1e1e2e',
        '--bg-sidebar': '#16213e',
        '--bg-topbar': '#1a1a2e',
        '--text-primary': '#ffffff',
        '--text-secondary': '#adb5bd',
        '--border-color': '#2d2d3d',
        '--input-bg': '#2d2d3d',
        '--input-border': '#3d3d4d',
        '--table-header-bg': '#1e1e2e',
        '--table-row-hover': '#2d2d3d',
        '--modal-bg': '#1e1e2e',
        '--dropdown-bg': '#1e1e2e',
        '--stat-card-bg': '#1e1e2e'
    },
    
    // CSS variables for light mode
    lightModeVariables: {
        '--primary-color': '#4361ee',
        '--primary-dark': '#3a0ca3',
        '--secondary-color': '#3f37c9',
        '--success-color': '#4caf50',
        '--danger-color': '#f44336',
        '--warning-color': '#ff9800',
        '--info-color': '#2196f3',
        '--dark-color': '#2b2d42',
        '--light-color': '#f8f9fa',
        '--gray-color': '#6c757d',
        '--white': '#ffffff',
        '--black': '#000000',
        '--shadow': '0 5px 30px rgba(0, 0, 0, 0.1)',
        '--bg-body': '#f5f7fa',
        '--bg-card': '#ffffff',
        '--bg-sidebar': '#2b2d42',
        '--bg-topbar': '#ffffff',
        '--text-primary': '#2b2d42',
        '--text-secondary': '#6c757d',
        '--border-color': '#e0e0e0',
        '--input-bg': '#ffffff',
        '--input-border': '#e0e0e0',
        '--table-header-bg': '#f8f9fa',
        '--table-row-hover': '#f8f9fa',
        '--modal-bg': '#ffffff',
        '--dropdown-bg': '#ffffff',
        '--stat-card-bg': '#ffffff'
    }
};

// ============================================
// THEME MANAGER CLASS
// ============================================

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.systemTheme = this.getSystemTheme();
        this.listeners = [];
        this.initialized = false;
    }
    
    // Get stored theme preference
    getStoredTheme() {
        return localStorage.getItem(ThemeConfig.STORAGE_KEY) || ThemeConfig.THEME_LIGHT;
    }
    
    // Get system theme preference
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return ThemeConfig.THEME_DARK;
        }
        return ThemeConfig.THEME_LIGHT;
    }
    
    // Get current effective theme
    getEffectiveTheme() {
        if (this.currentTheme === ThemeConfig.THEME_AUTO) {
            return this.systemTheme;
        }
        return this.currentTheme;
    }
    
    // Apply CSS variables
    applyCSSVariables(theme) {
        const variables = theme === ThemeConfig.THEME_DARK 
            ? ThemeConfig.darkModeVariables 
            : ThemeConfig.lightModeVariables;
        
        const root = document.documentElement;
        for (const [key, value] of Object.entries(variables)) {
            root.style.setProperty(key, value);
        }
    }
    
    // Apply theme classes to body
    applyThemeClasses(theme) {
        const body = document.body;
        const effectiveTheme = this.getEffectiveTheme();
        
        // Remove existing theme classes
        body.classList.remove('theme-light', 'theme-dark', 'dark-mode');
        
        // Add new theme classes
        if (effectiveTheme === ThemeConfig.THEME_DARK) {
            body.classList.add('theme-dark', 'dark-mode');
        } else {
            body.classList.add('theme-light');
        }
        
        // Also set data attribute for CSS selectors
        body.setAttribute('data-theme', effectiveTheme);
    }
    
    // Apply theme
    applyTheme() {
        const effectiveTheme = this.getEffectiveTheme();
        
        // Apply CSS variables
        this.applyCSSVariables(effectiveTheme);
        
        // Apply classes
        this.applyThemeClasses(effectiveTheme);
        
        // Update any theme toggle buttons
        this.updateThemeButtons();
        
        // Notify listeners
        this.notifyListeners(effectiveTheme);
        
        // Save to localStorage if not auto
        if (this.currentTheme !== ThemeConfig.THEME_AUTO) {
            localStorage.setItem(ThemeConfig.STORAGE_KEY, this.currentTheme);
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: effectiveTheme, preference: this.currentTheme }
        }));
        
        console.log(`Theme applied: ${effectiveTheme} (preference: ${this.currentTheme})`);
    }
    
    // Set theme
    setTheme(theme, save = true) {
        if (![ThemeConfig.THEME_LIGHT, ThemeConfig.THEME_DARK, ThemeConfig.THEME_AUTO].includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }
        
        this.currentTheme = theme;
        
        // Update system theme listener if needed
        if (theme === ThemeConfig.THEME_AUTO) {
            this.enableSystemThemeListener();
            this.systemTheme = this.getSystemTheme();
        } else {
            this.disableSystemThemeListener();
        }
        
        this.applyTheme();
        
        if (save) {
            localStorage.setItem(ThemeConfig.STORAGE_KEY, this.currentTheme);
        }
    }
    
    // Toggle between light and dark (ignores auto)
    toggleTheme() {
        if (this.currentTheme === ThemeConfig.THEME_LIGHT) {
            this.setTheme(ThemeConfig.THEME_DARK);
        } else if (this.currentTheme === ThemeConfig.THEME_DARK) {
            this.setTheme(ThemeConfig.THEME_LIGHT);
        } else if (this.currentTheme === ThemeConfig.THEME_AUTO) {
            // If in auto mode, toggle based on current effective theme
            const effective = this.getEffectiveTheme();
            if (effective === ThemeConfig.THEME_LIGHT) {
                this.setTheme(ThemeConfig.THEME_DARK);
            } else {
                this.setTheme(ThemeConfig.THEME_LIGHT);
            }
        }
    }
    
    // System theme change listener
    enableSystemThemeListener() {
        if (this.systemThemeListener) return;
        
        this.systemThemeListener = (e) => {
            this.systemTheme = e.matches ? ThemeConfig.THEME_DARK : ThemeConfig.THEME_LIGHT;
            if (this.currentTheme === ThemeConfig.THEME_AUTO) {
                this.applyTheme();
            }
        };
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.systemThemeListener);
    }
    
    disableSystemThemeListener() {
        if (this.systemThemeListener) {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.systemThemeListener);
            this.systemThemeListener = null;
        }
    }
    
    // Update all theme toggle buttons on the page
    updateThemeButtons() {
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            const icon = button.querySelector('i');
            if (!icon) return;
            
            const effectiveTheme = this.getEffectiveTheme();
            if (effectiveTheme === ThemeConfig.THEME_DARK) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                button.setAttribute('title', 'Switch to Light Mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                button.setAttribute('title', 'Switch to Dark Mode');
            }
        });
        
        // Update theme selector dropdowns
        document.querySelectorAll('[data-theme-selector]').forEach(select => {
            select.value = this.currentTheme;
        });
    }
    
    // Add theme change listener
    addListener(callback) {
        if (typeof callback === 'function') {
            this.listeners.push(callback);
        }
    }
    
    // Remove listener
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
    
    // Notify all listeners
    notifyListeners(theme) {
        this.listeners.forEach(callback => {
            try {
                callback(theme);
            } catch (error) {
                console.error('Theme listener error:', error);
            }
        });
    }
    
    // Initialize theme manager
    init() {
        if (this.initialized) return;
        
        // Get theme from localStorage
        this.currentTheme = this.getStoredTheme();
        this.systemTheme = this.getSystemTheme();
        
        // Apply theme
        this.applyTheme();
        
        // Setup system theme listener if needed
        if (this.currentTheme === ThemeConfig.THEME_AUTO) {
            this.enableSystemThemeListener();
        }
        
        // Setup theme toggle buttons
        this.setupToggleButtons();
        
        // Setup theme selector dropdowns
        this.setupThemeSelectors();
        
        this.initialized = true;
        
        console.log('Theme Manager initialized');
    }
    
    // Setup all theme toggle buttons
    setupToggleButtons() {
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            // Remove existing listeners to avoid duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        });
    }
    
    // Setup theme selector dropdowns
    setupThemeSelectors() {
        document.querySelectorAll('[data-theme-selector]').forEach(select => {
            // Remove existing listeners
            const newSelect = select.cloneNode(true);
            select.parentNode.replaceChild(newSelect, select);
            
            newSelect.value = this.currentTheme;
            newSelect.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        });
    }
    
    // Inject CSS for theme variables (fallback)
    injectCSS() {
        const style = document.createElement('style');
        style.id = 'theme-manager-styles';
        style.textContent = `
            /* CSS Variables for Light Mode (Default) */
            :root {
                --primary-color: #4361ee;
                --primary-dark: #3a0ca3;
                --secondary-color: #3f37c9;
                --success-color: #4caf50;
                --danger-color: #f44336;
                --warning-color: #ff9800;
                --info-color: #2196f3;
                --dark-color: #2b2d42;
                --light-color: #f8f9fa;
                --gray-color: #6c757d;
                --white: #ffffff;
                --black: #000000;
                --shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
                --bg-body: #f5f7fa;
                --bg-card: #ffffff;
                --bg-sidebar: #2b2d42;
                --bg-topbar: #ffffff;
                --text-primary: #2b2d42;
                --text-secondary: #6c757d;
                --border-color: #e0e0e0;
                --input-bg: #ffffff;
                --input-border: #e0e0e0;
                --table-header-bg: #f8f9fa;
                --table-row-hover: #f8f9fa;
                --modal-bg: #ffffff;
                --dropdown-bg: #ffffff;
                --stat-card-bg: #ffffff;
                --transition: all 0.3s ease;
            }
            
            /* Smooth transitions for theme switching */
            body, .sidebar, .main-content, .stat-card, .data-table, .card, .modal-content {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            }
            
            /* Theme-specific styles */
            body.theme-dark {
                background-color: #121212;
            }
            
            body.theme-dark .sidebar {
                background-color: #16213e;
            }
            
            body.theme-dark .main-content {
                background-color: #121212;
            }
            
            body.theme-dark .stat-card,
            body.theme-dark .data-table,
            body.theme-dark .card,
            body.theme-dark .modal-content {
                background-color: #1e1e2e;
                color: #e0e0e0;
            }
            
            body.theme-dark .top-bar {
                background-color: #1a1a2e;
                border-bottom-color: #2d2d3d;
            }
            
            body.theme-dark .table {
                color: #e0e0e0;
            }
            
            body.theme-dark .table thead th {
                background-color: #1e1e2e;
                border-bottom-color: #3d3d4d;
            }
            
            body.theme-dark .table tbody td {
                border-bottom-color: #2d2d3d;
            }
            
            body.theme-dark .table-hover tbody tr:hover {
                background-color: #2d2d3d;
            }
            
            body.theme-dark .form-control,
            body.theme-dark .form-select {
                background-color: #2d2d3d;
                border-color: #3d3d4d;
                color: #e0e0e0;
            }
            
            body.theme-dark .form-control:focus,
            body.theme-dark .form-select:focus {
                background-color: #3d3d4d;
                border-color: #4361ee;
                color: #ffffff;
            }
            
            body.theme-dark .modal-header,
            body.theme-dark .modal-footer {
                border-color: #3d3d4d;
            }
            
            body.theme-dark .dropdown-menu {
                background-color: #1e1e2e;
                border-color: #3d3d4d;
            }
            
            body.theme-dark .dropdown-item {
                color: #e0e0e0;
            }
            
            body.theme-dark .dropdown-item:hover {
                background-color: #2d2d3d;
                color: #ffffff;
            }
            
            body.theme-dark .nav-tabs {
                border-bottom-color: #3d3d4d;
            }
            
            body.theme-dark .nav-tabs .nav-link {
                color: #adb5bd;
            }
            
            body.theme-dark .nav-tabs .nav-link.active {
                background-color: #1e1e2e;
                border-color: #3d3d4d #3d3d4d #1e1e2e;
                color: #ffffff;
            }
            
            body.theme-dark .alert-info {
                background-color: #0a3e6d;
                border-color: #0a5a8a;
                color: #8bb9fe;
            }
            
            body.theme-dark .alert-success {
                background-color: #1a4a1a;
                border-color: #2d6a2d;
                color: #6fbf6f;
            }
            
            body.theme-dark .alert-warning {
                background-color: #5c4a00;
                border-color: #8a6d00;
                color: #ffda6a;
            }
            
            body.theme-dark .alert-danger {
                background-color: #6a1a1a;
                border-color: #8a2d2d;
                color: #ff6b6b;
            }
            
            body.theme-dark .text-muted {
                color: #adb5bd !important;
            }
            
            body.theme-dark .border {
                border-color: #2d2d3d !important;
            }
            
            body.theme-dark hr {
                border-color: #2d2d3d;
            }
            
            body.theme-dark .pagination .page-link {
                background-color: #1e1e2e;
                border-color: #3d3d4d;
                color: #e0e0e0;
            }
            
            body.theme-dark .pagination .page-item.active .page-link {
                background-color: #4361ee;
                border-color: #4361ee;
                color: white;
            }
            
            body.theme-dark .pagination .page-item.disabled .page-link {
                background-color: #1a1a2e;
                color: #6c757d;
            }
        `;
        
        if (!document.getElementById('theme-manager-styles')) {
            document.head.appendChild(style);
        }
    }
}

// ============================================
// CREATE AND EXPORT SINGLETON INSTANCE
// ============================================

const themeManager = new ThemeManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager.injectCSS();
        themeManager.init();
    });
} else {
    themeManager.injectCSS();
    themeManager.init();
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, themeManager, ThemeConfig };
}

// Make available globally
window.ThemeManager = ThemeManager;
window.themeManager = themeManager;
window.ThemeConfig = ThemeConfig;