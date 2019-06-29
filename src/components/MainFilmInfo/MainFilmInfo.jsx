import React from 'react';
import PropTypes from 'prop-types';
import FilmButtons from '../FilmButtons/index';
import style from './MainFilmInfo.scss';

class MainFilmInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOverwie: 'unfull',
    };
  }

  setTypeOverwie = () => {
    this.setState({ typeOverwie: 'full' });
  };

  render() {
    const { overview } = this.props;
    const { typeOverwie } = this.state;
    const classNames = typeOverwie === 'unfull' ? style.hideInfo : style.showInfo;
    // if (typeOverwie === 'unfull') {
    //   classNames = style.hideInfo;
    // } else {
    //   classNames = style.showInfo;
    // }
    return (
      <div className={classNames} id="mainFilmOverwie">
        <div className={style.mainFilmInfo__info}>
          <p>{overview}</p>
        </div>
        <FilmButtons className={style.mainFilmInfo__buttons} setTypeOverwie={this.setTypeOverwie} />
      </div>
    );
  }
}

MainFilmInfo.defaultProps = {
  overview: '',
};

MainFilmInfo.propTypes = {
  overview: PropTypes.string,
};

export default MainFilmInfo;
