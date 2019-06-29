import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import HoverMovieCard from '../index';

test('HoverMovieCard renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HoverMovieCard />);
  const result = renderer.render(<HoverMovieCard />);
  expect(result).toMatchSnapshot();
});

test('HoverMovieCard hover events render correctly', () => {
  const showOverwie = jest.fn();
  const result = TestRenderer.create(<HoverMovieCard onClick={showOverwie} fullOverwie />);
  const testInstance = result.root;
  ReactTestUtils.Simulate.click(testInstance.findByProps({ id: 'showOverwie' }));
  expect(result).toMatchSnapshot();
});
