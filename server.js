const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');

const app = express();
const config = require('./config/webpack/webpack.dev.config');

const compiler = webpack(config);

app.use(history());
if (process.env.NODE_ENV === 'development ') {
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      reload: true,
    }),
  );

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('build'));
}
// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('React app listening on port 3000!\n');
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(`${__dirname}/build/`, 'index.html'), (err) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     }
  //   });
  // });
});
