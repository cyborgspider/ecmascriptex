var gulp      = require('gulp'),
  $           = require('gulp-load-plugins')({lazy:true}),
  browserSync = require('browser-sync'),
  clean       = require('del');

/**
 * Plain config object to hold various settings
 */
var config = {
  outputDir: './dist'
}

/**
 * Utility tasks
 */
gulp.task('server', function(){
  browserSync({
    server:{
      baseDir: "./dist"
    }
  })
});

gulp.task('clean', function(){
  clean(config.outputDir);
});

gulp.task('watch', function(){
  $.livereload.listen();
  gulp.watch('stylus/**/*', ['stylus']);
  gulp.watch(['**/*.jade', '*.jade'], ['html']);
  gulp.watch('scripts/**/*', ['js']);
});

/**
 * FED tasks
 */
gulp.task('images', function(){
  //Disabled in the inital build. Put inside gulp build when needed.
  return gulp
    .src('./images/*')
    .pipe(gulp.dest(config.outputDir + '/img'))
});

gulp.task('stylus', function(){
  var nib  = require('nib'),
    jeet = require('jeet');

  return gulp
    .src('./stylus/index.styl')
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      use:      [nib(),jeet()],
      compress: true
    }))
    .pipe($.rename('styles.css'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.outputDir + '/css'))
    .pipe($.livereload())
});

gulp.task('js', function(){
  return gulp
    .src('./scripts/*.coffee')
    .pipe($.coffee({bare:false}))
    .pipe($.concat('doc.js'))
    .pipe(gulp.dest(config.outputDir + '/js'))
    .pipe($.uglify())
    .pipe($.rename({extname:'.min.js'}))
    .pipe(gulp.dest(config.outputDir + '/js'))
    .pipe($.livereload())
});

gulp.task('html', function(){
  return gulp
    .src(['*.jade'])
    .pipe($.jade({pretty: false}))
    .pipe(gulp.dest(config.outputDir))
    .pipe($.livereload())
});

gulp.task('copyFonts', function(){
  //Disabled in the inital build. Put inside gulp build when needed.
  return gulp
    .src('./fonts/*')
    .pipe(gulp.dest(config.outputDir + '/fonts'))
});
/**
 * Build/watch/deploy tasks
 */
gulp.task('default', ['clean'], function(){
  console.log('Building, watching and starting server...');
  gulp.start('html', 'stylus', 'server', 'watch');
});
