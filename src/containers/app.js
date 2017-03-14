import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import ProductList from '../components/ProductList/ProductList';
import ProductEditor from '../components/ProductEditor/ProductEditor';
import ProductAppender from  '../components/ProductAppender/ProductAppender';
import ProductInfo from '../components/ProductInfo/ProductInfo';
import {bindActionCreators} from 'redux';

export default class App extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={ProductList}/>
                <Route path="/edit" component={ProductEditor}/>
                <Route path="/info" component={ProductInfo}/>
                <Route path="/add" component={ProductAppender}/>
            </Router>
        );
    }
}
