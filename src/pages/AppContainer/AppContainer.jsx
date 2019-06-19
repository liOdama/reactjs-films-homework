import React from 'react';
import Header from '../../components/Header/index';
import MovieListContainer from '../MovieListContainer/index';

import Footer from '../../components/Footer/index';

import requestsFilms from '../../utils/requests';
import MovieDetailsPage from '../MovieDetailsPage/index';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import style from '../../common.scss';

const AppContainer = () => (
  <div className={style.wrapper}>
    <Header fetchSearchResults={requestsFilms.fetchSearchResults} />
    <main>
      <ErrorBoundary>
        <MovieDetailsPage />
        <MovieListContainer />
      </ErrorBoundary>
    </main>
    <Footer />
  </div>
);

export default AppContainer;
