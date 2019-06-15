import React from 'react';
import { connect } from 'react-redux';
import requestsFilms from '../../utils/requests';
import itemsReducer from '../../modules/Error/errorAction';
import style from './Header.scss';

export const search = (props, e) => {
  const { fetchSearchResults, error, clearError } = props;
  e.preventDefault();
  if (error !== undefined && error !== false) {
    clearError(false);
  }
  const query = e.target.children[0].value;
  return fetchSearchResults(query);
};

const Header = props => (
  <header className={style.header}>
    <div className={style.container}>
      <h1 className={style.h1}>FILMS</h1>
      <form action="" onSubmit={search.bind(null, props)}>
        <input type="search" className={style.searchField} tabIndex="0" />
        <button type="submit" className={style.btnSearch}>
          &#9906;
        </button>
      </form>
    </div>
  </header>
);

const mapStateToProps = state => state;

export const mapStateToDispatch = dispatch => ({
  fetchSearchResults: query => dispatch(requestsFilms.fetchSearchResults(query)),
  clearError: boolean => dispatch(itemsReducer(boolean))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Header);
