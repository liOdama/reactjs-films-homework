import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieSelectors from '../../components/MovieSelectors/index';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import style from './ErrorBoundary.scss';
import defaultStyle from '../../common.scss';

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
      fetchListMovies,
      fetchSearchResults,
      setTypeView,
      history,
      clearError,
      query,
    } = this.props;
    if (hasError === true) {
      clearError('');
      return (
        <div className={defaultStyle.wrapper}>
          <Header
            fetchSearchResults={fetchSearchResults}
            error={error}
            query={query}
            history={history}
          />
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
            <div className={style.imgWrapper}>
              <img
                src="https://www.ge.com/digital/sites/default/files/styles/featured_desktop_2432w_x_1368h/public/2018-09/404.png?itok=hZD2E0Up"
                alt="404 Not Found"
              />
            </div>
          </div>
          <Footer />
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
  query: { url: '' },
};

ErrorBoundary.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  query: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.any),
  fetchListMovies: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any),
  fetchSearchResults: PropTypes.func.isRequired,
  setTypeView: PropTypes.func.isRequired,
};
export default ErrorBoundary;
