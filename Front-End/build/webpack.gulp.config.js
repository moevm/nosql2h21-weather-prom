const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    config: {
        mode: 'development',
        entry: './src/main.ts',
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
        module: {
            rules: [
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
                    test: /\.tsx?$/,
                    use: [
                        'ts-loader',
                    ]
                },

            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
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

            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
                chunkFilename: '[name].css',
            })
        ],
    }
}
