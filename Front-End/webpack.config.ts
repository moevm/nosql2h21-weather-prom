import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration & Record<string, any> = {
    mode: 'development',
    entry: './src/app/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    externals: {
        jquery: 'jQuery',
        knockout: 'ko'
    },
    target: ['web', 'es2015'],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        liveReload: true,
        compress: true,
        port: 3000,
        hot: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.htmll$/,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'src', 'assets'),
                    to: './assets',
                },
                {
                    from: 'node_modules/knockout',
                    to: 'node_modules/knockout',
                },
                {
                    from: 'node_modules/jquery-ui',
                    to: 'node_modules/jquery-ui',
                },
                {
                    from: 'node_modules/devextreme',
                    to: 'node_modules/devextreme',
                }
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        })
    ],
};

export default config;
