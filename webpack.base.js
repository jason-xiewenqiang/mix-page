const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProd = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chunks = require('./chunks.config')
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, 'src/pages/*/index.js'));
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
      const pageName = match && match[1];
      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(__dirname, `src/pages/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: chunks[pageName],
          title: pageName,
          inject: true,
          favicon: './public/favicon.ico',
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins
  }
}
const isSingle = process.env.single === 'true'
var {
  entry: entry,
  htmlWebpackPlugins: htmlWebpackPlugins
} = setMPA()
var singleHtmlWebpackPlugin = new HtmlWebpackPlugin({
  inlineSource: '.css$',
  template: `./src/app/index.html`,
  filename: `index.html`,
  favicon: './public/favicon.ico',
  chunks: 'main',
  title: 'app-dome',
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    preserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false
  }
})
const config = {
  entry: isSingle ? path.join(__dirname, 'src/app/index.js') : entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:4].js',
    chunkFilename: 'js/[name].[chunkhash:6].js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.json', '.vue', '.es6'],
    modules: [path.resolve(__dirname, 'node_modules')],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [{
        test: /iview.src.*?js$/,
        use: [{
            loader: 'thread-loader',
            options: {
              workers: 4
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [{
            loader: 'thread-loader',
            options: {
              workers: 4
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [{
      //     loader: 'url-loader', //是指定使用的loader和loader的配置参数
      //     options: {
      //       limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
      //       name: 'images/[name]_[hash:6].[ext]'
      //     }
      //   }]
      // },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
          use:[
              {
                  loader:"url-loader",
                  options:{
                      limit:50000,   //表示低于50000字节（50K）的图片会以 base64编码
                      outputPath:"./images",
                      name: '[name].[hash:5].[ext]',
                      pulbicPath:"./dist/images"
                  }
              }
          ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './font'
          }
        }]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    })
  ]
}

if (isSingle) {
  config.plugins.push(singleHtmlWebpackPlugin)
} else {
  config.plugins.push(...htmlWebpackPlugins)
}
module.exports = config