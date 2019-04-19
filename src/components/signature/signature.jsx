import React from 'react';
import PropTypes from 'prop-types';

import styles from './signature.scss';

const Signature = (props) => {
  const { name } = props;
  return (<h1 className={styles.name}>{name}</h1>);
};


Signature.propTypes = {
  name: PropTypes.string,
};

Signature.defaultProps = {
  name: 'Roman Bychkou',
};

export default Signature;
