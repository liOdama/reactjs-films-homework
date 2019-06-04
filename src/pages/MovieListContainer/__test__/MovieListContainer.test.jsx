import React from 'react';
import { Provider } from 'react-redux';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import MovieList from '../index';
import { createGenreList } from '../MovieListContainer';
import selectGenre from '../../../utils/selectGenre';


// import ACTIONS
import fetchGenres from '../../../modules/fetchGenres/fetchGenresAction';
import { itemsHasErrored } from '../../../modules/isLoading/isLoadingAction';
import clearCurrentMovie from '../../../modules/root/clearCurrentMovieAction';
import changeMainMovie from '../../../modules/mainMovie/changeMainMovieAction';
import setMainMovieDetails from '../../../modules/mainMovie/mainMovieAction';

// import Request
import requestFilms from '../../../utils/requests';

// import REDUCER
import rootReducer, { initialState } from '../../../modules/root/rootReducer';
import fetchGenresReducer from '../../../modules/fetchGenres/fetchGenresReducer';
import itemsIsLoading from '../../../modules/isLoading/isLoadingReducer';
import mainMovieReducer from '../../../modules/mainMovie/mainMovieReducer';

const KEY = '75331f1a740385460b25b56203149aa8';

// Test Components
//* ****************************************************************************
describe('MovieList renders correctly', () => {
  const mockStore = configureMockStore();
  const state = {
    movies: {
      page: 0,
      results: [],
      mainMovie: null,
      currentVideo: null,
    },
  };
  const store = mockStore(state);
  const container = ReactTestRender.create(<Provider store={store}><MovieList /></Provider>);
  it('MovieList: renders correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('MovieList: createGenreList renders correctly', () => {
    const genres = [{ name: 'Drama' }, { name: 'Action' }];
    const test = createGenreList(genres);
    expect(test).toHaveLength(genres.length);
  });
});

