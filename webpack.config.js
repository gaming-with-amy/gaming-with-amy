const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5173,
    open: true,
    hot: true,
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
    }),
  ],
};
