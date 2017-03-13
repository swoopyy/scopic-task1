import React, { PropTypes, Component} from 'react';
import { render } from 'react-dom';
import ProductForm from  '../ProductForm/ProductForm';



export default class ProductInfo extends Component {
  render() {
    return (
      <div className="product-info">
        <ProductForm
          readonly={true}
        />
      </div>
    );
  }
}


