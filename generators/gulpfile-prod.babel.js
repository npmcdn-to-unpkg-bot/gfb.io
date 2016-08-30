import gulp from 'gulp';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import webpackOptions from './webpack-prod.config.babel.js';
import browserSyncOptions from './bs-config.js';

const paths = {
  dist: '../docs/generators',
  src: 'src',
};

gulp.task('css', () => gulp.src('src/styles/styles.css')
  .pipe(postcss([
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ]))
  .pipe(gulp.dest(paths.dist + '/styles')));

gulp.task('html-copy', () => {
  return gulp.src(`${paths.src}/**/*.html`)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('webpack', () => {
  return gulp.src(`${paths.src}/**/*.js`)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    }))
    .pipe(webpack(webpackOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', gulp.parallel('webpack', 'html-copy', 'css'));

