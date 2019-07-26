import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import ShallowRender from 'react-test-renderer/shallow';
import TestRender from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ErrorBoundary from '../index';
import { mapStateToDispatch } from '../ErrorBoundaryContainer';

describe('getDerivedStateFromProps', () => {
  it('getDerivedStateFromError', () => {
    const expectResult = { hasError: true };
    const action = ErrorBoundary.WrappedComponent.getDerivedStateFromError();
    expect(action).toEqual(expectResult);
  });

  it('getDerivedStateFromProps: error Nothing Found', async () => {
    const nextProps = {
      hasError: true,
      history: { location: { pathname: '/404' } },
    };
    const nextState = {
      hasError: true,
      history: { location: { pathname: '/404' } },
    };
    const action = await ErrorBoundary.WrappedComponent.getDerivedStateFromProps(
      nextProps,
      nextState,
    );

    const expected = {
      hasError: true,
    };
    expect(action).toEqual(expected);
  });

  it('getDerivedStateFromProps:  error = ""', async () => {
    const nextProps = {
      hasError: false,
      history: { location: { pathname: '/404' } },
    };
    const nextState = {
      hasError: false,
      history: { location: { pathname: '/404' } },
    };

    const expected = {
      hasError: false,
    };

    const action = await ErrorBoundary.WrappedComponent.getDerivedStateFromProps(
      nextProps,
      nextState,
    );
    expect(action).toEqual(expected);
  });
});

describe('render', () => {
  it('render correctly: error', () => {
    const error = 'Something Wrong';
    const initial = {
      error,
      setTypeView: jest.fn(),
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
      setTypeView: jest.fn(),
    };
    let store = configureStore();
    store = store(initial);

    const render = new ShallowRender();
    render.render(
      <Provider store={store}>
        <Router>
          <ErrorBoundary />
        </Router>
      </Provider>,
    );
    expect(render.getRenderOutput()).toMatchSnapshot();
  });
  it('render correctly: error = ""', () => {
    const error = '';
    const initial = {
      error,
      setTypeView: jest.fn(),
      children: [],
    };
    let store = configureStore();
    store = store(initial);
    const render = TestRender.create(
      <Provider store={store}>
        <Router initialEntries={['/404']}>
          <ErrorBoundary>{new Error('Nothing found')}</ErrorBoundary>
        </Router>
      </Provider>,
    );
    expect(render).toMatchSnapshot();
  });
});

describe('MapDispatchToProps', () => {
  it('test all descriptors', () => {
    const dispatch = jest.fn();
    const temp = mapStateToDispatch(dispatch);
    const result = typeof temp;
    expect(result).toBe('object');
  });
});
