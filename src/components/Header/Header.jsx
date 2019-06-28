import React from 'react';
import PropTypes from 'prop-types';
import style from './Header.scss';

class Header extends React.Component {
  search = (e) => {
    const { error, clearError, history } = this.props;
    e.preventDefault();
    if (error !== undefined && error !== '') {
      clearError('');
    }
    const query = e.target.children[0].value;
    history.location.pathname = '';
    history.push(`/search/${query}`);
    // return fetchSearchResults(query);
  };

  render() {
    return (
      <header className={style.header}>
        <div className={style.container}>
          <h1 className={style.h1}>FILMS</h1>
          <form action="" onSubmit={this.search}>
            <input type="search" className={style.searchField} tabIndex="0" />
            <button type="submit" className={style.btnSearch}>
              &#9906;
            </button>
          </form>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  error: '',
  history: {},
};

Header.propTypes = {
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any),
};

export default Header;
