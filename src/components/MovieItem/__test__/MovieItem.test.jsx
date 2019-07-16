import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import fetchMock from 'fetch-mock';
import MovieItem from '../index';
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
const getMainMovieDetails = jest.fn(() => ({}));
test('MovieItem renders correctly without poster image', () => {
  const curr = {
    adult: false,
    backdrop_path: null,
    genre_ids: [12, 878, 28],
    id: 299534,
    original_language: 'en',
    original_title: 'Avengers: Endgame',
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    popularity: 323.106,
    poster_path: null,
    release_date: '2019-04-24',
    title: 'Avengers: Endgame',
    video: false,
    vote_average: 8.6,
    vote_count: 4484,
  };
  const movies = {};

  const renderer = new ShallowRenderer();
  renderer.render(
    <MovieItem
      curr={curr}
      getMainMovieDetails={getMainMovieDetails}
      genres={genres}
      movies={movies}
    />,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('MovieItem renders correctly with poster image', () => {
  const curr = {
    genre_ids: [12, 878, 28],
    original_title: 'Avengers: Endgame',
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    poster_path: 'testImagePath',
    title: 'Avengers: Endgame',
  };
  const movies = {};
  const renderer = new ShallowRenderer();
  const result = renderer.render(
    <MovieItem
      curr={curr}
      genres={genres}
      getMainMovieDetails={getMainMovieDetails}
      movies={movies}
      typeView="cards"
    />,
  );
  expect(result).toMatchSnapshot();
});

test('MovieItem renders correctly with lines classes', () => {
  const curr = {
    genre_ids: [12, 878, 28],
    original_title: 'Avengers: Endgame',
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",

    poster_path: 'testImagePath',

    title: 'Avengers: Endgame',
  };
  const movies = {};

  const renderer = new ShallowRenderer();
  const result = renderer.render(
    <MovieItem
      curr={curr}
      genres={genres}
      movies={movies}
      getMainMovieDetails={getMainMovieDetails}
      typeView="lines"
    />,
  );
  expect(result).toMatchSnapshot();
});

describe('MovieItem: selectGenre', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('MovieItem: kewDown on genre, expect props', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(
        `https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`,
        {
          headers: { 'content-type': 'application/json' },
          body: { page: 1, results: [1, 2, 3], status: 'ok' },
        },
      )
      .catch(err => err);
    const props = {
      genres: [{ id: 31, name: 'Action' }, { id: 35, name: 'Drama' }],
      fetchMoviesOnGenre: requestsFilms.fetchMoviesOnGenre,
      history: { push: jest.fn() },
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

  it('MovieItem: kewDown Enter, expect data', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(
        `https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`,
        {
          headers: { 'content-type': 'application/json' },
          body: { page: 1, results: [1, 2, 3], status: 'ok' },
        },
      )
      .catch(err => err);
    const props = {
      genres: [{ id: 31, name: 'Action' }, { id: 35, name: 'Drama' }],
      fetchListMovies: requestsFilms.fetchListMovies,
      history: { push: jest.fn() },
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

  it('MovieItem: kewDown on genre', async () => {
    const idGenre = 35;
    fetchMock
      .getOnce(
        `https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`,
        {
          headers: { 'content-type': 'application/json' },
          body: { page: 1, results: [1, 2, 3], status: 'ok' },
        },
      )
      .catch(err => err);
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
describe('changeMainMovie - getMainMovieDetails would be called', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'modalRoot';
    document.body.appendChild(container);
  });
  // it('getMainMovieDetails - test', () => {
  //   const props = {
  //     genres,
  //     getMainMovieDetails,
  //     curr: {
  //       backdrop_path: null,
  //       genre_ids: [12, 878, 28],
  //       id: 299534,
  //       original_title: 'Avengers: Endgame',
  //       overview:
  //         "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
  //       poster_path: null,
  //       title: 'Avengers: Endgame',
  //     },
  //   };
  //   act(() => {
  //     ReactDOM.render(
  //       <Router>
  //         <MovieItem {...props} />
  //       </Router>,
  //       container,
  //     );
  //   });

  //   jest.spyOn(props, 'getMainMovieDetails');
  //   const node1 = container.querySelector('figcaption button');
  //   ReactTestUtils.Simulate.click(node1);
  //   expect(getMainMovieDetails).toHaveBeenCalled();
  // });
});

describe('shouldComponentUpdate', () => {
  describe('shouldComponentUpdate', () => {
    const initial = { fullOverwie: true };
    const initial2 = { fullOverwie: false };

    it('MovieDetailsPage: check shouldComponentUpdate to BE TRUE', () => {
      jest.spyOn(MovieItem.prototype, 'shouldComponentUpdate');
      const action = MovieItem.prototype.shouldComponentUpdate.call(
        { state: { ...initial } },
        null,
        { ...initial2 },
      );
      expect(action).toBeTruthy();
    });

    it('MovieDetailsPage: check shouldComponentUpdate to BE FALSE', () => {
      jest.spyOn(MovieItem.prototype, 'shouldComponentUpdate');
      const action = MovieItem.prototype.shouldComponentUpdate.call(
        { state: { ...initial } },
        null,
        { ...initial },
      );
      expect(action).toBeFalsy();
    });
  });
});

describe('events', () => {
  const container = document.createElement('div');
  container.id = 'wrapper';
  const props = {
    curr: {
      adult: false,
      backdrop_path: null,
      genre_ids: [12, 878, 28],
      id: 299534,
      original_language: 'en',
      original_title: 'Avengers: Endgame',
      overview:
        "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
      popularity: 323.106,
      poster_path: null,
      release_date: '2019-04-24',
      title: 'Avengers: Endgame',
      video: false,
      vote_average: 8.6,
      vote_count: 4484,
    },
    movies: {},
    genres,
    getMainMovieDetails,
  };
  beforeEach(() => {
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <Router>
          <MovieItem {...props} />
        </Router>,
        container,
      );
    });
  });

  it('hoverOverwieBlock', () => {
    const node = document.querySelector('#showOverwie');
    ReactTestUtils.Simulate.click(node);
    const result = document.querySelector('#wrapper');
    expect(result).toMatchSnapshot();
  });

  it('hoverOverwieBlock', () => {
    const node = document.querySelector('#showOverwie');
    ReactTestUtils.Simulate.click(node);
    const node2 = document.querySelector('#closeHover');
    ReactTestUtils.Simulate.click(node2);
    const result = document.querySelector('#wrapper');
    expect(result).toMatchSnapshot();
  });
});
