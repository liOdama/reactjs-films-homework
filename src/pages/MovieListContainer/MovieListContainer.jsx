import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ListMovies from '../../components/ListMovies';
import Header from '../../components/Header';
import MovieSelectors from '../../components/MovieSelectors';
import Footer from '../../components/Footer';
import style from '../../components/ListMovies/ListMovies.scss';

class MovieListContainer extends Component {
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

  shouldComponentUpdate(nextProps) {
    const { query } = nextProps;
    const { path, loading } = this.state;
    const { typeView, movies } = this.props;
    switch (true) {
      case nextProps.movies.currentVideo !== movies.currentVideo:
        return true;
      case nextProps.typeView !== typeView:
        return true;
      case query.url === path && !loading:
        return false;
      default:
        return true;
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

  render() {
    const { loading } = this.state;
    const {
      genres, setTypeView, fetchSearchResults, history,
    } = this.props;
    return (
      <Fragment>
        <div className={style.wrapper}>
          <Header fetchSearchResults={fetchSearchResults} history={history} />
          <main>
            <section className={style.movieList}>
              <div className={style.container}>
                <MovieSelectors genres={genres} setTypeView={setTypeView} history={history} />
                <div className={style.moviesWrapper}>
                  <ListMovies {...this.props} loading={loading} />
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </Fragment>
    );
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
