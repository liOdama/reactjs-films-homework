import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// import ACTIONS
import fetchGenres from '../../../modules/fetchGenres/fetchGenresAction';
import itemsHasErrored from '../../../modules/Error/errorAction';
import clearCurrentMovie from '../../../modules/root/clearCurrentMovieAction';
import setMainMovieDetails from '../../../modules/mainMovie/mainMovieAction';
import setTypeView from '../../../modules/TypeView/TypeViewAction';

// import REDUCER
import rootReducer, { initialState } from '../../../modules/root/rootReducer';
import fetchGenresReducer from '../../../modules/fetchGenres/fetchGenresReducer';
import itemsIsLoading from '../../../modules/isLoading/isLoadingReducer';
import mainMovieReducer from '../../../modules/mainMovie/mainMovieReducer';
import errorReducer from '../../../modules/Error/errorReducer';
import typeViewReducer from '../../../modules/TypeView/TypeViewReducer';

// import Request
import requestFilms from '../../../utils/requests';

describe('Test for reducers', () => {
  describe('Reducer tests, Root Reducer', () => {
    it('Root Reducer: ITEMS_FETCH_DATA_SUCCESS', () => {
      const action = {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: { page: 1, results: [{ id: 1 }, 2, 3] }
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        page: 1,
        results: [{ id: 1 }, 2, 3],
        mainMovie: 1
      });
    });

    it('Root Reducer: CLEAR_CURRENT_MOVIE action', () => {
      const action = {
        type: 'CLEAR_CURRENT_MOVIE',
        payload: null
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        currentVideo: null
      });
    });

    it('Root Reducer: CLEAR_RESULTS', () => {
      const action = {
        type: 'CLEAR_RESULTS',
        payload: initialState
      };
      expect(rootReducer(initialState, action)).toEqual(initialState);
    });

    it('Root reducer: fetch trailer action', () => {
      const action = {
        type: 'FETCH_VIDEO_SUCCESS',
        payload: 'testId'
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState,
        currentVideo: 'testId'
      });
    });

    it('Root reducer: check default arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false
      };
      const state = jest.fn((arg1, arg2) => rootReducer(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initialState);
    });

    it('Root reducer: Default', () => {
      const action = {
        type: 'Default',
        payload: { ...initialState }
      };

      expect(rootReducer(initialState, action)).toEqual({
        ...initialState
      });
    });

    it('Root reducer: clearCurrentVideo action', () => {
      const mockStore = configureMockStore([thunk]);
      const expectedActions = {
        type: 'CLEAR_CURRENT_MOVIE',
        payload: null
      };
      const store = mockStore({
        currentVideo: 'testId'
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
      genres: [
        { id: 12, name: 'Adventure' },
        { id: 14, name: 'Fantasy' },
        { id: 10402, name: 'Music' },
        { id: 10749, name: 'Romance' },
        { id: 35, name: 'Comedy' },
        { id: 10751, name: 'Family' }
      ],
      homepage: null,
      id: 420817,
      imdb_id: 'tt6139732',
      original_language: 'en',
      original_title: 'Aladdin',
      overview:
        'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
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
      vote_count: 461
    };

    it('mainMovie: GET_MAIN_MOVIE_DETAILS', () => {
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data
      };
      expect(mainMovieReducer(initial, action)).toEqual(data);
    });
    it('mainMovie: CLEAR_RESULTS', () => {
      const action = {
        type: 'CLEAR_RESULTS',
        payload: initial
      };
      expect(mainMovieReducer(initial, action)).toEqual(initial);
    });
    it('mainMovie: check state arguments', () => {
      const actionDefault = {
        type: 'ACTION_DEFAULT',
        payload: false
      };
      const state = jest.fn((arg1, arg2) => mainMovieReducer(arg1, arg2));
      state(undefined, actionDefault);
      expect(state).toHaveReturnedWith(initial);
    });

    it('mainMovie: check state default', () => {
      const actionDefault = {
        type: 'ACTION',
        payload: {}
      };
      expect(mainMovieReducer(initial, actionDefault)).toEqual(initial);
    });

    it('mainMovie: mainMovieAction', () => {
      const mockStore = configureMockStore([thunk]);
      const store = mockStore(initial);
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data
      };
      expect(store.dispatch(setMainMovieDetails(data))).toEqual(action);
    });

    it('mainMovie: request mainMovieDetails', () => {
      const mockStore = configureMockStore([thunk]);
      const id = 458156;
      const action = {
        type: 'GET_MAIN_MOVIE_DETAILS',
        payload: data
      };

      fetchMock
        .getOnce(
          `https://api.themoviedb.org/3/movie/${id}?api_key=75331f1a740385460b25b56203149aa8&language=en-US`,
          {
            headers: { 'content-type': 'application/json' },
            body: data,
            status: 200
          }
        )
        .catch(err => itemsHasErrored(err));

      const store = mockStore({});
      store
        .dispatch(requestFilms.getMainMovieDetails(id))
        .then(dataMovie => expect(dataMovie).toEqual(action));
    });

    describe('isLoading Reducer', () => {
      const initial = false;
      const action = bool => ({
        type: 'ITEMS_IS_LOADING',
        payload: bool
      });
      it('check Reducer', () => {
        expect(itemsIsLoading(initial, action(true))).toEqual(true);
      });

      it('check state arguments', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        const state = jest.fn((arg1, arg2) => itemsIsLoading(arg1, arg2));
        state(undefined, actionDefault);
        expect(state).toHaveReturnedWith(initial);
      });

      it('check state default', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        expect(itemsIsLoading(initial, actionDefault)).toEqual(initial);
      });
    });

    describe('TypeView Reducer', () => {
      const initial = 'cards';
      const testValue = 'cards';
      const action = value => ({
        type: 'SET_TYPE_VIEW',
        payload: value
      });
      it('check Reducer', () => {
        expect(typeViewReducer(initial, action(testValue))).toEqual(testValue);
      });

      it('check state arguments', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        const state = jest.fn((arg1, arg2) => typeViewReducer(arg1, arg2));
        state(undefined, actionDefault);
        expect(state).toHaveReturnedWith(testValue);
      });

      it('check state default', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        expect(typeViewReducer(initial, actionDefault)).toEqual(testValue);
      });

      it('Action: setTypeView - return action', () => {
        const expectedActions = {
          type: 'SET_TYPE_VIEW',
          payload: testValue
        };
        expect(setTypeView(testValue)).toEqual(expectedActions);
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
          genres: [{ id: 35, name: 'Drama' }]
        }
      };

      it('fetchGenres: check state arguments', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        const state = jest.fn((arg1, arg2) => fetchGenresReducer(arg1, arg2));
        state(undefined, actionDefault);
        expect(state).toHaveReturnedWith(initial);
      });

      it('FETCH_ID_GENRES', () => {
        expect(fetchGenresReducer(initial, action)).toEqual([{ id: 35, name: 'Drama' }]);
      });

      it('fetchGenres: check state default', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        expect(fetchGenresReducer(initial, actionDefault)).toEqual(initial);
      });

      it('fetchGenres: Action', () => {
        const mockStore = configureMockStore([thunk]);
        fetchMock.getOnce(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=75331f1a740385460b25b56203149aa8&language=en-US',
          {
            headers: { 'content-type': 'application/json' },
            body: { genres: { id: 35, name: 'Drama' }, status: 'ok' }
          }
        );
        const expectedActions = [
          {
            type: 'FETCH_ID_GENRES',
            payload: { genres: { id: 35, name: 'Drama' } }
          }
        ];
        const store = mockStore({});
        return store.dispatch(fetchGenres()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('Error Reducer', () => {
      const initial = false;
      const err = new Error('Some Error');
      const expectedActions = {
        payload: err,
        type: 'ITEMS_HAS_ERRORED'
      };
      it('check Reducer', () => {
        expect(errorReducer(initial, expectedActions)).toEqual(err);
      });

      it('check state arguments', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        const state = jest.fn((arg1, arg2) => errorReducer(arg1, arg2));
        state(undefined, actionDefault);
        expect(state).toHaveReturnedWith(initial);
      });

      it('check state default', () => {
        const actionDefault = {
          type: 'ACTION_DEFAULT',
          payload: false
        };
        expect(errorReducer(initial, actionDefault)).toEqual(initial);
      });
    });
  });
});
