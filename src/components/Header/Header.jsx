import React from 'react';
import style from './Header.scss';

export const search = (props, e) => {
  const { fetchSearchResults } = props;
  e.preventDefault();
  const query = e.target.children[0].value;
  return fetchSearchResults(query);
};

const Header = props => (
  <header className={style.header}>
    <div className={style.container}>
      <h1 className={style.h1}>FILMS</h1>
      <form action="" onSubmit={search.bind(null, props)}>
        <input type="search" className={style.searchField} tabIndex="0" />
        <button type="submit" className={style.btnSearch}>&#9906;</button>
      </form>
    </div>
  </header>
);

export default Header;
