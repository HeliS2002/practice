// Import required packages
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
// Compile and minify Sass
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')        // Source folder for Sass files
    .pipe(sass().on('error', sass.logError)) // Compile Sass to CSS
    .pipe(cleanCSS())                        // Minify the compiled CSS
    .pipe(rename({ suffix: '.min' }))        // Rename the output file to .min.css
    .pipe(gulp.dest('./css'));               // Destination folder for the output
});
// Default task
gulp.task('default', function() {
  gulp.watch('./scss/**/*.scss', gulp.series('sass')); // Watch Sass files for changes
});
const browserSync = require("browser-sync").create();
function style() {
  //1. locate the scss file
  return (
    gulp
      .src("./scss/**/*.scss")
      //2. pass that file through sass compiler
      .pipe(sass())
      //3.where to save?
      .pipe(gulp.dest("./css"))
      //changes to browser
      .pipe(browserSync.stream())
  );
}
function watch() {
    browserSync.init({
      server: {
        baseDir: "./",
      },
    });
    gulp.watch("./scss/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js").on("change", browserSync.reload);
  }
  gulp.task('minify-js', function() {
    return gulp.src('./js/**/*.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./js/**/*.js'));
  });
  gulp.task('default', function() {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/**/*.js', gulp.series('minify-js'));
  });
exports.style = style;
exports.watch = watch;