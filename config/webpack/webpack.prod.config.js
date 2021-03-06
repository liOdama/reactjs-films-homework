const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index.jsx'],
  devtool: 'inline-source-map',
  output: {
    filename: './js/bundle.[hash].js',
    path: path.resolve('./', './build'),
    chunkFilename: '[id].bundle.[hash].js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()],
  },
  module: {
    rules: [
      { test: /\.js$|jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
            loader: 'file-loader',
            options: {
              outputPath: './assets/image',
              publicPath: '/assets/image',
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
    new CleanWebpackPlugin({
      root: './',
      verbose: true,
      dry: false,
      exclude: [],
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
    new StyleLintPlugin({
      configFile: './config/stylelint.config.js',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css',
    }),
    new CopyPlugin([
      {
        from: './src/pages/*.png',
        to: 'build/assets',
      },
    ]),
  ],
};
