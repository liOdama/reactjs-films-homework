import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import selectGenre from '../../utils/selectGenre';
import style from '../../pages/MovieListContainer/MovieListContainer.scss';

export const createGenreList = genres =>
  genres.map(c => <option key={shortid.generate()}>{c.name}</option>);

export const showTrends = (props, e) => {
  const action = e.target.textContent;
  const { fetchPopular, getTopRated, fetchComingSoon, error, clearError } = props;
  if (error !== undefined && error !== false) {
    clearError(false);
  }
  switch (action) {
    case 'Trending':
      return fetchPopular();
    case 'Top Rated':
      return getTopRated();
    case 'Coming Soon':
      return fetchComingSoon();
    default:
      return null;
  }
};

const MovieSelectors = props => {
  const { genres } = props;
  return (
    <div className={style.moviesSelector}>
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
    </div>
  );
};

MovieSelectors.propTypes = {
  genres: []
};

MovieSelectors.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default MovieSelectors;
