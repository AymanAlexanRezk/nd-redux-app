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
import { BrowserRouter } from 'react-router-dom';

function configureStore() {
  return createStore(reducer, {}, applyMiddleware(thunk, logger));
}
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
