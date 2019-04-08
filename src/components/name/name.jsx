import React from 'react';
import PropTypes from 'prop-types';
import styles from './name.scss';

const ShowName = props => (<h1 className={styles.name}>{props.name}</h1>);


ShowName.propTypes = {
  name: PropTypes.string,
};

ShowName.defaultProps = {
  name: 'Roman Bychkou',
};
export default ShowName;
