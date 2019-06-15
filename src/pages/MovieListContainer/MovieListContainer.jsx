import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import checkGenres from '../../modules/fetchGenres/fetchGenresSelectors';
import * as fromChangeMainMovie from '../../modules/mainMovie/changeMainMovieAction';

import requestsFilms from '../../utils/requests';

import style from './MovieListContainer.scss';
import MovieItem from '../../components/MovieItem';
import MovieSelectors from '../../components/MovieSelectors';

class MovieListContainer extends Component {
  render() {
    const {
      movies,
      genres,
      fetchPopular,
      getTopRated,
      fetchComingSoon,
      fetchMoviesOnGenre,
      changeMainMovie,
      fetchVideo
    } = this.props;
    let list;
    if (movies.results.length > 0) {
      list = movies.results.map(curr => {
        return (
          <MovieItem
            curr={curr}
            genres={genres}
            movies={movies}
            changeMainMovie={changeMainMovie}
            fetchVideo={fetchVideo}
            fetchMoviesOnGenre={fetchMoviesOnGenre}
            key={shortid()}
          />
        );
      });
    }

    const html = (
      <section className={style.movieList}>
        <div className={style.container}>
          <MovieSelectors
            fetchPopular={fetchPopular}
            getTopRated={getTopRated}
            fetchComingSoon={fetchComingSoon}
            genres={genres}
            fetchMoviesOnGenre={fetchMoviesOnGenre}
          />
          <div className={style.moviesWrapper}>{list}</div>
        </div>
      </section>
    );
    return html;
  }
}

MovieListContainer.defaultProps = {
  movies: {},
  genres: []
};

MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  getTopRated: PropTypes.func.isRequired,
  fetchPopular: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchComingSoon: PropTypes.func.isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
  changeMainMovie: PropTypes.func.isRequired
};

const makeMap = () => {
  const page = checkPage;
  const results = checkResults;
  const genres = checkGenres;
  const mapStateToProps = state => ({
    movies: {
      page: page(state),
      results: results(state),
      currentVideo: state.movies.currentVideo
    },
    genres: genres(state)
  });

  return mapStateToProps;
};

export const mapStateToDispatch = dispatch => ({
  fetchPopular: () => dispatch(requestsFilms.fetchPopular()),
  getTopRated: () => dispatch(requestsFilms.getTopRated()),
  fetchComingSoon: () => dispatch(requestsFilms.fetchComingSoon()),
  fetchMoviesOnGenre: id => dispatch(requestsFilms.fetchMoviesOnGenre(id)),
  changeMainMovie: movie => dispatch(fromChangeMainMovie.default(movie)),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id))
});

export default connect(
  makeMap,
  mapStateToDispatch
)(MovieListContainer);
