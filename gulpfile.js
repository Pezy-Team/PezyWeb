var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var build = require('gulp-build')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var uglifycss = require('gulp-uglifycss')
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
})
// Move the javascript files into our /src/js folder
gulp.task('js', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream())
})
// Build Website for Deploy
gulp.task('build', function () {
    gulp.src('src/*.html')
        .pipe(build({ GA_ID: 'choonewza' }))
        .pipe(gulp.dest('dist'))
gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(build({ GA_ID: 'choonewza' }))
        .pipe(gulp.dest('dist/css'))
gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'src/js/*.js'])
        //.pipe(uglify())
        .pipe(build({ GA_ID: 'choonewza' }))
        .pipe(gulp.dest('dist/js'))
gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'))
});
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['src/scss/*.scss'], ['sass'])
    gulp.watch(["src/*.html","src/js/*.js"]).on('change', browserSync.reload);
})
gulp.task('default', ['js', 'serve'])