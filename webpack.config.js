const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'vue-style-loader', 'css-loader' ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['vue-style-loader', {
              loader: 'css-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }],
            postcss: ['vue-style-loader', {
              loader: 'css-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }],
            stylus: ['vue-style-loader', {
              loader: 'css-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }, {
              loader: 'stylus-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }],
            styl: ['vue-style-loader', {
              loader: 'css-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }, {
              loader: 'stylus-loader',
              options: { minimize: isProduction, sourceMap: isProduction }
            }]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, 'src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: { hints: false },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: true
    }),
    new CopyWebpackPlugin([{
      context: 'static',
      from: '**/*',
      to: path.join(__dirname, 'dist')
    }])
  ],
  devtool: '#eval-source-map',
}

if (isProduction) {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
