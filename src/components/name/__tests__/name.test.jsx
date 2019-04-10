import React from 'react';
import renderer from 'react-test-renderer';
import ShowName from '../name.jsx';
import style from '../name.scss';

test('Link renders correctly', () => {
  const tree = renderer
    .create(<ShowName className={style.name} name="Roman Bychkou" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
