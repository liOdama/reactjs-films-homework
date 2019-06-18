import React from 'react';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../index';
import { search } from '../Header';
import { mapStateToDispatch } from '../HeaderContainer';

describe('HeaderComponent', () => {
  const fetchSearchResults = jest.fn(value1 => value1);
  const clearError = jest.fn();
  const state = {
    fetchSearchResults,
    clearError
  };
  test('Header renders correctly', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);
    const result = ReactTestRender.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(result).toMatchSnapshot();
  });

  test('Header: search test', () => {
    const value = 'test';
    const props = {
      fetchSearchResults,
      error: false
    };
    jest.spyOn(props, 'fetchSearchResults');
    const input = React.createElement('input', { value });
    const element = React.createElement('form', { onSubmit: search.bind(null, props) }, [input]);
    const node = ReactTestUtils.renderIntoDocument(element);
    ReactTestUtils.Simulate.submit(node);
    expect(fetchSearchResults).toHaveBeenCalled();
  });

  test('Header: search test', () => {
    const props = {
      clearError,
      fetchSearchResults,
      error: true
    };
    jest.spyOn(props, 'clearError');
    const input = React.createElement('input');
    const element = React.createElement('form', { onSubmit: search.bind(null, props) }, [input]);
    const node = ReactTestUtils.renderIntoDocument(element);
    ReactTestUtils.Simulate.submit(node);
    expect(clearError).toHaveBeenCalled();
  });
});

const state = {
  fetchSearchResults: value => value,
  clearError: value => value
};
test('descriptors', () => {
  const test = false;
  const keys = Object.keys(state);
  keys.forEach(async curr => {
    const dispatch = jest.fn(() => state[curr]);
    const result = await mapStateToDispatch(dispatch)[curr](test);
    expect(result(test)).toEqual(test);
  });
});
