import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import itemsReducer from '../../modules/Error/errorAction';
import requestsFilms from '../../utils/requests';

const mapStateToProps = state => state;
export const mapStateToDispatch = dispatch => ({
  clearError: boolean => dispatch(itemsReducer(boolean)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch,
  )(ErrorBoundary),
);
