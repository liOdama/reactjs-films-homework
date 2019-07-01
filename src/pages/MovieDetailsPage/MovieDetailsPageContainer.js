import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieDetailsPage from './MovieDetailsPage';
import requestsFilms from '../../utils/requests';
import clearError from '../../modules/Error/errorAction';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  clearError: query => dispatch(clearError(query)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default()),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch,
  )(MovieDetailsPage),
);
