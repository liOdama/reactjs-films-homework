import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './modules/store';
import AppContainer from './pages/AppContainer';

import './common.scss';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('#root')
);
