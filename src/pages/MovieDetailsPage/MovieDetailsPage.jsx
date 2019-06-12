import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';
import MovieListContainer from '../MovieListContainer/index';
import ModalPlayer from '../../components/ModalPlayer/ModalPlayer';
import Footer from '../../components/Footer/index';

import style from './MovieDetailsPage.scss';
import requestsFilms from '../../utils/requests';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';


class MovieDetailsPage extends Component {

  shouldComponentUpdate(nextProps) {
    const { movies, mainMovie } = this.props;
    
    if (JSON.stringify(nextProps.movies) === JSON.stringify(movies)
     && JSON.stringify(nextProps.mainMovie) === JSON.stringify(mainMovie)) {
      return false;
    }
    return true;
  }

  static async getDerivedStateFromProps(nextProps) {
    const { genres, results } = nextProps;
    if (genres.length === 0) {
      const { fetchGenres, fetchPopular } = nextProps;
      localStorage.clear();
      await fetchGenres();
      const state = await fetchPopular();
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
    const {
      movies, genres, fetchMoviesOnGenre, mainMovie, fetchSearchResults,
    } = this.props;

    const styleBG = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const component = (
      <main>
        <section
          className={style.movieDetailsPageContainer}
          style={styleBG}
          id={mainMovie.id}
        >
          <Header fetchSearchResults={fetchSearchResults} />
          <div className={style.mainfilmInfo}>
            <div className={style.container}>
              <MainfilmTitle
                mainMovie={mainMovie}
                genres={genres}
                fetchMoviesOnGenre={fetchMoviesOnGenre}
              />
              <MainFilmInfo overview={mainMovie.overview} />
            </div>
          </div>
        </section>
        <MovieListContainer />

        
        {(movies.currentVideo !== null) ? (
            <div id="modalRoot" onKeyDown={alert}>
              <ModalPlayer id={movies.currentVideo} />
            </div>
          ) : null
        }

        
        <Footer />
      </main>
    );

    const preloader = (
      <main><div className={style.preloader}><p>App is loading</p></div></main>
    );
      // return component;
    if (mainMovie.backdrop_path !== undefined) {
      return component;
    }
    return preloader;
  }
}


MovieDetailsPage.defaultProps = {
  genres: [],
};


MovieDetailsPage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
  fetchSearchResults: PropTypes.func.isRequired,
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired,
};
const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchMoviesOnGenre: id => dispatch(requestsFilms.fetchMoviesOnGenre(id)),
  fetchPopular: () => dispatch(requestsFilms.fetchPopular()),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
});
export default connect(mapStateToProps, mapStateToDispatch)(MovieDetailsPage);
