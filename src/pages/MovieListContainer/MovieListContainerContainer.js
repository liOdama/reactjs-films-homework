import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    itemsIsLoading: state.itemsIsLoading,
    error: state.error,
  });

  return mapStateToProps;
};

export const mapStateToDispatch = dispatch => ({
  fetchVideo: requestsFilms.fetchVideo.bind(this, dispatch),
  setTypeView: FromSetTypeView.default.bind(this, dispatch),
  getMainMovieDetails: requestsFilms.getMainMovieDetails.bind(this, dispatch),
  fetchListMovies: requestsFilms.fetchListMovies.bind(this, dispatch),
  clearError: clearError.bind(this, dispatch),
  fetchGenres: fromFetchGenres.default.bind(null, dispatch),
  clearCurrentMovie: fromClearCurrentMovie.default.bind(null, dispatch),
  fetchSearchResults: requestsFilms.fetchSearchResults.bind(this, dispatch),
});

export default withRouter(
  connect(
    makeMap,
    mapStateToDispatch,
  )(MovieListContainer),
);
