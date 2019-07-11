import { connect } from 'react-redux';
import requestsFilms from '../../utils/requests';
import FilmButtons from './FilmButtons';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchVideo: requestsFilms.fetchVideo.bind(this, dispatch),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(FilmButtons);
