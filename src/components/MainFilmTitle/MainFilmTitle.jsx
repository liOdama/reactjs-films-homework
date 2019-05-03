import React from 'react';
import style from './MainFilmTitle.scss';
import Star from '../Star/index';

const MainFilmTitle = () => (
  <div className={style.mainFilmTitle}>
    <h2 className={style.filmTitle}>THE JUNGLE BOOK</h2>
    <div className={style.genres}>
      <ul>
        <li>Adventure</li>
        <li>Drama</li>
        <li>Family</li>
        <li>Fantasy</li>
        <li>1h 46m</li>
      </ul>
    </div>
    <Star />
  </div>
);

export default MainFilmTitle;
