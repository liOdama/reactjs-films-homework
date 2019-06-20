import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './modules/store';
import AppContainer from './pages/AppContainer';
import ErrorBoundary from './pages/ErrorBoundary/index';

import './common.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <AppContainer />
    </ErrorBoundary>
  </Provider>,
  document.querySelector('#root'),
);
