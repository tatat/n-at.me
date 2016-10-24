import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import vueify from 'vueify';
import babelify from 'babelify';
import pug from 'gulp-pug';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import webserver from 'gulp-webserver';
import gulpif from 'gulp-if';
import { argv } from 'yargs';
import { Server as karma } from 'karma';
import config from './config/application';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ENV = JSON.stringify(config[process.env.NODE_ENV] || {});

const ENV = process.env.NODE_ENV;
const OUTPUT_DIR = argv.output || (ENV === 'development' ? 'public' : 'build');
const HOST = argv.host || '0.0.0.0';
const PORT = parseInt(argv.port || '8000', 10);

const isProduction = () => ENV === 'production';
const isNotProduction = () => !isProduction();

gulp.task('default', ['build', 'server', 'watch']);
gulp.task('build', ['build:scripts', 'build:views', 'build:assets']);

gulp.task('build:scripts', () => {
  return browserify({
    entries: ['src/application.js'],
    debug: true,
    paths: ['./node_modules', './lib', './src']
  }).transform(babelify, {
      presets: ['es2015'],
      plugins: ['transform-runtime', 'transform-inline-environment-variables'],
    })
    .transform(vueify)
    .bundle()
    .on('error', function (error) {
      gutil.log(gutil.colors.red('Found unhandled error:\n'), [error.message, error.stack].join('\n'));
      this.emit('end');
    })
    .pipe(plumber())
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(gulpif(isNotProduction, sourcemaps.init({loadMaps: true})))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isNotProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(`${OUTPUT_DIR}/javascripts`));
});

gulp.task('build:views', () => {
  return gulp.src(['views/**/*.pug'])
           .pipe(plumber())
           .pipe(pug())
           .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('build:assets', () => {
  return gulp.src(['assets/**/*.*'])
           .pipe(plumber())
           .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('watch', () => {
  gulp.watch('{lib,src}/**/*.*', ['build:scripts']);
  gulp.watch('views/**/*.*', ['build:views']);
  gulp.watch('assets/**/*.*', ['build:assets']);
});

gulp.task('server', () => {
  return gulp.src(OUTPUT_DIR).pipe(webserver({host: HOST, port: PORT}))
});

gulp.task('test', (done) => {
  new karma({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true,
  }, done).start();
});
