const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const config = {
  mode: 'development',
  entry: {
    vue: ['vue'],
    jquery: ['jquery', 'ztree'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: 'dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin(['dll']),
    new webpack.DllPlugin({
      context: __dirname,
      name: 'dll_[name]',
      path: path.join(__dirname, 'dll', '[name].manifest.json')
    })
  ]
}

if (isProd) {
  Object.assign(config, {
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.js$/i,
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        })
      ]
    }
  })
}
module.exports = config