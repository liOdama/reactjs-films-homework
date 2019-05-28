import React from 'react';
import PropTypes from 'prop-types';


import style from './HoverMovieCard.scss';
import * as stylerate from '../Star/Star.scss';
import * as styleBtn from '../FilmButtons/FilmButtons.scss';


const showOverwie = (e) => {
  let element = e.target.parentElement;
  element.classList.add(style.hoverControlNone);
  element.nextSibling.classList.add(style.hoverOverwieBlock);
  while (element.localName !== 'article') {
    element = element.parentElement;
  }
  element.querySelector('figure').classList.add(style.figcaptionNone);
};

const returnHover = (e) => {
  const element = e.currentTarget;
  if (element.tagName === 'DIV') {
    element.classList.remove(style.hoverOverwieBlock);
    element.previousSibling.classList.remove(style.hoverControlNone);
  } else {
    element.parentElement.classList.remove(style.hoverOverwieBlock);
    element.parentElement.previousSibling.classList.remove(style.hoverControlNone);
  }
  document.querySelector(`.${style.figcaptionNone}`).classList.remove(style.figcaptionNone);
};

const hoverMovieCard = (props) => {
  const {
    genres, overview, title, rate,
  } = props;
  return (
    <div className={style.hoverMovie}>
      <div className={style.hoverControl}>
        <label htmlFor="playTrailer" id="playTrailer">
          <input type="button" className={style.playTrailer} name="playTrailer" />
                  Watch Now
        </label>
        <button type="button" className={style.showOverwie} id="showOverwie" onClick={showOverwie}>View Info</button>
      </div>
      <div className={style.hoverOverwie} onMouseLeave={returnHover}>
        <button type="button" className={style.hoverClose} onClick={returnHover}>&#9587;</button>
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
        <button type="button" className={styleBtn.watch} id="watch">Watch Now</button>
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
