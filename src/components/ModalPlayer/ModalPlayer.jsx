import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import style from './ModalPlayer.scss';
import requestsFilms from '../../utils/requests';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';

export class ModalPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    const modalRoot = document.getElementById('modalRoot');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    const { clearCurrentMovie } = this;
    if (clearCurrentMovie !== undefined) {
      clearCurrentMovie();
    }
  }

  static getDerivedStateFromProps(props) {
    const newState = {
      id: props.movies.currentVideo
    };
    return newState;
  }

  render() {
    document.body.addEventListener('keydown', this.componentWillUnmount.bind(this.props));
    const { id } = this.state;
    const opts = {
      width: '70%',
      height: '80%',
      title: 'Trailer',
      origin: 'http://localhost:3000'
    };
    const component = (
      <div
        role="button"
        tabIndex="0"
        className={`${style.modalWrapper}`}
        onClick={this.componentWillUnmount.bind(this.props)}
        onKeyDown={this.componentWillUnmount.bind(this.props)}
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

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default())
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(ModalPlayer);

export const showModal = (props, e) => {
  let element = e.target;
  if (element.id === 'playTrailer' || element.id === 'watch') {
    while (element.localName !== 'article' && element.localName !== 'section') {
      element = element.parentElement;
    }
    const { fetchVideo } = props;
    fetchVideo(element.id);
  }
  return null;
};
