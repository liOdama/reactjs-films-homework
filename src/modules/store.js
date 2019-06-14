import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import rootReducer from './root/rootReducer';
import fetchGenres from './fetchGenres/fetchGenresReducer';
import itemsIsLoading from './isLoading/isLoadingReducer';
import mainMovieReducer from './mainMovie/mainMovieReducer';
import errorReducer from './Error/errorReducer';



export const reducer = combineReducers({
  movies: rootReducer,
  genres: fetchGenres,
  itemsIsLoading,
  mainMovie: mainMovieReducer,
  error: errorReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
