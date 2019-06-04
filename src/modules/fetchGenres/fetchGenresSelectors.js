import { createSelector } from 'reselect';

const genres = state => state.genres;
const checkGenres = createSelector(genres, data => data);

export default checkGenres;
