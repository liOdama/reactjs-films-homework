const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./config/webpack/webpack.dev.config');

const compiler = webpack(config);

if (process.env.NODE_ENV === 'development ') {
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath, reload: true,
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('build'));
}
// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('React app listening on port 3000!\n');
});
