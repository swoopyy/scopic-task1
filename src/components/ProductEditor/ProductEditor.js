import React, { PropTypes, Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class ProductEditor extends Component {
  static propTypes = {
    id: PropTypes.string,
    price: PropTypes.int,
    name: PropTypes.string,
    description: PropTypes.string,
    creationDate: PropTypes.date,
  }

  render() {
    return (
      <div className="product-editor">
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default connect(
  state => { return {...state.default.productToShow}}
)(ProductEditor);
