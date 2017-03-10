import React, { PropTypes, Component} from 'react';
import { render } from 'react-dom';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import style from './Product.scss'
import { browserHistory } from 'react-router';
import {editProduct, deleteProduct, showProduct, addProduct} from '../../actions/index'
import { connect } from 'react-redux'


export default class Product extends Component {
  static propTypes = {
    id: PropTypes.string,
    price: PropTypes.int,
    name: PropTypes.string,
    description: PropTypes.string,
    creationDate: PropTypes.date,
    deleteProduct: PropTypes.func,
    editProduct: PropTypes.func,
    saveProduct: PropTypes.func,
  }

  invokeCommand = (command, id, link)  => {
    command(id);
    if (link) {
      browserHistory.push(link);
    }
  }

  render() {
    console.log("Product Props", this.props);
    const { id, price, name, description, creationDate } = this.props;
    const { showProduct, deleteProduct, editProduct } = this.props;
    return (
      <div>
        <h3>{this.props.name}</h3>
        <ButtonToolbar>
          <Button bsStyle="info" onClick={() => this.invokeCommand(showProduct, id, '/info')}>Info</Button>
          <Button bsStyle="success" onClick={() => this.invokeCommand(editProduct, id, '/edit')}>Edit</Button>
          <Button bsStyle="danger" onClick={() => this.invokeCommand(deleteProduct, id, null)}>Delete</Button>
        </ButtonToolbar>
      </div>
    );
  }
}
