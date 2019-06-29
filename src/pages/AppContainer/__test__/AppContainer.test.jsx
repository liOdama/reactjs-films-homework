import React from 'react';
import ReactTestRender from 'react-test-renderer';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppContainer from '../index';
import { mapStateToDispatch } from '../AppContainerContainer';

const clearCurrentMovie = jest.fn(() => 'ahahaha');
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
  },
  genres: [],
  mainMovie: { backdrop_path: 'test' },
};
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
  clearCurrentMovie,
};
describe('getDerivedStateFromProps', () => {
  it('getDerivedStateFromProps: first render', async () => {
    const fetchGenres = jest.fn(() => 1);
    const fetchListMovies = jest.fn(() => 2);
    const action = await AppContainer.WrappedComponent.getDerivedStateFromProps.call(null, {
      ...initial,
      fetchListMovies,
      fetchGenres,
    });

    expect(action).toBe(2);
  });

  it('getDerivedStateFromProps: other rendering', async () => {
    const fetchGenres = jest.fn(() => 1);
    const fetchListMovies = jest.fn(() => 2);
    const action = await AppContainer.WrappedComponent.getDerivedStateFromProps.call(null, {
      ...initial2,
      fetchListMovies,
      fetchGenres,
    });

    expect(action).toEqual({ ...initial2, fetchGenres, fetchListMovies });
  });
});

describe('AppContainer', () => {
  test('AppContainer renders correctli', () => {
    beforeEach(() => {
      const container = document.createElement('div');
      container.id = 'root';
      document.body.appendChild(container);
    });
    // const render = new ShallowRenderer();
    let store = configureStore();
    store = store(initial);
    const result = ReactTestRender.create(
      <Provider store={store}>
        <AppContainer />
      </Provider>,
    );
    expect(result).toMatchSnapshot();
  });

  test('AppContainer renders correctly', () => {
    let store = configureStore();
    store = store(initial2);
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer />
        </Provider>,
        document.querySelector('#root'),
      );
    });
    const result = document.querySelector('#root');
    expect(result).toMatchSnapshot();
  });

  it('Modal: has a error', () => {
    let store = configureStore([thunk]);
    store = store(initial2);
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer />
        </Provider>,
        document.querySelector('#root'),
      );
    });
    const node = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.click(node);
    const result = document.querySelector('#root');
    expect(result).toMatchSnapshot();
  });
  it('Modal: has a error', () => {
    let store = configureStore([thunk]);
    store = store(initial2);
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer />
        </Provider>,
        document.querySelector('#root'),
      );
    });
    const node = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.keyDown(node, { key: 'Escape' });
    const result = document.querySelector('#root');
    expect(result).toMatchSnapshot();
  });
  it('Modal: has a error', () => {
    let store = configureStore([thunk]);
    store = store(initial2);
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer />
        </Provider>,
        document.querySelector('#root'),
      );
    });
    const node = document.querySelector('#closeModal');
    ReactTestUtils.Simulate.keyDown(node);
    const result = document.querySelector('#root');
    expect(result).toMatchSnapshot();
  });
});

describe('test MapDispatchToProps', () => {
  const state = {
    fetchListMovies: id => id,
    clearError: id => id,
    getMainMovieDetails: id => id,
    fetchSearchResults: query => query,
    fetchGenres: query => query,
  };
  it('test all descriptors', () => {
    const keys = Object.keys(state);
    keys.forEach(async (curr) => {
      const dispatch = jest.fn(() => state[curr]);
      const result = await mapStateToDispatch(dispatch)[curr]();
      expect(result).toEqual(state[curr]);
    });
  });
});
