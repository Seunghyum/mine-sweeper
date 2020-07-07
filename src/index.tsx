import './assets/styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~src/App'
import RootStore from '~stores/index'

import { StoreProvider } from './helpers/useProvider'

const rootStore = new RootStore()

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
)
