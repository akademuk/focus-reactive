/**
 * Gulpfile for Focus Reactive Website
 * 
 * Features:
 * - Nunjucks template compilation
 * - Sass compilation with autoprefixer
 * - Image optimization with WebP conversion
 * - JavaScript minification
 * - Development server with live reload
 * - Production build optimization
 */

import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import del from 'del';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import htmlmin from 'gulp-htmlmin';

// File paths configuration
const paths = {
  styles: {
    src: 'styles/main.scss',
    watch: 'styles/**/*.scss',
    dest: 'dist/css'
  },
  templates: {
    src: 'pages/**/*.njk',
    watch: ['components/**/*.njk', 'pages/**/*.njk'],
    dest: 'dist'
  },
  scripts: {
    src: 'scripts/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'images/**/*',
    dest: 'dist/images'
  },
  fonts: {
    src: 'fonts/**/*',
    dest: 'dist/fonts'
  },
  headers: {
    src: '_headers',
    dest: 'dist'
  }
};

// Задача для обработки изображений с оптимизацией
function imagesOriginals() {
  return gulp.src(['images/**/*.{png,jpg,jpeg,gif,svg}'], { encoding: false })
    .pipe(imagemin([
      imageminMozjpeg({ quality: 85, progressive: true }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminSvgo()
    ]))
    .pipe(gulp.dest(paths.images.dest));
}

function imagesWebp() {
  return gulp.src(['images/**/*.{png,jpg,jpeg}'], { encoding: false })
    .pipe(webp({ 
      quality: 80,
      method: 6,
      effort: 6
    }))
    .pipe(gulp.dest(paths.images.dest));
}
const images = gulp.series(imagesOriginals, imagesWebp);

// Задача для сборки SASS → CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      includePaths: ['styles'],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream({ 
      match: '**/*.css',
      once: true
    }));
}

// Задача для рендеринга Nunjucks → HTML с минификацией
function templates() {
  return gulp.src(paths.templates.src)
    .pipe(nunjucksRender({
      path: ['components']
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }))
    .pipe(gulp.dest(paths.templates.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

function headers() {
  return gulp.src(paths.headers.src)
    .pipe(gulp.dest(paths.headers.dest));
}

// Задача для локального сервера + watch
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
      middleware: [
        function(req, res, next) {
          if (req.url.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
          } else if (req.url.endsWith('.jpg') || req.url.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
          } else if (req.url.endsWith('.webp')) {
            res.setHeader('Content-Type', 'image/webp');
          } else if (req.url.endsWith('.svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
          }
          // Отключаем кеширование для изображений и CSS в dev режиме
          if (req.url.startsWith('/images/') || req.url.startsWith('/css/')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
          next();
        }
      ]
    },
    open: false,
    notify: false,
    logLevel: 'info',
    ghostMode: false,
    reloadDelay: 0
  });

  gulp.watch(paths.styles.watch, gulp.series(styles, function(done) {
    setTimeout(function() {
      browserSync.reload();
    }, 100);
    done();
  }));
  gulp.watch(paths.templates.watch, templates).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
  gulp.watch(paths.images.src, images).on('change', browserSync.reload);
  gulp.watch(paths.fonts.src, fonts).on('change', browserSync.reload);
}

/**
 * Clean dist directory before build
 * @returns {Promise} Deletion promise
 */
async function clean() {
  return del(['dist/*']);
}

/**
 * Production build task
 * Builds optimized version for deployment
 */
const build = gulp.series(
  clean,
  gulp.parallel(styles, templates, scripts, images, fonts, headers)
);

/**
 * Development task
 * Builds project and starts development server with live reload
 */
const dev = gulp.series(
  clean,
  gulp.parallel(styles, templates, scripts, images, fonts, headers),
  serve
);

// Export all tasks
export { 
  styles, 
  templates, 
  scripts, 
  images, 
  fonts, 
  headers,
  serve, 
  clean, 
  build, 
  dev 
};

// Default task
export default build;
