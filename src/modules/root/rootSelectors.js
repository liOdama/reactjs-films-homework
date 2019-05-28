import { createSelector } from 'reselect';

const page = state => state.movies.page;
const movies = state => state.movies.results;
const genres = state => state.genres;

export const checkPage = createSelector(page, data => data);
export const checkResults = createSelector(movies, data => data);
export const checkGenres = createSelector(genres, data => data);
