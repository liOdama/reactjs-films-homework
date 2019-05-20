import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import HoverMovieCard from '../index';

test('HoverMovieCard renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HoverMovieCard />);
  const result = renderer.render(<HoverMovieCard />);
  expect(result).toMatchSnapshot();
});
