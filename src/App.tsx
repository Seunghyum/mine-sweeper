import { useObserver } from 'mobx-react-lite'
import * as React from 'react'

import { useStores } from '~helpers/useStores'

import Board from './components/Board'
import Toolbar from './components/Toolbar'
function App(): React.ReactElement {
  const { cols, rows, flags, mines, setSettings } = useStores().boardStore

  return useObserver(() => (
    <div className="mine-sweeper-table">
      <Toolbar setSettings={setSettings} rows={rows} cols={cols} flags={flags} mines={mines} />
      <Board />
    </div>
  ))
}

export default App
