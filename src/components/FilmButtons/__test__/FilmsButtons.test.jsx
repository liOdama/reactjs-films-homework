import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilmButtons from '../index';
import style from '../FilmButtons.scss';
import * as mapStateToDispatch from '../FilmButtonsContainer';
import MainFilmInfo from '../../MainFilmInfo';

test('FulmButtons renders correctly', () => {
  const renderer = new ShallowRenderer();
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null
    }
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.render(
    <Provider store={store}>
      <FilmButtons className={style.name} />
    </Provider>
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
      currentVideo: null
    }
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const result = renderer.create(
    <Provider store={store}>
      <FilmButtons className={style.name} />
    </Provider>
  );
  const node = result.root.findByProps({ id: 'info' });
  expect(ReactTestUtils.Simulate.click(node)).toMatchSnapshot();
});

test('FulmButtons, event - change mainoverwie Height', () => {
  const initialState = {
    movies: {
      page: 0,
      results: [],
      mainMovie: {},
      currentVideo: null
    }
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  ReactDOM.render(
    <Provider store={store}>
      <MainFilmInfo>
        <FilmButtons className={style.name} />
      </MainFilmInfo>
    </Provider>,
    document.body
  );
  const node = document.querySelector('#info');
  ReactTestUtils.Simulate.click(node);
  const option1 = document.querySelector('#mainFilmOverwie').style;
  const option2 = document.querySelector('#mainFilmOverwie > p').style;
  let result;
  if (option1._values['max-height'] === '100%' && option2._values.display === 'block') {
    result = true;
  }
  expect(result).toBeTruthy();
});

describe('test MapDispatchToProps', () => {
  const state = {
    fetchVideo: id => id
  };
  const id = 35;

  it('MapDispatchToProps: fetchVideo', async () => {
    const dispatch = jest.fn(() => state.fetchVideo);
    const result = await mapStateToDispatch.mapStateToDispatch(dispatch).fetchVideo(id);
    expect(result(id)).toEqual(id);
  });
});
