import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import MainFilmInfo from '../index';

test('MainFilmInfo renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MainFilmInfo />);
  const result = renderer.render(<MainFilmInfo />);
  expect(result).toMatchSnapshot();
});

test('MainFilmInfo: check state', () => {
  const props = {
    overwie: '',
    mainMovie: { id: 'test' },
  };

  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null,
    },
    mainMovie: { id: 'test' },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const container = document.createElement('div');
  container.id = 'wrapper';
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <MainFilmInfo {...props} />
      </Provider>,
      document.querySelector('#wrapper'),
    );
  });
  const node = document.querySelector('#info');
  ReactTestUtils.Simulate.click(node);
  const result = document.querySelector('#wrapper');
  expect(result).toMatchSnapshot();
});
