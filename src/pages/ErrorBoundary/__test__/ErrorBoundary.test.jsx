import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import TestRender from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ErrorBoundary from '../index';
import { mapStateToDispatch } from '../ErrorBoundaryContainer';

describe('getDerivedStateFromProps', () => {
  it('getDerivedStateFromProps: has error', async () => {
    const error = 'Something Wrong';
    const initial = {
      error,
    };
    const action = await ErrorBoundary.WrappedComponent.getDerivedStateFromProps.call(null, {
      ...initial,
    });

    const expected = {
      hasError: true,
      typeError: error,
    };
    expect(action).toEqual(expected);
  });

  it('getDerivedStateFromProps: error Nothing Found', async () => {
    const error = 'Something Wrong';
    const initial = {
      error,
    };
    const action = await ErrorBoundary.WrappedComponent.getDerivedStateFromProps.call(null, {
      ...initial,
    });

    const expected = {
      hasError: true,
      typeError: error,
    };
    expect(action).toEqual(expected);
  });

  it('getDerivedStateFromProps:  error = ""', async () => {
    const error = '';
    const initial = {
      error,
    };
    const action = await ErrorBoundary.WrappedComponent.getDerivedStateFromProps.call(null, {
      ...initial,
    });

    const expected = {
      hasError: false,
      typeError: null,
    };
    expect(action).toEqual(expected);
  });
});

describe('render', () => {
  it('render correctly: Something Wrong error', () => {
    const error = 'Something Wrong';
    const initial = {
      error,
    };
    let store = configureStore();
    store = store(initial);
    const render = TestRender.create(
      <Provider store={store}>
        <Router>
          <ErrorBoundary />
        </Router>
      </Provider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('render correctly: Nothing Found error', () => {
    const error = 'Nothing Found';
    const initial = {
      error,
    };
    let store = configureStore();
    store = store(initial);
    const render = TestRender.create(
      <Provider store={store}>
        <Router>
          <ErrorBoundary />
        </Router>
      </Provider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('render correctly: error = ""', () => {
    const error = '';
    const initial = {
      error,
    };
    let store = configureStore();
    store = store(initial);
    const render = TestRender.create(
      <Provider store={store}>
        <Router>
          <ErrorBoundary />
        </Router>
      </Provider>,
    );
    expect(render).toMatchSnapshot();
  });
});

describe('ComponentDidUpdate', () => {
  it('ComponentDidUpdate: error = ""', async () => {
    const error = '';
    const initial = {
      props: { error },
    };
    const action = await ErrorBoundary.WrappedComponent.prototype.shouldComponentUpdate.call(
      initial,
      {
        error,
      },
    );

    expect(action).toBeFalsy();
  });

  it('ComponentDidUpdate: error = true', async () => {
    const error = 'true';
    const initial = {
      props: { error },
    };
    const action = await ErrorBoundary.WrappedComponent.prototype.shouldComponentUpdate.call(
      initial,
      {
        error: '',
      },
    );

    expect(action).toBeTruthy();
  });
});

describe('test MapDispatchToProps', () => {
  const state = {
    fetchListMovies: id => id,
    getMainMovieDetails: id => id,
    fetchSearchResults: query => query,
    clearError: query => query,
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
