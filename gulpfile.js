var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'], callback)
});

gulp.task('hello', function(){
	console.log('hello febrian');
});

gulp.task('sass', function(){
	return gulp.src('app/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', ['browserSync'], function(){
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('imagemin', function(){
	return gulp.src('app/images/*.+(png|jpg|gif|svg)')
		.pipe(
			cache(
				imagemin({
					'interlaced': true
				})
			))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function(){
	return del.sync('dist');
})

gulp.task('clear:cache', function(callback){
	return cache.clearAll(callback);
});

gulp.task('build', function(callback){
	runSequence('clean:dist',
		['clean', 'sass', 'useref', 'images', 'fonts'],
		callback
	)
});

