// Reusable Navigation Component
class NavigationComponent {
    constructor(options = {}) {
        this.options = {
            containerId: 'navigation-container',
            logoSrc: 'logo.svg',
            logoText: 'EpicBliss',
            logoHref: '#home',
            ...options
        };
        
        this.servicesData = this.getServicesData();
        this.init();
    }

    init() {
        this.render();
        this.initializeDropdown();
    }

    getServicesData() {
        return [
            {
                header: 'MICROSOFT TECHNOLOGIES',
                items: [
                    { text: 'SharePoint Development', href: '#sharepoint' },
                    { text: 'ASP.NET Development', href: '#aspnet' },
                    { text: 'Dynamics CMS Development', href: '#dynamics' },
                    { text: 'AX Development', href: '#ax' },
                    { text: 'Azure Development', href: '#azure' },
                    { text: 'Business Intelligence', href: '#bi' },
                    { text: 'PowerBI Development', href: '#powerbi' }
                ]
            },
            {
                header: 'MOBILE DEVELOPMENT',
                items: [
                    { text: 'iPhone App /Android Development', href: '#iphone' },
                    { text: 'Phone Gap App Development', href: '#phonegap' },
                    { text: 'Hybrid /Ionic App Development', href: '#hybrid' },
                    { text: 'React Native Development', href: '#react-native' },
                    { text: 'Xamarin App Development', href: '#xamarin' },
                    { text: 'Progressive Web Apps', href: '#pwa' }
                ]
            },
            {
                header: 'ATLASSIAN',
                items: [
                    { text: 'Jira/Bitbucket/Confluence', href: '#jira' },
                    { text: 'Migration', href: '#migration' },
                    { text: 'Upgradation', href: '#upgradation' },
                    { text: 'Plugin Development', href: '#plugin' },
                    { text: 'Customization', href: '#customization' },
                    { text: 'Automation', href: '#automation' },
                    { text: 'Renewal of Application Licenses', href: '#renewal' }
                ]
            },
            {
                header: 'CLOUD SERVICES',
                items: [
                    { text: 'DevOps', href: '#devops' },
                    { text: 'Amazon Web Services', href: '#aws' },
                    { text: 'Azure Cloud Service', href: '#azure-cloud' },
                    { text: 'Google App Engine Services', href: '#google' }
                ]
            },
            {
                header: 'BI & DATA VISUALIZATION',
                items: [
                    { text: 'Tableau Development', href: '#tableau' },
                    { text: 'Pentaho Development', href: '#pentaho' },
                    { text: 'PowerBI', href: '#powerbi-viz' },
                    { text: 'Jasper/Qlickview', href: '#jasper' },
                    { text: 'Tibco Spotfire/Zoho reports', href: '#tibco' }
                ]
            },
            {
                header: 'WEB TECHNOLOGIES',
                items: [
                    { text: 'AngularJS/MEAN Stack', href: '#angular' },
                    { text: 'PHP Website Development', href: '#php' },
                    { text: 'Phalcon/Laravel Development', href: '#phalcon' },
                    { text: 'WordPress /Symfony', href: '#wordpress' },
                    { text: 'Node.js & MongoDB', href: '#nodejs' },
                    { text: 'Full Stack Development', href: '#fullstack' }
                ]
            },
            {
                header: 'MACHINE LEARNING',
                items: [
                    { text: 'Cognitive Insight', href: '#cognitive-insight' },
                    { text: 'Cognitive Engagement', href: '#cognitive-engagement' },
                    { text: 'Cognitive Automation', href: '#cognitive-automation' },
                    { text: 'Data Mining', href: '#data-mining' },
                    { text: 'Natural Language Processing', href: '#nlp' },
                    { text: 'Robotic Process Automation', href: '#rpa' }
                ]
            },
            {
                header: 'ENTERPRISE SERVICES',
                items: [
                    { text: 'AR / VR', href: '#ar-vr' },
                    { text: 'CRM', href: '#crm' },
                    { text: 'Enterprise Mobility Services', href: '#enterprise-mobility' },
                    { text: 'Blockchain Services', href: '#blockchain' },
                    { text: 'Digital Marketing', href: '#digital-marketing' },
                    { text: 'Gaming', href: '#gaming' },
                    { text: 'IOT/Blockchain', href: '#iot' }
                ]
            }
        ];
    }

    render() {
        const container = document.getElementById(this.options.containerId);
        if (!container) {
            console.error(`Container with ID '${this.options.containerId}' not found`);
            return;
        }

        const navHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <!-- Logo -->
                    <div class="nav-logo">
                        <a href="${this.options.logoHref}">
                            <img src="${this.options.logoSrc}" alt="${this.options.logoText}" class="logo">
                            <span class="logo-text">${this.options.logoText}</span>
                        </a>
                    </div>
                    
                    <!-- Navigation Menu -->
                    <ul class="nav-menu" id="nav-menu">
                        <li class="nav-item"><a href="#about" class="nav-link">ABOUT US</a></li>
                        <li class="nav-item dropdown" id="services-dropdown">
                            <a href="#services" class="nav-link dropdown-toggle" id="servicesDropdown">
                                SERVICES
                                <span class="dropdown-arrow">▼</span>
                            </a>
                            <!-- Services Dropdown Menu -->
                            <div class="dropdown-menu" id="servicesMenu">
                                <div class="dropdown-grid">
                                    ${this.renderServicesColumns()}
                                </div>
                            </div>
                        </li>
                        <li class="nav-item"><a href="#portfolio" class="nav-link">PORTFOLIO</a></li>
                        <li class="nav-item"><a href="#careers" class="nav-link">CAREERS</a></li>
                        <li class="nav-item"><a href="#events" class="nav-link">EVENTS</a></li>
                        <li class="nav-item"><a href="#contact" class="nav-link">CONTACT US</a></li>
                    </ul>
                    
                    <!-- Mobile Menu Button -->
                    <div class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;

        container.innerHTML = navHTML;
    }

    renderServicesColumns() {
        return this.servicesData.map(column => `
            <div class="dropdown-column">
                <h3 class="dropdown-header">${column.header}</h3>
                <ul class="dropdown-list">
                    ${column.items.map(item => `
                        <li><a href="${item.href}">${item.text}</a></li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    initializeDropdown() {
        // Wait for the global dropdown system to be available
        const initDropdown = () => {
            if (window.globalDropdown) {
                // Re-initialize dropdowns to include the new navigation
                window.globalDropdown.initializeDropdowns();
            } else {
                // If global dropdown isn't ready, wait a bit and try again
                setTimeout(initDropdown, 100);
            }
        };
        
        initDropdown();
    }

    // Method to update services data
    updateServices(newServicesData) {
        this.servicesData = newServicesData;
        this.render();
        this.initializeDropdown();
    }

    // Method to add a new service category
    addServiceCategory(category) {
        this.servicesData.push(category);
        this.render();
        this.initializeDropdown();
    }

    // Method to update navigation items
    updateNavItems(navItems) {
        // This would require a more complex implementation
        // For now, you can modify the render method directly
        console.log('updateNavItems method would be implemented here');
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        window.navigationComponent = new NavigationComponent();
    }
});

// Utility function to create navigation on any page
function createNavigation(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return null;
    }

    return new NavigationComponent({
        containerId,
        ...options
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationComponent, createNavigation };
}