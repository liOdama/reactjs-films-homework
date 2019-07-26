import React from 'react';
import style from './Preloader.scss';
import preloder from './img/preloader.gif';

const Preloader = () => (
  <div className={style.container}>
    <img src={preloder} alt="loading" />
  </div>
);

export default Preloader;
