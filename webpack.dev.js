
const merge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack')
module.exports = merge(base, {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8080,
        host: 'localhost',
        compress: true,
        useLocalIp: false,
        contentBase: './',
        clientLogLevel: 'error',
        disableHostCheck: true,
        historyApiFallback: true,
        // overly: true,
        proxy: {}
    },
    devtool:'source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 300
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})