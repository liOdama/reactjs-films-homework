import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import selectGenre from '../../utils/selectGenre';
import style from '../../pages/MovieListContainer/MovieListContainer.scss';

export const createGenreList = (genres) => {
  const elements = genres.map((c) => {
    const key = shortid.generate();
    const { name } = c;
    return <option key={key}>{name}</option>;
  });
  return elements;
};

class MovieSelectors extends React.Component {
  shooseTypeView = (e) => {
    const { setTypeView } = this.props;
    const typeName = e.target.id;
    if (typeName === 'cards') {
      return setTypeView('cards');
    }
    return setTypeView('lines');
  };

  showTrends = () => {
    const { error, clearError } = this.props;
    if (error !== undefined && error !== '') {
      clearError('');
    }
  };

  render() {
    const { genres } = this.props;
    return (
      <div className={style.moviesSelector}>
        <nav>
          <ul>
            <li>
              <Link to={{ pathname: '/trending', replace: true }}>
                <button type="button" href="#" onClick={this.showTrends}>
                  Trending
                </button>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/top_rated', replace: true }}>
                <button type="button" href="#" onClick={this.showTrends}>
                  Top Rated
                </button>
              </Link>
            </li>
            <li>
              <Link replace to={{ pathname: '/coming_soon', replace: true }}>
                <button type="button" href="#" onClick={this.showTrends}>
                  Coming Soon
                </button>
              </Link>
            </li>
            <li>
              <select name="genre" id="" onChange={selectGenre.bind(this, this.props)}>
                <option value="">Genre</option>
                {createGenreList(genres)}
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
  error: '',
};

MovieSelectors.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.any),
  setTypeView: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default withRouter(MovieSelectors);
