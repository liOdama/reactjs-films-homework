import { connect } from 'react-redux';
import requestsFilms from '../../utils/requests';
import FilmButtons from './FilmButtons';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: id => dispatch(requestsFilms.fetchVideo(id))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(FilmButtons);
