import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import apidoc from 'gulp-apidoc';
import { Instrumenter } from 'isparta';

const SOURCE_FILES = 'app/**/*.js';
const TEST_FILES = 'test/**/*.js';
const COVERAGE_FILES = [SOURCE_FILES, '!app/app.js', '!app/models/**/*.js']
const SRC_PATH = 'app';
const DIST_PATH = 'dist';

const GLOBAL_COVERAGE_MIN = 80;

gulp.task('clean', () => rimraf.sync(DIST_PATH));

gulp.task('build', ['clean'], () =>
  gulp.src(SOURCE_FILES)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
);

gulp.task('pre-test', () => {
  gulp.src(COVERAGE_FILES)
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true,
    }));
});

gulp.task('test', ['pre-test'], () => {
  process.env.NODE_ENV = 'test';
  gulp.src([TEST_FILES])
    .pipe(mocha({
      compilers: 'js:babel-core/register',
      reporter: 'nyan',
    }))
    .pipe(istanbul.writeReports({
      reporters: [ 'lcov', 'json', 'text', 'text-summary' ],
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: GLOBAL_COVERAGE_MIN } }));
});

gulp.task('apidoc', (done) => {
  apidoc({
    src: 'app/',
    dest: 'doc/',
  }, done);
});

gulp.task('server', ['build'], () => {
  return nodemon({
    script: `./${DIST_PATH}/app.js`,
    watch: [ SRC_PATH ],
    tasks: [ 'build' ],
    env: { NODE_ENV: 'development' },
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