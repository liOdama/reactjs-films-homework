import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

// import Request
import requestFilms from '../../../utils/requests';

const KEY = '75331f1a740385460b25b56203149aa8';
fetchMock.config.overwriteRoutes = true;

// Tests for requests;
// ##############################################
describe('Requests tests', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('fetchData Succesed', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });
    const response = {
      headers: { 'content-type': 'application/json' },
      body: { page: 1, results: [1, 2, 3], status: 'ok' },
    };
    const query = ['coming_soon', 'trending', 'top_rated', '35'];
    const mockStore = configureMockStore([thunk]);

    it('all requests, except getmainMovie and fetchTrailer - fetch data successed', () => {
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=35`,
        response,
      );

      const expectedActions = {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: { page: 1, results: [1, 2, 3] },
      };

      fetchMock
        .getOnce(
          `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
          response,
        )
        .catch(err => err);

      const store = mockStore({});
      query.map(async (curr) => {
        store.dispatch(await requestFilms.fetchListMovies(curr)).then((value) => {
          fetchMock.reset();
          fetchMock.restore();
          expect(value).toEqual(expectedActions);
        });
      });
    });

    it('initial request', () => {
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      const expectedActions = {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: { page: 1, results: [1, 2, 3] },
      };
      const store = mockStore({});
      store.dispatch(requestFilms.fetchListMovies('/')).then((value) => {
        fetchMock.reset();
        fetchMock.restore();
        expect(value).toEqual(expectedActions);
      });
    });

    it('Fetch Trailer - fetch data successed', () => {
      const store = mockStore({});
      const id = 280960;
      const response2 = {
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
              type: 'Test',
            },
            {
              id: '5a200baa925141033608f5f0',
              iso_639_1: 'en',
              iso_3166_1: 'US',
              key: '6ZfuNTqbHE8',
              name: 'Official Trailer',
              site: 'YouTube',
              size: 1080,
              type: 'Trailer',
            },
          ],
          status: 'ok',
        },
      };
      fetchMock
        .getOnce(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`,
          response2,
        )
        .catch(err => err);
      const expectedActions = {
        type: 'FETCH_VIDEO_SUCCESS',
        payload: '6ZfuNTqbHE8',
      };
      return store.dispatch(requestFilms.fetchVideo(id)).then((data) => {
        expect(data).toEqual(expectedActions);
      });
    });

    it('Fetch Search - fetch data successed', () => {
      const store = mockStore({});
      fetchMock
        .getOnce(
          `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${
            query[0]
          }&page=1&include_adult=false`,
          response,
        )
        .catch(err => err);
      const expectedActions = {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: { page: 1, results: [1, 2, 3] },
      };
      return store.dispatch(requestFilms.fetchSearchResults(query[0])).then((data) => {
        expect(data).toEqual(expectedActions);
      });
    });
  });

  describe('fail', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    const response = JSON.stringify({
      page: 1,
      results: [1, 2, 3],
      ok: false,
    });
    const expectError = new Error('Something wrong');
    const expectedActions = {
      type: 'ITEMS_HAS_ERRORED',
      payload: expectError,
    };
    const mockStore = configureMockStore([thunk]);
    it('fail requests - fetch data unsuccessed (listOfMovies)', () => {
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`,
        response,
      );
      fetchMock
        .getOnce(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`,
          response,
        )
        .catch(err => err);
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=35`,
        response,
      );

      const query = ['coming_soon', 'trending', 'top_rated', '35'];
      const store = mockStore({});
      query.map(async curr => store
        .dispatch(await requestFilms.fetchListMovies(curr))
        .then(value => expect(value).toEqual(expectedActions)));
    });

    it('fail requests - fetch data unsuccessed other requests', () => {
      const id = 35;

      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`,
        response,
      );
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`,
        response,
      );
      const fetchVideo = requestFilms.fetchVideo(id);
      const getMainMovieDetails = requestFilms.getMainMovieDetails(id);
      const store = mockStore({});
      Promise.all([fetchVideo, getMainMovieDetails]).then((data) => {
        data.forEach((curr) => {
          const element = curr;
          return store.dispatch(element).then(value => expect(value).toEqual(expectedActions));
        });
      });
    });
    it('fail requests - fetch data unsuccessed search request - Nothing Found', () => {
      const query = 'Test';
      const failResponse = JSON.stringify({
        page: 1,
        results: [],
      });
      const actions = {
        type: 'ITEMS_HAS_ERRORED',
        payload: 'Nothing found',
      };
      fetchMock.getOnce(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
        failResponse,
      );

      const fetchSearchResults = requestFilms.fetchSearchResults(query);
      const store = mockStore({});
      Promise.all([fetchSearchResults]).then((data) => {
        data.forEach(curr => store.dispatch(curr).then(value => expect(value).toEqual(actions)));
      });
    });
  });
});
