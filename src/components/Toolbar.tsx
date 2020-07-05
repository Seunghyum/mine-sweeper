import { useObserver } from 'mobx-react-lite'
import * as React from 'react'
import { useState } from 'react'

import { useStores } from '~helpers/useStores'
import { BoardStoreType } from '~stores/BoardStore'

function Tools(props: BoardStoreType): React.ReactElement {
  const { rows, flags, mines, setSettings } = props
  const { initCellIdTable } = useStores().nodeStore
  const [defaultNumber, setDefaultNumber] = useState(rows)

  const onClickSetTable = () => {
    const options = setSettings(defaultNumber, defaultNumber)
    initCellIdTable(options)
  }

  return (
    <div className="tool-wrapper">
      <p>폭탄 수 : {mines}</p>
      <p>깃발 수 : {flags}</p>
      <div>
        <span>N X N: </span>
        <input
          name="rows"
          type="number"
          value={defaultNumber}
          onChange={e => setDefaultNumber(Number(e.target.value))}
        />
      </div>
      <button onClick={onClickSetTable}> Start </button>
    </div>
  )
}
export default Tools
