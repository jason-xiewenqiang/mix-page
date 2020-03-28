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
      chunks: 'all',
      minSize: 200000, // 20k
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -30,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          priority: -10,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        jquery: {
          name: 'jquery',
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          priority: -15,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        iView: {
          name: 'iView',
          test: /[\\/]node_modules[\\/]iview[\\/]/,
          priority: -5,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        zTree: {
          name: 'zTree',
          test: /[\\/]node_modules[\\/]zTree[\\/]/i,
          priority: -20,
          chunks: 'all',
          reuseExistingChunk: true,
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