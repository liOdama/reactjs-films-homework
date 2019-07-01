import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';

import AppRoutes from '../index';

fetchMock.config.overwriteRoutes = true;

const KEY = '75331f1a740385460b25b56203149aa8';

describe('Test routes', () => {
  const initial = {
    error: '',
    movies: {
      mainMovie: { backdrop_path: 'test' },
      currentVideo: null,
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
    setTypeView: jest.fn(),
    match: { url: '' },
  };
  const mockStore = configureMockStore([thunk]);
  const store = mockStore(initial);

  beforeEach(() => {
    fetchMock.getOnce(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=avengers&page=1&include_adult=false`,
      initial,
    );

    fetchMock.getOnce(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
      initial,
    );

    fetchMock.getOnce(
      'https://api.themoviedb.org/3/movie/123?api_key=75331f1a740385460b25b56203149aa8&language=en-US',
      initial,
    );

    fetchMock.getOnce(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=75331f1a740385460b25b56203149aa8&language=en-US',
      [{ id: 35, name: 'Drama' }],
    );

    fetchMock.getOnce(
      `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=35`,
      initial,
    );
  });

  it('Routes - base Routes', () => {
    const container = TestRenderer.create(
      <Provider store={store}>
        <Router initialEntries={['/']} initialIndex={0}>
          <AppRoutes />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  // Test with error
  it('Routes - list Routes', () => {
    initial.error = 'Nothing Found';
    const storeWithError = mockStore(initial);
    const container = TestRenderer.create(
      <Provider store={storeWithError}>
        <Router initialEntries={['/list/coming_soon']} initialIndex={0}>
          <AppRoutes />
        </Router>
        ,
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Routes - genre Routes', () => {
    const container = TestRenderer.create(
      <Provider store={store}>
        <Router initialEntries={['/genre/35']} initialIndex={0}>
          <AppRoutes />
        </Router>
        ,
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Routes - films Routes', () => {
    const container = TestRenderer.create(
      <Provider store={store}>
        <Router initialEntries={['/films/123']} initialIndex={0}>
          <AppRoutes />
        </Router>
        ,
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Routes - search Routes', () => {
    const container = TestRenderer.create(
      <Provider store={store}>
        <Router initialEntries={['/search/avengers']} initialIndex={0}>
          <AppRoutes />
        </Router>
        ,
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  // it('Routes - 404 Routes', () => {
  //   const container = TestRenderer.create(
  //     <Provider store={store}>
  //       <Router initialEntries={['/404']} initialIndex={0}>
  //         <AppRoutes />
  //       </Router>
  //       ,
  //     </Provider>,
  //   );
  //   expect(container).toMatchSnapshot();
  // });

  it('Routes - index.html Routes', () => {
    const container = TestRenderer.create(
      <Provider store={store}>
        <Router initialEntries={['/index.html']} initialIndex={0}>
          <AppRoutes />
        </Router>
        ,
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
