import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import HoverMovieCard from '../index';

test('HoverMovieCard renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HoverMovieCard />);
  const result = renderer.render(<HoverMovieCard />);
  expect(result).toMatchSnapshot();
});

test('HoverMovieCard hover events render correctly', () => {
  const showOverwie = jest.fn();
  const result = TestRenderer.create(<HoverMovieCard onClick={showOverwie} />);
  const testInstance = result.root;
  ReactTestUtils.Simulate.click(testInstance.findByProps({ id: 'showOverwie' }));
  expect(result).toMatchSnapshot();
});

describe('hover events', () => {
  beforeEach(() => {
    const node = (
      <article>
        <figure />
        <HoverMovieCard />
      </article>
    );
    act(() => {
      ReactDOM.render(node, document.body);
    });
  });

  test('showOverwieHover', () => {
    const btn = document.querySelector('#showOverwie');
    ReactTestUtils.Simulate.click(btn);
    const option1 = document.querySelector('.hoverControlNone').classList;
    const option2 = document.querySelector('figure').classList;
    let result;
    if (
      option1.contains('hoverControlNone') === true &&
      option2.contains('figcaptionNone') === true
    ) {
      result = true;
    }
    expect(result).toBeTruthy();
  });

  test('Return Hover - with oncLick', () => {
    const btn = document.querySelector('#showOverwie');
    ReactTestUtils.Simulate.click(btn);
    const btn2 = document.querySelector('#closeHover');
    ReactTestUtils.Simulate.click(btn2);
    const option2 = document.querySelector('figure').classList;
    let result;
    if (option2.contains('figcaptionNone') === false) {
      result = true;
    }
    expect(result).toBeTruthy();
  });

  test('Return Hover - with mouseLeave', () => {
    const btn = document.querySelector('#showOverwie');
    ReactTestUtils.Simulate.click(btn);
    const btn2 = document.querySelector('.hoverOverwie');
    ReactTestUtils.Simulate.mouseLeave(btn2);
    const option2 = document.querySelector('figure').classList;
    let result;
    if (option2.contains('figcaptionNone') === false) {
      result = true;
    }
    expect(result).toBeTruthy();
  });
});
