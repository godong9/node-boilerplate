import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';

const SOURCE_FILES = 'app/**/*.js';
const TEST_FILES = 'test/**/*.js';
const SRC_PATH = 'app';
const DIST_PATH = 'dist';

gulp.task('clean', () => rimraf.sync(DIST_PATH));

gulp.task('build', ['clean'], () => gulp.src(SOURCE_FILES)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
);

gulp.task('test', () => {
    gulp.src([TEST_FILES])
        .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('server', ['build'], () => {
    return nodemon({
        script: `./${DIST_PATH}/app.js`,
        watch: [ SRC_PATH ],
        tasks: [ 'build' ],
        env: { NODE_ENV: 'development' }
    });
});

gulp.task('default', function() {
    // ESLint 실행
    gulp.src([SOURCE_FILES])
        .pipe(eslint())
        .pipe(eslint.format());
    // Babel 실행
    gulp.src(SOURCE_FILES)
        .pipe(babel())
        .pipe(gulp.dest(DIST_PATH));
});