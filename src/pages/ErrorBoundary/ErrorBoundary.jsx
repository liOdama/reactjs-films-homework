import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieSelectors from '../../components/MovieSelectors/index';
import Header from '../../components/Header/index';
import style from './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: '' };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.error !== '') {
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

  shouldComponentUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error) {
      return true;
    }
    return false;
  }

  render() {
    const { hasError, typeError } = this.state;
    const {
      children, genres, error, clearError, fetchListMovies, fetchSearchResults,
    } = this.props;
    if (hasError === true) {
      if (typeError !== 'Something Wrong') {
        return (
          <div>
            <Header fetchSearchResults={fetchSearchResults} error={error} clearError={clearError} />
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
          </div>
        );
      }
      return <h1>Something Wrong</h1>;
    }
    return children;
  }
}
ErrorBoundary.defaultProps = {
  error: '',
  genres: [],
  children: [],
};

ErrorBoundary.propTypes = {
  error: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.object),
  fetchListMovies: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  fetchSearchResults: PropTypes.func.isRequired,
};
export default ErrorBoundary;
