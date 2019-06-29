import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import Header from '../index';

describe('HeaderComponent', () => {
  const fetchSearchResults = jest.fn(value1 => value1);
  const clearError = jest.fn();
  const state = {
    fetchSearchResults,
    clearError,
  };
  test('Header renders correctly', () => {
    const result = ReactTestRender.create(<Header {...state} />);
    expect(result).toMatchSnapshot();
  });

  describe('Header: test search', () => {
    let container;
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'root';
    });

    it('Header: search test - correctly', () => {
      jest.spyOn(Header.propTypes, 'fetchSearchResults');
      act(() => {
        document.body.appendChild(container);
        ReactDOM.render(
          <Header fetchSearchResults={fetchSearchResults} clearError={clearError} />,
          container,
        );
      });
      const node = container.querySelector('form');
      ReactTestUtils.Simulate.submit(node);
      expect(fetchSearchResults).toHaveBeenCalled();
    });

    it('Header: search test - correctly', () => {
      jest.spyOn(Header.propTypes, 'clearError');
      act(() => {
        document.body.appendChild(container);
        ReactDOM.render(
          <Header fetchSearchResults={fetchSearchResults} error clearError={clearError} />,
          container,
        );
      });
      const node = container.querySelector('form');
      ReactTestUtils.Simulate.submit(node);
      expect(clearError).toHaveBeenCalled();
    });
  });
});
