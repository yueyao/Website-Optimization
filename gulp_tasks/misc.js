const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../conf/gulp.conf');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

gulp.task('clean', clean);
gulp.task('other', other);

gulp.task('imagemin', min);
function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{css,js,html,vue}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function min() {
  return gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('imagemin-dist'));
}
