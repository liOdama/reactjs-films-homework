const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/index.jsx',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./', 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',

          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({
      configFile: './config/stylelint.config.js',
    }),
  ],
};
