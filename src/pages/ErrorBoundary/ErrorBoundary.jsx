import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieSelectors from '../../components/MovieSelectors/index';
import style from './ErrorBoundary.scss';
import itemsReducer from '../../modules/Error/errorAction';
import requestsFilms from '../../utils/requests';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.error !== false) {
      return {
        hasError: true,
        typeError: nextProps.error,
      };
    }
    return {
      hasError: false,
      typeError: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== false) {
      return true;
    }
    return false;
  }

  render() {
    const { hasError, typeError } = this.state;
    const {
      children, genres, error, clearError, fetchListMovies,
    } = this.props;
    if (hasError === true) {
      if (typeError !== 'Something Wrong') {
        return (
          <div className={style.container}>
            <div className="title">
              <h1>Nothing found</h1>
            </div>
            <MovieSelectors
              genres={genres}
              error={error}
              clearError={clearError}
              fetchListMovies={fetchListMovies}
            />
            <img
              src="https://cdn.shopify.com/s/files/1/1164/8172/products/funny-insomnia-mug-error-404-am-sleep-not-found-11oz-black-coffee-mugs_175_1024x1024.jpg?v=1537210909"
              alt="404 Not Found"
            />
          </div>
        );
      }
      return <h1>Something Wrong</h1>;
    }
    return children;
  }
}
ErrorBoundary.defaultProps = {
  error: false,
  genres: [],
  children: [],
};

ErrorBoundary.propTypes = {
  error: PropTypes.bool,
  genres: PropTypes.arrayOf(PropTypes.object),
  fetchListMovies: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => state;
export const mapStateToDispatch = dispatch => ({
  clearError: boolean => dispatch(itemsReducer(boolean)),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  fetchListMovies: query => dispatch(requestsFilms.fetchListMovies(query)),
});
export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(ErrorBoundary);
