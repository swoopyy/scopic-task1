import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import {Field, reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetProductToShow } from '../../actions/index'

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import dateformat from 'dateformat';

import './ProductForm.css';

const validate = values => {
    let errors = {};
    if (!values.price) {
        errors.price = "Required";
    } else if (isNaN(values.price)) {
        errors.price = "NaN";
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
        onSubmit: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }


    _getValidationState = field => {
        if (this.props.readonly) {
            return null;
        } else if (field.meta.error) {
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
                    type={field.type}
                    value={field.input.value}
                    componentClass={field.componentClass}
                    onChange={field.input.onChange} />
                <FormControl.Feedback />
            </FormGroup>
        );
    };

    _makeReadonlyObj = readonly => {
        let readonlyObj = {};
        if (readonly) {
            readonlyObj = {
                readOnly: true,
            };
        }
        return readonlyObj;
    };

    _back = () => {
        browserHistory.push('/');
        this.props.productForm.resetProductToShow();
    };

    submitProduct = values => {
        let product = {
            ...values,
            id: this.props.initialValues.id,
            creationDate: this.props.initialValues.creationDate,
        }
        this.props.onSubmit(product);
        this._back();
    }

    render() {
        const {handleSubmit, readonly, validationButtonName} = this.props;
        let readonlyObj = this._makeReadonlyObj(readonly);
        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit(this.submitProduct)} className="product-form">
                    {readonly && <Field
                                    type="text"
                                    name="id"
                                    label="Id"
                                    component={this.RenderInput}
                                    {...readonlyObj}
                    />}
                    {readonly && <Field
                                    type="text"
                                    label="Creation Date"
                                    name="creationDate"
                                    component={this.RenderInput}
                                    {...readonlyObj}
                    />}
                    <Field
                        type="text"
                        label="Price"
                        name="price"
                        component={this.RenderInput}
                        {...readonlyObj}
                    />
                    <Field
                        type="text"
                        label="Name"
                        name="name"
                        component={this.RenderInput}
                        {...readonlyObj}
                    />
                    <Field
                        type="text"
                        label="Description"
                        name="description"
                        componentClass="textarea"
                        component={this.RenderInput}
                        {...readonlyObj}
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
    destroyOnUnmount: false,
    enableReinitialize: true,
    validate,
})(ProductForm);

export default connect(
    state => {
        return {
            initialValues: {
                ...state.default.productToShow,
                creationDate: dateformat(state.default.creationDate, "mediumDate"),
            }
        }
    },
    (dispatch) => ({
        productForm: bindActionCreators({resetProductToShow}, dispatch),
    }),
)(ProductForm);