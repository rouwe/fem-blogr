const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");
const browserSync = require('browser-sync').create(); 

const GLOBS = {
    sass: {
        src: 'src/scss/**/*.scss',
        outputPath: 'dist/assets/css'
    },
    ts: {
        src: 'src/ts/**/*.ts',
        outputPath: 'dist/assets/js',
        outputName: 'main.js'
    }
};
// Build stylesheet
function buildStyles() {
    return gulp.src(GLOBS.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(GLOBS.sass.outputPath));
};

// Rebuild CSS
function watchStyles() {
    buildStyles();
    browserSync.reload();
}

// Build JS
function buildJs() {
    return tsProject.src()
        .pipe(sourcemaps.init()).on('error', (err) => {
            console.error(err);
        })
        .pipe(tsProject())
        .pipe(concat(GLOBS.ts.outputName))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/js'))
}

// Rebuild JS
function watchJs() {
    buildJs();
    browserSync.reload();
}

// Browser sync
function serve() {
    // Serve files 
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: false
    });
    // Watch Sass files
    browserSync.watch(GLOBS.sass.src).on('change', watchStyles);
    browserSync.watch(GLOBS.ts.src).on('change', watchJs);
};
exports.default = gulp.series(
    buildStyles,
    buildJs,
    serve
)