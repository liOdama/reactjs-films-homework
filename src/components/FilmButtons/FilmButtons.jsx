import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestsFilms from '../../utils/requests';
import style from './FilmButtons.scss';
import { showModal } from '../ModalPlayer/ModalPlayer';


export const showMainFilmOverwie = () => {
  document.querySelector('#mainFilmOverwie').style.maxHeight = '100%';
};

const FilmButtons = props => (
  <div className={style.btnContainer}>
    <button id="watch" type="button" className={style.watch} onClick={showModal.bind(null, props)}>Watch Now</button>
    <button id="info" type="button" className={style.viewInfo} onClick={showMainFilmOverwie}>View Info</button>
  </div>
);
const mapStateToProps = state => state;

const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
});


FilmButtons.propTypes = {
  fetchVideo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapStateToDispatch)(FilmButtons);
