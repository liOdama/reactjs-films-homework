import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';
import MovieListContainer from '../MovieListContainer/index';
import style from './MovieDetailsPage.scss';
import * as fromFetchMoviesOnGenre from '../../modules/fetchMoviesOnGenre/fetchMoviesOnGenreAction';


class MovieDetailsPage extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  // shouldComponentUpdate(nextProps) {
  //   if (JSON.stringify(nextProps.movies.results) === JSON.stringify(this.props.movies.results)) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { movies, genres, fetchMoviesOnGenre } = this.props;
    const styleBG = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies.mainMovie.backdrop_path}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    return (
      <main>
        <section className={style.movieDetailsPageContainer} style={styleBG}>
          <Header />
          <div className={style.mainfilmInfo}>
            <div className={style.container}>
              <MainfilmTitle
                mainMovie={movies.mainMovie}
                genres={genres}
                fetchMoviesOnGenre={fetchMoviesOnGenre}
              />
              <MainFilmInfo overview={movies.mainMovie.overview} />
            </div>
          </div>
        </section>
        <MovieListContainer />
      </main>
    );
  }
}

MovieDetailsPage.defaultProps = {
  genres: [],
};


MovieDetailsPage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;

const mapStateToDispatch = dispatch => ({
  fetchMoviesOnGenre: id => dispatch(fromFetchMoviesOnGenre.default(id)),
});
export default connect(mapStateToProps, mapStateToDispatch)(MovieDetailsPage);
