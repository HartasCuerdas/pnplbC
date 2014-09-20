var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    stylus    = require('gulp-stylus'),
    nib       = require('nib'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),
    inject    = require('gulp-inject'),
    wiredep   = require('wiredep').stream,
    gulpif    = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    useref    = require('gulp-useref'),
    uglify    = require('gulp-uglify'),
    uncss     = require('gulp-uncss'),
    angularFilesort = require('gulp-angular-filesort'),
    templateCache = require('gulp-angular-templatecache'),
    historyApiFallback = require('connect-history-api-fallback');

// Dev Server
gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8000,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// Production-like Server
gulp.task('server-dist', function() {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    port: 8000,
    livereload: false,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// Looks for JS errors
gulp.task('jshint', function() {
  return gulp.src(['.app/main.js','./app/*View/*View.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Stylus Preprocessing and change reloading
gulp.task('css', function() {
  gulp.src('./app/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./app/stylesheets'))
    .pipe(connect.reload());
});

// Reloads browser when HTML changes
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

// Busca en las carpetas de estilos y javascript los archivos
// para inyectarlos en el index.html
gulp.task('inject', function() {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(
      gulp.src(['./app/*.js','./app/components/**/*.js', '!./app/components/**/*_test.js', './app/*View/*View.js']).pipe(angularFilesort()), {
      read: false,
      ignorePath: '/app'
    }))
    .pipe(inject(
      gulp.src(['./app/stylesheets/**/*.css']), {
        read: false,
        ignorePath: '/app'
      }
    ))
    .pipe(gulp.dest('./app'));
});

// Injects libraries installed with Bower
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});

// Compresses, minifies and uglifies js and cs
gulp.task('compress', function() {
  gulp.src('./app/index.html')
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({mangle: false })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});

// Drops out the unused CSS
gulp.task('uncss', function() {
  gulp.src('./dist/css/style.min.css')
    .pipe(uncss({
      html: ['./app/index.html', './app/weeksView/weeksView.html', './app/weekView/weekView.html']
    }))
    .pipe(gulp.dest('./dist/css'));
});

// Copies static content and index.html to dist
// deletes comments
gulp.task('copy', function() {
  gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'));
});

// Watches change in code
// and triggers tasks
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/*.js','./app/*View/*View.js', './Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
gulp.task('build', ['templates', 'compress', 'copy', 'uncss']);

