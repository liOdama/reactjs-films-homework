import React from 'react';
import Header from '../../components/Header';
import MainfilmTitle from '../../components/MainFilmTitle';
import MainFilmInfo from '../../components/MainFilmInfo';

import style from './MovieDetailsPage.scss';

const MovieDetailsPage = () => (
  <section className={style.movieDetailsPageContainer}>
    <Header />
    <div className={style.mainfilmInfo}>
      <div className={style.container}>
        <MainfilmTitle />
        <MainFilmInfo />
      </div>
    </div>
  </section>
);

export default MovieDetailsPage;
