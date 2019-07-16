import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';
import { MemoryRouter as Router } from 'react-router-dom';
import MovieListContainer from '../MovieListContainer';

import { mapStateToDispatch } from '../MovieListContainerContainer';

fetchMock.config.overwriteRoutes = true;

// Test Components
//* ****************************************************************************
const mockMethods = {
  fetchVideo: jest.fn(() => ({})),
  clearError: jest.fn(() => ({})),
  fetchGenres: jest.fn(() => ({})),
  fetchListMovies: jest.fn(() => ({})),
  fetchSearchResults: jest.fn(() => ({})),
  getMainMovieDetails: jest.fn(() => ({})),
  clearCurrentMovie: jest.fn(() => ({})),
  genres: [{ id: 1, name: 'Drama' }],
  setTypeView: jest.fn(),
  history: { replace: jest.fn() },
};
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

describe('MovieListContainer - test component', () => {
  it('MovieList: renders correctly with empty results', () => {
    const state = {
      error: '',
      itemsIsLoading: false,
      movies: {
        page: 0,
        results: [],
        mainMovie: null,
        currentVideo: null,
      },
      query: { url: '', search: false },
      ...mockMethods,
      genres,
    };
    const container = ReactTestRender.create(
      <Router>
        <MovieListContainer {...state} />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Modal: close modal', () => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
    const state = {
      error: '',
      itemsIsLoading: false,
      movies: {
        page: 0,
        results: [
          {
            backdrop_path: null,
            genre_ids: [12],
            id: 299534,
            original_title: 'Avengers: Endgame',
            overview:
              "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
            title: 'Avengers: Endgame',
          },
        ],
        mainMovie: null,
        currentVideo: 'test',
      },
      genres,
      query: { url: '', search: false },
      ...mockMethods,
    };
    act(() => {
      ReactDOM.render(
        <Router>
          <MovieListContainer {...state} />
        </Router>,
        document.querySelector('#root'),
      );
    });
    const node = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.click(node);
    jest.spyOn(state, 'clearCurrentMovie');
    const node2 = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.keyDown(node2, { key: 'Escape' });
    const node3 = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.keyDown(node3, { key: 'Enter' });
    expect(state.clearCurrentMovie).toHaveBeenCalledTimes(2);
    const node4 = document.querySelector('label');
    jest.spyOn(state, 'fetchVideo');
    ReactTestUtils.Simulate.click(node4);
    expect(state.fetchVideo).toHaveBeenCalledTimes(1);
  });
});

describe('componentDidMout an ComponentDidUpdate', () => {
  // const fetchSearchResults = jest.fn();
  // const fetchGenres = jest.fn();
  // const fetchListMovies = jest.fn();
  const context = {
    state: {
      loading: true,
      path: '/',
    },
    props: {
      // fetchSearchResults,
      // fetchGenres,
      // fetchListMovies,
      query: { url: '/', params: { id: 'trending' } },
      genres: [{ id: 1, name: 'test' }],
      ...mockMethods,
    },
  };
  it('loading - true - fetchListMovies called', () => {
    jest.spyOn(context.props, 'fetchListMovies');
    MovieListContainer.prototype.componentDidMount.call(context);
    MovieListContainer.prototype.componentDidUpdate.call(context, null, { path: '' });
    expect(mockMethods.fetchListMovies).toHaveBeenCalledTimes(2);
  });

  it('loading - true - fetchGenres called', () => {
    context.props.genres = [];
    jest.spyOn(context.props, 'fetchGenres');
    MovieListContainer.prototype.componentDidMount.call(context);
    MovieListContainer.prototype.componentDidUpdate.call(context, null, { path: '' });
    expect(mockMethods.fetchGenres).toHaveBeenCalledTimes(2);
  });

  it('loading - true - fetchSearchResults called', () => {
    context.props.query = { url: '/search/test', search: true };
    jest.spyOn(context.props, 'fetchSearchResults');
    MovieListContainer.prototype.componentDidMount.call(context);
    MovieListContainer.prototype.componentDidUpdate.call(context, null, { path: '' });
    expect(mockMethods.fetchSearchResults).toHaveBeenCalledTimes(2);
  });

  it('componentDidUpdate - prevState = path - to Be Falsy', () => {
    const context2 = {
      state: {
        loading: true,
        path: '/',
      },
      props: {
        query: { url: '/', params: { id: 'trending' } },
      },
    };
    const action = MovieListContainer.prototype.componentDidUpdate.call(context2, null, {
      path: '/',
    });
    expect(action).toBeFalsy();
  });
});
describe('getDerivedStateFromProps', () => {
  it('getDerivedStateFromProps: first render', () => {
    const nextState = {
      path: '/',
    };
    const nextProps = {
      query: { url: '/' },
      itemsIsLoading: false,
      error: '',
      ...mockMethods,
    };
    const test = {
      loading: false,
      path: '/',
    };
    const action = MovieListContainer.getDerivedStateFromProps.call(null, nextProps, nextState);

    expect(action).toEqual(test);
  });

  it('getDerivedStateFromProps: with error', () => {
    const errorMessage = 'Nothing found';
    const nextProps = {
      query: { url: '/trending' },
      itemsIsLoading: true,
      error: errorMessage,
      ...mockMethods,
    };
    const nextState = {
      path: '/',
    };
    const action = MovieListContainer.getDerivedStateFromProps.bind(null, nextProps, nextState);
    expect(() => action()).toThrow();
  });

  it('getDerivedStateFromProps: other rendering', () => {
    const nextProps = {
      query: { url: '/trending' },
      itemsIsLoading: true,
      error: '',
      ...mockMethods,
    };
    const nextState = {
      path: '/',
    };
    const test = {
      loading: true,
      path: '/trending',
    };
    const action = MovieListContainer.getDerivedStateFromProps.call(null, nextProps, nextState);

    expect(action).toEqual(test);
  });
});

describe('MapDispatchToProps', () => {
  it('test all descriptors', () => {
    const dispatch = jest.fn();
    const temp = mapStateToDispatch(dispatch);
    const result = typeof temp;
    expect(result).toBe('object');
  });
});
