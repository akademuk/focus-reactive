# Component Architecture Explanation

## 🧩 **How Components Are Structured**

### **1. Independent Components**
Each component is self-contained and can work independently:

```nunjucks
<!-- header.njk -->
<header class="header" role="banner">
  <!-- Complete header functionality -->
</header>

<!-- hero.njk -->  
<section class="hero" aria-labelledby="hero-heading">
  <!-- Complete hero section -->
</section>

<!-- integrate.njk -->
<div class="intro integrate">
  <!-- Complete animated section -->
</div>
```

### **2. Easy Reordering**
To change component order, simply modify `pages/index.njk`:

```nunjucks
<!-- Current order -->
<main>
  {% include 'hero.njk' %}
  {% include 'integrate.njk' %}  
  {% include 'work.njk' %}
</main>

<!-- Alternative order -->
<main>
  {% include 'work.njk' %}      <!-- Portfolio first -->
  {% include 'hero.njk' %}      <!-- Hero second -->
  {% include 'integrate.njk' %}  <!-- Animation last -->
</main>
```

### **3. Component Benefits**

- ✅ **Modularity**: Each component has its own SCSS file
- ✅ **Maintainability**: Changes in one component don't affect others  
- ✅ **Reusability**: Components can be used in different pages
- ✅ **Testing**: Each component can be tested independently
- ✅ **Development**: Multiple developers can work on different components

## 🎨 **SASS Architecture**

### **Component-Based Styles**
```scss
// main.scss - Entry point
@use 'global';    // Variables & mixins
@use 'header';    // Header component styles
@use 'hero';      // Hero component styles  
@use 'integrate'; // Integration section
@use 'work';      // Work section
@use 'footer';    // Footer component
@use 'animation'; // GSAP animations
```

### **BEM Naming Convention**
```scss
// Block
.work { }

// Elements  
.work__title { }
.work__items { }
.work__item { }

// Modifiers
.work__item--active { }
.work__item--featured { }
```

## 🚀 **Component Communication**

### **Through CSS Classes**
```javascript
// JavaScript can target any component
const workItems = document.querySelectorAll('.work__item');
const heroSection = document.querySelector('.hero');
```

### **Through Global Functions**
```javascript
// Functions available globally
window.initIntegrateAnimation = initIntegrateAnimation;

// Called from any component
initIntegrateAnimation();
```

## ⚡ **Performance Benefits**

### **Lazy Component Loading**
```javascript
// Conditional initialization based on component presence
if (document.querySelector('.integrate')) {
  initIntegrateAnimation();
}

if (document.querySelector('.work__item')) {
  initWorkItemsLogic();
}
```

### **Modular SCSS Compilation**
```scss
// Only included styles are compiled
@use 'header';   // Only if header component exists
@use 'hero';     // Only if hero component exists
@use 'work';     // Only if work component exists
```

This architecture ensures your project is **scalable**, **maintainable**, and **performance-optimized** while maintaining complete flexibility in component arrangement.
