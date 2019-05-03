import React from 'react';
import style from './FilmButtons.scss';

const FilmButtons = () => (
  <div className={style.btnContainer}>
    <button id="watch" type="button" className={style.watch}>Watch Now</button>
    <button id="info" type="button" className={style.viewInfo}>View Info</button>
  </div>
);

export default FilmButtons;
