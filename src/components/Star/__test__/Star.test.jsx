import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Star from '../index';

test('Star renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Star />);
  const result = renderer.render(<Star />);
  expect(result).toMatchSnapshot();
});

test('Star renders correctly with rate - undefined', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Star rate={undefined} />);
  const result = renderer.render(<Star rate={undefined} />);
  expect(result).toMatchSnapshot();
});

test('Star Quantity', () => {
  const starQuantity = 5;
  const starElementsArray = Star.starQuantity(starQuantity);
  expect(starElementsArray.length).toBe(starQuantity);
});
