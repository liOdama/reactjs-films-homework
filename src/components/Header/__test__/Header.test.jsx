import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from '../index';

test('Header renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Header />);
  const result = renderer.render(<Header />);
  expect(result).toMatchSnapshot();
});
