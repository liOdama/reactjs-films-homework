import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import { JestEnvironment } from '@jest/environment';
import MovieDetailsPage from '../MovieDetailsPage';
import * as MovieDetailsPageWithContainer from '../index';
import { mapStateToDispatch } from '../MovieDetailsPageContainer';

jest.mock('rc-util/lib/Portal');

//* ****************************************************************************
describe('MovieDetailsPage - all tests', () => {
  const mockStore = configureStore([thunk]);
  // without genres (genres = [])
  const initial = {
    movies: {
      currentVideo: null,
      results: [
        {
          adult: false,
          backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
          genre_ids: [12, 14, 10402, 10749, 35, 10751],
          id: 420817,
          original_language: 'en',
          original_title: 'Aladdin',
          overview:
            'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
          popularity: 630.556,
          poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
          release_date: '2019-05-22',
          title: 'Aladdin',
          video: false,
          vote_average: 7.2,
          vote_count: 538,
        },
      ],
      fetchGenres: jest.fn(() => ({})),
      fetchSearchResults: jest.fn(() => ({})),
      getMainMovieDetails: jest.fn(() => ({})),
      fetchListMovies: jest.fn(() => ({})),
    },
    genres: [],
    mainMovie: { backdrop_path: 'test' },
    match: { url: '/' },
  };
  // with genres and trailer(currentVideo)
  const initial2 = {
    movies: {
      mainMovie: { backdrop_path: 'test' },
      currentVideo: 'test',
      results: [
        {
          adult: false,
          backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
          genre_ids: [12, 14, 10402, 10749, 35, 10751],
          original_title: 'Aladdin',
          overview:
            'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
          popularity: 630.556,
          poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
          release_date: '2019-05-22',
          title: 'Aladdin',
          video: false,
          vote_average: 7.2,
          vote_count: 538,
        },
      ],
    },
    genres: [{ id: 35, name: 'Drama' }],
    mainMovie: { backdrop_path: 'test' },
    fetchGenres: jest.fn(() => ({})),
    fetchSearchResults: jest.fn(() => ({})),
    getMainMovieDetails: jest.fn(() => ({})),
    fetchListMovies: jest.fn(() => ({})),
    clearCurrentMovie: jest.fn(() => ({})),
    match: { url: '' },
  };
  // with genres and match, without trailer
  const initial3 = {
    movies: {
      mainMovie: { backdrop_path: 'test' },
      currentVideo: null,
      results: [],
    },
    genres: [{ id: 35, name: 'Drama' }],
    mainMovie: { backdrop_path: 'test' },
    fetchGenres: jest.fn(() => ({})),
    fetchSearchResults: jest.fn(() => ({})),
    getMainMovieDetails: jest.fn(() => ({})),
    fetchListMovies: jest.fn(() => ({})),
    clearCurrentMovie: jest.fn(() => ({})),
    match: { url: '/terst' },
  };
  describe('MovieDetailsPage, render component correctly', () => {
    let container;
    beforeEach(() => {
      container = document.createElement('button');
      container.id = 'root';
      document.body.appendChild(container);
    });

    it('MovieDetailsPage: render Modal with component', () => {
      const store = mockStore(initial2);
      fetchMock
        .getOnce(
          'https://api.themoviedb.org/3/movie/?api_key=75331f1a740385460b25b56203149aa8&language=en-US',
          initial2,
        )
        .catch(err => err);
      act(() => {
        ReactDOM.render(
          <Provider store={store}>
            <Router initialEntries={['/films/123']} initialIndex={0}>
              <Route
                path="/films/123"
                render={props => <MovieDetailsPageWithContainer.default {...props} />}
              />
            </Router>
          </Provider>,
          document.querySelector('#root'),
        );
      });
      const node = document.querySelector('#closeModal');
      ReactTestUtils.Simulate.click(node);
      jest.spyOn(initial2, 'clearCurrentMovie');
      const node2 = document.querySelector('#closeModal');
      ReactTestUtils.Simulate.keyDown(node2, { key: 'Escape' });
      const node3 = document.querySelector('#closeModal');
      ReactTestUtils.Simulate.keyDown(node3, { key: 'Enter' });
      expect(document.querySelector('#root')).toMatchSnapshot();
    });

    it('MovieDetailsPage - render preloader', () => {
      const store = mockStore(initial3);
      act(() => {
        ReactDOM.render(
          <Router>
            <Provider store={store}>
              <MovieDetailsPage {...initial3} />
            </Provider>
          </Router>,
          document.querySelector('#root'),
        );
      });
      expect(document.querySelector('#root')).toMatchSnapshot();
    });
  });

  describe('componentDidMout an ComponentDidUpdate', () => {
    const getMainMovieDetails = jest.fn();
    const fetchGenres = jest.fn();
    const fetchListMovies = jest.fn();
    const context = {
      state: {
        loading: true,
        path: '/',
      },
      props: {
        getMainMovieDetails,
        fetchGenres,
        fetchListMovies,
        match: { url: '/films/test', params: { id: 'trending' } },
        genres: [{ id: 1, name: 'test' }],
      },
    };

    it('componentDidMout - getMainMovieDetails called', () => {
      jest.spyOn(context.props, 'getMainMovieDetails');
      MovieDetailsPage.prototype.componentDidMount.call(context);
      MovieDetailsPage.prototype.componentDidUpdate.call(context, null, { path: '' });
      expect(getMainMovieDetails).toHaveBeenCalledTimes(2);
    });

    it('componentDidMout - fetchGenres called', () => {
      context.props.genres = [];
      jest.spyOn(context.props, 'fetchGenres');
      MovieDetailsPage.prototype.componentDidMount.call(context);
      expect(fetchGenres).toHaveBeenCalledTimes(1);
    });

    it('componentDidUpdate - to be False', () => {
      const action = MovieDetailsPage.prototype.componentDidUpdate.call(context, null, {
        path: '/films/test',
      });
      expect(action).toBeFalsy();
    });

    it('componentDidMout - getMainMovieDetails not called', () => {
      context.state.loading = false;
      jest.spyOn(context.props, 'getMainMovieDetails');
      MovieDetailsPage.prototype.componentDidUpdate.call(context, null, { path: '' });
      expect(getMainMovieDetails).toHaveBeenCalledTimes(0);
    });
  });

  describe('getDerivedStateFromProps', () => {
    it('getDerivedStateFromProps: first render', () => {
      const nextState = {
        path: '/',
        match: { url: '/' },
      };
      const test = {
        loading: false,
        path: '/',
      };
      const action = MovieDetailsPage.getDerivedStateFromProps.call(null, nextState, nextState);

      expect(action).toEqual(test);
    });

    it('getDerivedStateFromProps: other rendering', () => {
      const nextProps = {
        match: { url: '/trending' },
      };
      const nextState = {
        path: '/',
      };
      const test = {
        loading: true,
        path: '/trending',
      };
      const action = MovieDetailsPage.getDerivedStateFromProps.call(null, nextProps, nextState);

      expect(action).toEqual(test);
    });
  });

  describe('shouldComponentUpdate', () => {
    it('MovieDetailsPage: check shouldComponentUpdate to BE TRUE', () => {
      jest.spyOn(MovieDetailsPage.prototype, 'shouldComponentUpdate');
      const action = MovieDetailsPage.prototype.shouldComponentUpdate.call(
        { props: { ...initial } },
        { ...initial2 },
      );
      expect(action).toBeTruthy();
    });

    it('MovieDetailsPage: check shouldComponentUpdate to BE FALSE', () => {
      jest.spyOn(MovieDetailsPage.prototype, 'shouldComponentUpdate');
      const action = MovieDetailsPage.prototype.shouldComponentUpdate.call(
        { props: { ...initial } },
        { ...initial },
      );
      expect(action).toBeFalsy();
    });
  });

  describe('test MapDispatchToProps', () => {
    const state = {
      fetchListMovies: id => id,
      fetchVideo: id => id,
      getMainMovieDetails: id => id,
      fetchSearchResults: query => query,
      fetchGenres: query => query,
      clearCurrentMovie: query => query,
    };

    it('test all descriptors', () => {
      const keys = Object.keys(state);
      const id = 'test';
      keys.forEach((curr) => {
        const dispatch = jest.fn(() => state[curr]);
        const result = mapStateToDispatch(dispatch)[curr]();
        expect(result(id)).toEqual(id);
      });
    });
  });
});
