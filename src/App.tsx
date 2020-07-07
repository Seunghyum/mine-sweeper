import { useObserver } from 'mobx-react-lite'
import * as React from 'react'

import { useStores } from '~helpers/useStores'

import Board from './components/Board'
import Toolbar from './components/Toolbar'
function App(): React.ReactElement {
  const { boardStore } = useStores()

  return useObserver(() => (
    <div className="mine-sweeper-table">
      <Toolbar
        setSettings={boardStore.setSettings}
        isGameFailed={boardStore.isGameFailed}
        setIsGameFailed={boardStore.setIsGameFailed}
        rows={boardStore.rows}
        cols={boardStore.cols}
        flags={boardStore.flags}
        mines={boardStore.mines}
      />
      <Board />
    </div>
  ))
}

export default App
