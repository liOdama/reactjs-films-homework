import React from 'react';
import style from './Header.scss';

const Header = () => (
  <header className={style.header}>
    <div className={style.container}>
      <h1 className={style.h1}>FILMS</h1>
      <form action="">
        <input type="search" className={style.searchField} tabIndex="0" />
        <button type="submit" className={style.btnSearch}>&#9906;</button>
      </form>
    </div>
  </header>
);

export default Header;
