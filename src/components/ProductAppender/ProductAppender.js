import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {saveProduct} from '../../actions/index'
import ProductForm from '../ProductForm/ProductForm';

class ProductAppender extends Component {
    render() {
        return (
            <div className="product-appender">
                <ProductForm
                    validationButtonName="Add"
                    add={this.props.productAppender.saveProduct}
                />
            </div>
        );
    }
}

export default connect(
    state => state,
    (dispatch) => ({
        productAppender: bindActionCreators({saveProduct}, dispatch),
    }),
)(ProductAppender);