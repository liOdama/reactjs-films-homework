import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './name.scss';

class ShowName extends Component {
  render() {
    return (<h1 className={styles.name}>{this.props.name}</h1>);
  }
}
ShowName.propTypes = {
  name: PropTypes.string
};
export default ShowName;