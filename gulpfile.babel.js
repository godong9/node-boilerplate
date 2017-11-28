import gulp from "gulp";
import babel from "gulp-babel";
import eslint from "gulp-eslint";
import rimraf from "rimraf";
import sourcemaps from "gulp-sourcemaps";
import nodemon from "gulp-nodemon";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
import apidoc from "gulp-apidoc";
import { Instrumenter } from "isparta";
import webpack from "webpack-stream";
import webpackConfig from "./webpack.config.js";

const SOURCE_FILES = "app/**/*.js";
const VIEW_FILES = "app/views/**/*";
const PUBLIC_FILES = "app/public/**/*.js";
const IMG_FILES = "app/public/img/*";
const TEST_FILES = "test/**/*.js";
const COVERAGE_FILES = [SOURCE_FILES, "!app/app.js", "!app/models/**/*.js"];

const SRC_PATH = "app";
const DIST_PATH = "dist";
const VIEW_DIST_PATH = "dist/views";
const PUBLIC_DIST_PATH = "dist/public/js";
const IMG_DIST_PATH = "dist/public/img";

const GLOBAL_COVERAGE_MIN = 80;

gulp.task("clean", () => rimraf.sync(DIST_PATH));

gulp.task("eslint", () => {
  // ESLint 실행
  gulp.src([SOURCE_FILES])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("babel", () => {
  // Babel 실행
  gulp.src([SOURCE_FILES, `!${PUBLIC_FILES}`,])
    .pipe(babel())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task("webpack", () => {
  return gulp.src(PUBLIC_FILES)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(PUBLIC_DIST_PATH));
});

gulp.task("pre-test", () => {
  gulp.src(COVERAGE_FILES)
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true,
    }));
});

gulp.task("test", ["pre-test"], () => {
  process.env.NODE_ENV = "test";
  gulp.src([TEST_FILES])
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "nyan",
    }))
    .pipe(istanbul.writeReports({
      reporters: [ "lcov", "json", "text", "text-summary" ],
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: GLOBAL_COVERAGE_MIN, }, }));
});

gulp.task("apidoc", (done) => {
  apidoc({
    src: "app/",
    dest: "doc/",
  }, done);
});

gulp.task("build", ["clean", "eslint", "babel", "webpack"], () => {
  // Copy views
  gulp.src(VIEW_FILES)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(VIEW_DIST_PATH));

  // Copy public/img
  gulp.src(IMG_FILES)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(IMG_DIST_PATH));
});

gulp.task("server", ["build",], () => {
  return nodemon({
    script: `./${DIST_PATH}/app.js`,
    watch: [ SRC_PATH, PUBLIC_FILES, VIEW_FILES ],
    tasks: [ "build" ],
    env: { NODE_ENV: "development", },
  });
});

gulp.task("default", () => {
  // ESLint 실행
  gulp.src([SOURCE_FILES])
    .pipe(eslint())
    .pipe(eslint.format());
  // Babel 실행
  gulp.src(SOURCE_FILES)
    .pipe(babel())
    .pipe(gulp.dest(DIST_PATH));
});