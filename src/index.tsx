import './assets/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~src/App'
import RootStore from '~stores'

import { StoreProvider } from './helpers/useProvider'

ReactDOM.render(
  // <StoreProvider BoardStore={new BoardStore()} NodeStore={new NodeStore()}>
  <StoreProvider value={new RootStore()}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
)
