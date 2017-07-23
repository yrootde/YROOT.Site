var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

// Input configuration
var inputAssets = [
];
var inputJs = [
	'./Resources/Private/JavaScript/all.js'
];

var watchJs = [
	'./Resources/Private/JavaScript/**/*.js'
];

var inputScss = [
	'./Resources/Private/StyleSheets/all.scss',
	'./Resources/Private/Fusion/**/*.scss'
];
var watchScss = [
	'./Resources/Private/StyleSheets/*.scss',
	'./Resources/Private/StyleSheets/**/*.scss',
	'./Resources/Private/Fusion/**/*.scss'
];

var watchHtml= [
	'./Resources/Private/Fusion/**/*.html'
];

var allTasks = ['js', 'scss', 'assets'];
var output =     './Resources/Public/Assets';



gulp.task('serve', allTasks, function () {
	browserSync.init({
		proxy: 'localhost:8000'
	});

	gulp.watch(watchScss, ['scss'])
		.on('change', function (event) {
			browserSync.reload();
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});

	gulp.watch(watchJs, ['js'])
		.on('change', function (event) {
			browserSync.reload();
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});

	gulp.watch(watchHtml)
		.on('change', function (event) {
			browserSync.reload();
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('assets', function () {
	return gulp
		.src(inputAssets)
		.pipe(gulp.dest(output));
});

gulp.task('js', function () {
	return gulp
		.src(inputJs)
		.pipe(sourcemaps.init())
		.pipe(concatJs('bundle.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output));
});

gulp.task('scss', function () {
	return gulp
		.src(inputScss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(output));
});

gulp.task('default', ['serve']);
gulp.task('build', allTasks);