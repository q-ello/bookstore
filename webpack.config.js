const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require("path");
const PugPlugin = require('pug-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.pug',
    },
    output: {
        path: path.join(__dirname, 'dist/'),
    },
    resolve: {
        alias: {
            Images: path.join(__dirname, './src/images/'),
            Fonts: path.join(__dirname, './src/fonts/'),
            Svg: path.join(__dirname, './src/svg/'),
            Modules: path.join(__dirname, './src/modules/')
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/')
        },
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        issuer: /\.js$/,
                        loader: PugPlugin.loader,
                        options: {
                            method: 'compile',
                        },
                    },
                    {
                        loader: PugPlugin.loader,
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]',
                },
            },
        ]
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new StylelintPlugin({
            'font-family-name-quotes': 'always-where-recommended'
        }),
        new ESLintPlugin(),
        new PugPlugin({
            pretty: true,
            js: {
                filename: '[name].[contenthash:8].js',
            },
            css: {
                filename: '[name].[contenthash:8].css',
            },
        })
    ],
    mode: 'development',
}