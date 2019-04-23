import React from 'react';
import style from './Star.scss';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rate: 4.8 };
  }

  render() {
    const starQuantity = (quantity) => {
      const temp = new Array(Math.ceil(quantity));
      temp.fill(<i className={style.star} />);
      return temp;
    };
    const { rate } = this.state;
    return (
      <div className={style.starContainer}>
        {starQuantity(rate)}
        <p className={style.rate}>{rate}</p>
      </div>
    );
  }
}

export default Star;
