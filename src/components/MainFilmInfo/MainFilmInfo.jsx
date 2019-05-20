import React from 'react';
import FilmButtons from '../FilmButtons';
import style from './MainFilmInfo.scss';

const MainFilmInfo = props => (
  <div>
    <div className={style.mainFilmInfo__info} id="mainFilmOverwie">
      <p>{props.overview}</p>
    </div>
    <FilmButtons className={style.mainFilmInfo__buttons} />
  </div>
);

export default MainFilmInfo;
