import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import webpackOptions from './webpack.config.babel.js';
import browserSyncOptions from './bs-config.js';

const paths = {
  dist: 'dist',
  src: 'src',
};

gulp.task('css', () => gulp.src('src/styles/styles.css')
  .pipe(postcss([
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ]))
  .pipe(gulp.dest('dist/styles')));

gulp.task('html-copy', () => {
  return gulp.src(`${paths.src}/**/*.html`)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch:html', () => {
  gulp.watch(`${paths.src}/**/*.html`, gulp.series('html-copy'));
  gulp.watch(`${paths.src}/**/*.css`, gulp.series('css'));
});

gulp.task('browser-sync', (cb) => {
  browserSync(browserSyncOptions, cb);
});

gulp.task('webpack', () => {
  return gulp.src(`${paths.src}/**/*.js`)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    }))
    .pipe(webpack(webpackOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', gulp.parallel('watch:html'));

gulp.task('default', gulp.parallel('watch', 'webpack', 'browser-sync', 'html-copy', 'css'));

