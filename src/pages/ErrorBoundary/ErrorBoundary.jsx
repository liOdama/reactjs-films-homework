import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieSelectors from '../../components/MovieSelectors';
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
        typeError: nextProps.error
      };
    }
    return {
      hasError: false,
      typeError: null
    };
  }

  componentDidUpdate(prevProps) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    if (prevProps.error !== false) {
      return true;
    }
    return false;
  }

  render() {
    const { hasError, typeError } = this.state;
    const {
      children,
      movies,
      genres,
      fetchPopular,
      getTopRated,
      fetchComingSoon,
      fetchMoviesOnGenre,
      error,
      clearError
    } = this.props;
    if (hasError === true) {
      if (typeError !== 'Something Wrong') {
        return (
          <div className={style.container}>
            <div className="title">
              <h1>Nothing found</h1>
            </div>
            <MovieSelectors
              fetchPopular={fetchPopular}
              getTopRated={getTopRated}
              fetchComingSoon={fetchComingSoon}
              genres={genres}
              fetchMoviesOnGenre={fetchMoviesOnGenre}
              error={error}
              clearError={clearError}
            />
          </div>
        );
      }
      return <h1>Something Wrong</h1>;
    }
    return children;
  }
}

const mapStateToProps = state => state;
export const mapStateToDispatch = dispatch => ({
  clearError: boolean => dispatch(itemsReducer(boolean)),
  fetchMoviesOnGenre: id => dispatch(requestsFilms.fetchMoviesOnGenre(id)),
  fetchPopular: () => dispatch(requestsFilms.fetchPopular()),
  getMainMovieDetails: id => dispatch(requestsFilms.getMainMovieDetails(id)),
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  getTopRated: () => dispatch(requestsFilms.getTopRated()),
  fetchComingSoon: () => dispatch(requestsFilms.fetchComingSoon())
});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(ErrorBoundary);