// Test for reducers and their actions
// ############################################################################
describe('Test for reducers', () => {
  describe('Reducer tests, Root Reducer', () => {
    it('Root Reducer: ITEMS_FETCH_DATA_SUCCESS', () => {
      const action = {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: { page: 1, results: [{ id: 1 }, 2, 3] },
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        page: 1,
        results: [{ id: 1 }, 2, 3],
        mainMovie: 1,
      });
    });

    it('Root Reducer: CLEAR_CURRENT_MOVIE action', () => {
      const action = {
        type: 'CLEAR_CURRENT_MOVIE',
        payload: null,
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        currentVideo: null,
      });
    });

    it('Root reducer: fetch trailer action', () => {
      const action = {
        type: 'FETCH_VIDEO_SUCCESS',
        payload: 'testId',
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        currentVideo: 'testId',
      });
    });

    it('Root reducer: check default arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      const state = jest.fn((arg1, arg2) => rootReducer(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initialState);
    });

    it('Root reducer: Default', () => {
      const action = {
        type: 'Default',
        payload: { ...initialState },
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
      });
    });

    it('Root reducer: clearCurrentVideo action', () => {
      const mockStore = configureMockStore([thunk]);
      const expectedActions = {
        type: 'CLEAR_CURRENT_MOVIE',
        payload: null,
      };
      const store = mockStore({
        currentVideo: 'testId',
      });
      const data = store.dispatch(clearCurrentMovie());
      expect(data).toEqual(expectedActions);
    });
  });

  describe('mainMovie Reducer', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    const initial = {};
    const data = {
      adult: false,
      backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
      belongs_to_collection: null,
      budget: 183000000,
      genres: [{ id: 12, name: 'Adventure' },
        { id: 14, name: 'Fantasy' },
        { id: 10402, name: 'Music' },
        { id: 10749, name: 'Romance' },
        { id: 35, name: 'Comedy' },
        { id: 10751, name: 'Family' }],
      homepage: null,
      id: 420817,
      imdb_id: 'tt6139732',
      original_language: 'en',
      original_title: 'Aladdin',
      overview: 'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
      popularity: 559.104,
      poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
      release_date: '2019-05-22',
      revenue: 0,
      runtime: 128,
      status: 'Released',
      tagline: 'Choose Wisely.',
      title: 'Aladdin',
      video: false,
      vote_average: 7.2,
      vote_count: 461,
    };


    it('CHANGE_MAIN_MOVIE', () => {
      const action = {
        type: 'CHANGE_MAIN_MOVIE',
        payload: { test: 'test' },
      };

      expect(mainMovieReducer({}, action)).toEqual({
        test: 'test',
      });
    });
    it('mainMovie: GET_MAIN_MOVIE_DETAILS', () => {
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data,
      };
      expect(mainMovieReducer(initial, action)).toEqual(data);
    });
    it('mainMovie: check state arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      const state = jest.fn((arg1, arg2) => mainMovieReducer(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initial);
    });

    it('mainMovie: check state default', () => {
      const actionDefault = {
        type: 'ACTION',
        payload: {},
      };
      expect(mainMovieReducer(initial, actionDefault)).toEqual(initial);
    });

    it('mainMovie: mainMovieAction', () => {
      const mockStore = configureMockStore([thunk]);
      const store = mockStore(initial);
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data,
      };
      expect(store.dispatch(setMainMovieDetails(data))).toEqual(action);
    });

    it('mainMovie: request mainMovieDetails', () => {
      const mockStore = configureMockStore([thunk]);
      const id = 458156;
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data,
      };

      fetchMock
        .getOnce(`https://api.themoviedb.org/3/movie/${id}?api_key=75331f1a740385460b25b56203149aa8&language=en-US`, {
          headers: { 'content-type': 'application/json' },
          body: data,
          status: 200,
        }).catch(err => itemsHasErrored(err));

      const store = mockStore({});
      store.dispatch(requestFilms.getMainMovieDetails(id))
        .then(dataMovie => expect(dataMovie).toEqual(action));
    });

    it('mainMovie: Change main movie', () => {
      const mockStore = configureMockStore([thunk]);
      const store = mockStore({
        mainMovie: 'test_1',
      });
      const expectedActions = [{
        type: 'CHANGE_MAIN_MOVIE',
        payload: { mainMovie: 'test_2' },
      }];

      store.dispatch(changeMainMovie({ mainMovie: 'test_2' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('isLoading Reducer', () => {
    const initial = false;
    const action = bool => ({
      type: 'ITEMS_IS_LOADING',
      payload: bool,
    });
    it('check Reducer', () => {
      expect(itemsIsLoading(initial, action(true))).toEqual(true);
    });

    it('check state arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      const state = jest.fn((arg1, arg2) => itemsIsLoading(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initial);
    });

    it('check state default', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      expect(itemsIsLoading(initial, actionDefault)).toEqual(initial);
    });
  });

  describe('Fetch Genres Reducer ', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const initial = [];
    const action = {
      type: 'FETCH_ID_GENRES',
      payload: {
        genres: [{ id: 35, name: 'Drama' }],
      },
    };

    it('fetchGenres: check state arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      const state = jest.fn((arg1, arg2) => fetchGenresReducer(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initial);
    });

    it('FETCH_ID_GENRES', () => {
      expect(fetchGenresReducer(initial, action)).toEqual(
        [{ id: 35, name: 'Drama' }],
      );
    });


    it('fetchGenres: check state default', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false,
      };
      expect(fetchGenresReducer(initial, actionDefault)).toEqual(initial);
    });

    it('fetchGenres: Action', () => {
      const mockStore = configureMockStore([thunk]);
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
});

// Items ErrorLoading
// ##############################################
describe('Error loading', () => {
  it('error', () => {
    const err = new Error('Some Error');
    const expectedActions = {
      payload: err,
      type: 'ITEMS_HAS_ERRORED',
    };

    expect(itemsHasErrored(err)).toEqual(expectedActions);
  });
});


// Tests for requests;
// ##############################################
describe('Requests tests', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Fetch popular movies', async () => {
    const mockStore = configureMockStore([thunk]);
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/popular?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: { page: 1, results: [1, 2, 3] },
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchPopular()).then((data) => {
      expect(data).toEqual(expectedActions);
    });
  });


  it('Fetch coming soon movies', () => {
    const mockStore = configureMockStore([thunk]);
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/upcoming?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: { page: 1, results: [1, 2, 3] },
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchComingSoon()).then((data) => {
      expect(data).toEqual(expectedActions);
    });
  });

  it('Fetch Movies On Genre', () => {
    const mockStore = configureMockStore([thunk]);
    const idGenre = 35;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`, {
        headers: { 'content-type': 'application/json' },
        body: { page: 1, results: [1, 2, 3], status: 'ok' },
      });
    const expectedActions = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: { page: 1, results: [1, 2, 3] },
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchMoviesOnGenre(idGenre)).then((data) => {
      expect(data).toEqual(expectedActions);
    });
  });

  it('Fetch Top Rated', () => {
    const mockStore = configureMockStore([thunk]);
    const id = 458156;
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/top_rated?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: true,
      }));
    const expectedActions = {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      payload: { page: 1, results: [1, 2, 3] },
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.getTopRated(id))
      .then(data => expect(data).toEqual(expectedActions));
  });


  it('Fetch Trailer', () => {
    const mockStore = configureMockStore([thunk]);
    const id = 280960;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`, {
        headers: { 'content-type': 'application/json' },
        body: {
          id: 280960,
          results: [{
            id: '5a200baa925141033608f5f0',
            iso_639_1: 'en',
            iso_3166_1: 'US',
            key: '6ZfuNTqbHE8',
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Test',
          }, {
            id: '5a200baa925141033608f5f0',
            iso_639_1: 'en',
            iso_3166_1: 'US',
            key: '6ZfuNTqbHE8',
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
          }],
          status: 'ok',
        },
      });
    const expectedActions = {
      type: 'FETCH_VIDEO_SUCCESS',
      payload: '6ZfuNTqbHE8',
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchVideo(id)).then((data) => {
      expect(data).toEqual(expectedActions);
    });
  });
});

