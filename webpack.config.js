const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              url: false,
            }
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              url: false,
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: { sourceMap: true }
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          { loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            exclude: /\.vue$/,
            use: ['raw-loader', 'pug-plain-loader']
          }, {
            use: ['pug-plain-loader']
          }
        ],
      },
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
    overlay: true,
  },
  performance: { hints: false },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [{
        context: 'static',
        from: '**/*',
        to: path.join(__dirname, 'dist')
      }],
    }),
  ],
  devtool: 'eval-source-map',
}

if (isProduction) {
  module.exports.devtool = 'source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ])

  module.exports.optimization = module.exports.optimization || {}
  module.exports.optimization.minimizer = module.exports.optimization.minimizer || []

  module.exports.optimization.minimizer.push(
    new UglifyJsPlugin({
      sourceMap: true,
    })
  )
}
