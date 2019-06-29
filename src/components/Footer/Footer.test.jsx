import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Footer from './Footer';

describe('Footer', () => {
  it('Footer: renders correctly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Footer />);
    expect(result).toMatchSnapshot();
  });
});
