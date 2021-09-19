const gulp = require('gulp');
const builder = require('./build/gulp.html.js')
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

function startWebpack() {
    var webpackConfig = require('./build/webpack.gulp.config.js').config;
    const devServerOptions = {
        compress: true,
        host: '0.0.0.0',
        port: 8000
    };
    new WebpackDevServer(webpack(webpackConfig), devServerOptions).listen("8000", '0.0.0.0', function(err, stats) {
        if(err) {
            throw err;
        }
        console.log('[webpack-dev-server]', 'http://localhost:8000');
    });
}

gulp.task('Ωbuild:html', function() {
    return builder.createHtmlTask(path.join(__dirname, './src/app'));
});

gulp.task('Ωwatch:html', () => gulp.watch(['./src/app/html/**/*.html'],
                gulp.series('Ωbuild:html')));

gulp.task('start:frontend', gulp.series(
    () => {
        gulp.watch(['./src/app/html/**/*.html', './src/index.html'],
                gulp.series('Ωbuild:html'));
        startWebpack();
    }))
