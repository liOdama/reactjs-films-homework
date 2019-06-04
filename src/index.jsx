import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './modules/store';
import MovieDetailsPage from './pages/MovieDetailsPage/index';

import './common.scss';


ReactDOM.render(
  <Provider store={store}>
    <MovieDetailsPage />
  </Provider>,
  document.querySelector('#root'),
);
