import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';
import { configureStore, configureMockStore } from 'redux-mock-store';
import ListMovies from '../index';
import { changeMainFilm } from '../ListMovies';


const genres = [
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

test('ListMovies renders correctly with fill Array results', () => {
  const results = [{
    adult: false,
    backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    genre_ids: [12, 878, 28],
    id: 299534,
    original_language: 'en',
    original_title: 'Avengers: Endgame',
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    popularity: 323.106,
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    release_date: '2019-04-24',
    title: 'Avengers: Endgame',
    video: false,
    vote_average: 8.6,
    vote_count: 4484,
  }];


  const renderer = new ShallowRenderer();
  renderer.render(<ListMovies results={results} genres={genres} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('MainFilmInfo renders correctly with empty Array results', () => {
  const results = [];
  const renderer = new ShallowRenderer();
  const result = renderer.render(<ListMovies results={results} genres={genres} />);
  expect(result).toMatchSnapshot();
});
