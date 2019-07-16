import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../../components/MovieItem';
import MovieSelectors from '../../components/MovieSelectors';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import ModalPlayer from '../../components/ModalPlayer/index';
import Preloader from '../../components/Preloader/index';

import style from './MovieListContainer.scss';

class MovieListContainer extends PureComponent {
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
    const { loading, path } = this.state;
    const {
      genres, query, fetchGenres, fetchListMovies, fetchSearchResults,
    } = this.props;
    switch (loading) {
      case query.search:
        fetchGenres();
        return fetchSearchResults(path);
      case genres.length === 0:
        fetchGenres();
        return fetchListMovies(path);

      default:
        return fetchListMovies(path);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { loading, path } = this.state;
    const {
      genres, query, fetchGenres, fetchListMovies, fetchSearchResults,
    } = this.props;
    if (query.url !== prevState.path) {
      switch (loading) {
        case query.search:
          return fetchSearchResults(path);
        case genres.length === 0:
          fetchGenres();
          return fetchListMovies(path);

        default:
          return fetchListMovies(path, query.url);
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
      history,
      fetchSearchResults,
    } = this.props;
    const { loading } = this.state;
    let list;

    // if (loading) {
    //   return <Preloader />;
    // }
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
          key={curr.id}
          history={history}
        />
      ));
    }

    const html = (
      <div className={style.wrapper}>
        <Header fetchSearchResults={fetchSearchResults} history={history} />
        <main>
          <section className={style.movieList}>
            <div className={style.container}>
              <MovieSelectors genres={genres} setTypeView={setTypeView} history={history} />
              <div className={style.moviesWrapper}>{list}</div>
            </div>
          </section>
          {movies.currentVideo !== null ? (
            <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
          ) : null}
        </main>
        <Footer />
        {loading ? <Preloader /> : null}
      </div>
    );
    return html;
  }
}

MovieListContainer.defaultProps = {
  movies: {},
  genres: [],
  typeView: 'cards',
  history: {},
  query: {},
};

MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  query: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  typeView: PropTypes.string,
  clearCurrentMovie: PropTypes.func.isRequired,
  fetchListMovies: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  setTypeView: PropTypes.func.isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
};

export default MovieListContainer;
