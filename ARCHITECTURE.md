# 🏗️ Component Architecture & Structure

## Component Organization

This project follows a modular component-based architecture using Nunjucks templating. Each major section is its own independent component that can be easily reordered.

### 📁 Project Structure
```
my-project/
├── components/          # Reusable Nunjucks components
│   ├── header.njk      # Site header with navigation
│   ├── hero.njk        # Hero section with title and CTA
│   ├── integrate.njk   # Integration showcase with animations
│   ├── work.njk        # Featured work portfolio
│   └── footer.njk      # Site footer
├── pages/              # Page templates
│   └── index.njk       # Main homepage template
├── styles/             # SASS stylesheets (BEM methodology)
│   ├── main.scss       # Main entry point
│   ├── _global.scss    # Variables, mixins, base styles
│   ├── _header.scss    # Header component styles
│   ├── _hero.scss      # Hero section styles
│   ├── _integrate.scss # Integration section styles
│   ├── _work.scss      # Work section styles
│   ├── _footer.scss    # Footer styles
│   └── _animation.scss # Animation utilities
├── scripts/            # JavaScript functionality
│   └── main.js         # Main JS with animations and interactions
└── images/             # Optimized images (WebP + fallbacks)
```

## 🔄 Component Reordering

To change the layout order, simply modify the include statements in `pages/index.njk`:

### Current Order:
```nunjucks
<main id="main-content" role="main">
    {% include 'hero.njk' %}          <!-- 1. Hero Section -->
    {% include 'integrate.njk' %}     <!-- 2. Integration Section -->
    {% include 'work.njk' %}          <!-- 3. Featured Work -->
</main>
```

### Example: Reordered Layout:
```nunjucks
<main id="main-content" role="main">
    {% include 'hero.njk' %}          <!-- 1. Hero Section -->
    {% include 'work.njk' %}          <!-- 2. Featured Work -->
    {% include 'integrate.njk' %}     <!-- 3. Integration Section -->
</main>
```

## 🎨 Styling Methodology

### BEM (Block Element Modifier)
Each component follows BEM naming convention:

```scss
// Block
.hero { }

// Element
.hero__title { }
.hero__content { }

// Modifier
.hero__title--highlighted { }
```

### SCSS Organization
- **Variables**: Colors, fonts, breakpoints in `_global.scss`
- **Mixins**: Reusable patterns (responsive breakpoints, wrapper)
- **Component Styles**: Each component has its own SCSS file
- **Modular Imports**: All styles imported through `main.scss`

## 🎯 Key Features

### 1. **Semantic HTML Structure**
```html
<header role="banner">           <!-- Site header -->
<main role="main">               <!-- Main content -->
  <section aria-labelledby="..."> <!-- Individual sections -->
<footer role="contentinfo">      <!-- Site footer -->
```

### 2. **Responsive Design**
- Mobile-first approach
- CSS Grid for complex layouts
- Flexbox for component alignment
- Breakpoint system: mobile (default) → desktop (1280px+)

### 3. **Performance Optimizations**
- Critical CSS inlined in `<head>`
- Non-critical CSS loaded asynchronously
- WebP images with fallbacks
- Lazy loading for images
- Minified CSS/JS in production

### 4. **Accessibility Features**
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management for mobile menu
- Screen reader friendly content

## 🔧 Build Process

### Development Mode
```bash
npm run dev
```
- Live reload with BrowserSync
- SCSS compilation with source maps
- Automatic browser refresh on changes

### Production Build
```bash
npm run build
```
- CSS/JS minification
- Image optimization
- HTML minification
- WebP conversion

## 🎬 Animation System

### GSAP Integration
- Scroll-triggered animations
- Intersection Observer API
- Smooth transitions with cubic-bezier easing
- Performance-optimized animations

### Animation Patterns
```javascript
// Fade in on scroll
gsap.fromTo(element, 
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.6 }
);
```

## 📱 Mobile Menu System

### Features
- Burger menu toggle
- Overlay with proper z-index
- Body scroll lock during menu open
- Accessible keyboard navigation
- Smooth animations

## 🎨 Design System

### Colors
- Primary: `#00E56D` (Digital Green)
- Background: `#000` (Black)
- Text: `#FFF` (White)
- Secondary: `#3B3B3B` (Grey)

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 400 (Regular), 500 (Medium)
- Responsive font sizes with `clamp()`

This architecture ensures maintainability, scalability, and ease of content management while following modern web development best practices.
