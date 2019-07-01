import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieSelectors from '../../components/MovieSelectors/index';
import Header from '../../components/Header/index';
import style from './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const { history } = nextProps;
    const { hasError } = nextState;
    if (history.location.pathname === '/404' && hasError === true) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  render() {
    const { hasError } = this.state;
    const {
      children,
      genres,
      error,
      clearError,
      fetchListMovies,
      fetchSearchResults,
      setTypeView,
      history,
    } = this.props;
    if (hasError === true) {
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
              setTypeView={setTypeView}
              history={history}
            />
            <img
              src="https://cdn.shopify.com/s/files/1/1164/8172/products/funny-insomnia-mug-error-404-am-sleep-not-found-11oz-black-coffee-mugs_175_1024x1024.jpg?v=1537210909"
              alt="404 Not Found"
            />
          </div>
        </div>
      );
    }
    return children;
  }
}
ErrorBoundary.defaultProps = {
  error: '',
  genres: [],
  children: [],
  history: {},
};

ErrorBoundary.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.any),
  fetchListMovies: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  fetchSearchResults: PropTypes.func.isRequired,
  setTypeView: PropTypes.func.isRequired,
};
export default ErrorBoundary;
