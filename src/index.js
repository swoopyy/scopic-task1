import React from 'react';
import ReactDOM, {render} from 'react-dom';
import App from './containers/app';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import {Provider} from 'react-redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({
    ...reducers,
    form: formReducer,
    routing: routerReducer
});
const store = createStoreWithMiddleware(reducer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <App history={history}/>
    </Provider>
), document.getElementById('root'));
