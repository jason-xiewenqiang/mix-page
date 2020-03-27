const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack')
const smp = new SpeedMeasureWebpackPlugin();
const config = merge(base, {
    mode: 'production',
    devtool: 'none',
    watch: false,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[name].css"
        }),
        new webpack.optimize.SplitChunksPlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        splitChunks: {
            name: true,
            chunks: 'all',
            minSize: 20000, // 20k
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -5,
                    chunks: 'all'
                },
                iview: {
                    name: 'iview',
                    test: /[\\/]node_modules[\\/]iview[\\/]/,
                    priority: -10,
                    chunks: 'all',
                    enforce: true
                },
                vue: {
                    name: 'vue',
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: -20,
                    chunks: 'all',
                    enforce: true
                },
                jquery: {
                    name: 'jquery',
                    test: /[\\/]node_modules[\\/]jquery[\\/]/,
                    priority: -22,
                    chunks: 'async'
                },
                axios: {
                    name: 'axios',
                    test: /[\\/]node_modules[\\/]axios[\\/]/,
                    priority: -25,
                    chunks: 'async'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true
            })
        ]
    }
})

if (process.env.analyzer) {
    config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin());
}

module.exports = smp.wrap(config);