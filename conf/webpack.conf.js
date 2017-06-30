const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: [
          'html-loader'
        ]
      },
        {
               test: /\.(png|svg|jpg|gif)$/,
           use: [
             'file-loader'
           ]
       },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre'
      // },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loaders: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('pizza.html')
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('pageSpeed.html')
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('project-2048.html')
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('project-mobile.html')
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('project-webperf.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'js/[name].js'
  },
  entry: {
    pizza: './src/js/main.js'
  }
};
