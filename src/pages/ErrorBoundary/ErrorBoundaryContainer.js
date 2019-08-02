import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import clearError from '../../modules/Error/errorAction';

import requestsFilms from '../../utils/requests';
import setTypeView from '../../modules/TypeView/TypeViewAction';

const mapStateToProps = state => state;
export const mapStateToDispatch = dispatch => ({
  fetchVideo: requestsFilms.fetchVideo.bind(this, dispatch),
  setTypeView: setTypeView.bind(this, dispatch),
  getMainMovieDetails: requestsFilms.getMainMovieDetails.bind(this, dispatch),
  fetchListMovies: requestsFilms.fetchListMovies.bind(this, dispatch),
  clearError: clearError.bind(this, dispatch),
  fetchSearchResults: requestsFilms.fetchSearchResults.bind(this, dispatch),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapStateToDispatch,
  )(ErrorBoundary),
);
