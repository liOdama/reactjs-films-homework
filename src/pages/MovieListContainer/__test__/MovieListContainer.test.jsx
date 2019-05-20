import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import MovieList from '../index';


// import ACTIONS
import fetchComingSoon from '../../../modules/fetchComingSoon/fetchComingSoonAction';
import fetchGenres from '../../../modules/fetchGenres/fetchGenresAction';
import fetchMoviesOnGenre from '../../../modules/fetchMoviesOnGenre/fetchMoviesOnGenreAction';
import getTopRated from '../../../modules/getTopRated/getTopRatedAction';
import fetchPopular from '../../../modules/root/rootAction';

// import REDUCER
import rootReducer, { initialState } from '../../../modules/root/rootReducer';
import fetchGenresReducer from '../../../modules/fetchGenres/fetchGenresReducer';

// Test Components
//* ****************************************************************************
describe('MovieList renders correctly', () => {
  const renderer = new ShallowRenderer();
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const container = renderer.render(<Provider store={store}><MovieList /></Provider>);
  it('+++ render the connected(SMART) component', () => {
    expect(container).toMatchSnapshot();
  });
});

// Action tests
//* ****************************************************************************
describe('async actions', () => {
  const mockStore = configureMockStore([thunk]);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Fetch comming soon movies', () => {
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/upcoming?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = [
      {
        type: 'FETCH_COMING_SOON',
        payload: { page: 1, results: [1, 2, 3] },
      },
    ];
    const store = mockStore({});
    return store.dispatch(fetchComingSoon()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch trending movies', () => {
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/top_rated?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = [
      {
        type: 'FETCH_TOP_RATED',
        payload: { page: 1, results: [1, 2, 3] },
      },
    ];
    const store = mockStore({});
    return store.dispatch(getTopRated()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch popular movies', () => {
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/popular?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = [
      {
        type: 'FETCH_POPULAR',
        payload: { page: 1, results: [1, 2, 3] },
      },
    ];
    const store = mockStore({});
    return store.dispatch(fetchPopular()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch movies on genre', () => {
    fetchMock
      .getOnce('https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=35', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = [
      {
        type: 'FETCH_MOVIES_ON_GENRE',
        payload: { page: 1, results: [1, 2, 3] },
      },
    ];
    const store = mockStore({});
    const genreId = 35;
    return store.dispatch(fetchMoviesOnGenre(genreId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch genres', () => {
    fetchMock
      .getOnce('https://api.themoviedb.org/3/genre/movie/list?api_key=75331f1a740385460b25b56203149aa8&language=en-US', {
        headers: { 'content-type': 'application/json' },
        body: { genres: { id: 35, name: 'Drama' }, status: 'ok' },
      });
    const expectedActions = [
      {
        type: 'FETCH_ID_GENRES',
        payload: { genres: { id: 35, name: 'Drama' } },
      },
    ];
    const store = mockStore({});
    return store.dispatch(fetchGenres()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

// Reducer tests
//* ****************************************************************************
describe('Reducer tests, Root Reducer', () => {
  const initial = [];
  it('FETCH_ID_GENRES', () => {
    const action = {
      type: 'FETCH_ID_GENRES',
      payload: {
        genres: [{ id: 35, name: 'Drama' }],
      },
    };
    expect(fetchGenresReducer(initial, action)).toEqual(
      [{ id: 35, name: 'Drama' }],
    );
  });

  it('FETCH_MOVIES_ON_GENRE', () => {
    const action = {
      type: 'FETCH_MOVIES_ON_GENRE',
      payload: { page: 1, results: [{}, 2, 3] },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      page: 1,
      results: [{}, 2, 3],
    });
  });

  it('FETCH_POPULAR', () => {
    const action = {
      type: 'FETCH_POPULAR',
      payload: { page: 1, results: [{}, 2, 3], genres: [] },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      page: 1,
      results: [{}, 2, 3],
    });
  });

  it('FETCH_TOP_RATED', () => {
    const action = {
      type: 'FETCH_TOP_RATED',
      payload: { page: 1, results: [{}, 2, 3], genres: [] },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      page: 1,
      results: [{}, 2, 3],
    });
  });

  it('FETCH_COMING_SOON', () => {
    const action = {
      type: 'FETCH_COMING_SOON',
      payload: { page: 1, results: [{}, 2, 3], genres: [] },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      page: 1,
      results: [{}, 2, 3],
    });
  });

  it('CHANGE_MAIN_MOVIE', () => {
    const action = {
      type: 'GET_MAIN_MOVIES_DETAILS',
      payload: { test: 'test' },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      mainMovie: { test: 'test' },
    });
  });

  it('Default', () => {
    const action = {
      type: 'Default',
      payload: { ...initialState },
    };

    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
    });
  });
});
