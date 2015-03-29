var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngquant'),
    concat = require('gulp-concat');

var env,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/dev/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/prod/';
  sassStyle = 'compressed';
}


jsSources = [
  'src/js/*.js'
];
sassSources = ['src/scss/style.scss'];
htmlSources = ['src/html/index.html'];
jsonSources = ['src/html/*.json'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'src/scss',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch('src/scss/*.scss', ['compass']);
  gulp.watch('src/html/*.html', ['html']);
  gulp.watch('src/json/*.json', ['json']);
  gulp.watch('src/images/*.png', ['images']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('src/html/index.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload())
});

gulp.task('images', function() {
  gulp.src('src/images/*.*')
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(outputDir + 'images'))
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src('src/json/*.json')
    .pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulpif(env === 'production', gulp.dest('builds/prod/js')))
    .pipe(connect.reload())
});

gulp.task('default', ['html', 'json', 'js', 'compass', 'images', 'connect', 'watch']);