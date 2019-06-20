import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { ModalPlayer, showModal } from '../ModalPlayer';

describe('Modal Renders correctly', () => {
  ReactDOM.render(<div id="modalRoot" />, document.body);

  describe('show and close', () => {
    let container;
    const fetchVideo = jest.fn();
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'root';
      document.body.appendChild(container);
    });

    it('Modal: has a error', () => {
      const clearCurrentMovie = jest.fn();
      const props = {
        movies: { currentVideo: 'test' },
        error: true,
        clearCurrentMovie,
      };

      jest.spyOn(props, 'clearCurrentMovie');
      act(() => {
        ReactDOM.render(<ModalPlayer id="test" {...props} />, document.querySelector('#modalRoot'));
      });

      const node = document.querySelector('button');
      ReactTestUtils.Simulate.keyDown(node, { key: 'Enter' });
      expect(clearCurrentMovie).toHaveBeenCalledTimes(0);
    });

    it('show with id watch', () => {
      const props = { fetchVideo };
      jest.spyOn(props, 'fetchVideo');
      const button = React.createElement('button', {
        onClick: showModal.bind(null, props),
        type: 'button',
        id: 'watch',
      });
      const div = React.createElement('div', null, button);
      const template = React.createElement('section', null, div);
      act(() => {
        ReactDOM.render(template, container);
      });
      const node = container.querySelector('#watch');
      ReactTestUtils.Simulate.click(node);
      expect(fetchVideo).toHaveBeenCalled();
    });

    it('show with id playTrailer', () => {
      const props = { fetchVideo };
      jest.spyOn(props, 'fetchVideo');
      const button = React.createElement('button', {
        onClick: showModal.bind(null, props),
        type: 'button',
        id: 'playTrailer',
      });
      const template = React.createElement('article', null, button);
      act(() => {
        ReactDOM.render(template, container);
      });
      const node = container.querySelector('#playTrailer');
      ReactTestUtils.Simulate.click(node);
      expect(fetchVideo).toHaveBeenCalled();
    });
  });
});
