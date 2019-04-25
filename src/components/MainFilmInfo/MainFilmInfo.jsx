import React from 'react';
import FilmButtons from '../FilmButtons';
import style from './MainFilmInfo.scss';

const MainFilmInfo = () => (
  <div>
    <div className={style.mainFilmInfo__info}>
      <p>
  There are growing dangers in the wizarding world of 1926 New York.
      Something mysterious is leaving a path of destruction in the streets,
      threatening to expose the wizarding community to the Second Salemers,
      a fanatical faction of No-Majs (American for Muggles) bent on eradicating them.
        And the powerful, dark wizard Gellert Grindelwald, after wreaking havoc in Europe,
              has slipped away…and is now nowhere to be found.
      </p>
    </div>
    <FilmButtons className={style.mainFilmInfo__buttons} />
  </div>
);

export default MainFilmInfo;
