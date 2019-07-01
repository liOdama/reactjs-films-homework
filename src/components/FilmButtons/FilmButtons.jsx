import React from 'react';
import PropTypes from 'prop-types';
import style from './FilmButtons.scss';
import { showModal } from '../ModalPlayer/ModalPlayer';

class FilmButtons extends React.Component {
  render() {
    const { mainMovie, setTypeOverwie } = this.props;
    return (
      <div className={style.btnContainer}>
        <input
          id={mainMovie.id}
          type="button"
          className={style.watch}
          onClick={showModal.bind(null, this.props)}
          tabIndex="0"
          ref={(watch) => {
            this.watch = watch;
            return this.viewInfo;
          }}
          value="Watch Now"
        />
        <input
          id="info"
          type="button"
          className={style.viewInfo}
          onClick={setTypeOverwie}
          tabIndex="0"
          ref={(viewInfo) => {
            this.viewInfo = viewInfo;
            return this.viewInfo;
          }}
          value="View Info"
        />
      </div>
    );
  }
}

FilmButtons.defaultProps = {
  mainMovie: {},
};

FilmButtons.propTypes = {
  mainMovie: PropTypes.objectOf(PropTypes.any),
  setTypeOverwie: PropTypes.func.isRequired,
};
export default FilmButtons;
