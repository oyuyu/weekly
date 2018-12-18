import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combinReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './router';

import rootReducer from './models/reducers';
import rootSaga from './models/effects';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

// import '../mock/user';
// import '../mock/assistant';

ReactDOM.render(
  <Provider store={store}>
    < App / >
  </Provider>
, document.getElementById('root'));
