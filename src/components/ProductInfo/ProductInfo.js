import React, { PropTypes, Component} from 'react';
import { render } from 'react-dom';
import style from './ProductInfo.scss'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


class ProductInfo extends Component {
  static propTypes = {
    id: PropTypes.string,
    price: PropTypes.int,
    name: PropTypes.string,
    description: PropTypes.string,
    creationDate: PropTypes.date,
  }

  render() {
    return (
      <div className="product-info">{JSON.stringify(this.props)}</div>
    );
  }
}

export default connect(
  state => {return  {...state.default.productToShow}},
)(ProductInfo);
