import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import YouTube from 'react-youtube';
import style from './ModalPlayer.scss';

export class ModalPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    const modalRoot = document.querySelector('#root');
    modalRoot.appendChild(this.el);
  }

  static getDerivedStateFromProps(props) {
    const newState = {
      id: props.id,
    };
    return newState;
  }

  // unmount = (e) => {
  //   if (e.type === 'click' || e.key === 'Escape') {
  //     const { clearCurrentMovie } = this.props;
  //     clearCurrentMovie();
  //   }
  // };

  render() {
    const { unmount } = this.props;
    document.body.addEventListener('keydown', unmount);
    const { id } = this.state;
    const opts = {
      width: '70%',
      height: '80%',
      title: 'Trailer',
      origin: 'http://localhost:3000',
    };
    const component = (
      <div
        role="button"
        tabIndex="0"
        className={`${style.modalWrapper}`}
        onClick={unmount}
        onKeyDown={unmount}
      >
        <button type="button" tabIndex="0" className={style.modalClose} id="closeModal">
          &#9587;
        </button>
        <YouTube videoId={id} opts={opts} id="trailer" onReady={this.onReady} />
      </div>
    );
    return ReactDOM.createPortal(component, this.el);
  }
}

ModalPlayer.propTypes = {
  unmount: PropTypes.func,
};

export const showModal = (props, e) => {
  const element = e.target;
  const { fetchVideo } = props;
  fetchVideo(element.id);
};

export default ModalPlayer;
