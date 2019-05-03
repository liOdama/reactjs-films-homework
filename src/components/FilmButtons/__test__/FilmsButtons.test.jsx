import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FilmButtons from '../index';
import style from '../FilmButtons.scss';

test('Signature renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FilmButtons className={style.name} />);
  const result = renderer.render(<FilmButtons className={style.name} />);
  expect(result).toMatchSnapshot();
});
