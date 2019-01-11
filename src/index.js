// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, combinReducers } from 'redux';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';
//
// import App from './router';
//
// import rootReducer from './models/reducers';
// import rootSaga from './models/effects';
//
// const sagaMiddleware = createSagaMiddleware();
// const middleware = [thunk, sagaMiddleware, logger];
// const store = createStore(rootReducer, applyMiddleware(...middleware));
// sagaMiddleware.run(rootSaga);
//
// ReactDOM.render(
//   <Provider store={store}>
//     < App / >
//   </Provider>
// , document.getElementById('root'));

import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
    history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/user').default);
app.model(require('./models/okr').default);
app.model(require('./models/crew').default);
app.model(require('./models/focus').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
