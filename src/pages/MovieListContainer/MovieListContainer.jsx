import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import { checkGenres } from '../../modules/fetchGenres/fetchGenresSelectors';
import * as fromFetchPopular from '../../modules/root/rootAction';
import * as fromGetTopRated from '../../modules/getTopRated/getTopRatedAction';
import * as fromFetchComingSoon from '../../modules/fetchComingSoon/fetchComingSoonAction';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import * as fromFetchMoviesOnGenre from '../../modules/fetchMoviesOnGenre/fetchMoviesOnGenreAction';
import * as fromChangeMainMovie from '../../modules/changeMainMovie/changeMainMovieAction';

import ListMovies from '../../components/ListMovies/ListMovies';
import selectGenre from '../../utils/selectGenre';
import style from './MovieListContainer.scss';


class MovieListContainer extends Component {
  constructor(props) {
    super();
    this.props = props;
    props.fetchGenres();
    props.fetchPopular();
  }

  // static getDerivedStateFromProps(nextProps) {
  //   const { fetchGenres, fetchPopular } = nextProps;
  //   fetchGenres();
  //   const state = fetchPopular();
  //   return state;
  // }

  render() {
    const {
      movies,
      genres,
      fetchPopular,
      getTopRated,
      fetchComingSoon,
      fetchMoviesOnGenre,
      changeMainMovie,
    } = this.props;
    const html = (
      <section className={style.movieList}>
        <div className={style.container}>
          <div className={style.moviesSelector}>
            <ul>
              <li><button type="button" href="#" onClick={fetchPopular}>Trending</button></li>
              <li><button type="button" href="#" onClick={getTopRated}>Top Rated</button></li>
              <li><button type="button" href="#" onClick={fetchComingSoon}>Coming Soon</button></li>
              <li>
                <select name="genre" id="" onChange={selectGenre.bind(this)}>
                  <option value="">Genre</option>
                  {genres.map(c => <option key={shortid.generate()}>{c.name}</option>)}
                </select>
              </li>
            </ul>
          </div>
          <div className={style.moviesWrapper}>
            <ListMovies
              results={movies.results}
              genres={genres}
              fetchMoviesOnGenre={fetchMoviesOnGenre}
              changeMainMovie={changeMainMovie}
            />
          </div>
        </div>
      </section>
    );
    return html;
  }
}

MovieListContainer.defaultProps = {
  movies: {},
  genres: [],
};


MovieListContainer.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  getTopRated: PropTypes.func.isRequired,
  fetchPopular: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchComingSoon: PropTypes.func.isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
  changeMainMovie: PropTypes.func.isRequired,
};

const makeMap = () => {
  const page = checkPage;
  const results = checkResults;
  const genres = checkGenres;
  // const genres = checkGenres();
  const mapStateToProps = (state) => {
    console.log(results.recomputations());
    return {
      movies: {
        page: page(state),
        results: results(state),
      },
      genres: genres(state),
    };
  };

  return mapStateToProps;
};

const mapStateToDispatch = dispatch => ({
  fetchPopular: () => dispatch(fromFetchPopular.default()),
  getTopRated: () => dispatch(fromGetTopRated.default()),
  fetchComingSoon: () => dispatch(fromFetchComingSoon.default()),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchMoviesOnGenre: id => dispatch(fromFetchMoviesOnGenre.default(id)),
  changeMainMovie: movie => dispatch(fromChangeMainMovie.default(movie)),
});


export default connect(makeMap, mapStateToDispatch)(MovieListContainer);
