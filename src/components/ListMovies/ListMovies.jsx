import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem';
import MovieSelectors from '../MovieSelectors';
import Header from '../Header/index';
import Footer from '../Footer/index';
import ModalPlayer from '../ModalPlayer/index';
import Preloader from '../Preloader/index';

import style from './ListMovies.scss';

class ListMovies extends Component {
  shouldComponentUpdate(nextProps) {
    const { loading, typeView, movies } = this.props;
    switch (true) {
      case nextProps.movies.currentVideo !== movies.currentVideo:
        return true;
      case nextProps.typeView !== typeView:
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
      movies,
      genres,
      fetchVideo,
      typeView,
      setTypeView,
      fetchListMovies,
      history,
      fetchSearchResults,
      loading,
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

    const html = (
      <div className={style.wrapper}>
        <Header fetchSearchResults={fetchSearchResults} history={history} />
        <main>
          <section className={style.movieList}>
            <div className={style.container}>
              <MovieSelectors genres={genres} setTypeView={setTypeView} history={history} />
              <div className={style.moviesWrapper}>{list}</div>
            </div>
          </section>
          {movies.currentVideo !== null ? (
            <ModalPlayer id={movies.currentVideo} unmount={this.unmount} />
          ) : null}
        </main>
        <Footer />
        {loading ? <Preloader /> : null}
      </div>
    );
    return html;
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
  fetchSearchResults: PropTypes.func.isRequired,
  setTypeView: PropTypes.func.isRequired,
};

export default ListMovies;
