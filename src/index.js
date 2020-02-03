import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
// import reduxThunk from "redux-thunk";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import { watchAuth, watchBurerBuilder, watchOrder } from './store/sagas/index';

// to merge different reducer into one root reducer
// all reducers will receive all the actions triggered so if two reducers having same actiontypes then in below order the reducer will receive the action
const rootReducer = combineReducers({
    order: orderReducer,
    auth: authReducer,
    burgerBuilder: burgerBuilderReducer
})

// to show the redux store in the development console tools
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

// reduxThunk : used to handle asynchronous actions in Redux
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(/* reduxThunk, */ sagaMiddleware)));
// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurerBuilder);
sagaMiddleware.run(watchOrder);

const app = (

/*    The <Provider /> makes the Redux store available to any nested components*/
<Provider store={store}>
        {/* A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.*/}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
