import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilmButtons from '../index';
import style from '../FilmButtons.scss';
import { showMainFilmOverwie } from '../FilmButtons';


test('Signature renders correctly', () => {
  const renderer = new ShallowRenderer();
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null,
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.render(
    <Provider store={store}><FilmButtons className={style.name} /></Provider>,
  );
  expect(result).toMatchSnapshot();
});

test('Signature renders correctly', () => {
  const renderer = TestRenderer;
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null,
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.create(
    <Provider store={store}><FilmButtons className={style.name} /></Provider>,
  );
  const node = result.root.findByProps({ id: 'info' });
  expect(ReactTestUtils.Simulate.click(node)).toMatchSnapshot();
});
