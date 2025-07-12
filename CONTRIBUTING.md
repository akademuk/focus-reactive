# Contributing to Focus Reactive Website

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the Focus Reactive website.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd focus-reactive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser

## 📁 Project Structure

```
focus-reactive/
├── my-project/              # Main project directory
│   ├── components/          # Nunjucks components
│   ├── pages/              # Page templates
│   ├── styles/             # SCSS stylesheets
│   ├── scripts/            # JavaScript files
│   ├── images/             # Source images
│   ├── fonts/              # Web fonts
│   └── gulpfile.js         # Build configuration
├── package.json            # Dependencies and scripts
├── README.md              # Project documentation
└── .gitignore             # Git ignore rules
```

## 🛠️ Development Workflow

### Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build for production
- `npm run serve` - Serve built files
- `npm run clean` - Clean dist folder

### Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards below

3. Test your changes locally:
   ```bash
   npm start
   ```

4. Build and test production version:
   ```bash
   npm run build
   npm run serve
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   ```

6. Push to your fork and submit a pull request

## 📝 Coding Standards

### HTML/Nunjucks
- Use semantic HTML elements
- Include proper ARIA attributes for accessibility
- Add meaningful alt text for images
- Use proper heading hierarchy (h1, h2, h3, etc.)

### CSS/SCSS
- Follow BEM methodology for class naming
- Use mobile-first responsive design
- Keep specificity low
- Group related properties together
- Use CSS custom properties for repeated values

### JavaScript
- Use ES6+ features
- Add JSDoc comments for functions
- Handle errors gracefully
- Use meaningful variable and function names
- Avoid global variables

### Accessibility
- Ensure keyboard navigation works
- Provide proper ARIA labels
- Maintain color contrast ratios
- Test with screen readers
- Include focus indicators

### Performance
- Optimize images (WebP format when possible)
- Minimize CSS and JavaScript
- Use lazy loading for images
- Avoid blocking the main thread

## 🎨 Design System

### Colors
- Primary: `#00E56D` (Digital Green)
- Background: `#000000` (Black)
- Text: `#FFFFFF` (White)
- Secondary: `#3B3B3B` (Grey)

### Typography
- Font Family: Inter (Regular 400, Medium 500)
- Font sizes follow a modular scale
- Line height: 1.4 for body text, 1.2 for headings

### Breakpoints
- Mobile: < 1280px
- Desktop: 1280px+

## 🚨 Commit Message Convention

Use conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add mobile navigation menu`

## 🐛 Reporting Issues

When reporting issues, please include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser and version
6. Screenshots (if applicable)

## 📱 Testing

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Testing Checklist
- [ ] Responsive design works on mobile and desktop
- [ ] All images load correctly
- [ ] Navigation works properly
- [ ] Accessibility features function
- [ ] Performance is acceptable
- [ ] Cross-browser compatibility

## 🙋‍♀️ Questions?

If you have questions or need help, please:

1. Check existing issues and documentation
2. Create a new issue with the "question" label
3. Provide as much context as possible

Thank you for contributing! 🎉
