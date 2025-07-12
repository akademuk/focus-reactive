# Focus Reactive - Modern Web Solutions

A modern, responsive website showcasing composable content systems and web development services.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern Stack**: Built with Nunjucks templating, Sass, and Gulp automation
- **Performance Optimized**: WebP image format support, CSS/JS minification
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO Ready**: Meta tags, Open Graph, structured markup

## 🛠️ Technologies

- **Template Engine**: Nunjucks
- **Styling**: Sass (SCSS)
- **Build Tool**: Gulp 5
- **Dev Server**: BrowserSync
- **Image Processing**: WebP conversion, optimization
- **CSS**: Autoprefixer, minification
- **JavaScript**: ES6+, minification

## 📁 Project Structure

```
my-project/
├── components/          # Nunjucks components
│   ├── header.njk
│   ├── hero.njk
│   ├── integrate.njk
│   ├── ship.njk
│   ├── work.njk
│   └── footer.njk
├── pages/              # Page templates
│   └── index.njk
├── styles/             # Sass stylesheets
│   ├── main.scss       # Main entry point
│   ├── _global.scss    # Global styles & variables
│   └── _*.scss         # Component styles
├── scripts/            # JavaScript files
│   └── main.js
├── images/             # Source images
├── fonts/              # Web fonts
└── dist/               # Built files (auto-generated)
```

## 🔧 Getting Started

### Prerequisites

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
