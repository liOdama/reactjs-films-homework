import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import checkGenres from '../../modules/fetchGenres/fetchGenresSelectors';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import * as fromChangeMainMovie from '../../modules/changeMainMovie/changeMainMovieAction';

import requestsFilms from '../../utils/requests';

import ListMovies from '../../components/ListMovies/ListMovies';
import selectGenre from '../../utils/selectGenre';
import style from './MovieListContainer.scss';

const createGenreList = genres => genres.map(c => <option key={shortid.generate()}>{c.name}</option>);

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
      fetchVideo,
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
                  {createGenreList(genres)}
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
              fetchVideo={fetchVideo}
              movies={movies}
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
  fetchVideo: PropTypes.func.isRequired,
  fetchComingSoon: PropTypes.func.isRequired,
  fetchMoviesOnGenre: PropTypes.func.isRequired,
  changeMainMovie: PropTypes.func.isRequired,
};

const makeMap = () => {
  const page = checkPage;
  const results = checkResults;
  const genres = checkGenres;
  const mapStateToProps = (state) => ({
      movies: {
        page: page(state),
        results: results(state),
        currentVideo: state.movies.currentVideo,
      },
      genres: genres(state),
    });

  return mapStateToProps;
};

const mapStateToDispatch = dispatch => ({
  fetchPopular: () => dispatch(requestsFilms.fetchPopular()),
  getTopRated: () => dispatch(requestsFilms.getTopRated()),
  fetchComingSoon: () => dispatch(requestsFilms.fetchComingSoon()),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchMoviesOnGenre: id => dispatch(requestsFilms.fetchMoviesOnGenre(id)),
  changeMainMovie: movie => dispatch(fromChangeMainMovie.default(movie)),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
});


export default connect(makeMap, mapStateToDispatch)(MovieListContainer);
export { createGenreList };
