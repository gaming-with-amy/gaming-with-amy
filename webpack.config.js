// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './index.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),   
    publicPath: '/',                         
    clean: true,
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5173,
    open: true,
    hot: true,
    historyApiFallback: true,               
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.json5$/i, loader: 'json5-loader', type: 'javascript/auto' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      filename: 'index.html',
      minify: isProd ? 'auto' : false,
    }),
  ],
};
