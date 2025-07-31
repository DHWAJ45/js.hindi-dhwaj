# Global Dropdown System - Usage Guide

This guide explains how to implement and use the global dropdown navigation system across multiple pages in your website.

## 🚀 Quick Start

### Method 1: Using the Navigation Component (Recommended)

1. **Include the required files in your HTML:**
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="dropdown.css">
```

2. **Add a navigation container in your HTML:**
```html
<div id="navigation-container"></div>
```

3. **Include the JavaScript files before closing `</body>`:**
```html
<script src="dropdown.js"></script>
<script src="nav-component.js"></script>
```

That's it! The navigation with dropdown will automatically appear on your page.

### Method 2: Manual HTML Implementation

If you prefer to write the HTML manually, copy the navigation structure from `index.html` and include:

```html
<script src="dropdown.js"></script>
```

## 📁 File Structure

```
your-project/
├── index.html              # Main page with full navigation
├── about.html              # Example page using navigation component
├── styles.css              # Main styles
├── dropdown.css            # Dropdown-specific styles
├── dropdown.js             # Core dropdown functionality
├── nav-component.js        # Reusable navigation component
└── DROPDOWN_USAGE.md       # This documentation
```

## 🎯 Features

### ✅ Accessibility
- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management
- High contrast support

### ✅ Responsive Design
- Mobile-friendly hamburger menu
- Touch-friendly interactions
- Adaptive grid layout

### ✅ Cross-Browser Compatibility
- Works in all modern browsers
- Graceful degradation for older browsers

### ✅ Performance
- Lightweight and optimized
- Minimal DOM manipulation
- Efficient event handling

## 🛠 Customization

### Updating Services Data

You can customize the services dropdown by modifying the `getServicesData()` method in `nav-component.js`:

```javascript
getServicesData() {
    return [
        {
            header: 'YOUR CATEGORY',
            items: [
                { text: 'Your Service', href: '#your-service' },
                { text: 'Another Service', href: '#another-service' }
            ]
        }
        // Add more categories...
    ];
}
```

### Changing Logo and Branding

```javascript
const nav = new NavigationComponent({
    logoSrc: 'your-logo.png',
    logoText: 'Your Company',
    logoHref: '/home'
});
```

### Adding New Dropdown Menus

You can create additional dropdown menus using the `createDropdown` utility:

```javascript
createDropdown({
    triggerText: 'Products',
    items: [
        {
            header: 'SOFTWARE',
            items: [
                { text: 'Product A', href: '/product-a' },
                { text: 'Product B', href: '/product-b' }
            ]
        }
    ],
    containerId: 'nav-menu',
    columns: 2
});
```

## 🎨 Styling

### CSS Variables

You can customize colors by modifying these CSS variables in `dropdown.css`:

```css
:root {
    --dropdown-bg: white;
    --dropdown-shadow: rgba(0, 0, 0, 0.15);
    --dropdown-border: #e0e0e0;
    --dropdown-hover: #667eea;
    --dropdown-hover-bg: #f8f9ff;
}
```

### Responsive Breakpoints

- Desktop: `> 1024px` - Full 4-column layout
- Tablet: `769px - 1024px` - 3-column layout  
- Mobile: `< 768px` - Single column layout

## 📱 Mobile Behavior

On mobile devices:
- Dropdown appears as an accordion-style menu
- Touch-friendly tap targets
- Optimized spacing and typography
- Hamburger menu for main navigation

## 🔧 API Reference

### GlobalDropdown Class

```javascript
// Access the global instance
window.globalDropdown

// Methods
.openDropdownById(id)          // Open specific dropdown
.closeDropdownById(id)         // Close specific dropdown
.closeAllDropdowns()           // Close all dropdowns
.addDropdown(element)          // Add new dropdown dynamically
```

### NavigationComponent Class

```javascript
// Create new instance
const nav = new NavigationComponent(options);

// Methods
.updateServices(data)          // Update services data
.addServiceCategory(category)  // Add new service category
```

## 🚨 Troubleshooting

### Dropdown Not Appearing
1. Check if all CSS files are loaded
2. Verify the dropdown HTML structure
3. Ensure JavaScript files are loaded in correct order

### Mobile Menu Not Working
1. Check if hamburger element exists
2. Verify mobile CSS is not overridden
3. Test on actual mobile device

### Accessibility Issues
1. Test with screen reader
2. Check keyboard navigation
3. Verify ARIA attributes are present

## 🔄 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 11 (limited support)

## 📊 Performance Tips

1. **Lazy Loading**: Consider loading dropdown content dynamically for large menus
2. **Caching**: Cache navigation component HTML in localStorage
3. **Minification**: Minify CSS and JavaScript files for production
4. **CDN**: Serve static assets from a CDN

## 🤝 Contributing

To add new features or fix bugs:

1. Modify the appropriate files
2. Test across different browsers and devices  
3. Update this documentation
4. Test accessibility with screen readers

## 📞 Support

For questions or issues with the dropdown system:
- Check this documentation first
- Review the example implementations
- Test in different browsers
- Check browser console for errors

---

**Happy coding! 🎉**