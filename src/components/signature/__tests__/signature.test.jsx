import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Signature from '../signature';

test('Signature renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Signature />);
  const result = renderer.render(<Signature />);
  expect(result).toMatchSnapshot();
});
