import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import MovieItem from '../../components/MovieItem';
import MovieSelectors from '../../components/MovieSelectors';

import style from './MovieListContainer.scss';

class MovieListContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      movies,
      genres,
      getMainMovieDetails,
      fetchVideo,
      typeView,
      setTypeView,
      fetchListMovies,
      clearError,
    } = this.props;
    let list;
    if (movies.results.length > 0) {
      list = movies.results.map(curr => (
        <MovieItem
          curr={curr}
          genres={genres}
          movies={movies}
          fetchListMovies={fetchListMovies}
          fetchVideo={fetchVideo}
          getMainMovieDetails={getMainMovieDetails}
          typeView={typeView}
          key={shortid()}
          clearError={clearError}
        />
      ));
    }

    const html = (
      <section className={style.movieList}>
        <div className={style.container}>
          <MovieSelectors
            genres={genres}
            setTypeView={setTypeView}
            fetchListMovies={fetchListMovies}
            clearError={clearError}
          />
          <div className={style.moviesWrapper}>{list}</div>
        </div>
      </section>
    );
    return html;
  }
}

MovieListContainer.defaultProps = {
  movies: {},
  genres: [],
  typeView: 'cards',
};

MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  fetchListMovies: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
  typeView: PropTypes.string,
  setTypeView: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default MovieListContainer;
