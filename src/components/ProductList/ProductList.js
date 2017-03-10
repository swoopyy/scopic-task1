import React, { PropTypes, Component } from 'react';
import { render } from 'react-dom';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import { connect } from 'react-redux';
import {editProduct, deleteProduct, showProduct, addProduct} from '../../actions/index'
import Product from '../Product/Product';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {bindActionCreators} from 'redux';

class ProductList extends Component {

  static propTypes = {
    addProduct: PropTypes.func,
    products: PropTypes.array,
  }

  render() {
    const { products, productActions }  = this.props;
    return  (
      <div className="product-list">
        <h1>Product List</h1>
        <ListGroup>
          {products.map((product, index) =>
            <ListGroupItem>
              <Product
                {...productActions}
                {...product}
                key={index} />
            </ListGroupItem> )}
        </ListGroup>
      </div>
    );
  }
}

export default connect(
  state => {return  {products: state.default.products}},
  (dispatch) => ({
    productActions: bindActionCreators({editProduct, deleteProduct, showProduct}, dispatch),
  }),
)(ProductList);
