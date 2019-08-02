// =========================================================
// gulpfile.js
// =========================================================
var gulp        = require('gulp'),
    sass        = require('gulp-sass');

// ---------------------------------------------- Gulp Tasks
gulp.task('sass', function(){
    return gulp.src("sass/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./"))
});

// --------------------------------------- Default Gulp Task
gulp.task('default', function(){
	gulp.watch('sass/**/*.scss', gulp.series('sass'));
});