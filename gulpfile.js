const gulp = require("gulp");
const eslint = require("gulp-eslint");
const rimraf = require("rimraf");
const sourcemaps = require("gulp-sourcemaps");
const nodemon = require("gulp-nodemon");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");
const apidoc = require("gulp-apidoc");
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

const SOURCE_FILES = "app/**/*.js";
const VIEW_FILES = "app/views/**/*";
const PUBLIC_FILES = "app/public/**/*.js";
const IMG_FILES = "app/public/img/*";
const TEST_FILES = "test/**/*.js";
const COVERAGE_FILES = [SOURCE_FILES, "!app/app.js", `!${PUBLIC_FILES}`];

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

gulp.task("webpack", () => {
  return gulp.src(PUBLIC_FILES)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(PUBLIC_DIST_PATH));
});

gulp.task("pre-test", () => {
  return gulp.src(COVERAGE_FILES)
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], () => {
  process.env.NODE_ENV = "test";
  gulp.src([TEST_FILES])
    .pipe(mocha({
      reporter: "nyan",
    }))
    .pipe(istanbul.writeReports({
      reporters: ["lcov", "json", "text", "text-summary"],
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: GLOBAL_COVERAGE_MIN, }, }));
});

gulp.task("apidoc", (done) => {
  apidoc({
    src: "app/",
    dest: "doc/",
  }, done);
});

gulp.task("build", ["clean", "eslint", "webpack"], () => {
  // Copy app
  gulp.src([SOURCE_FILES, `!${PUBLIC_FILES}`])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH));

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

gulp.task("server", ["build"], () => {
  return nodemon({
    script: `./${DIST_PATH}/app.js`,
    watch: [SRC_PATH, PUBLIC_FILES, VIEW_FILES],
    tasks: ["build"],
    env: { NODE_ENV: "development", },
  });
});
