import React from 'react';
import App from './App';
import './index.css';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

// middleware that logs actions
const loggerMiddleware = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
});

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
