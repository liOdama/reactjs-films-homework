import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import MovieItem from '../../components/MovieItem';
import MovieSelectors from '../../components/MovieSelectors';
import Header from '../../components/Header/index';
import ModalPlayer from '../../components/ModalPlayer/index';

import style from './MovieListContainer.scss';

class MovieListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      path: '',
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const { match } = nextProps;
    const { path } = nextState;
    if (match.url !== path) {
      return {
        loading: true,
        path: match.url,
      };
    }
    return {
      loading: false,
      path: match.url,
    };
  }

  componentDidMount() {
    const { loading, path } = this.state;
    const {
      genres, match, fetchGenres, fetchListMovies, fetchSearchResults,
    } = this.props;
    switch (loading) {
      case match.url.includes('search'):
        fetchGenres();
        return fetchSearchResults(path.replace('/search/', ''));
      case genres.length === 0:
        fetchGenres();
        return fetchListMovies(path);

      default:
        return fetchListMovies(path);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const { loading, path } = this.state;
    const {
      genres, match, fetchGenres, fetchListMovies, fetchSearchResults,
    } = this.props;
    if (match.url !== prevState.path) {
      switch (loading) {
        case match.url.includes('search'):
          return fetchSearchResults(path.replace('/search/', ''));
        case genres.length === 0:
          fetchGenres();
          return fetchListMovies(path);

        default:
          return fetchListMovies(path, match.params.id);
      }
    }
    return false;
  }

  unmount = (e) => {
    if (e.type === 'click' || e.key === 'Escape') {
      const { clearCurrentMovie } = this.props;
      clearCurrentMovie();
    }
  };

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
      match,
      history,
      fetchSearchResults,
      error,
    } = this.props;
    const { loading } = this.state;
    let list;

    const preloader = (
      <main>
        <div className={style.preloader}>
          <p>App is loading</p>
        </div>
      </main>
    );
    if (loading) {
      return preloader;
    }
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
          match={match}
          history={history}
        />
      ));
    }

    const html = (
      <div className={style.wrapper}>
        <Header
          fetchSearchResults={fetchSearchResults}
          clearError={clearError}
          match={match}
          history={history}
          error={error}
        />
        <main>
          <section className={style.movieList}>
            <div className={style.container}>
              <MovieSelectors genres={genres} setTypeView={setTypeView} clearError={clearError} />
              <div className={style.moviesWrapper}>{list}</div>
            </div>
          </section>
          {movies.currentVideo !== null ? (
            <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
          ) : null}
        </main>
      </div>
    );
    return html;
  }
}

MovieListContainer.defaultProps = {
  movies: {},
  genres: [],
  typeView: 'cards',
  match: {},
  error: '',
  history: {},
};

MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  typeView: PropTypes.string,
  error: PropTypes.string,
  clearCurrentMovie: PropTypes.func.isRequired,
  fetchListMovies: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  setTypeView: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
};

export default MovieListContainer;
