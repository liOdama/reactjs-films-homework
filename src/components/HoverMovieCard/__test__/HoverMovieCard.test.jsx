import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import HoverMovieCard from '../index';
import style from '../HoverMovieCard.scss';

test('HoverMovieCard renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HoverMovieCard />);
  const result = renderer.render(<HoverMovieCard />);
  expect(result).toMatchSnapshot();
});

test('HoverMovieCard hover events render correctly', () => {
  const dataGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }];
    const showOverwie = jest.fn()
  const result = TestRenderer.create(<HoverMovieCard onClick={showOverwie} />);
  const testInstance = result.root;
  ReactTestUtils.Simulate.click(testInstance.findByProps({ id: 'showOverwie' }));
  // result.update();
  expect(result).toMatchSnapshot();
});

// test('HoverMovieCard return hover event correctly', () => {

//   const result = TestRenderer.create(
    
//   );
//   const testInstance = result.root;
//   const final = ReactTestUtils.Simulate.leave(testInstance.findByProps({ classname: style.hoverOverwie }));
//   expect(final).toMatchSnapshot();
// });
