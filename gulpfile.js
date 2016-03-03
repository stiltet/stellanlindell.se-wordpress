var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename')


gulp.task('default', ['watch']);
gulp.task('build', ['watch']);

var sassInput = 'www/wp-content/themes/stellanlindell/assets/sass/*.scss';
var sassOutput = 'www/wp-content/themes/stellanlindell/assets/css/';

var sassExpandedOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var sassMinifyedOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassExpandedOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput));
});

gulp.task('sass-minifyed', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassMinifyedOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename({suffix: '.min'})) 
    .pipe(gulp.dest(sassOutput));
});
 
gulp.task('watch', function () {
  gulp.watch(sassInput, ['sass']);
  gulp.watch(sassInput, ['sass-minifyed']);
});