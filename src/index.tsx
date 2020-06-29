import './assets/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~src/App'

import { StoreProvider } from './helpers/useProvider'
import BoardStore from './stores/board'

ReactDOM.render(
  <StoreProvider value={new BoardStore()}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
)
