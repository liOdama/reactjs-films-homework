import React from 'react';
import PropTypes from 'prop-types';
import style from './MainFilmTitle.scss';
import Star from '../Star/index';
import selectGenre, { keydonwGenres } from '../../utils/selectGenre';

export const shooseGenre = (genres, element) => {
  let current;
  genres.some((a) => {
    if (element.id === a.id) {
      current = a.name;
      return true;
    }
    return false;
  });
  return { name: current, id: element.id };
};

export const createMoviesGenreList = (arr, genres, props) => {
  if (arr === undefined) {
    return [];
  }
  const runTime = (time) => {
    if (time % 60 === 0) {
      return `${time / 2}h`;
    }
    const hour = Math.floor(time / 60);
    const minutes = time - hour * 60;
    return `${hour}h ${minutes}m`;
  };
  const runtimeMovie = props.mainMovie.runtime;

  const listItems = arr.map((c) => {
    const currentGenre = shooseGenre(genres, c);
    return (
      <li key={`key-${currentGenre}`}>
        <button
          type="button"
          onClick={selectGenre.bind(null, props)}
          onKeyDown={keydonwGenres.bind(null, props)}
          value={currentGenre.id}
        >
          {currentGenre.name}
        </button>
      </li>
    );
  });
  listItems.push(
    <li key="key-runtime">
      <span id="runtime">{runTime(runtimeMovie)}</span>
    </li>,
  );
  return listItems;
};

const MainFilmTitle = (props) => {
  const { mainMovie, genres } = props;
  return (
    <div className={style.mainFilmTitle}>
      <h2 className={style.filmTitle}>{mainMovie.title}</h2>
      <div className={style.genres}>
        <ul>{createMoviesGenreList(mainMovie.genres, genres, props)}</ul>
      </div>
      <Star rate={mainMovie.vote_average} />
    </div>
  );
};

MainFilmTitle.propTypes = {
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainFilmTitle;
