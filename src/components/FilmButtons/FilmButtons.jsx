import React from 'react';
import style from './FilmButtons.scss';

export const showMainFilmOverwie = () => {
  document.querySelector('#mainFilmOverwie').style.maxHeight = '100%';
}

const FilmButtons = () => (
  <div className={style.btnContainer}>
    <button id="watch" type="button" className={style.watch}>Watch Now</button>
    <button id="info" type="button" className={style.viewInfo} onClick={showMainFilmOverwie}>View Info</button>
  </div>
);

export default FilmButtons;
