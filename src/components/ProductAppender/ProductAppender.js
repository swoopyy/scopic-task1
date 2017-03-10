import React, { PropTypes, Component} from 'react';
import { render } from 'react-dom';

export default class ProductAppender extends Component {
  static propTypes = {
    id: PropTypes.string,
    price: PropTypes.int,
    name: PropTypes.string,
    description: PropTypes.string,
    creationDate: PropTypes.date,
  }

  render() {
    return (
      <div className="product-appender">
      </div>
    );
  }
}
