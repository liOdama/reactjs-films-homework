import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import selectGenre, { keydonwGenres } from '../../utils/selectGenre';

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
  const {
    results, genres, fetchVideo, movies,
  } = props;
  if (results.length > 0) {
    return results.map((curr) => {
      let imageLink;
      if (curr.poster_path === null) {
        imageLink = 'https://api.ballotpedia.org/v3/thumbnail/';
      } else {
        imageLink = `https://image.tmdb.org/t/p/w300/${curr.poster_path}`;
      }
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
          <button type="button" onClick={selectGenre.bind({ props })} onKeyDown={keydonwGenres.bind(null, { ...props })}>{ cur}</button>
        </li>
      ));

      return (
        <article
          className={style.movieContainer}
          key={shortid.generate()}
          id={curr.id}
        >
          <figure>
            <div>
              <img src={imageLink} alt={imgAlt} />
            </div>
            <figcaption>
              <div className={style.movieTitle}>
                <button
                  type="button"
                  href="#"
                  id="movieTitle"
                  onClick={changeMainFilm.bind(null, props)}
                  onKeyDown={keydonwGenres.bind(null, props)}
                  tabIndex="0"
                >
                  {curr.title}
                </button>
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
            fetchVideo={fetchVideo}
            movies={movies}

          />
        </article>
      );
    });
  }
  return <h2>Ooops</h2>;
};
ListMovies.defaultProps = {
  fetchVideo: alert,
  movies: {},
};

ListMovies.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchVideo: PropTypes.func,
  movies: PropTypes.objectOf(PropTypes.any),

};

export default ListMovies;

export { changeMainFilm };
