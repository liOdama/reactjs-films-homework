const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true','./src/index.js'],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./', 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$|jsx$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss$/, use: [
          'style-loader',
          'css-loader?modules&localIdentName=name__[local]___[hash:base64:5]',
          'sass-loader'
      ]
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
  new webpack.HotModuleReplacementPlugin()
]
}