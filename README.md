# Focus Reactive - Modern Web Solutions

A modern, responsive website showcasing composable content systems and web development services. Built with performance, accessibility, and maintainability in mind.

## 🚀 Live Demo

🌐 **[View Live Website](https://akademuk.github.io/focus-reactive/)**

## ✨ Features

- **🎨 Modern Design**: Clean, professional layout with smooth animations
- **📱 Fully Responsive**: Mobile-first approach with adaptive layouts
- **⚡ Performance Optimized**: WebP images, CSS/JS minification, critical CSS
- **♿ Accessibility Ready**: Semantic HTML, ARIA labels, keyboard navigation
- **🔧 Component-Based**: Modular Nunjucks components for easy maintenance
- **🎬 Smooth Animations**: GSAP-powered scroll animations and interactions

## 🛠️ Technologies

- **Template Engine**: Nunjucks
- **Styling**: Sass (SCSS) with BEM methodology
- **Build Tool**: Gulp 5 with automated optimization
- **Animations**: GSAP (GreenSock)
- **Dev Server**: BrowserSync with live reload
- **Image Processing**: WebP conversion and optimization

## 📁 Project Structure

```
my-project/
├── components/          # Reusable Nunjucks components
│   ├── header.njk      # Site header with navigation
│   ├── hero.njk        # Hero section with main CTA
│   ├── integrate.njk   # Integration showcase
│   ├── work.njk        # Featured work portfolio
│   └── footer.njk      # Site footer
├── pages/              # Page templates  
│   └── index.njk       # Homepage template
├── styles/             # SASS stylesheets
│   ├── main.scss       # Main entry point
│   └── _*.scss         # Component-specific styles
├── scripts/            # JavaScript functionality
├── images/             # Optimized images
└── dist/               # Built files (auto-generated)
```

## 🔧 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens http://localhost:3000 with live reload

# Build for production
npm run build

# Serve production build
npm run serve
```

## 🎯 Component Architecture

### Reusable Components
Each section is an independent Nunjucks component that can be easily reordered:

```nunjucks
<!-- Easy to reorder in pages/index.njk -->
{% include 'hero.njk' %}
{% include 'integrate.njk' %}
{% include 'work.njk' %}
```

### Styling with BEM
Consistent naming convention across all components:
```scss
.hero { }                    // Block
.hero__title { }            // Element  
.hero__title--highlighted { } // Modifier
```

## 🎬 Animation Features

- **Scroll Animations**: Elements fade in as they enter viewport
- **Interactive Hover Effects**: Smooth transitions on user interaction
- **Mobile Menu**: Smooth slide-in navigation with overlay
- **Performance Optimized**: Hardware-accelerated CSS transforms

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+

## 🤖 AI Development Process

This project leveraged AI tools for accelerated development:
- **GitHub Copilot**: Component structure and JavaScript logic
- **ChatGPT**: Architecture decisions and optimization strategies
- **Time Saved**: ~40% faster development while maintaining code quality

📖 **[Read detailed AI usage documentation](./AI-USAGE.md)**

## 📚 Documentation

- 📋 **[Project Summary & Deliverables](./PROJECT-SUMMARY.md)**
- 🏗️ **[Architecture & Component Structure](./ARCHITECTURE.md)**
- 🤖 **[AI Tools Usage](./AI-USAGE.md)**
- ✅ **[Requirements Checklist](./CHECKLIST.md)**
- 🤝 **[Contributing Guidelines](./CONTRIBUTING.md)**

## � Deployment

This project is automatically deployed using GitHub Pages with GitHub Actions. Any push to the `main` branch triggers a new deployment.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

Built with ❤️ using modern web technologies and AI assistance.

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm start
# or
npm run dev
```

This will:
- Clean the dist folder
- Compile Sass to CSS
- Process Nunjucks templates to HTML
- Optimize and convert images
- Start live reload server at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Generates optimized files in the `dist/` folder.

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run serve` - Serve already built files
- `npm run clean` - Clean dist folder

## 🎨 Design System

### Colors
- **Primary**: #00E56D (Digital Green)
- **Background**: #000000 (Black)
- **Text**: #FFFFFF (White)
- **Secondary**: #3B3B3B (Grey)
- **Accent**: #2C2C2C (Grey 800)

### Typography
- **Font Family**: Inter (Regular 400, Medium 500)
- **Display**: font-display: swap for performance

### Breakpoints
- **Desktop**: 1280px+
- **Mobile**: < 1280px (mobile-first)

## 📱 Responsive Features

- Mobile-first CSS approach
- Flexible grid system
- Touch-friendly navigation
- Optimized images with WebP support
- Accessible mobile menu

## 🚀 Performance Optimizations

- CSS/JS minification
- Image optimization and WebP conversion
- Font loading optimization with font-display: swap
- Efficient Sass compilation
- BrowserSync for development

## 📧 Contact

Built with ❤️ for Focus Reactive team evaluation.
