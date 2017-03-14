import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import Product from '../Product/Product';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';

import {addProduct} from '../../actions/index';
import './ProductList.css';

class ProductList extends Component {

    static propTypes = {
        products: PropTypes.array,
    };

    render() {
        const {products}  = this.props;
        return (
            <div className="product-list">
                <h1>Product List</h1>
                <div>
                    <ListGroup>
                        {products.map((product, index) =>
                            <ListGroupItem>
                                <Product
                                    {...product}
                                    key={index}/>
                            </ListGroupItem>)}
                    </ListGroup>
                    <div className="add-product">
                        <Button onClick={() => {
                            browserHistory.push('/add');
                        }}>Add Product</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {...state.default}
    },
)(ProductList);
