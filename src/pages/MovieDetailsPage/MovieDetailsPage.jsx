import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';

import style from './MovieDetailsPage.scss';

class MovieDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  componentDidUpdate(prevProps) {
    const { movies, getMainMovieDetails } = this.props;
    if (movies.mainMovie !== prevProps.movies.mainMovie) {
      return getMainMovieDetails(movies.mainMovie);
    }
    return null;
  }

  render() {
    const { genres, fetchListMovies, mainMovie } = this.props;

    const styleBG = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mainMovie.backdrop_path}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
  genres: [],
};

MovieDetailsPage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
  fetchListMovies: PropTypes.func.isRequired,
  mainMovie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieDetailsPage;
