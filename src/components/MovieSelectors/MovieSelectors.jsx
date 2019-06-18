import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import selectGenre from '../../utils/selectGenre';
import style from '../../pages/MovieListContainer/MovieListContainer.scss';

export const createGenreList = genres =>
  genres.map(c => <option key={shortid.generate()}>{c.name}</option>);

// const getQueryForListMovies = (props, e) => {
//   const { fetchListMovies } = props;
//   const query = e.target.textContent;
//   return fetchListMovies(query);
// };

export const showTrends = (props, e) => {
  const query = e.target.textContent;
  const { fetchListMovies, error, clearError } = props;
  if (error !== undefined && error !== false) {
    clearError(false);
  }
  return fetchListMovies(query);
};

export const shooseTypeView = (action, e) => {
  const typeName = e.target.id;
  document.querySelector(`.${style.moviesWrapper}`).classList.toggle(style.typeViewLines);
  document.querySelectorAll(`article`).forEach(curr => {
    curr.classList.toggle(style.width100);
  });

  if (typeName === 'cards') {
    return action('cards');
  }
  return action('lines');
};

const MovieSelectors = props => {
  const { genres, setTypeView } = props;
  return (
    <div className={style.moviesSelector}>
      <nav>
        <ul>
          <li>
            <button type="button" href="#" onClick={showTrends.bind(null, props)}>
              Trending
            </button>
          </li>
          <li>
            <button type="button" href="#" onClick={showTrends.bind(null, props)}>
              Top Rated
            </button>
          </li>
          <li>
            <button type="button" href="#" onClick={showTrends.bind(null, props)}>
              Coming Soon
            </button>
          </li>
          <li>
            <select name="genre" id="" onChange={selectGenre.bind(this, props)}>
              <option value="">Genre</option>
              {createGenreList(genres)}
            </select>
          </li>
        </ul>
      </nav>
      <div className={style.typeView}>
        <button type="button" id="cards" onClick={shooseTypeView.bind(null, setTypeView)}>
          &#9871;
        </button>
        <button type="button" id="lines" onClick={shooseTypeView.bind(null, setTypeView)}>
          &#9868;
        </button>
      </div>
    </div>
  );
};

MovieSelectors.propTypes = {
  genres: []
};

MovieSelectors.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTypeView: PropTypes.func.isRequired
};

export default MovieSelectors;
