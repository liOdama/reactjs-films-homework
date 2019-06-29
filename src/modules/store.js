import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root/rootReducer';
import fetchGenres from './fetchGenres/fetchGenresReducer';
import itemsIsLoading from './isLoading/isLoadingReducer';
import mainMovieReducer from './mainMovie/mainMovieReducer';
import errorReducer from './Error/errorReducer';
import typeViewReducer from './TypeView/TypeViewReducer';

export const reducer = combineReducers({
  movies: rootReducer,
  genres: fetchGenres,
  itemsIsLoading,
  mainMovie: mainMovieReducer,
  error: errorReducer,
  typeView: typeViewReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
