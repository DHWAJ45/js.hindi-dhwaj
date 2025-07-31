// Global Dropdown Menu JavaScript
class GlobalDropdown {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupGlobalDropdown();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        // Handle dropdown hover effects
        const dropdownContainers = document.querySelectorAll('.dropdown-container');
        
        dropdownContainers.forEach(container => {
            const dropdownMenu = container.querySelector('.dropdown-menu');
            let hoverTimeout;

            // Mouse enter
            container.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                this.showDropdown(dropdownMenu);
            });

            // Mouse leave with delay
            container.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    this.hideDropdown(dropdownMenu);
                }, 200);
            });

            // Prevent hiding when hovering over dropdown
            dropdownMenu.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });

            dropdownMenu.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    this.hideDropdown(dropdownMenu);
                }, 200);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                this.hideAllDropdowns();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllDropdowns();
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.toggleMobileMenuIcon(mobileMenuBtn);
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        this.resetMobileMenuIcon(mobileMenuBtn);
                    }
                });
            });

            // Handle mobile dropdown clicks
            const mobileDropdownTriggers = navMenu.querySelectorAll('.dropdown-trigger');
            mobileDropdownTriggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdownMenu = trigger.nextElementSibling;
                        this.toggleMobileDropdown(dropdownMenu);
                    }
                });
            });
        }
    }

    setupGlobalDropdown() {
        const globalDropdownBtn = document.getElementById('globalDropdownBtn');
        
        if (globalDropdownBtn) {
            globalDropdownBtn.addEventListener('click', () => {
                this.toggleGlobalDropdown();
            });
        }
    }

    setupKeyboardNavigation() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const dropdownMenu = trigger.nextElementSibling;
                    this.toggleDropdown(dropdownMenu);
                }
            });
        });

        // Arrow key navigation within dropdown
        document.addEventListener('keydown', (e) => {
            const activeDropdown = document.querySelector('.dropdown-menu[style*="opacity: 1"]');
            if (activeDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                e.preventDefault();
                this.navigateDropdownItems(activeDropdown, e.key === 'ArrowDown');
            }
        });
    }

    showDropdown(dropdownMenu) {
        if (dropdownMenu) {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
            dropdownMenu.classList.add('show');
        }
    }

    hideDropdown(dropdownMenu) {
        if (dropdownMenu) {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateX(-50%) translateY(-10px)';
            dropdownMenu.classList.remove('show');
        }
    }

    hideAllDropdowns() {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => this.hideDropdown(menu));
    }

    toggleDropdown(dropdownMenu) {
        if (dropdownMenu.style.opacity === '1') {
            this.hideDropdown(dropdownMenu);
        } else {
            this.hideAllDropdowns();
            this.showDropdown(dropdownMenu);
        }
    }

    toggleGlobalDropdown() {
        const servicesDropdown = document.querySelector('.dropdown-container .dropdown-menu');
        if (servicesDropdown) {
            this.toggleDropdown(servicesDropdown);
            
            // Scroll to services menu if not visible
            const servicesContainer = document.querySelector('.dropdown-container');
            if (servicesContainer) {
                servicesContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    }

    toggleMobileDropdown(dropdownMenu) {
        const isVisible = dropdownMenu.style.display === 'block';
        
        // Hide all other mobile dropdowns
        const allMobileDropdowns = document.querySelectorAll('.dropdown-menu');
        allMobileDropdowns.forEach(menu => {
            menu.style.display = 'none';
        });

        // Toggle current dropdown
        if (!isVisible) {
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.position = 'static';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'none';
        }
    }

    toggleMobileMenuIcon(button) {
        const spans = button.querySelectorAll('span');
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.resetMobileMenuIcon(button);
        }
    }

    resetMobileMenuIcon(button) {
        const spans = button.querySelectorAll('span');
        button.classList.remove('active');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    navigateDropdownItems(dropdown, isDown) {
        const links = dropdown.querySelectorAll('.dropdown-link');
        const currentFocus = document.activeElement;
        let currentIndex = Array.from(links).indexOf(currentFocus);
        
        if (isDown) {
            currentIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        }
        
        links[currentIndex].focus();
    }

    // Utility method to check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Method to create dropdown programmatically (for global access)
    createGlobalDropdown(targetElement, options = {}) {
        const dropdownHTML = `
            <div class="global-dropdown-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9998;
                opacity: 0;
                transition: opacity 0.3s ease;
            "></div>
            <div class="global-dropdown-popup" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 8px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
                transition: all 0.3s ease;
            ">
                ${document.querySelector('.dropdown-content').outerHTML}
                <button class="close-global-dropdown" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                " onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='none'">×</button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', dropdownHTML);

        const overlay = document.querySelector('.global-dropdown-overlay');
        const popup = document.querySelector('.global-dropdown-popup');
        const closeBtn = popup.querySelector('.close-global-dropdown');

        // Show animation
        setTimeout(() => {
            overlay.style.opacity = '1';
            popup.style.opacity = '1';
            popup.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        // Close handlers
        const closeDropdown = () => {
            overlay.style.opacity = '0';
            popup.style.opacity = '0';
            popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                overlay.remove();
                popup.remove();
            }, 300);
        };

        closeBtn.addEventListener('click', closeDropdown);
        overlay.addEventListener('click', closeDropdown);
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeDropdown();
                document.removeEventListener('keydown', escHandler);
            }
        });

        return { overlay, popup, close: closeDropdown };
    }
}

// Initialize the global dropdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GlobalDropdown();
});

// Handle window resize
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            const globalDropdown = new GlobalDropdown();
            globalDropdown.resetMobileMenuIcon(mobileMenuBtn);
        }
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Export for global access (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalDropdown;
}