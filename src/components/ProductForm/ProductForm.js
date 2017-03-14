import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetProductToShow} from '../../actions/index'

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import DatePicker from 'react-bootstrap-date-picker';


import './ProductForm.css';

const isIdInProducts = (id, products) => {
    for (var i = 0; i < products.length; ++i) {
        if (products[i].id === id) {
            return true;
        }
    }
    return false;
};

const validate = (values, props) => {
    let errors = {};
    if (!values.id) {
        errors.id = "Required";
    }
    if (values.id !== props.initialValues.id
        && isIdInProducts(values.id, props.products)) {
        errors.id = "Already exists";
    }
    if (!values.creationDate) {
        errors.creationDate = "Required";
    }
    if (!values.price) {
        errors.price = "Required";
    } else if (isNaN(values.price)) {
        errors.price = "Invalid";
    }
    if (!values.name) {
        errors.name = "Required";
    }
    if (!values.description) {
        errors.description = "Required";
    }
    return errors;
};


class ProductForm extends Component {
    static propTypes = {
        initialValues: PropTypes.obj,
        validationButtonName: PropTypes.string,
        readonly: PropTypes.bool,
        edit: PropTypes.func,
        add: PropTypes.func
    };

    constructor(props) {
        super(props);
    }


    _getValidationState = field => {
        if (this.props.readonly) {
            return null;
        }
        if (field.meta.error) {
            return "error"
        } else {
            return "success"
        }
    };

    RenderInput = field => {
        return (
            <FormGroup controlId={field.input.name} validationState={this._getValidationState(field)}>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl
                    disabled={field.disabled}
                    type={field.type}
                    value={field.input.value}
                    componentClass={field.componentClass}
                    onChange={field.input.onChange}/>
                <FormControl.Feedback />
            </FormGroup>
        );
    };

    RenderDatePicker = field => {
        return (
            <FormGroup controlId={field.input.name} validationState={this._getValidationState(field)}>
                <ControlLabel>{field.label}</ControlLabel>
                <DatePicker
                    disabled={field.disabled}
                    value={field.input.value}
                    onChange={field.input.onChange}/>
            </FormGroup>
        );
    };

    submitProduct = values => {
        let oldId = this.props.initialValues.id;
        const {edit, add} = this.props;
        let product = {
            ...values,
            creationDate: new Date(values.creationDate),
        };
        if (edit) {
            edit(oldId, product);
        } else if (add) {
            add(product);
        }
        this._back();
    };

    _back = () => {
        browserHistory.push('/');
        this.props.productForm.resetProductToShow();
    };

    render() {
        const {handleSubmit, readonly, validationButtonName} = this.props;
        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit(this.submitProduct)} className="product-form">
                    <Field
                        type="text"
                        name="id"
                        label="Id"
                        component={this.RenderInput}
                        disabled={readonly}
                    />
                    <Field
                        type="text"
                        label="Creation Date"
                        name="creationDate"
                        component={this.RenderDatePicker}
                        disabled={readonly}
                    />
                    <Field
                        type="text"
                        label="Price"
                        name="price"
                        component={this.RenderInput}
                        disabled={readonly}
                    />
                    <Field
                        type="text"
                        label="Name"
                        name="name"
                        component={this.RenderInput}
                        disabled={readonly}
                    />
                    <Field
                        type="text"
                        label="Description"
                        name="description"
                        componentClass="textarea"
                        component={this.RenderInput}
                        disabled={readonly}
                    />
                    <div className="buttons-wrapper">
                        <Button className="button" onClick={this._back}>Back</Button>
                        {!readonly &&
                        <Button className="button" type="submit">
                            {validationButtonName}
                        </Button>
                        }
                    </div>
                </form>
            </div>
        );

    }
}

ProductForm = reduxForm({
    form: 'product',
    destroyOnUnmount: true,
    validate,
})(ProductForm);

export default connect(
    state => {
        return {
            initialValues: {
                ...state.default.productToShow,
                creationDate: state.default.productToShow.creationDate.toISOString(),
            },
            products: state.default.products,
        };
    },
    (dispatch) => ({
        productForm: bindActionCreators({resetProductToShow}, dispatch),
    }),
)(ProductForm);