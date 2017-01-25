/* global require: true */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');
const eslint = require('gulp-eslint');

// Default tasks
gulp.task('default', ['browserSync', 'lint', 'specs']);


// Browser Sync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'inverted-index.html'
    },
    port: 8080

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
  gulp.watch(['./src/*.js', './jasmine/spec/*.js'], browserSync.reload);
});

// Jasmine task
gulp.task('specs', () => {
  gulp.src(['src/**/**.js', 'jasmine/spec/inverted-index-test.js'])
    .pipe(jasmineBrowser().browserSync.reload);
});

