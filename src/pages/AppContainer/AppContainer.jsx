import React from 'react';
import Header from '../../components/Header';
import MovieListContainer from '../MovieListContainer/index';

import Footer from '../../components/Footer/index';

import requestsFilms from '../../utils/requests';
import MovieDetailsPage from '../MovieDetailsPage/index';

const AppContainer = () => {
  return (
    <div>
      <Header fetchSearchResults={requestsFilms.fetchSearchResults} />
      <MovieDetailsPage />
      <MovieListContainer />
      <Footer />
    </div>
  );
};

export default AppContainer;
