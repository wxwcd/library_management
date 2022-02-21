// eslint-disable-next-line strict
const gulp = require('gulp');
const jest = require('gulp-jest').default;
const moment = require('moment');
const date = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss');

const publicConfig = {
  testEnvironment: 'node',
  automock: false,
  // runInBand: true,
  // globalTeardown: "./src/config/global/teardown.js",
  // globalSetup: "./src/config/global/setup.js",
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: `../report/child/`,
        pageTitle: 'Test Report',
        filename: `${date}.html`,
        expand: true,
      },
    ],
  ],
};
gulp.task('test', function() {
  const config = publicConfig;
  config.testRegex = [
    './test/test_category.js',
    './test/test_book.js',
    './test/test_reader.js',
    './test/test_press.js',
    './test/test_borrow.js',
  ];
  return gulp.src('test').pipe(jest(config));
});
