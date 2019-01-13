require('dotenv').load()

const { NODE_ENV } = process.env

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)

const webpackConfig = {
  mode: NODE_ENV,

  entry: {
    // builder: `${FT_PATH}/resources/vue/index.js`,
    main: resolve('src/main.js'),
  },

  devServer: {
    hot: true,
    watchOptions: { poll: true },
    historyApiFallback: true,
  },

  output: {
    path: resolve(`${'dist'}`),
    filename: '[name].js',
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      // },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules|vendor|core/,
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
  ],

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    clearImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    // fix "Invalid y value for curve" issue:
    crypto: false,
    module: false,
    process: true,
    global: true,
  },
}

if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(new TerserPlugin({
    test: /\.(js|vue)(\?.*)?$/i,
    // cache: true,
    parallel: true,
    terserOptions: {
      ecma: 8,
    //   warnings: false,
    //   parse: {},
    //   compress: {},
    //   mangle: true, // Note `mangle.properties` is `false` by default.
    //   output: null,
    //   toplevel: false,
    //   nameCache: null,
    //   ie8: false,
    //   keep_fnames: false,
    },
  }))
}

module.exports = webpackConfig
