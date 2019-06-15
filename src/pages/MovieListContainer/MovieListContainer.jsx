import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import checkGenres from '../../modules/fetchGenres/fetchGenresSelectors';
import * as fromChangeMainMovie from '../../modules/mainMovie/changeMainMovieAction';
import * as FromSetTypeView from '../../modules/TypeView/TypeViewAction';

import requestsFilms from '../../utils/requests';

import style from './MovieListContainer.scss';
import MovieItem from '../../components/MovieItem';
import MovieSelectors from '../../components/MovieSelectors';
import checkTypeView from '../../modules/TypeView/TypeViewSelectors';

class MovieListContainer extends Component {
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      movies,
      genres,
      fetchPopular,
      getTopRated,
      fetchComingSoon,
      fetchMoviesOnGenre,
      changeMainMovie,
      fetchVideo,
      typeView,
      setTypeView
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
            typeView={typeView}
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
            setTypeView={setTypeView}
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
  genres: [],
  typeView: 'cards'
};

MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  getTopRated: PropTypes.func.isRequired,
  fetchPopular: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchComingSoon: PropTypes.func.isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
  changeMainMovie: PropTypes.func.isRequired,
  typeView: PropTypes.string
};

const makeMap = () => {
  const page = checkPage;
  const results = checkResults;
  const genres = checkGenres;
  const typeView = checkTypeView;
  const mapStateToProps = state => ({
    movies: {
      page: page(state),
      results: results(state),
      currentVideo: state.movies.currentVideo
    },
    genres: genres(state),
    typeView: typeView(state)
  });

  return mapStateToProps;
};

export const mapStateToDispatch = dispatch => ({
  fetchPopular: () => dispatch(requestsFilms.fetchPopular()),
  getTopRated: () => dispatch(requestsFilms.getTopRated()),
  fetchComingSoon: () => dispatch(requestsFilms.fetchComingSoon()),
  fetchMoviesOnGenre: id => dispatch(requestsFilms.fetchMoviesOnGenre(id)),
  changeMainMovie: movie => dispatch(fromChangeMainMovie.default(movie)),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  setTypeView: type => dispatch(FromSetTypeView.default(type))
});

export default connect(
  makeMap,
  mapStateToDispatch
)(MovieListContainer);