describe('Fail Reqquest', () => {
  it('fail: Fetch Top Rated ', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/top_rated?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.getTopRated())
      .then(data => expect(data).toEqual(expectedActions));
  });

  it('fail: Fetch Movies On Genre ', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    const idGenre = 35;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${idGenre}`, JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchMoviesOnGenre(idGenre))
      .then(data => expect(data).toEqual(expectedActions));
  });

  it('fail: Fetch coming soon', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/upcoming?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchComingSoon())
      .then(data => expect(data).toEqual(expectedActions));
  });

  it('fail: Fetch popular', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    fetchMock
      .getOnce('https://api.themoviedb.org/3/movie/popular?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1', JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchPopular())
      .then(data => expect(data).toEqual(expectedActions));
  });

  it('fail: trailer', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    const id = 280960;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`, JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.fetchVideo(id))
      .then(data => expect(data).toEqual(expectedActions));
  });

  it('fail: fetchMainMovieDetails', () => {
    const mockStore = configureMockStore([thunk]);
    const ERR = new Error('Something wrong');
    const id = 280960;
    fetchMock
      .getOnce(`https://api.themoviedb.org/3/movie/${id}?api_key=75331f1a740385460b25b56203149aa8&language=en-US`, JSON.stringify({
        page: 1,
        results: [1, 2, 3],
        ok: false,
      }));
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: ERR,
    };
    const store = mockStore({});
    return store.dispatch(requestFilms.getMainMovieDetails(id))
      .then(data => expect(data).toEqual(expectedActions));
  });
});
