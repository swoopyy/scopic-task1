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
                    readOnly={field.readOnly}
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
                    disabled={field.readOnly}
                    value={field.input.value}
                    onChange={field.input.onChange}/>
            </FormGroup>
        );
    }

    _makeReadonlyObj = readonly => {
        let readonlyObj = {};
        if (readonly) {
            readonlyObj = {
                readOnly: true,
            };
        }
        return readonlyObj;
    };


    submitProduct = values => {
        let oldId = this.props.initialValues.id;
        const {edit, add} = this.props;
        let product = {
            ...values,
            creationDate: new Date(values.creationDate),
        }
        if (edit) {
            edit(oldId, product);
        } else if (add) {
            add(product);
        }
        this._back();
    }

    _back = () => {
        browserHistory.push('/');
        this.props.productForm.resetProductToShow();
    };

    render() {
        console.log(this.props);
        const {handleSubmit, readonly, validationButtonName} = this.props;
        let readonlyObj = this._makeReadonlyObj(readonly);
        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit(this.submitProduct)} className="product-form">
                    <Field
                        type="text"
                        name="id"
                        label="Id"
                        component={this.RenderInput}
                        {...readonlyObj}
                    />
                   <Field
                        type="text"
                        label="Creation Date"
                        name="creationDate"
                        component={this.RenderDatePicker}
                        {...readonlyObj}
                    />
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
        if (state.default.productToShow) {
            return {
                initialValues: {
                    ...state.default.productToShow,
                    creationDate: state.default.productToShow.creationDate.toISOString(),
                },
                products: state.default.products,
            };
        } else {
            return {
                initialValues: null,
                products: state.default.products,
            }
        }
    },
    (dispatch) => ({
        productForm: bindActionCreators({resetProductToShow}, dispatch),
    }),
)(ProductForm);