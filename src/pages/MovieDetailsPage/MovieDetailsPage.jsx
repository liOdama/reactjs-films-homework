import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';
import Header from '../../components/Header/index';
import ModalPlayer from '../../components/ModalPlayer/index';
import Preloader from '../../components/Preloader/index';

import style from './MovieDetailsPage.scss';

class MovieDetailsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      path: '',
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const {
      query, itemsIsLoading, error, clearError, history,
    } = nextProps;
    const { path } = nextState;
    if (error !== '') {
      clearError('');
      history.replace({ pathname: '/404', state: { error: '404' } });
      throw Error(error);
    }
    if (itemsIsLoading === true || query.url !== path) {
      return {
        loading: true,
        path: query.url,
      };
    }
    return {
      loading: false,
      path: query.url,
    };
  }

  componentDidMount() {
    const { genres, getMainMovieDetails, fetchGenres } = this.props;
    const { path } = this.state;
    if (genres.length === 0) {
      fetchGenres();
    }
    getMainMovieDetails(path);
  }

  componentDidUpdate(prevProps, prevState) {
    const { getMainMovieDetails, query } = this.props;
    const { loading, path } = this.state;

    if (query.url !== prevState.path) {
      if (loading === true) {
        return getMainMovieDetails(path);
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
      fetchSearchResults,
      movies,
      query,
    } = this.props;
    const { loading } = this.state;
    const imageLink = mainMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`
      : 'https://api.ballotpedia.org/v3/thumbnail/';
    const styleBG = {
      backgroundImage: `url(${imageLink})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const component = (
      <div className={style.wrapper}>
        <Header fetchSearchResults={fetchSearchResults} history={history} query={query} />
        <main>
          <section className={style.movieDetailsPageContainer} style={styleBG} id={mainMovie.id}>
            <div className={style.mainfilmInfo}>
              <div className={style.container}>
                <MainfilmTitle
                  mainMovie={mainMovie}
                  genres={genres}
                  fetchListMovies={fetchListMovies}
                  history={history}
                />
                <MainFilmInfo overview={mainMovie.overview} />
              </div>
            </div>
          </section>
          {movies.currentVideo !== null ? (
            <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
          ) : null}
        </main>
        {loading ? <Preloader /> : null}
      </div>
    );

    // return component;
    if (loading === false) {
      return component;
    }
    return <Preloader />;
  }
}

MovieDetailsPage.defaultProps = {
  genres: [],
  history: {},
  query: {},
};

MovieDetailsPage.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  query: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  getMainMovieDetails: PropTypes.func.isRequired,
  fetchListMovies: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  clearCurrentMovie: PropTypes.func.isRequired,
};

export default MovieDetailsPage;
