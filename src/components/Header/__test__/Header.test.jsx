import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestRender from 'react-test-renderer';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import Header from '../index';

describe('HeaderComponent', () => {
  const clearError = jest.fn();
  const state = {
    clearError,
    history: { push: jest.fn(), location: { path: '' } },
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
      jest.spyOn(state.history, 'push');
      act(() => {
        document.body.appendChild(container);
        ReactDOM.render(
          <Router>
            <Header {...state} />
          </Router>,
          container,
        );
      });
      const node = container.querySelector('form');
      ReactTestUtils.Simulate.submit(node);
      expect(state.history.push).toHaveBeenCalledTimes(1);
    });
  });
});
