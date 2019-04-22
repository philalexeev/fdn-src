var gulp         = require('gulp'),
  	sass         = require('gulp-sass'),
  	browserSync  = require('browser-sync'),
  	uglify       = require('gulp-uglify'),
  	csso         = require('gulp-csso'),
  	imagemin     = require('gulp-imagemin'),
  	autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    htmlmin      = require('gulp-htmlmin'),
    postcss      = require('gulp-postcss'),
		ghpages      = require('gulp-gh-pages'),
		wait         = require('gulp-wait'),
		plumber      = require('gulp-plumber'),
    posthtml     = require('gulp-posthtml'),
    include      = require('posthtml-include'),
    svgstore     = require('gulp-svgstore'),
    svgmin       = require('gulp-svgmin'),
    rename       = require('gulp-rename');

/////////////   SASS COMPILING

gulp.task('sass', function(){
  var plugins = [
      autoprefixer({browsers: ['last 2 version'], cascade: true}),
      mqpacker({sort: true})
  ];
	return gulp.src('src/scss/style.scss')
		.pipe(wait(500))
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(csso({}))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream())
});

/////////////   SCRIPTS COMPILING

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify({compress: {
      conditionals: false
    }}))
		.pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream())
});

/////////////   HTML INCLUDE/MINIMIZER

gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(posthtml([
      include({ root: 'src' })
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
		.pipe(browserSync.stream())
});

/////////////   IMAGES MINIMIZER

gulp.task('img', function() {
	return gulp.src('src/img/*')
  .pipe(imagemin([
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(gulp.dest('build/img'))
  .pipe(browserSync.stream())
});

/////////////   BROWSER SYNC

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
});

/////////////   VIDEO COPYING

gulp.task('video', function() {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('build/video'))
});

/////////////   FONTS COPYING

gulp.task('fonts', function() {
	return gulp.src(['src/fonts/**/*', '!src/fonts/**/*.css'])
		.pipe(gulp.dest('build/fonts'))
});

/////////////   SVG MINIMIZER

gulp.task('svgmin', function() {
  return gulp.src('src/img/*.svg')
    .pipe(svgmin())
		.pipe(gulp.dest('build/img'))
});


/////////////   GITHUB DEPLOYING

gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(ghpages({
			remoteUrl: 'https://github.com/philalexeev/fdn.git',
			branch: 'master'
		}));
});

gulp.task('deploy-src', function() {
  return gulp.src('src/**/*')
    .pipe(ghpages({
			remoteUrl: 'https://github.com/philalexeev/fdn.git',
			branch: 'sources'
		}));
});

/////////////   SVG-SPRITE CREATING

gulp.task('svgsprite', function() {
  return gulp.src("src/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("svgsprite.html"))
    .pipe(gulp.dest("src/html_parts"))
});

/////////////   TASKS

gulp.task('default', ['sass', 'scripts', 'html', 'img', 'svgmin', 'video', 'fonts', 'browser-sync'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/video/**/*.*', ['video']);
	gulp.watch('src/img/**/*.{jpg, png, jpeg}', ['img']);
	gulp.watch('src/img/*.svg', ['svgmin']);
	gulp.watch('src/fonts/*.{woff, woff2}', ['fonts']);
});

// gulp.task('build', ['svgmin', 'img', 'sass', 'scripts', 'fonts', 'html', 'video'], function() {
// 	console.log('Build task is done!');
// });
