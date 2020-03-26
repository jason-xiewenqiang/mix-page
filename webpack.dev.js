
const merge = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge(base, {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8080,
        // open: true,
        host: 'localhost',
        compress: true,
        useLocalIp: false,
        contentBase: './dist',
        clientLogLevel: 'error',
        disableHostCheck: true,
        historyApiFallback: true,
        // overly: true,
        proxy: {}
    },
    devtool:'source-map',
    watch:true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 300
    }
})