import React from 'react';
import shortid from 'shortid';
import selectGenre from '../../utils/selectGenre';

import HoverMovieCard from '../HoverMovieCard/HoverMovieCard';

import * as stylerate from '../Star/Star.scss';
import style from './ListMovies.scss';


const changeMainFilm = (props, e) => {
  e.preventDefault();
  // Change mainFilmOverwie height
  document.querySelector('#mainFilmOverwie').style.maxHeight = '10rem';

  const name = e.currentTarget.textContent;
  const { changeMainMovie, results } = props;
  let newMainFilm;
  results.some((curr) => {
    if (curr.title === name) {
      newMainFilm = curr;
      return true;
    }
    return false;
  });
  return changeMainMovie(newMainFilm);
};

const ListMovies = (props) => {
  const { results, genres } = props;
  if (results.length > 0) {
    return results.map((curr) => {
      const imageLink = `https://image.tmdb.org/t/p/w300/${curr.poster_path}`;
      const imgAlt = curr.title;
      const genresRow = curr.genre_ids.map((c) => {
        let currentGenre;
        genres.some((a) => {
          if (c === a.id) { currentGenre = a.name; return true; }
          return false;
        });
        return currentGenre;
      }).join(', 1').split('1').map(cur => (
        <li key={shortid.generate()}>
          <span role="button" onClick={selectGenre.bind({ props })}>{ cur}</span>
        </li>
      ));

      return (
        <article
          className={style.movieContainer}
          key={shortid.generate()}
        >
          <figure>
            <div>
              <img src={imageLink} alt={imgAlt} />
            </div>
            <figcaption>
              <div className={style.movieTitle}>
                <a href="#" id="movieTitle" onClick={changeMainFilm.bind(null, props)}>{curr.title}</a>
                <span className={stylerate.rate}>{curr.vote_average}</span>
              </div>
              <div className={style.movieGenres}>
                <ul>
                  {genresRow}
                </ul>
              </div>
            </figcaption>
          </figure>
          <HoverMovieCard
            overview={curr.overview}
            genres={genresRow}
            title={curr.title}
            rate={curr.vote_average}
          />
        </article>
      );
    });
  }
  return <h2>Ooops</h2>;
};

export default ListMovies;

export { changeMainFilm };
