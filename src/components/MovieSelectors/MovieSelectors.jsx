import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import selectGenre from '../../utils/selectGenre';
import style from '../../pages/MovieListContainer/MovieListContainer.scss';

class MovieSelectors extends React.Component {
  shooseTypeView = (e) => {
    const { setTypeView } = this.props;
    const typeName = e.target.id;
    if (typeName === 'cards') {
      return setTypeView('cards');
    }
    return setTypeView('lines');
  };

  render() {
    const { genres } = this.props;
    return (
      <div className={style.moviesSelector}>
        <nav>
          <ul>
            <li>
              <Link to={{ pathname: '/list/trending', replace: true }}>
                <button type="button" href="#">
                  Trending
                </button>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/list/top_rated', replace: true }}>
                <button type="button" href="#">
                  Top Rated
                </button>
              </Link>
            </li>
            <li>
              <Link replace to={{ pathname: '/list/coming_soon', replace: true }}>
                <button type="button" href="#">
                  Coming Soon
                </button>
              </Link>
            </li>
            <li>
              <select name="genre" id="" onChange={selectGenre.bind(this, this.props)}>
                <option value="">Genre</option>
                {genres.map((c) => {
                  const key = shortid.generate();
                  const { name } = c;
                  return <option key={key}>{name}</option>;
                })}
              </select>
            </li>
          </ul>
        </nav>
        <div className={style.typeView}>
          <button type="button" id="cards" onClick={this.shooseTypeView}>
            &#9871;
          </button>
          <button type="button" id="lines" onClick={this.shooseTypeView}>
            &#9868;
          </button>
        </div>
      </div>
    );
  }
}

MovieSelectors.defaultProps = {
  genres: [],
};

MovieSelectors.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.any),
  setTypeView: PropTypes.func.isRequired,
};

export default MovieSelectors;
