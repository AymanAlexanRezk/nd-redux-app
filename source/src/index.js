import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './components/App';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import reducer from '../src/reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function configureStore() {
  return createStore(reducer, {}, applyMiddleware(thunk, logger));
}
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
