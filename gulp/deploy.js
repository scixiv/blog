'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var path = require('path');
var conf = require('./conf');
var Rsync = require('rsync');


gulp.task('domain', ['scripts'], function () {
  return gulp.src(path.join(conf.paths.tmp, '/serve/**/*.js'))
    .pipe($.replace('http://localhost:4000', 'https://www.scixiv.com'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
});

gulp.task('font-awesome', function() {
  gulp.src($.mainBowerFiles().concat('bower_components/font-awesome/fonts/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('local', function() {
  gulp.src('src/**/*.ts')
    .pipe($.replace('https://api.scixiv.com', 'http://localhost:3000', {
      skipBinary: true
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('remote', function() {
  gulp.src('src/**/*.ts')
    .pipe($.replace('http://localhost:3000', 'https://api.scixiv.com', {
      skipBinary: true
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('pack', ['domain', 'html', 'fonts', 'font-awesome', 'other']);

gulp.task('upload', ['pack'], function() {
  var cmd = new Rsync()
    .flags('avz')
    .shell('ssh')
    .source(path.join(conf.paths.dist, '*'))
    .destination('scixiv@scixiv.com:~/blog/current');

  cmd.execute(function(error, code, cmd) {
      console.log('All done executing', cmd);
  });
});

gulp.task('deploy', ['pack', 'upload']);
