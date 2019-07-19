import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem';
import ModalPlayer from '../ModalPlayer/index';
import Preloader from '../Preloader/index';

class ListMovies extends Component {
  shouldComponentUpdate(nextProps) {
    const { typeView, movies, loading } = this.props;
    switch (true) {
      case nextProps.movies.currentVideo !== movies.currentVideo:
        return true;
      // case nextProps.loading:
      //   return false;
      case typeView !== nextProps.typeView:
        return true;
      case loading === nextProps.loading:
        return false;
      default:
        return true;
    }
  }

  unmount = (e) => {
    if (e.type === 'click' || e.key === 'Escape') {
      const { clearCurrentMovie } = this.props;
      clearCurrentMovie();
    }
  };

  render() {
    const {
      movies, genres, fetchVideo, typeView, fetchListMovies, history, loading,
    } = this.props;
    let list;
    if (movies.results.length > 0) {
      list = movies.results.map(curr => (
        <MovieItem
          curr={curr}
          genres={genres}
          movies={movies}
          fetchListMovies={fetchListMovies}
          fetchVideo={fetchVideo}
          typeView={typeView}
          key={curr.id}
          history={history}
        />
      ));
    }

    const html = list;
    return (
      <Fragment>
        {html}
        {loading ? <Preloader /> : ''}
        {movies.currentVideo !== null ? (
          <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
        ) : null}
      </Fragment>
    );
  }
}

ListMovies.defaultProps = {
  movies: {},
  genres: [],
  typeView: 'cards',
  history: {},
  loading: false,
};

ListMovies.propTypes = {
  movies: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  genres: PropTypes.arrayOf(PropTypes.object),
  typeView: PropTypes.string,
  loading: PropTypes.bool,
  clearCurrentMovie: PropTypes.func.isRequired,
  fetchListMovies: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
};

export default ListMovies;
