import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MovieListContainer from '../../pages/MovieListContainer/index';
import MovieDetailsPage from '../../pages/MovieDetailsPage/index';
import ErrorBoundary from '../../pages/ErrorBoundary/index';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={MovieListContainer} />
    <Route path="/trending" component={MovieListContainer} />
    <Route path="/top_rated" component={MovieListContainer} />
    <Route path="/coming_soon" component={MovieListContainer} />
    <Route path="/genre/:id" component={MovieListContainer} />
    <Route path="/films/:filmsName" component={MovieDetailsPage} />
    <Route path="/search/:query" component={MovieListContainer} />
    <Route path="/404" component={ErrorBoundary} />
    <Redirect from="/search/404" to="/404" />
    <Redirect from="/index.html" to="/" />
  </Switch>
);
export default AppRoutes;
