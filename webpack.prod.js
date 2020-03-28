const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
        {
          from: 'dll',
          to: 'dll',
          toType: 'dir'
        }
    ])
  ],
  optimization: {
      splitChunks: {
          name: true,
          chunks: 'async',
          minSize: 20000, // 20k
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '-',
          cacheGroups: {
              vendors: {
                  name: 'vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 5,
                  chunks: 'initial'
              },
              iview: {
                  name: 'iview',
                  test: /[\\/]node_modules[\\/]iview[\\/]/,
                  priority: 10,
                  chunks: 'async'
              },
              axios: {
                  name: 'axios',
                  test: /[\\/]node_modules[\\/]axios[\\/]/,
                  priority: 15,
                  chunks: 'async'
                },
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