var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

// Input configuration

var paths = {
	'private': './Resources/Private/',
	'public': './Resources/Public/Assets/',
	'npm': './node_modules/',
};

var input = {
	scss: [
		paths.private + 'StyleSheets/all.scss',
		paths.private + 'Fusion/**/*.scss'
	],
	js: [
		paths.private + 'JavaScript/all.js'
	],
	assets: [

	],
};

var watch = {
	scss: [
		paths.private + 'StyleSheets/*.scss',
		paths.private + 'StyleSheets/**/*.scss',
		paths.private + 'Fusion/**/*.scss'
	],
	js: [
		paths.private + 'JavaScript/**/*.js'
	],
	html: [
		paths.private + 'Fusion/**/*.html'
	],
}

var includeScss = [
	paths.npm + 'bootstrap/scss'
];

var buildTasks = ['js', 'scss', 'assets'];

gulp.task('serve', buildTasks, function () {
	browserSync.init({
		proxy: 'localhost:8000'
	});

	gulp.watch(watch.scss, ['scss'])
		.on('change', function (event) {
			browserSync.reload({
				stream: true
			});
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});

	gulp.watch(watch.js, ['js'])
		.on('change', function (event) {
			browserSync.reload({
				stream: true
			});
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});

	gulp.watch(watch.html)
		.on('change', function (event) {
			browserSync.reload();
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('assets', function () {
	return gulp
		.src(input.assets)
		.pipe(gulp.dest(paths.public));
});

gulp.task('js', function () {
	return gulp
		.src(input.js)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.public));
});

gulp.task('scss', function () {
	return gulp
		.src(input.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePahts: includeScss,
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(concatCss('bundle.css'))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.public));
});

gulp.task('default', ['serve']);
gulp.task('build', buildTasks);