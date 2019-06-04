import React from 'react';
import { Provider } from 'react-redux';
import ReactTestRender from 'react-test-renderer';
import thunk from 'redux-thunk';
import ReactTestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import MovieDetailsPage from '../index';

jest.mock('rc-util/lib/Portal');

//* ****************************************************************************
describe('MovieDetailsPage renders correctly', () => {
  const initialState = {
    movies: {}, genres: [], mainMovie: {},
  };
  const mockStore = configureStore([thunk]);
  it('MovieDetailsPage: render preloader', () => {
    const store = mockStore(initialState);
    const container = ReactTestUtils
      .renderIntoDocument(<Provider store={store}><MovieDetailsPage /></Provider>);
    expect(container).toMatchSnapshot();
  });
  it('MovieDetailsPage: render component', () => {
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
            overview: 'A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.',
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
    const store = mockStore(initial);
    const container = ReactTestRender
      .create(<Provider store={store}><MovieDetailsPage /></Provider>);
    expect(container).toMatchSnapshot();
  });
});
