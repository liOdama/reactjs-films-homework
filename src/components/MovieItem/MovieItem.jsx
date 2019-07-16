import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    if (curr.poster_path === null || curr.backdrop_path === null) {
      imageLink = 'https://api.ballotpedia.org/v3/thumbnail/';
    } else if (typeView === 'cards') {
      imageLink = `https://image.tmdb.org/t/p/w300${curr.poster_path}`;
    } else {
      imageLink = `https://image.tmdb.org/t/p/w1280${curr.backdrop_path}`;
    }
    const classNamefigcaption = fullOverwie === true ? style.figcaptionNone : style.figcaptionBlock;
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
        <li key={`key-${cur.replace(',', '')}`}>
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
        onMouseLeave={this.hoverOverwieNone}
      >
        <figure className={classNamefigcaption}>
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
              >
                <Link
                  to={{
                    pathname: `/films/${curr.id}`,
                  }}
                  id={curr.id}
                >
                  {curr.title}
                </Link>
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
  movies: PropTypes.objectOf(PropTypes.any),
  curr: PropTypes.objectOf(PropTypes.any).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchVideo: PropTypes.func,
  getMainMovieDetails: PropTypes.func.isRequired,
};

export default MovieItem;
