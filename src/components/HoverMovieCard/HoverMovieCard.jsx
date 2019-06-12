import React from 'react';
import PropTypes from 'prop-types';
import { showModal } from '../ModalPlayer/ModalPlayer';

import style from './HoverMovieCard.scss';
import * as stylerate from '../Star/Star.scss';
import * as styleBtn from '../FilmButtons/FilmButtons.scss';


export const showOverwie = (e) => {
  let element = e.target.parentElement;
  element.classList.add(style.hoverControlNone);
  element.nextSibling.classList.add(style.hoverOverwieBlock);
  while (element.localName !== 'article') {
    element = element.parentElement;
  }
  element.querySelector('figure').classList.add(style.figcaptionNone);
};

const returnHover = (e) => {
  let element = e.currentTarget;
  while (element.localName !== 'article') {
    element = element.parentElement;
  }
  element.querySelector(`.${style.hoverOverwieBlock}`).classList.remove(style.hoverOverwieBlock);
  element.querySelector(`.${style.hoverControlNone}`).classList.remove(style.hoverControlNone);
  element.querySelector('figure').classList.remove(style.figcaptionNone);
};

const hoverMovieCard = (props) => {
  const {
    genres, overview, title, rate,
  } = props;
  return (
    <div className={style.hoverMovie}>
      <div className={style.hoverControl}>
        <label
          htmlFor="playTrailer"
          id="playTrailer"
          onClick={showModal.bind(null, props)}
          onKeyDown={showModal.bind(null, props)}
        >
          <input
            type="button"
            className={style.playTrailer}
            name="playTrailer"
          />
                  Watch Now
        </label>
        <button type="button" className={style.showOverwie} id="showOverwie" onClick={showOverwie}>View Info</button>
      </div>
      <div className={style.hoverOverwie} onMouseLeave={returnHover}>
        <button type="button" id="closeHover" className={style.hoverClose} onClick={returnHover}>&#9587;</button>
        <div className={style.hoverOverwieTitle}>
          <div className={style.hoverOverwieTitleItem}>
            <h3>{title}</h3>
            <ul>
              {genres}
            </ul>
          </div>
          <div className={style.hoverOverwieTitleItem}>
            <p className={stylerate.rate}>{rate}</p>
          </div>
        </div>
        <p>{overview}</p>
        <button
          type="button"
          className={styleBtn.watch}
          id="watch"
          onClick={showModal.bind(null, props)}
          onKeyDown={showModal.bind(null, props)}
        >
          Watch Now

        </button>
      </div>
    </div>
  );
};

hoverMovieCard.defaultProps = {
  genres: [],
  title: '',
  overview: '',
  rate: 0,
};

hoverMovieCard.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  overview: PropTypes.string,
  rate: PropTypes.number,
};

export default hoverMovieCard;
