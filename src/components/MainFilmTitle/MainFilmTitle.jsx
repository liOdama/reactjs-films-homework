import React from 'react';
import shortid from 'shortid';
import style from './MainFilmTitle.scss';
import Star from '../Star/index';
import selectGenre from '../../utils/selectGenre';


export const createMoviesGenreList = (arr, genres, props) => {
  if (arr === undefined) {
    return [];
  }
  return arr.map((c) => {
    let currentGenre;
    genres.some((a) => {
      if (c === a.id) { currentGenre = a.name; return true; }
      return false;
    });
    return <li key={shortid.generate()}><span>{currentGenre}</span></li>;
  });
};


const MainFilmTitle = (props) => {
  const { mainMovie, genres } = props;
  return (
    <div className={style.mainFilmTitle}>
      <h2 className={style.filmTitle}>{mainMovie.title}</h2>
      <div className={style.genres}>
        <ul onClick={selectGenre.bind(props)}>
          {createMoviesGenreList(mainMovie.genre_ids, genres, props)}
        </ul>
      </div>
      <Star rate={mainMovie.vote_average} />
    </div>
  );
};

export default MainFilmTitle;
