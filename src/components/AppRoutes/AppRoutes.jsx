import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieListContainer from '../../pages/MovieListContainer/index';
import MovieDetailsPage from '../../pages/MovieDetailsPage/index';
import ErrorBoundary from '../../pages/ErrorBoundary/index';

const AppRoutes = () => (
  <Switch>
    <ErrorBoundary>
      <Route
        exact
        path="/"
        render={() => <MovieListContainer query={{ url: '/', search: false }} />}
      />
      <Route
        path="/list/:query"
        render={props => (
          <MovieListContainer query={{ url: props.match.params.query, search: false }} />
        )}
      />

      <Route
        path="/genre/:id"
        render={props => (
          <MovieListContainer query={{ url: props.match.params.id, search: false }} />
        )}
      />
      <Route
        path="/films/:filmsName"
        render={props => (
          <MovieDetailsPage query={{ url: props.match.params.filmsName, search: true }} />
        )}
      />
      <Route
        path="/search/:query"
        render={props => (
          <MovieListContainer query={{ url: props.match.params.query, search: true }} />
        )}
      />
      {/* <Route exact path="/404" render={() => <ErrorBoundary query={{ url: '404' }} />} /> */}
      <Redirect from="/index.html" to="/" />
      {/* <Redirect exact from="/search/404" to="/404" /> */}
    </ErrorBoundary>
  </Switch>
);

AppRoutes.defaultProps = {
  match: { params: {} },
};

AppRoutes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};
export default AppRoutes;