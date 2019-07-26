import React from 'react';
import PropTypes from 'prop-types';
import style from './Star.scss';

class Star extends React.Component {
  static starQuantity(quantity) {
    let temp = new Array(Math.ceil(quantity)).fill(quantity);
    temp = temp.map((c, ind) => {
      const tempEl = <i className={style.star} key={`key-${ind + 0}`} />;
      return tempEl;
    });
    return temp;
  }

  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const { rate } = this.props;
    return (
      <div className={style.starContainer}>
        {Star.starQuantity(rate)}
        <p className={style.rate}>{rate}</p>
      </div>
    );
  }
}

Star.defaultProps = {
  rate: 0,
};

Star.propTypes = {
  rate: PropTypes.number,
};

export default Star;
