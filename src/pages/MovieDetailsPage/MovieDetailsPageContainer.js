import { connect } from 'react-redux';
import MovieDetailsPage from './MovieDetailsPage';
import requestsFilms from '../../utils/requests';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});
export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(MovieDetailsPage);
