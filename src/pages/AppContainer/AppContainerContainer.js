import { connect } from 'react-redux';
import AppContainer from './AppContainer';
import requestsFilms from '../../utils/requests';
import itemsReducer from '../../modules/Error/errorAction';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  clearError: boolean => dispatch(itemsReducer(boolean)),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default()),
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(AppContainer);
