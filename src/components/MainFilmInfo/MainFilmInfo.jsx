import React from 'react';
import PropTypes from 'prop-types';
import FilmButtons from '../FilmButtons';
import style from './MainFilmInfo.scss';

const MainFilmInfo = (props) => {
  const { overview } = props;
  return (
    <div>
      <div className={style.mainFilmInfo__info} id="mainFilmOverwie">
        <p>{overview}</p>
      </div>
      <FilmButtons className={style.mainFilmInfo__buttons} />
    </div>
  );
};

MainFilmInfo.defaultProps = {
  overview: '',
};

MainFilmInfo.propTypes = {
  overview: PropTypes.string,
};

export default MainFilmInfo;
