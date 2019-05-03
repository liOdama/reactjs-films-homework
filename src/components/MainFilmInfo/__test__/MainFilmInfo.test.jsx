import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MainFilmInfo from '../index';

test('MainFilmInfo renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MainFilmInfo />);
  const result = renderer.render(<MainFilmInfo />);
  expect(result).toMatchSnapshot();
});
