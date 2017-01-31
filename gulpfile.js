const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// Default tasks
gulp.task('default', ['browserSync', 'watch']);


// Browser Sync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: './',
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
  gulp.watch(['./src/*.js', 'gulpfile.js'], browserSync.reload);
  gulp.watch('./jasmine/spec/**/*.js', browserSync.reload);
});

// Browserify task
gulp.task('browserify', () =>
   browserify('jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./jasmine/spec/tests'))
);
