import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import MovieDetailsPage from '../index';


//* ****************************************************************************
describe('MovieDetailsPage renders correctly', () => {
  const renderer = new ShallowRenderer();
  const initialState = { page: 1, results: [], genres: [] };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const container = renderer.render(<MovieDetailsPage store={store} />);
  const result = renderer.getRenderOutput();
  it('+++ render the connected(SMART) component', () => {
    expect(container).toMatchSnapshot();
  });
});
