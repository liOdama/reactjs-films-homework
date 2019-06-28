import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';
import Header from '../../components/Header/index';
import ModalPlayer from '../../components/ModalPlayer/index';

import requestsFilms from '../../utils/requests';
import fetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import checkTypeView from '../../modules/TypeView/TypeViewSelectors';
import clearError from '../../modules/Error/errorAction';
import clearCurrentMovie from '../../modules/root/clearCurrentMovieAction';

import style from './MovieDetailsPage.scss';

class MovieDetailsPage extends Component {
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
    const { genres, getMainMovieDetails, fetchGenres } = this.props;
    const { path } = this.state;
    if (genres.length === 0) {
      fetchGenres();
    }
    getMainMovieDetails(path.replace('/films/', ''));
  }

  shouldComponentUpdate(nextProps) {
    const { movies, mainMovie } = this.props;

    if (
      JSON.stringify(nextProps.movies) === JSON.stringify(movies)
      && JSON.stringify(nextProps.mainMovie) === JSON.stringify(mainMovie)
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { getMainMovieDetails, match } = this.props;
    const { loading, path } = this.state;

    if (match.url !== prevState.path) {
      if (loading === true) {
        return getMainMovieDetails(path.replace('/films/'), '');
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
      genres,
      fetchListMovies,
      mainMovie,
      history,
      match,
      clearError,
      error,
      fetchSearchResults,
      movies,
    } = this.props;
    const { loading } = this.state;
    const styleBG = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const component = (
      <div className={style.wrapper}>
        <Header
          fetchSearchResults={fetchSearchResults}
          clearError={clearError}
          match={match}
          history={history}
          error={error}
          movies
        />
        <main>
          <section className={style.movieDetailsPageContainer} style={styleBG} id={mainMovie.id}>
            <div className={style.mainfilmInfo}>
              <div className={style.container}>
                <MainfilmTitle
                  mainMovie={mainMovie}
                  genres={genres}
                  fetchListMovies={fetchListMovies}
                  history={history}
                  match={match}
                />
                <MainFilmInfo overview={mainMovie.overview} />
              </div>
            </div>
          </section>
          {movies.currentVideo !== null ? (
            <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
          ) : null}
        </main>
      </div>
    );

    const preloader = (
      <main>
        <div className={style.preloader}>
          <p>App is loading</p>
        </div>
      </main>
    );
    // return component;
    if (loading === false) {
      return component;
    }
    return preloader;
  }
}

MovieDetailsPage.defaultProps = {
  genres: [],
  history: {},
  match: {},
  error: '',
  clearCurrentMovie,
  fetchListMovies: requestsFilms.fetchListMovies,
  fetchGenres,
  fetchSearchResults: requestsFilms.fetchSearchResults,
  clearError,
  getMainMovieDetails: requestsFilms.setTypeView,
};

MovieDetailsPage.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  getMainMovieDetails: PropTypes.func,
  fetchListMovies: PropTypes.func,
  fetchGenres: PropTypes.func,
  clearError: PropTypes.func,
  fetchSearchResults: PropTypes.func,
  clearCurrentMovie: PropTypes.func,
  error: PropTypes.string,
};

export default MovieDetailsPage;
