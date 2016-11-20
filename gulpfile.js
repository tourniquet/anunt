var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var uglifyCss = require('gulp-uglifycss')
var jshint = require('gulp-jshint')
var myth = require('gulp-myth')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var beeper = require('beeper')

var onError = function (err) {
  beeper()
  console.log(err)
}

var cssFiles = ['dev/css/bootstrap.css', 'dev/css/font-awesome.css', 'dev/css/*.css'] // 'dev/css/moltran.css',

gulp.task('styles', function () {
  gulp.src(cssFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('css/style.css'))
    .pipe(myth())
    .pipe(gulp.dest('public'))
})

gulp.task('minifyCss', function () {
  gulp.src('public/css/style.css')
    .pipe(uglifyCss())
    .pipe(rename('css/style.min.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('js', function () {
  gulp.src('dev/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('js/main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'))
})

var libsFiles = ['dev/libs/jquery-1.11.3.js', 'dev/libs/moltran.min.js', 'dev/libs/jquery.validate.js', 'dev/libs/jquery.xml2json.js', 'dev/libs/*.js']

gulp.task('libs', function () {
  gulp.src(libsFiles)
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(concat('libs/libs.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('minifyLibs', function () {
  gulp.src('public/libs/libs.js')
    .pipe(uglify())
    .pipe(rename('libs/libs.min.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('watch', function () {
  gulp.watch('dev/css/*.css', ['styles'])
  gulp.watch('public/css/style.css', ['minifyCss'])
  // gulp.watch('dev/js/*.js', ['js']);
  gulp.watch('dev/libs/*.js', ['libs'])
  gulp.watch('dev/libs/*.js', ['minifyLibs'])
})

gulp.task('default', ['styles', 'minifyCss', 'libs', 'minifyLibs', 'watch'])
