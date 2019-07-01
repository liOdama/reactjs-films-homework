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
    };
    const container = ReactTestRender.create(
      <Router>
        <MovieListContainer {...state} />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });

  // it('MovieList: renders correctly with results', () => {
  //   const state = {
  //     movies: {
  //       page: 0,
  //       results: [
  //         {
  //           backdrop_path: null,
  //           genre_ids: [12, 878, 28],
  //           id: 299534,
  //           original_title: 'Avengers: Endgame',
  //           overview:
  //             "After the devastating events of Avengers",
  //           title: 'Avengers: Endgame',
  //         },
  //       ],
  //       mainMovie: null,
  //       currentVideo: null,
  //     },
  //     fetchGenres: jest.fn(() => ({})),
  //     fetchSearchResults: jest.fn(() => ({})),
  //     genres: [{ id: 1, name: 'Drama' }],
  //     query: { url: '', search:false },
  //   };
  //   fetchMock.getOnce(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`,
  //     state,
  //   );
  //   const store = mockStore(state);
  //   const container = ReactTestUtils.renderIntoDocument(
  //     <Provider store={store}>
  //       <Router initialEntries={['/']} initialIndex={0}>
  //         <Route path="/" render={props => <MovieListContainerWithRedux.default {...props} />} />
  //       </Router>
  //     </Provider>,
  //   );
  //   expect(container).toMatchSnapshot();
  // });

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
            genre_ids: [12, 878, 28],
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
      genres: [{ id: 1, name: 'Drama' }],
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

// describe('shouldComponentUpdate', () => {
//   const initial = {
//     movies: {
//       currentVideo: null,
//       results: [
//         {
//           adult: false,
//           backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
//           genre_ids: [12, 14, 10402, 10749, 35, 10751],
//           id: 420817,
//           original_language: 'en',
//           original_title: 'Aladdin',
//           overview:
//             'A kindhearted street urchin named Aladdin.',
//           popularity: 630.556,
//           poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
//           release_date: '2019-05-22',
//           title: 'Aladdin',
//           video: false,
//           vote_average: 7.2,
//           vote_count: 538,
//         },
//       ],
//     },
//     genres: [],
//     mainMovie: { backdrop_path: 'test' },
//     typeView: 'cards',
//   };
//   const initial2 = {
//     movies: {
//       mainMovie: { backdrop_path: 'test' },
//       currentVideo: 'test',
//       results: [
//         {
//           adult: false,
//           backdrop_path: '/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
//           genre_ids: [12, 14, 10402, 10749, 35, 10751],
//           original_title: 'Aladdin',
//           overview:
//             'A kindhearted street urchin named Aladdin embarks on a ',
//           popularity: 630.556,
//           poster_path: '/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg',
//           release_date: '2019-05-22',
//           title: 'Aladdin',
//           video: false,
//           vote_average: 7.2,
//           vote_count: 538,
//         },
//       ],
//     },
//     genres: [{ id: 35, name: 'Drama' }],
//     mainMovie: { backdrop_path: 'test' },
//     typeView: '',
//   };
//   it('MovieListContainer: check shouldComponentUpdate to BE TRUE', () => {
//     jest.spyOn(MovieListContainer.prototype, 'shouldComponentUpdate');
//     const action = MovieListContainer.prototype.shouldComponentUpdate.call(
//       { props: { ...initial } },
//       { ...initial2 },
//     );
//     expect(action).toBeTruthy();
//   });

//   it('MovieListContainer: check shouldComponentUpdate to BE FALSE', () => {
//     jest.spyOn(MovieListContainer.prototype, 'shouldComponentUpdate');
//     const action = MovieListContainer.prototype.shouldComponentUpdate.call(
//       { props: { ...initial } },
//       { ...initial },
//     );
//     expect(action).toBeFalsy();
//   });
// });

describe('MapDispatchToProps', () => {
  const state = {
    fetchListMovies: id => id,
    fetchVideo: id => id,
    getMainMovieDetails: id => id,
    setTypeView: id => id,
    clearError: id => id,
    fetchGenres: id => id,
    clearCurrentMovie: id => id,
    fetchSearchResults: id => id,
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
