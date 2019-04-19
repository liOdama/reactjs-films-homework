import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Signature from '../signature';
import style from '../signature.scss';

test('Link renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Signature className={style.name} />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('h1');
});
