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
    const modalRoot = document.getElementById('modalRoot');
    modalRoot.appendChild(this.el);
  }

  static getDerivedStateFromProps(props) {
    const newState = {
      id: props.movies.currentVideo,
    };
    return newState;
  }

  unmount = (e) => {
    if (e.type === 'click' || e.key === 'Escape') {
      const { clearCurrentMovie } = this.props;
      clearCurrentMovie();
    }
  };

  render() {
    document.body.addEventListener('keydown', this.unmount);
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
        onClick={this.unmount}
        onKeyDown={this.unmount}
      >
        <button type="button" tabIndex="0" className={style.modalClose}>
          &#9587;
        </button>
        <YouTube videoId={id} opts={opts} id="trailer" onReady={this.onReady} />
      </div>
    );
    return ReactDOM.createPortal(component, this.el);
  }
}

ModalPlayer.propTypes = {
  clearCurrentMovie: PropTypes.func.isRequired,
};

export const showModal = (props, e) => {
  const element = e.target;
  const { fetchVideo } = props;
  fetchVideo(element.id);
};

export default ModalPlayer;
