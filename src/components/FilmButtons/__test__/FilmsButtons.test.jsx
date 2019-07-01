import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilmButtons from '../index';
import style from '../FilmButtons.scss';
import * as mapStateToDispatch from '../FilmButtonsContainer';

test('FulmButtons renders correctly', () => {
  const renderer = new ShallowRenderer();
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null,
    },
    setTypeOverwie: jest.fn(),
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.render(
    <Provider store={store}>
      <FilmButtons className={style.name} />
    </Provider>,
  );
  expect(result).toMatchSnapshot();
});

test('FulmButtons renders correctly', () => {
  const renderer = TestRenderer;
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null,
    },
    mainMovie: { id: 'test' },
    setTypeOverwie: jest.fn(),
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.create(
    <Provider store={store}>
      <FilmButtons className={style.name} />
    </Provider>,
  );
  const node = result.root.findByProps({ id: 'info' });
  expect(ReactTestUtils.Simulate.click(node)).toMatchSnapshot();
});

describe('test MapDispatchToProps', () => {
  const state = {
    fetchVideo: id => id,
  };
  const id = 35;

  it('MapDispatchToProps: fetchVideo', () => {
    const dispatch = jest.fn(() => state.fetchVideo);
    const result = mapStateToDispatch.mapStateToDispatch(dispatch).fetchVideo(id);
    expect(result(id)).toEqual(id);
  });
});
