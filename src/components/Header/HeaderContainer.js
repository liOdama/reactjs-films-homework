import { connect } from 'react-redux';
import requestsFilms from '../../utils/requests';
import itemsReducer from '../../modules/Error/errorAction';
import Header from './Header';

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  clearError: boolean => dispatch(itemsReducer(boolean)),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(Header);
