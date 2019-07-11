import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import ReactTestRender from 'react-test-renderer';
import MovieSelectors from '../index';

describe('MovieSelectors', () => {
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
  const setTypeView = jest.fn();
  const clearError = jest.fn(() => 1);
  it('MovieSelectors: renders correctly', () => {
    const result = ReactTestRender.create(
      <Router>
        <MovieSelectors genres={genres} setTypeView={setTypeView} clearError={clearError} />
      </Router>,
    );
    expect(result).toMatchSnapshot();
  });

  describe('MovieSelectors: events click ', () => {
    const fetchListMovies = jest.fn();
    const test = jest.fn(value => value);
    const props = {
      fetchListMovies,
      error: 'true',
      clearError,
      setTypeView: test,
      history: { push: jest.fn() },
    };
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'modalRoot';
      document.body.appendChild(container);
      act(() => {
        ReactDOM.render(
          <Router>
            <MovieSelectors {...props} />
          </Router>,
          document.querySelector('#modalRoot'),
        );
      });
    });

    // it('selectGenre: error true should BE - Call clearError', () => {
    //   props.genres = [{ name: 'Drame', id: 35 }];
    //   const btn = React.createElement(
    //     'button',
    //     {
    //       id: 'test',
    //       onClick: selectGenre.bind(null, props),
    //       type: 'button',
    //     },
    //     'Drama',
    //   );
    //   jest.spyOn(props, 'clearError');
    //   act(() => {
    //     ReactDOM.render(btn, container);
    //   });
    //   const node = container.querySelector('#test');
    //   ReactTestUtils.Simulate.click(node);
    //   expect(clearError).toHaveBeenCalled();
    // });
    // it('showTrends: error true should BE - call clearError', () => {
    //   jest.spyOn(props, 'clearError');
    //   const node = document.querySelector('button');
    //   ReactTestUtils.Simulate.click(node, { target: { textContent: 'Coming Soon' } });
    //   expect(clearError).toHaveBeenCalled();
    // });

    it('shooseTypeView: shooseTypeView - call action', () => {
      jest.spyOn(props, 'setTypeView');
      const node1 = document.querySelector('#cards');
      const node2 = document.querySelector('#lines');
      ReactTestUtils.Simulate.click(node1);
      ReactTestUtils.Simulate.click(node2);
      expect(props.setTypeView).toHaveBeenCalledTimes(2);
    });
  });
  describe('showTrends: without error', () => {
    test('showTrends: without error - clearError not called with undefined', () => {
      let container;

      beforeEach(() => {
        const props = {
          history: { push: jest.fn() },
          clearError,
          setTypeView,
        };
        container = document.createElement('div');
        container.id = 'modalRoot';
        document.body.appendChild(container);
        act(() => {
          ReactDOM.render(
            <Router>
              <MovieSelectors {...props} />
            </Router>,
            document.querySelector('#modalRoot'),
          );
        });
        jest.spyOn(props, 'clearError');
        const node = document.querySelector('button');
        ReactTestUtils.Simulate.click(node);
        expect(clearError).toHaveBeenCalledTimes(0);
      });
    });
    test('showTrends: without error - clearError not called with ""', () => {
      let container;

      beforeEach(() => {
        const props = {
          error: 'errror',
          clearError,
        };
        container = document.createElement('div');
        container.id = 'modalRoot';
        document.body.appendChild(container);
        act(() => {
          ReactDOM.render(
            <Router>
              <MovieSelectors {...props} />
            </Router>,
            document.querySelector('#modalRoot'),
          );
        });
        jest.spyOn(props, 'clearError');
        const node = document.querySelector('button');
        ReactTestUtils.Simulate.click(node);
        expect(clearError).toHaveBeenCalledTimes(0);
      });
    });
  });
});
