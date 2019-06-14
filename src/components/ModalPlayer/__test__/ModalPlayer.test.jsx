import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import ModalPlayer from '../index';
import * as Modal from '../ModalPlayer';

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

  describe('show and close', () => {
    let container;
    const fetchVideo = jest.fn();
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'modalRoot';
      document.body.appendChild(container);
    });

    
  it('Modal: unmount with click', () => {
    const clearCurrentMovie = jest.fn();
    const props = {
      clearCurrentMovie,
    };
    const click = {
      type: 'click',
    };
    const keyDown = {
      key: 'Escape',
    };
    const wrongTest = {
      type: 'leave',
    };
    jest.spyOn(ModalPlayer, 'unmount');
    ModalPlayer.WrappedComponent.unmount(props, click);
    ModalPlayer.WrappedComponent.unmount(props, keyDown);
    ModalPlayer.WrappedComponent.unmount(props, wrongTest);
    expect(clearCurrentMovie).toHaveBeenCalledTimes(2);
  });

    it('show with id watch', ()=> {
      const props = {fetchVideo};
      jest.spyOn(props, 'fetchVideo');
      const button = React.createElement('button', {onClick: Modal.showModal.bind(null, props), type:"button", id: 'watch'});
      const div = React.createElement('div', null, button);
      const template = React.createElement('section', null, div);
      act(() => {
        ReactDOM.render(template, container);
      });
      const node = container.querySelector('#watch');
      ReactTestUtils.Simulate.click(node);
      expect(fetchVideo).toHaveBeenCalled();
    });

    it('show with id playTrailer', ()=> {
      const props = {fetchVideo};
      jest.spyOn(props, 'fetchVideo');
      const button = React.createElement('button', {onClick: Modal.showModal.bind(null, props), type:"button", id: 'playTrailer'});
      const template = React.createElement('article', null, button);
      act(() => {
        ReactDOM.render(template, container);
      });
      const node = container.querySelector('#playTrailer');
      ReactTestUtils.Simulate.click(node);
      expect(fetchVideo).toHaveBeenCalled();
    });

      it('show with id test - result to be NULL', ()=> {
      const props = {fetchVideo};
      const e = {
        target: {
          id: 'test',
        }
      };
      const result = Modal.showModal(props, e);
      expect(result).toBeNull();
    });
  });

  describe('MapDispatchToProps', () => {
    const state1 = {
      fetchVideo: id => id,
      clearCurrentMovie: () => true,
    };

    it('test all descriptors',  ()=> {
      const keys = Object.keys(state1);
      keys.forEach(async (curr) => {
        const dispatch = jest.fn(() => state1[curr]);
        const result = await Modal.mapStateToDispatch(dispatch)[curr]();
        expect(result).toEqual(state1[curr]);
      });
    });
  });
});
