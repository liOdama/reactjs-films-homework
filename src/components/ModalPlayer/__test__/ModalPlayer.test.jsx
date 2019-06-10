import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import ReactTestRender from 'react-test-renderer';
import ModalPlayer from '../index';
import MovieDetailsPage from '../../../pages/MovieDetailsPage';
import style from '../ModalPlayer.scss';
import * as Modal from '../ModalPlayer';


// const { JSDOM } = require('jsdom');
// const document = new JSDOM('<html><head></head><body></body></html>').window.document;

// const window = document.createWindow();

describe('Modal Renders correctly', () => {
  const mockStore = configureMockStore();
  const state = {
    fetchVideo: jest.fn(id => ({ test: id })),
    clearCurrentMovie: jest.fn(),
    movies:
    { currentVideo: 222 },
  };
  const store = mockStore(state);
  it('modal renders correctly', () => {
    let container;
    ReactDOM.render(<div id="modalRoot" />, document.body);
    act(()=> {
      container = ReactDOM.render(<Provider store={store}><ModalPlayer /></Provider>, document.querySelector('#modalRoot'));
    });
    
    expect(container).toMatchSnapshot();
  });

  it('Modal: unmount', () => {
    const clearCurrentMovie = jest.fn();
    const props = {
      clearCurrentMovie,
    };
    jest.spyOn(ModalPlayer, 'unmount');
    ModalPlayer.WrappedComponent.unmount(props);
    expect(clearCurrentMovie).toHaveBeenCalled();
  });

  describe('show and close', () => {
    let container;
    const fetchVideo = jest.fn();
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'modalRoot';
      document.body.appendChild(container);
    });


    it('show', ()=> {
      

      const props = {fetchVideo};
      jest.spyOn(props, 'fetchVideo');
      const button = React.createElement('button', {onClick: Modal.showModal.bind(null, props), type:"button", id: 'watch'});
      const template = React.createElement('article', null, button);
      act(() => {
        ReactDOM.render(template, container);
      });
      const node = container.querySelector('#watch');
      ReactTestUtils.Simulate.click(node);
      expect(fetchVideo).toHaveBeenCalled();
    });

    // it('keyDown', ()=> {
    //   const showModal = jest.fn();
    //   const obj = {
    //     showModal,
    //   };
    //   const spy = jest.spyOn(obj, 'showModal');
    //   const button = <button type="button" id="button" onKeyDown={Modal.keyDownEsc}>test</button>;
    //   const node = ReactTestUtils.renderIntoDocument(button);
    //   ReactTestUtils.Simulate.keyDown(node, {key: 'Esc', target: {id:'test'}});
    //   expect(showModal).toHaveBeenCalled();
    // });
  });
});
