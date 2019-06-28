import { connect } from 'react-redux';
import { checkPage, checkResults } from '../../modules/root/rootSelectors';
import checkGenres from '../../modules/fetchGenres/fetchGenresSelectors';
import * as FromSetTypeView from '../../modules/TypeView/TypeViewAction';
import checkTypeView from '../../modules/TypeView/TypeViewSelectors';
import requestsFilms from '../../utils/requests';
import clearError from '../../modules/Error/errorAction';
import MovieListContainer from './MovieListContainer';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';

const makeMap = () => {
  const page = checkPage;
  const results = checkResults;
  const genres = checkGenres;
  const typeView = checkTypeView;
  const mapStateToProps = state => ({
    movies: {
      page: page(state),
      results: results(state),
      currentVideo: state.movies.currentVideo,
    },
    genres: genres(state),
    typeView: typeView(state),
  });

  return mapStateToProps;
};

export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  setTypeView: type => dispatch(FromSetTypeView.default(type)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchListMovies: (query, id) => dispatch(requestsFilms.fetchListMovies(query, id)),
  clearError: bool => dispatch(clearError(bool)),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default()),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
});

export default connect(
  makeMap,
  mapStateToDispatch,
)(MovieListContainer);
