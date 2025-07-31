// Global Dropdown Component
class GlobalDropdown {
    constructor() {
        this.dropdowns = [];
        this.init();
    }

    init() {
        // Initialize all dropdowns on the page
        this.initializeDropdowns();
        // Setup mobile menu
        this.initializeMobileMenu();
        // Setup event listeners
        this.setupEventListeners();
        // Setup accessibility
        this.setupAccessibility();
    }

    initializeDropdowns() {
        const dropdownElements = document.querySelectorAll('.dropdown');
        
        dropdownElements.forEach((dropdown, index) => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                const dropdownInstance = {
                    id: `dropdown-${index}`,
                    element: dropdown,
                    toggle: toggle,
                    menu: menu,
                    isOpen: false
                };
                
                this.dropdowns.push(dropdownInstance);
                this.setupDropdownEvents(dropdownInstance);
            }
        });
    }

    setupDropdownEvents(dropdown) {
        // Click event for dropdown toggle
        dropdown.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown(dropdown);
        });

        // Hover events for desktop
        if (window.innerWidth > 768) {
            dropdown.element.addEventListener('mouseenter', () => {
                this.openDropdown(dropdown);
            });

            dropdown.element.addEventListener('mouseleave', () => {
                this.closeDropdown(dropdown);
            });
        }

        // Keyboard navigation
        dropdown.toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDropdown(dropdown);
            } else if (e.key === 'Escape') {
                this.closeDropdown(dropdown);
            }
        });
    }

    toggleDropdown(dropdown) {
        if (dropdown.isOpen) {
            this.closeDropdown(dropdown);
        } else {
            // Close other dropdowns first
            this.closeAllDropdowns();
            this.openDropdown(dropdown);
        }
    }

    openDropdown(dropdown) {
        dropdown.element.classList.add('active');
        dropdown.isOpen = true;
        
        // Set ARIA attributes
        dropdown.toggle.setAttribute('aria-expanded', 'true');
        dropdown.menu.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const firstLink = dropdown.menu.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }

    closeDropdown(dropdown) {
        dropdown.element.classList.remove('active');
        dropdown.isOpen = false;
        
        // Set ARIA attributes
        dropdown.toggle.setAttribute('aria-expanded', 'false');
        dropdown.menu.setAttribute('aria-hidden', 'true');
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            this.closeDropdown(dropdown);
        });
    }

    initializeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Update ARIA attributes
                const isExpanded = navMenu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            });
        }
    }

    setupEventListeners() {
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle escape key globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    setupAccessibility() {
        // Add ARIA attributes to dropdowns
        this.dropdowns.forEach(dropdown => {
            dropdown.toggle.setAttribute('aria-haspopup', 'true');
            dropdown.toggle.setAttribute('aria-expanded', 'false');
            dropdown.menu.setAttribute('role', 'menu');
            dropdown.menu.setAttribute('aria-hidden', 'true');
            
            // Add role to menu items
            const menuItems = dropdown.menu.querySelectorAll('a');
            menuItems.forEach(item => {
                item.setAttribute('role', 'menuitem');
                item.setAttribute('tabindex', '-1');
            });
        });
    }

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Remove hover events on mobile
            this.dropdowns.forEach(dropdown => {
                dropdown.element.removeEventListener('mouseenter', this.openDropdown);
                dropdown.element.removeEventListener('mouseleave', this.closeDropdown);
            });
        } else {
            // Re-add hover events on desktop
            this.dropdowns.forEach(dropdown => {
                dropdown.element.addEventListener('mouseenter', () => {
                    this.openDropdown(dropdown);
                });
                dropdown.element.addEventListener('mouseleave', () => {
                    this.closeDropdown(dropdown);
                });
            });
        }
        
        // Close all dropdowns on resize
        this.closeAllDropdowns();
    }

    // Public API methods
    getDropdownById(id) {
        return this.dropdowns.find(dropdown => dropdown.id === id);
    }

    openDropdownById(id) {
        const dropdown = this.getDropdownById(id);
        if (dropdown) {
            this.openDropdown(dropdown);
        }
    }

    closeDropdownById(id) {
        const dropdown = this.getDropdownById(id);
        if (dropdown) {
            this.closeDropdown(dropdown);
        }
    }

    // Method to dynamically add new dropdowns
    addDropdown(dropdownElement) {
        const toggle = dropdownElement.querySelector('.dropdown-toggle');
        const menu = dropdownElement.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            const dropdownInstance = {
                id: `dropdown-${this.dropdowns.length}`,
                element: dropdownElement,
                toggle: toggle,
                menu: menu,
                isOpen: false
            };
            
            this.dropdowns.push(dropdownInstance);
            this.setupDropdownEvents(dropdownInstance);
            
            // Setup accessibility for new dropdown
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            menu.setAttribute('role', 'menu');
            menu.setAttribute('aria-hidden', 'true');
            
            return dropdownInstance.id;
        }
        
        return null;
    }
}

// Initialize the global dropdown system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.globalDropdown = new GlobalDropdown();
});

// Utility function to create dropdown programmatically
function createDropdown(config) {
    const {
        triggerText,
        items,
        containerId,
        columns = 1
    } = config;
    
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    // Create dropdown structure
    const dropdown = document.createElement('li');
    dropdown.className = 'nav-item dropdown';
    
    const toggle = document.createElement('a');
    toggle.href = '#';
    toggle.className = 'nav-link dropdown-toggle';
    toggle.innerHTML = `${triggerText} <span class="dropdown-arrow">▼</span>`;
    
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';
    
    const grid = document.createElement('div');
    grid.className = 'dropdown-grid';
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    
    // Create columns
    items.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'dropdown-column';
        
        const header = document.createElement('h3');
        header.className = 'dropdown-header';
        header.textContent = column.header;
        
        const list = document.createElement('ul');
        list.className = 'dropdown-list';
        
        column.items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href || '#';
            a.textContent = item.text;
            li.appendChild(a);
            list.appendChild(li);
        });
        
        columnDiv.appendChild(header);
        columnDiv.appendChild(list);
        grid.appendChild(columnDiv);
    });
    
    menu.appendChild(grid);
    dropdown.appendChild(toggle);
    dropdown.appendChild(menu);
    container.appendChild(dropdown);
    
    // Register with global dropdown system
    if (window.globalDropdown) {
        return window.globalDropdown.addDropdown(dropdown);
    }
    
    return null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GlobalDropdown, createDropdown };
}