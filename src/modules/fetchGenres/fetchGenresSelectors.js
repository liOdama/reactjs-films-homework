import { createSelector } from 'reselect';
//import fetchGenres from './fetchGenresReducer';


const genres = state => state.genres;
export const checkGenres = createSelector(genres, data => data);
