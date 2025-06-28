# SCSS Modules Guide

This project is configured to use SCSS modules with Next.js. Here's how to use them:

## Setup

The project includes:
- `sass` package for SCSS compilation
- Next.js configuration for SCSS support
- TypeScript declarations for SCSS modules
- Global SCSS variables and styles

## How to Use SCSS Modules

### 1. Create a SCSS Module

Create a file with `.module.scss` extension:

```scss
// MyComponent.module.scss
@import '../../styles/globals.scss';

.container {
  padding: 1rem;
  background-color: $primary-color;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: $dark-color;
}
```

### 2. Import and Use in Component

```tsx
import React from 'react';
import styles from './MyComponent.module.scss';

const MyComponent: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World</h1>
    </div>
  );
};

export default MyComponent;
```

### 3. Using Multiple Classes

```tsx
import React from 'react';
import styles from './MyComponent.module.scss';

const MyComponent: React.FC = () => {
  return (
    <div className={`${styles.container} ${styles.special}`}>
      Content
    </div>
  );
};
```

## Global SCSS Variables

The project includes global SCSS variables in `src/styles/globals.scss`:

- `$primary-color`: #007bff
- `$secondary-color`: #6c757d
- `$success-color`: #28a745
- `$danger-color`: #dc3545
- `$warning-color`: #ffc107
- `$info-color`: #17a2b8
- `$light-color`: #f8f9fa
- `$dark-color`: #343a40

## Import Global Variables

To use global variables in your SCSS modules:

```scss
@import '../../styles/globals.scss';

.myClass {
  color: $primary-color;
  background-color: $light-color;
}
```

## Benefits of SCSS Modules

1. **Scoped Styles**: CSS classes are automatically scoped to prevent conflicts
2. **Type Safety**: TypeScript support with proper type declarations
3. **SCSS Features**: Use variables, mixins, nesting, and other SCSS features
4. **Hot Reloading**: Changes are reflected immediately during development
5. **Optimization**: Unused styles are automatically removed in production

## Example Component

See `src/components/Button/` for a complete example of using SCSS modules with:
- Multiple variants (primary, secondary, success, danger)
- Different sizes (small, medium, large)
- Outline styles
- Hover and focus states
- Disabled states

## File Structure

```
src/
├── styles/
│   └── globals.scss          # Global styles and variables
├── components/
│   └── Button/
│       ├── Button.module.scss # Component-specific styles
│       ├── Button.tsx         # Component logic
│       └── index.ts           # Export file
└── types/
    └── scss.d.ts             # TypeScript declarations
``` 