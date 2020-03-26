const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const config = merge(base, {
    mode: 'production',
    publicPath: './',
    devtool: none,
    watch: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
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
            maxAsyncRequests: 10,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 5,
                    chunks: 'initial'
                },
                vue: {
                    name: 'vue',
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: 10,
                    chunks: 'all'
                },
                axios: {
                    name: 'axios',
                    test: /[\\/]node_modules[\\/]axios[\\/]/,
                    priority: 15,
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