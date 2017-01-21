// include gulp
const gulp = require('gulp');

//include gulp utilities to show gulp is running
const gutil = require('gulp-util');

// include plug-ins
const browserSync = require('browser-sync');
const browserify = require('browserify');


// Default tasks
gulp.task('gutil', function() {
  return gutil.log('GULP IS UP AND RUNNING!!!')
});

gulp.task('default', ['gutil', 'browser-sync', 'browserify', 'watch']);

//Browser-sync task
gulp.task('browser-sync', () => {
  browserSync.init({
    server: './',
    port: process.env.PORT || 5000
  });
});

//reload task
gulp.task('reload', () => {
  browserSync.reload();
});

//watch task
gulp.task('watch', () => {
  gulp.watch(['./src/*.js', '/jasmine/spec/inverted-index-test.js'],
    ['reload']);
  gulp.watch('./src/*.css', ['reload']);
  gulp.watch('./*.html', ['reload']);
});
