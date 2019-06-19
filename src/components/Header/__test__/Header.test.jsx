import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../index';
import * as Header2 from '../Header';
import { mapStateToDispatch } from '../HeaderContainer';

describe('HeaderComponent', () => {
  const fetchSearchResults = jest.fn(value1 => value1);
  const clearError = jest.fn();
  const state = {
    fetchSearchResults,
    clearError,
  };
  test('Header renders correctly', () => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);
    const result = ReactTestRender.create(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    expect(result).toMatchSnapshot();
  });

  describe('Header: test search', () => {
    let container;
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'root';
    });

    it('Header: search test - correctly', () => {
      jest.spyOn(Header2.default.propTypes, 'fetchSearchResults');
      act(() => {
        document.body.appendChild(container);
        ReactDOM.render(
          <Header2.default fetchSearchResults={fetchSearchResults} clearError={clearError} />,
          container,
        );
      });
      const node = container.querySelector('form');
      ReactTestUtils.Simulate.submit(node);
      expect(fetchSearchResults).toHaveBeenCalled();
    });

    it('Header: search test - correctly', () => {
      jest.spyOn(Header2.default.propTypes, 'clearError');
      act(() => {
        document.body.appendChild(container);
        ReactDOM.render(
          <Header2.default fetchSearchResults={fetchSearchResults} error clearError={clearError} />,
          container,
        );
      });
      const node = container.querySelector('form');
      ReactTestUtils.Simulate.submit(node);
      expect(clearError).toHaveBeenCalled();
    });
  });

  // test('Header: search test', () => {
  //   const props = {
  //     clearError,
  //     fetchSearchResults,
  //     error: true,
  //   };
  //   jest.spyOn(props, 'clearError');
  //   const input = React.createElement('input');
  //   const element = React.createElement('form', { onSubmit: Header2.default.search }, [input]);
  //   const node = ReactTestUtils.renderIntoDocument(element);
  //   ReactTestUtils.Simulate.submit(node);
  //   expect(clearError).toHaveBeenCalled();
  // });
});

const state = {
  fetchSearchResults: value => value,
  clearError: value => value,
};
test('descriptors', () => {
  const test = false;
  const keys = Object.keys(state);
  keys.forEach(async (curr) => {
    const dispatch = jest.fn(() => state[curr]);
    const result = await mapStateToDispatch(dispatch)[curr](test);
    expect(result(test)).toEqual(test);
  });
});
