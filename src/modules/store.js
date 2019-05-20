import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import rootReducer from './root/rootReducer';
import fetchGenres from './fetchGenres/fetchGenresReducer';


export const reducer = combineReducers({
  movies: rootReducer,
  genres: fetchGenres,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

console.log('store', store.getState());


export default store;
