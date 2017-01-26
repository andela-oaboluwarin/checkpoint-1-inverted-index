const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// Default tasks
gulp.task('default', ['browser-sync', 'browserify', 'watch']);


// Browser Sync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'inverted-index.html'
    },
    port: process.env.PORT || 5000
  });
});

// eslint task
gulp.task('lint', () => {
  gulp.src(['src/**/**.js', 'jasmine/spec/inverted-index-test.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

// Watch Task
gulp.task('watch', () => {
  gulp.watch('**/**.css', browserSync.reload);
  gulp.watch('**/**.html', browserSync.reload);
  gulp.watch(['./src/*.js', './jasmine/spec/*.js',
    'gulpfile.js'], browserSync.reload);
});

// Jasmine task
gulp.task('specs', () => {
  gulp.src(['src/**/**.js', 'jasmine/spec/inverted-index-test.js'])
    .pipe(jasmineBrowser().browserSync.reload);
});

// Browserify task
gulp.task('browserify', () =>
   browserify('jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./jasmine/spec/tests'))
);
