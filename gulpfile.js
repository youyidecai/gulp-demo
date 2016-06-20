var gulp = require('gulp');
var jshint = require('gulp-jshint'),  //代码校验
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), //压缩js、css文件
    imagemin = require('gulp-imagemin'), //压缩图片 可是很多图片太小，没有看出效果啊
    cache = require('gulp-cache');



var paths = {
	scripts: 'script/*.js',
	styles: 'css/*.css',
	images: 'img/*.png'
}
gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
/*美化并合并js文件*/
gulp.task('process-scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/scripts'))
		.pipe(uglify())
		.pipe(gulp.dest('dest/scripts/'));
});
/*美化并合并css文件*/
gulp.task('process-css', function() {
	return gulp.src(paths.styles)
		.pipe(concat('gulpuglify.css'))
		.pipe(gulp.dest('css/'))
		.pipe(uglify())
		.pipe(gulp.dest('css/'));
});
gulp.task('process-image', function() {
	return gulp.src(paths.images)
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('img/lib'));
});
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['process-scirpts']);
	gulp.watch(paths.styles, ['process-css']);
	gulp.watch(paths.images, ['process-image']);
});