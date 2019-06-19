import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import HoverMovieCard from '../HoverMovieCard/HoverMovieCard';
import selectGenre, { keydonwGenres } from '../../utils/selectGenre';

import * as stylerate from '../Star/Star.scss';
import style from './MovieItem.scss';

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeView: 'cards',
      fullOverwie: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return { typeView: nextProps.typeView };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prev = this.state;
    if (JSON.stringify(prev) !== JSON.stringify(nextState)) {
      return true;
    }
    return false;
  }

  hoverOverwieBlock = () => {
    const { typeView } = this.state;
    this.setState({ typeView, fullOverwie: true });
  };

  hoverOverwieNone = () => {
    const { typeView } = this.state;
    this.setState({ typeView, fullOverwie: false });
  };

  changeMainFilm = (e) => {
    e.preventDefault();
    const { getMainMovieDetails } = this.props;
    const element = e.target;
    return getMainMovieDetails(element.id);
  };

  render() {
    const {
      curr, genres, fetchVideo, movies,
    } = this.props;
    const { typeView, fullOverwie } = this.state;
    let imageLink;
    if (curr.poster_path === null) {
      imageLink = 'https://api.ballotpedia.org/v3/thumbnail/';
    } else if (typeView === 'cards') {
      imageLink = `https://image.tmdb.org/t/p/w300${curr.poster_path}`;
    } else {
      imageLink = `https://image.tmdb.org/t/p/w1280${curr.backdrop_path}`;
    }
    let classNamesfigcaption;
    if (fullOverwie === true) {
      classNamesfigcaption = style.figcaptionNone;
    } else {
      classNamesfigcaption = style.figcaptionBlock;
    }
    const imgAlt = curr.title;
    const genresRow = curr.genre_ids
      .map((c) => {
        let currentGenre;
        genres.some((a) => {
          if (c === a.id) {
            currentGenre = a.name;
            return true;
          }
          return false;
        });
        return currentGenre;
      })
      .join(', 1')
      .split(' 1')
      .map(cur => (
        <li key={shortid.generate()}>
          <button
            type="button"
            onClick={selectGenre.bind(null, this.props)}
            onKeyDown={keydonwGenres.bind(null, this.props)}
          >
            {cur}
          </button>
        </li>
      ));

    return (
      <article
        className={`${style.movieContainer} ${style[typeView]}`}
        key={shortid.generate()}
        onMouseLeave={this.hoverOverwieNone}
      >
        <figure className={classNamesfigcaption}>
          <div>
            <img src={imageLink} alt={imgAlt} />
          </div>
          <figcaption>
            <div className={style.movieTitle}>
              <button
                type="button"
                href="#"
                onClick={this.changeMainFilm}
                onKeyDown={keydonwGenres.bind(null, this.props)}
                tabIndex="0"
                id={curr.id}
              >
                {curr.title}
              </button>
              <span className={stylerate.rate}>{curr.vote_average}</span>
            </div>
            <div className={style.movieGenres}>
              <ul>{genresRow}</ul>
            </div>
          </figcaption>
        </figure>
        <HoverMovieCard
          overview={curr.overview}
          genres={genresRow}
          title={curr.title}
          rate={curr.vote_average}
          fetchVideo={fetchVideo}
          movies={movies}
          id={curr.id}
          fullOverwie={fullOverwie}
          hoverOverwieBlock={this.hoverOverwieBlock}
          hoverOverwieNone={this.hoverOverwieNone}
        />
      </article>
    );
  }
}

MovieItem.defaultProps = {
  fetchVideo: alert,
  movies: {},
};

MovieItem.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchVideo: PropTypes.func,
  movies: PropTypes.objectOf(PropTypes.any),
  curr: PropTypes.objectOf(PropTypes.any).isRequired,
  getMainMovieDetails: PropTypes.func.isRequired,
};

// export { changeMainFilm };
export default MovieItem;
