import React from 'react';
import Header from '../../components/Header';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';

import style from './MovieDetailsPageContainer.scss';

const MovieDetailsPage = () => (
  <section className={style.movieDetailsPageContainer}>
    <Header />
    <div className={style.mainfilmInfo}>
      <MainfilmTitle />
      <MainFilmInfo />
    </div>
  </section>
);

export default MovieDetailsPage;
