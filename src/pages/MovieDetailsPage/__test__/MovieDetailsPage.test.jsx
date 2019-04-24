import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MovieDetailsPage from '../index';


test('MovieDetailsPage renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MovieDetailsPage />);
  const result = renderer.render(<MovieDetailsPage />);
  expect(result).toMatchSnapshot();
});
