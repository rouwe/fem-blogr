const { src, dest, watch, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

function compileTypescript() {
    // Transpile Typescript, concatenate, and minify js
    return src('src/ts/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            "module": "commonjs",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true,
        }))
        .pipe(terser({
            toplevel: true
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/js'));
}
function compileSass() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/css'));
}
function watchTypescript() {
    watch('src/ts/*.ts', compileTypescript);
}
exports.default = series(
    compileSass,
    compileTypescript,
    watchTypescript,
    )