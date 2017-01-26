// Karma configuration
// Generated on Wed Jan 25 2017 20:49:54 GMT+0100 (WAT)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/inverted-index.js',
      'jasmine/spec/tests/test-spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './src/inverted-index.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress',
      'verbose',
      'coverage',
      'spec-as-html'
    ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    specAsHtmlReporter: {
      dir: 'dist', // path to write the file, defaults to `./`
      outputFile: 'spec.html' // name of the file, defaults to `spec.html`
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    /*
     ** possible values: config.LOG_DISABLE || config.LOG_ERROR
        || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     **/
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
