import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {updateProduct} from '../../actions/index'
import ProductForm from '../ProductForm/ProductForm';

class ProductEditor extends Component {
    render() {
        return (
            <div className="product-editor">
                <ProductForm
                    validationButtonName="Edit"
                    edit={this.props.productEditor.updateProduct}
                />
            </div>
        );
    }
}

export default connect(
    state => state,
    (dispatch) => ({
        productEditor: bindActionCreators({updateProduct}, dispatch),
    }),
)(ProductEditor);