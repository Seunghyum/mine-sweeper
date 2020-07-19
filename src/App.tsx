import { useObserver } from 'mobx-react-lite'
import * as React from 'react'

import BoardContainer from '~containers/BoardContainer'
function App(): React.ReactElement {
  return useObserver(() => (
    <div className="mine-sweeper-table">
      <BoardContainer />
    </div>
  ))
}

export default App
