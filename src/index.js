import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import BoardStore from './stores/board'; 

const board = new BoardStore()

ReactDOM.render(
  <Provider board={board}>
    <App />
  </Provider>
  , document.getElementById('root'));