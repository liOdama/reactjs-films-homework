import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import style from './ModalPlayer.scss';
import requestsFilms from '../../utils/requests';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';


export const showModal = (props, e) => {
  let element = e.target;
  if (element.id === 'playTrailer' || element.id === 'watch') {
    while (element.localName !== 'article' && element.localName !== 'section') {
      element = element.parentElement;
    }
    const { fetchVideo } = props;
    fetchVideo(element.id);
  }
};

export const closeModal = (e) => {
  if (e.target.id !== 'trailer') {
    document.querySelector('#modal > div > div').classList.toggle(style.showModal);
  }
};

export const keyDownEsc = (e) => {
  if (e.key === 'Esc') {
    closeModal.call(e);
  }
};

class ModalPlayer extends Component {
  static unmount(props) {
    const { clearCurrentMovie } = props;
    clearCurrentMovie();
  }

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.querySelector('#modalRoot').appendChild(this.el);
  }


  static getDerivedStateFromProps(props) {
    const newState = {
      id: props.movies.currentVideo,
    };
    return newState;
  }


  render() {
    const { id } = this.state;
    const opts = {
      width: '70%',
      height: '80%',
      title: 'Trailer',
      origin: 'http://localhost:3000',
    };
    const component = (
      <div role="button" tabIndex="0" className={`${style.modalWrapper}`} onClick={ModalPlayer.unmount.bind(null, this.props)} onKeyDown={keyDownEsc}>
        <button type="button" className={style.modalClose}>&#9587;</button>
        <YouTube
          videoId={id}
          opts={opts}
          id="trailer"
          onReady={this.onReady}
        />
      </div>
    );
    return ReactDOM.createPortal(component, this.el);
  }
}


const mapStateToProps = state => state;

const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default()),
});
export default connect(mapStateToProps, mapStateToDispatch)(ModalPlayer);
