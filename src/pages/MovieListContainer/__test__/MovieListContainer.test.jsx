import React from 'react';
import { Provider } from 'react-redux';
import ReactTestRender from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import MovieListContainer from '../index';
import { createGenreList } from '../MovieListContainer';
// import REDUCER
import rootReducer from '../../../modules/root/rootReducer';

// import Request
import requestFilms from '../../../utils/requests';

import * as mapStateToDispatch from '../MovieListContainer';

const KEY = '75331f1a740385460b25b56203149aa8';

// Test Components
//* ****************************************************************************
describe('MovieListContainer - test component', () => {
  const mockStore = configureMockStore();
  const action = () => ({
    action: {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: {
        page: 2,
        results: [
          {
            adult: false,
            backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
            genre_ids: [12, 14, 10749, 35, 10751],
            id: 420817,
            original_language: 'en',
            original_title: 'Aladdin',
            overview:
              'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
            popularity: 364.955,
            poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
            release_date: '2019-05-22',
            title: 'Aladdin',
            video: false,
            vote_average: 7.2,
            vote_count: 1152
          }
        ]
      }
    }
  });

  it('MovieList: renders correctly with empty results', () => {
    const state = {
      movies: {
        page: 0,
        results: [],
        mainMovie: null,
        currentVideo: null
      }
    };
    const store = mockStore(state);
    const container = ReactTestRender.create(
      <Provider store={store}>
        <MovieListContainer />
      </Provider>
    );
    rootReducer(undefined, action);
    container.update(
      <Provider store={store}>
        <MovieListContainer />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('MovieList: renders correctly with empty results', () => {
    const state = {
      movies: {
        page: 0,
        results: [
          {
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
            vote_count: 4484
          }
        ],
        mainMovie: null,
        currentVideo: null
      }
    };
    const store = mockStore(state);
    const container = ReactTestRender.create(
      <Provider store={store}>
        <MovieListContainer />
      </Provider>
    );
    rootReducer(undefined, action);
    container.update(
      <Provider store={store}>
        <MovieListContainer />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

// Tests for requests;
// ##############################################
describe('Requests tests', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('all requests, except getmainMovie and fetchTrailer - fetch data successed', () => {
    const mockStore = configureMockStore([thunk]);
    const response = {
      headers: { 'content-type': 'application/json' },
      body: { page: 1, results: [1, 2, 3], status: 'ok' }
    };
    const idGenre = 35;
    const query = 'Avengers';
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${idGenre}`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      response
    );

    const expectedActions = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: { page: 1, results: [1, 2, 3] }
    };

    const store = mockStore({});
    const popular = requestFilms.fetchPopular();
    const topRated = requestFilms.getTopRated();
    const comingSoon = requestFilms.fetchComingSoon();
    const fetchMoviesOnGenre = requestFilms.fetchMoviesOnGenre(idGenre);
    const fetchSearchResults = requestFilms.fetchSearchResults(query);

    Promise.all([popular, topRated, comingSoon, fetchMoviesOnGenre, fetchSearchResults]).then(
      data => {
        data.forEach(curr =>
          store.dispatch(curr).then(value => expect(value).toEqual(expectedActions))
        );
      }
    );
  });

  it('Fetch Trailer - fetch data successed', () => {
    const mockStore = configureMockStore([thunk]);
    const id = 280960;
    const response = {
      headers: { 'content-type': 'application/json' },
      body: {
        id: 280960,
        results: [
          {
            id: '5a200baa925141033608f5f0',
            iso_639_1: 'en',
            iso_3166_1: 'US',
            key: '6ZfuNTqbHE8',
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Test'
          },
          {
            id: '5a200baa925141033608f5f0',
            iso_639_1: 'en',
            iso_3166_1: 'US',
            key: '6ZfuNTqbHE8',
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer'
          }
        ],
        status: 'ok'
      }
    };
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`,
      response
    );
    const expectedActions = {
      type: 'FETCH_VIDEO_SUCCESS',
      payload: '6ZfuNTqbHE8'
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchVideo(id)).then(data => {
      expect(data).toEqual(expectedActions);
    });
  });

  it('fail requests - fetch data unsuccessed', () => {
    const response = JSON.stringify({
      page: 1,
      results: [1, 2, 3],
      ok: false
    });
    const idGenre = 35;
    const query = 'Avengers';
    const id = 280960;

    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${idGenre}`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`,
      response
    );
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`,
      response
    );

    const ERR = new Error('Something wrong');
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR
    };

    const popular = requestFilms.fetchPopular();
    const topRated = requestFilms.getTopRated();
    const comingSoon = requestFilms.fetchComingSoon();
    const fetchMoviesOnGenre = requestFilms.fetchMoviesOnGenre(idGenre);
    const fetchSearchResults = requestFilms.fetchSearchResults(query);
    const fetchVideo = requestFilms.fetchVideo(id);
    const getMainMovieDetails = requestFilms.getMainMovieDetails(id);

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    Promise.all([
      popular,
      topRated,
      comingSoon,
      fetchMoviesOnGenre,
      fetchSearchResults,
      fetchVideo,
      getMainMovieDetails
    ]).then(data => {
      data.forEach(curr =>
        store.dispatch(curr).then(value => expect(value).toEqual(expectedActions))
      );
    });
  });

  it('fail requests - search - nothing Found', async () => {
    const response = JSON.stringify({
      page: 1,
      results: [],
      ok: true
    });
    const query = 'Avengers';
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
      response
    );

    const ERR = new Error('Nothing Found');
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR
    };
    const fetchSearchResults = requestFilms.fetchSearchResults(query);

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    Promise.all([fetchSearchResults]).then(data => {
      data.forEach(curr =>
        store.dispatch(curr).then(value => expect(value).toEqual(expectedActions))
      );
    });
  });
});

describe('MapDispatchToProps', () => {
  const state = {
    fetchPopular: 1,
    getTopRated: 1,
    fetchComingSoon: 1,
    fetchMoviesOnGenre: id => id,
    fetchVideo: id => id,
    getMainMovieDetails: id => id,
    changeMainMovie: id => id
  };

  it('test all descriptors', () => {
    const keys = Object.keys(state);
    keys.forEach(async curr => {
      const dispatch = jest.fn(() => state[curr]);
      const result = await mapStateToDispatch.mapStateToDispatch(dispatch)[curr]();
      expect(result).toEqual(state[curr]);
    });
  });
});
