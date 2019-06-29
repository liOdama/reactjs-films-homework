import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/index';
import MovieListContainer from '../MovieListContainer/index';

import Footer from '../../components/Footer/index';

import MovieDetailsPage from '../MovieDetailsPage/index';
import ModalPlayer from '../../components/ModalPlayer/index';
import style from '../../common.scss';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getDerivedStateFromProps(nextProps) {
    const { genres } = nextProps;
    if (genres.length === 0) {
      const { fetchGenres, fetchListMovies } = nextProps;
      await fetchGenres();
      const state = await fetchListMovies('Trending');
      return state;
    }
    return nextProps;
  }

  unmount = (e) => {
    if (e.type === 'click' || e.key === 'Escape') {
      const { clearCurrentMovie } = this.props;
      clearCurrentMovie();
    }
  };

  render() {
    const {
      movies, clearError, error, fetchSearchResults,
    } = this.props;
    return (
      <div className={style.wrapper}>
        <Header fetchSearchResults={fetchSearchResults} clearError={clearError} error={error} />
        <main>
          <MovieDetailsPage />
          <MovieListContainer />
        </main>
        <Footer />
        {movies.currentVideo !== null ? (
          <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
        ) : null}
      </div>
    );
  }
}

AppContainer.defaultProps = {
  error: '',
};

AppContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  clearCurrentMovie: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AppContainer;
