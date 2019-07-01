import React from 'react';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import HoverMovieCard from '../index';

const hoverOverwieNone = jest.fn();
const hoverOverwieBlock = jest.fn();
test('HoverMovieCard renders correctly', () => {
  const result = TestRenderer.create(
    <HoverMovieCard hoverOverwieNone={hoverOverwieNone} hoverOverwieBlock={hoverOverwieBlock} />,
  );
  expect(result).toMatchSnapshot();
});

test('HoverMovieCard hover events render correctly', () => {
  const showOverwie = jest.fn();
  const result = TestRenderer.create(
    <HoverMovieCard
      onClick={showOverwie}
      fullOverwie
      hoverOverwieNone={hoverOverwieNone}
      hoverOverwieBlock={hoverOverwieBlock}
    />,
  );
  const testInstance = result.root;
  ReactTestUtils.Simulate.click(testInstance.findByProps({ id: 'showOverwie' }));
  expect(result).toMatchSnapshot();
});
