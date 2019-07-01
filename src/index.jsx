import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './modules/store';
import AppRoutes from './components/AppRoutes/index';

import './common.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
