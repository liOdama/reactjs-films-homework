import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import checkGenres from '../../modules/fetchGenres/fetchGenresSelectors';
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
      getMainMovieDetails,
      fetchVideo,
      typeView,
      setTypeView,
      fetchListMovies
    } = this.props;
    let list;
    if (movies.results.length > 0) {
      list = movies.results.map(curr => {
        return (
          <MovieItem
            curr={curr}
            genres={genres}
            movies={movies}
            fetchListMovies={fetchListMovies}
            fetchVideo={fetchVideo}
            getMainMovieDetails={getMainMovieDetails}
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
            genres={genres}
            setTypeView={setTypeView}
            fetchListMovies={fetchListMovies}
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
  fetchListMovies: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
  typeView: PropTypes.string,
  setTypeView: PropTypes.func.isRequired
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
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  setTypeView: type => dispatch(FromSetTypeView.default(type)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query))
});

export default connect(
  makeMap,
  mapStateToDispatch
)(MovieListContainer);
