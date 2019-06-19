import { connect } from 'react-redux';
import MovieDetailsPage from './MovieDetailsPage';
import requestsFilms from '../../utils/requests';
import * as fromFetchGenres from '../../modules/fetchGenres/fetchGenresAction';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchGenres: () => dispatch(fromFetchGenres.default()),
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});
export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(MovieDetailsPage);
