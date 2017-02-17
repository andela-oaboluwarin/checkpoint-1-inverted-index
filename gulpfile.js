const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const run = require('gulp-run');
const karmaSync = require('browser-sync').create();

// Default tasks
gulp.task('default', ['browserSync', 'watch']);


// Browser Sync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: process.env.PORT || 5000,
    ui: false,
    ghostMode: false
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
  gulp.watch('./**/**.css', browserSync.reload);
  gulp.watch('./**.html', browserSync.reload);
  gulp.watch(['./src/js/*.js', 'gulpfile.js'], browserSync.reload);
  gulp.watch('./jasmine/spec/**/*.js', browserSync.reload);
});

// Browserify task
gulp.task('browserify', () =>
  browserify('jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./jasmine/spec/tests'))
);

// Test task
gulp.task('test', ['browserify'], () => {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('karmaSync', () => {
  karmaSync.init({
    server: {
      baseDir: ['src/js', 'dist'],
      index: 'spec.html'
    },
    port: 9876,
    ui: false,
    ghostMode: false
  });
});
