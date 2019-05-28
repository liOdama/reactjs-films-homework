import { createSelector } from 'reselect';
//import fetchGenres from './fetchGenresReducer';


const genres = state => state.genres;
const checkGenres = createSelector(genres, data => data);

export default checkGenres;
