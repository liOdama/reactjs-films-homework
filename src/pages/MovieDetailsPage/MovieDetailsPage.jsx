import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';
import ModalPlayer from '../../components/ModalPlayer/ModalPlayer';

import style from './MovieDetailsPage.scss';
import requestsFilms from '../../utils/requests';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';

class MovieDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const { movies, mainMovie } = this.props;

    if (
      JSON.stringify(nextProps.movies) === JSON.stringify(movies) &&
      JSON.stringify(nextProps.mainMovie) === JSON.stringify(mainMovie)
    ) {
      return false;
    }
    return true;
  }

  static async getDerivedStateFromProps(nextProps) {
    const { genres } = nextProps;
    if (genres.length === 0) {
      const { fetchGenres, fetchListMovies } = nextProps;
      localStorage.clear();
      await fetchGenres();
      const state = await fetchListMovies('Trending');
      return state;
    }
    return nextProps;
  }

  componentDidUpdate(prevProps) {
    const { movies, getMainMovieDetails } = this.props;
    if (movies.mainMovie !== prevProps.movies.mainMovie) {
      return getMainMovieDetails(movies.mainMovie);
    }
    return null;
  }

  render() {
    const { movies, genres, fetchListMovies, mainMovie } = this.props;

    const styleBG = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
    const component = (
      <section className={style.movieDetailsPageContainer} style={styleBG} id={mainMovie.id}>
        <div className={style.mainfilmInfo}>
          <div className={style.container}>
            <MainfilmTitle
              mainMovie={mainMovie}
              genres={genres}
              fetchListMovies={fetchListMovies}
            />
            <MainFilmInfo overview={mainMovie.overview} />
          </div>
        </div>
        {movies.currentVideo !== null ? (
          <div id="modalRoot">
            <ModalPlayer id={movies.currentVideo} />
          </div>
        ) : null}
      </section>
    );

    const preloader = (
      <main>
        <div className={style.preloader}>
          <p>App is loading</p>
        </div>
      </main>
    );
    // return component;
    if (mainMovie.backdrop_path !== undefined) {
      return component;
    }
    return preloader;
  }
}

MovieDetailsPage.defaultProps = {
  genres: []
};

MovieDetailsPage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired
};
const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query))
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(MovieDetailsPage);
