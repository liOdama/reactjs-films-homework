import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from '../index';
import { search } from '../Header';
import requestsFilms from '../../../utils/requests';

describe('HeaderComponent', () => {
  test('Header renders correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Header />);
    const result = renderer.render(<Header />);
    expect(result).toMatchSnapshot();
  });

  // test('Header: search test', () => {
  //   const props = {
  //     fetchSearchResults: requestsFilms.fetchSearchResults,
  //   };
  //   const input = React.createElement('input', { value: 'test' });
  //   const element = React.createElement('form', { onSubmit: search.bind(null, props) }, [input]);
    
  // });
})

