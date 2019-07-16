import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieDetailsPage from './MovieDetailsPage';
import requestsFilms from '../../utils/requests';
import clearError from '../../modules/Error/errorAction';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: requestsFilms.fetchVideo.bind(this, dispatch),
  clearError: clearError.bind(dispatch),
  getMainMovieDetails: requestsFilms.getMainMovieDetails.bind(this, dispatch),
  fetchSearchResults: requestsFilms.fetchSearchResults.bind(this, dispatch),
  fetchListMovies: requestsFilms.fetchListMovies.bind(this, dispatch),
  fetchGenres: fromFetchGenres.default.bind(null, dispatch),
  clearCurrentMovie: fromClearCurrentMovie.default.bind(null, dispatch),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch,
  )(MovieDetailsPage),
);
