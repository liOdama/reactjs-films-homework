import React from 'react';
import PropTypes from 'prop-types';
import { showModal } from '../ModalPlayer/ModalPlayer';

import style from './HoverMovieCard.scss';
import * as stylerate from '../Star/Star.scss';
import * as styleBtn from '../FilmButtons/FilmButtons.scss';

const hoverMovieCard = (props) => {
  const {
    genres,
    overview,
    title,
    rate,
    id,
    hoverOverwieBlock,
    fullOverwie,
    hoverOverwieNone,
  } = props;
  let classNamesHover;
  let classNameControl;

  if (fullOverwie === true) {
    classNamesHover = style.hoverOverwieBlock;
    classNameControl = style.hoverControlNone;
  } else {
    classNamesHover = style.hoverOverwieNone;
    classNameControl = style.hoverControlBlock;
  }
  return (
    <div className={style.hoverMovie}>
      <div className={classNameControl}>
        <label
          htmlFor="playTrailer"
          id={id}
          onClick={showModal.bind(null, props)}
          onKeyDown={showModal.bind(null, props)}
        >
          <input type="button" className={style.playTrailer} name="playTrailer" />
          Watch Now
        </label>
        <button
          type="button"
          className={style.showOverwie}
          id="showOverwie"
          onClick={hoverOverwieBlock}
        >
          View Info
        </button>
      </div>
      <div className={`${style.hoverOverwie} ${classNamesHover}`}>
        <button
          type="button"
          id="closeHover"
          className={style.hoverClose}
          onClick={hoverOverwieNone}
        >
          &#9587;
        </button>
        <div className={style.hoverOverwieTitle}>
          <div className={style.hoverOverwieTitleItem}>
            <h3>{title}</h3>
            <ul>{genres}</ul>
          </div>
          <div className={style.hoverOverwieTitleItem}>
            <p className={stylerate.rate}>{rate}</p>
          </div>
        </div>
        <p>{overview}</p>
        <button
          type="button"
          className={styleBtn.watch}
          id={id}
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
  fullOverwie: false,
};

hoverMovieCard.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  overview: PropTypes.string,
  rate: PropTypes.number,
  id: PropTypes.number.isRequired,
  hoverOverwieBlock: PropTypes.func.isRequired,
  fullOverwie: PropTypes.bool,
  hoverOverwieNone: PropTypes.func.isRequired,
};

export default hoverMovieCard;
