import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showProduct, editProduct, deleteProduct} from '../../actions/index';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import  './Product.css'
import {browserHistory} from 'react-router';


class Product extends Component {
    static propTypes = {
        id: PropTypes.string,
        price: PropTypes.int,
        name: PropTypes.string,
        description: PropTypes.string,
        creationDate: PropTypes.date,
        deleteProduct: PropTypes.func,
        editProduct: PropTypes.func,
        showProduct: PropTypes.func,
    };

    invokeCommand = (command, id, link) => {
        command(id);
        if (link) {
            browserHistory.push(link);
        }
    };

    render() {
        const {id, name} = this.props;
        const {showProduct, deleteProduct, editProduct} = this.props.productActions;
        return (
            <div className="product">
                <h4>{name}</h4>
                <ButtonToolbar>
                    <Button bsStyle="info" onClick={() => this.invokeCommand(showProduct, id, '/info')}>Info</Button>
                    <Button bsStyle="success" onClick={() => this.invokeCommand(editProduct, id, '/edit')}>Edit</Button>
                    <Button bsStyle="danger" onClick={() => this.invokeCommand(deleteProduct, id, null)}>Delete</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default connect(
    state => {
        return {...state.default}
    },
    (dispatch) => ({
        productActions: bindActionCreators({editProduct, deleteProduct, showProduct}, dispatch),
    }),
)(Product);