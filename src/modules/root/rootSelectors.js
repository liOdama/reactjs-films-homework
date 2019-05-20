import { createSelector } from 'reselect';
import rootReducer from './rootReducer';
import { checkStateGenres } from '../fetchGenres/fetchGenresSelectors';

const page = state => state.movies.page;
const movies = state => state.movies.results;
const genres = state => state.genres;
export const checkPage = createSelector(page, data => data);
export const checkResults = createSelector(movies, data => data);
export const checkGenres = createSelector(genres, data => data);


// const checkMovies = () => createSelector([checkPage, checkResults, checkStateGenres], (data1, data2,data3) => {
//   return {...data1, ...data2, ...data3, }; 
// });

// export default checkMovies;
