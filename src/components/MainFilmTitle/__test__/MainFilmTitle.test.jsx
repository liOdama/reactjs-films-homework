import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MainFilmTitle from '../index';
import { createMoviesGenreList, shooseGenre } from '../MainFilmTitle';

const dataGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

test('MainFilmTitle renders correctly', () => {
  const renderer = new ShallowRenderer();
  const mainMovie = {
    adult: false,
    backdrop_path: '/uHEI6v8ApQusjbaRZ8o7WcLYeWb.jpg',
    genre_ids: [27, 878, 18, 53],
    id: 531309,
    original_language: 'en',
    original_title: 'Brightburn',
    overview:
      'What if a child from another world crash-landed on Earth, but instead of becoming a hero to mankind, he proved to be something far more sinister?',
    popularity: 137.601,
    poster_path: '/roslEbKdY0WSgYaB5KXvPKY0bXS.jpg',
    release_date: '2019-05-10',
    title: 'Brightburn',
    video: false,
    vote_average: 7.5,
    vote_count: 2,
  };
  const result = renderer.render(<MainFilmTitle mainMovie={mainMovie} genres={dataGenres} />);
  expect(result).toMatchSnapshot();
});

test('createMoviesGenreList works correctly', () => {
  const testGenresMovies = [53, 10749, 37];
  const movie = {
    mainMovie: {
      runtime: 131,
    },
  };
  expect(createMoviesGenreList(testGenresMovies, dataGenres, movie)).toHaveLength(
    testGenresMovies.length + 1,
  );
});

test('createMoviesGenreList works correctly with integer runtime', () => {
  const testGenresMovies = [53, 10749, 37];
  const movie = {
    mainMovie: {
      runtime: 120,
    },
  };
  expect(createMoviesGenreList(testGenresMovies, dataGenres, movie)).toHaveLength(
    testGenresMovies.length + 1,
  );
});

test('shooseGenre works correctly', () => {
  const elementID = { id: 27 };
  const movie = { name: 'Horror', id: elementID.id };
  const result = shooseGenre(dataGenres, elementID);
  expect(result).toEqual(movie);
});
