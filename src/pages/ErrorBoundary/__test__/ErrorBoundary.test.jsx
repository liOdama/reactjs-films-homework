import React from 'react';
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
        <ErrorBoundary />
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
        <ErrorBoundary />
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
        <ErrorBoundary />
      </Provider>,
    );
    expect(render).toMatchSnapshot();
  });
});

describe('ComponentDidUpdate', () => {
  it('ComponentDidUpdate: error = ""', async () => {
    const error = '';
    const initial = {
      error,
    };
    const action = await ErrorBoundary.WrappedComponent.prototype.componentDidUpdate.call(null, {
      ...initial,
    });

    expect(action).toBeFalsy();
  });

  it('ComponentDidUpdate: error = true', async () => {
    const error = true;
    const initial = {
      error,
    };
    const action = await ErrorBoundary.WrappedComponent.prototype.componentDidUpdate.call(null, {
      ...initial,
    });

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
    keys.forEach(async (curr) => {
      const dispatch = jest.fn(() => state[curr]);
      const result = await mapStateToDispatch(dispatch)[curr]();
      expect(result).toEqual(state[curr]);
    });
  });
});
