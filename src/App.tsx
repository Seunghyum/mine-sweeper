import * as React from 'react'

import Board from './components/Board'
import Toolbar from './components/Toolbar'

function App(): React.ReactElement {
  return (
    <div className="mine-sweeper-table">
      <Toolbar />
      <Board />
    </div>
  )
}

export default App
