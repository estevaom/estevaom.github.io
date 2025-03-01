# Application Structure

This document outlines the organization of the application files.

## Directory Structure

```
/
├── index.html                     # Main entry point
├── favicon.ico
├── assets/                        # Static assets
│   ├── images/                    # Images
│   ├── icons/
│   └── fonts/
├── app/
│   ├── core/                      # Core functionality
│   │   ├── services/              # All services
│   │   ├── models/                # Data models
│   │   └── config/                # App configuration
│   ├── components/                # All components
│   │   ├── header/                # Site header component
│   │   ├── resume/                # Resume component
│   │   └── tech-item/             # Tech item component
│   ├── shared/                    # Shared functionality
│   │   ├── directives/            # Custom directives
│   │   └── filters/               # Custom filters
│   └── styles/                    # All styles
│       ├── main.css               # Main application styles
│       ├── themes/                # Theme files
│       └── components/            # Component-specific styles
├── data/                          # JSON data files
└── blog/                          # Blog content
```

## Organizational Benefits

1. **Clearer separation of concerns**: Components, services, and styles are in their own dedicated directories
2. **Improved maintainability**: Related files are grouped together logically
3. **Better scalability**: The structure supports growth with clear places for new features
4. **Consistent naming**: Simplified structure with consistent naming conventions
5. **Easier theme management**: All theme files are in a dedicated directory
6. **Centralized static assets**: Images and other static assets are organized in the assets directory

## How to Add New Components

When adding a new component:

1. Create a new directory under `app/components/` with the component name
2. Place component files in the directory (.component.js, .module.js, .template.html)
3. Add any component-specific styles to `app/styles/components/`
4. Reference the component in index.html with the new path 