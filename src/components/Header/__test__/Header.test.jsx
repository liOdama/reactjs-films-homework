import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';
import Header from '../index';
import { search } from '../Header';

describe('HeaderComponent', () => {
  test('Header renders correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Header />);
    const result = renderer.render(<Header />);
    expect(result).toMatchSnapshot();
  });

  test('Header: search test', () => {
    const value = 'test';
    const fetchSearchResults = jest.fn(value1 => value1);
    const props = {
      fetchSearchResults,
    };
    jest.spyOn(props, 'fetchSearchResults');
    const input = React.createElement('input', { value });
    const element = React.createElement('form', { onSubmit: search.bind(null, props) }, [input]);
    const node = ReactTestUtils.renderIntoDocument(element);
    ReactTestUtils.Simulate.submit(node);
    expect(fetchSearchResults).toHaveBeenCalled();
  });
});
