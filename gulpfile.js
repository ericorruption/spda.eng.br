var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    webpack     = require('webpack');

// error function for plumber
var onError = function (err) {
  console.log(err);
  this.emit('end');
};

gulp.task('javascript', function() {
    webpack({
        entry: "./src/js/main.js",
        output: {
            filename: "./dist/js/bundle.js"
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ output: { comments: false }})
        ]
    }, function () {
        browserSync.reload();
    });

    return gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    return gulp.src(['src/scss/*.scss', '!src/scss/_*.scss'])
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.compass({
          config_file: './config.rb',
          css: 'dist/css',
          sass: 'src/scss'
        }))
        .pipe(plugins.postcss([
            require('autoprefixer-core'),
            require('postcss-opacity'),
            require('postcss-import')
        ]))
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write('dist/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        // using vagrant or other server:
        proxy: "http://localhost:8000", // use php -S 0.0.0.0:8000
        // or use builtin server:
        // server: '.',
        files: ['**/*.php']
    });

    gulp.watch(['src/img/**/*'], ['images']);
    gulp.watch(['src/scss/**/*.scss'], ['css']);
    gulp.watch(['src/js/**/*.js'], ['javascript']);
});

gulp.task('build', ['css', 'javascript', 'images', 'fonts']);
gulp.task('default', ['serve']);
