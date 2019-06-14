import React from 'react';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../index';
import { search, mapStateToDispatch } from '../Header';

describe('HeaderComponent', () => {
  const state = {
    fetchSearchResults: query => query
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
    const fetchSearchResults = jest.fn(value1 => value1);
    const props = {
      fetchSearchResults
    };
    jest.spyOn(props, 'fetchSearchResults');
    const input = React.createElement('input', { value });
    const element = React.createElement('form', { onSubmit: search.bind(null, props) }, [input]);
    const node = ReactTestUtils.renderIntoDocument(element);
    ReactTestUtils.Simulate.submit(node);
    expect(fetchSearchResults).toHaveBeenCalled();
  });

  it('test all descriptors', async () => {
    const dispatch = jest.fn(() => state.fetchSearchResults);
    const result = await mapStateToDispatch(dispatch).fetchSearchResults();
    expect(result).toEqual(state.fetchSearchResults);
  });
});
