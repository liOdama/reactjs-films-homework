import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import fetchMock from 'fetch-mock';
import ListMovies from '../index';
import { keydonwGenres } from '../../../utils/selectGenre';
import requestsFilms from '../../../utils/requests';


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

test('ListMovies renders correctly with empty Array results', () => {
  const results = [];
  const renderer = new ShallowRenderer();
  const result = renderer.render(<ListMovies results={results} genres={genres} />);
  expect(result).toMatchSnapshot();
});

describe('ListMovies: selectGenre', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('ListMovies: kewDown on genre, expect props', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`, {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      }).catch(err => err);
    const props = {
      genres: [{ id: 31, name: 'Action' }, { id: 35, name: 'Drama' }],
      fetchMoviesOnGenre: requestsFilms.fetchMoviesOnGenre,
    };
    const e = {
      key: 'a',
      target: {
        id: 'test',
        textContent: 'Drama',
      },
    };
    const result = keydonwGenres(props, e);
    expect(result).toEqual(props);
  });

  it('ListMovies: kewDown Enter, expect data', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`, {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      }).catch(err => err);
    const props = {
      genres: [{ id: 31, name: 'Action' }, { id: 35, name: 'Drama' }],
      fetchMoviesOnGenre: requestsFilms.fetchMoviesOnGenre,
    };
    const e = {
      key: 'Enter',
      target: {
        id: 'test',
        textContent: 'Drama',
      },
    };
    const result = keydonwGenres(props, e);
    expect(result).toEqual(props);
  });

  it('ListMovies: kewDown on genre', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`, {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      }).catch(err => err);
    const props = {
      genres: [{ id: 31, name: 'Action' }, { id: 35, name: 'Drama' }],
      fetchMoviesOnGenre: requestsFilms.fetchMoviesOnGenre,
    };
    const e = {
      key: 'a',
      target: {
        id: 'test',
        textContent: 'Drama',
      },
    };
    const result = keydonwGenres(props, e);
    expect(result).toEqual(props);
  });
});
