import React from 'react';
import style from './Header.scss';

const Header = () => (
  <header className={style.header}>
    <h1 className={style.h1}>FILMS</h1>
    <form action="">
      <input type="search" className={style.searchField} />
      <button type="submit" className={style.btnSearch}>&#9906;</button>
    </form>
  </header>
);

export default Header;
