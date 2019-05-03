import React from 'react';
import shortid from 'shortid';
import style from './Star.scss';

class Star extends React.Component {
  static starQuantity(quantity) {
    let temp = new Array(Math.ceil(quantity)).fill(quantity);
    temp = temp.map(() => {
      const tempEl = (<i className={style.star} key={shortid.generate()} />);
      return tempEl;
    });
    return temp;
  }

  constructor(props) {
    super(props);
    this.state = { rate: 4.8 };
  }

  render() {
    const { rate } = this.state;
    return (
      <div className={style.starContainer}>
        {Star.starQuantity(rate)}
        <p className={style.rate}>{rate}</p>
      </div>
    );
  }
}

export default Star;
