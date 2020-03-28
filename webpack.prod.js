const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const config = merge(base, {
    output: {
        publicPath: './'
    },
    mode: 'production',
    devtool: 'none',
    watch: false,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:6].css",
            chunkFilename: "css/[name].css"
        }),
        new FriendlyErrorsWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {splitChunks: {
        chunks: "all",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '-',
        name: true,
        cacheGroups: {
            vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
    }}
    // optimization: {
    //     splitChunks: {
    //         name: true,
    //         chunks: 'all',
    //         minSize: 20000, // 20k
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '-',
    //         cacheGroups: {
    //             libs: {
    //                 name: 'vendor-libs',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: 10,
    //                 chunks: 'all'
    //             },
    //             vue: {
    //                 name: 'vendor-vue',
    //                 test: /[\\/]node_modules[\\/]vue[\\/]/,
    //                 priority: 20,
    //                 chunks: 'all',
    //                 enforce: true
    //             },
    //             jquery: {
    //                 name: 'vendor-jquery',
    //                 test: /[\\/]node_modules[\\/]jquery[\\/]/,
    //                 priority: 30,
    //                 chunks: 'all',

    //             },
    //             axios: {
    //                 name: 'vendor-axios',
    //                 test: /[\\/]node_modules[\\/]axios[\\/]/,
    //                 priority: 40,
    //                 chunks: 'async'
    //               },
    //         }
    //     },
    //     minimizer: [
    //         new TerserPlugin({
    //             parallel: true,
    //             cache: true
    //         })
    //     ]
    // }
})

if (process.env.analyzer) {
    config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin());
}

module.exports = smp.wrap(config);