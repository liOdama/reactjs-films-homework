import { connect } from 'react-redux';
import requestsFilms from '../../utils/requests';
import * as fromClearCurrentMovie from '../../modules/root/clearCurrentMovieAction';
import { ModalPlayer } from './ModalPlayer';

const mapStateToProps = state => state;
export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id)),
  clearCurrentMovie: () => dispatch(fromClearCurrentMovie.default())
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(ModalPlayer);
