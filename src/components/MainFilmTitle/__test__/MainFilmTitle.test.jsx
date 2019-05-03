import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MainFilmTitle from '../index';

test('MainFilmTitle renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MainFilmTitle />);
  const result = renderer.render(<MainFilmTitle />);
  expect(result).toMatchSnapshot();
});
