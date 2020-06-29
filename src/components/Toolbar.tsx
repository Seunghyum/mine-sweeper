// import { inject } from 'mobx-react'
import * as React from 'react'
import { useState } from 'react'

import { useStores } from '~helpers/useStores'

import { BoardConfig } from '../@types/index'

function Tools(props: BoardConfig): React.ReactElement<BoardConfig> {
  const { mines, cols, rows, flags, setSettings } = useStores()
  const [inputRows, setInputRows] = useState(rows)
  const [inputCols, setInputCols] = useState(cols)
  const [inputMines, setInputMines] = useState(mines)

  const onClickSetTable = () => {
    setSettings(inputRows, inputCols, inputMines)
  }

  return (
    <div className="tool-wrapper">
      <p>폭탄 수 : {mines}</p>
      <p>깃발 수 : {flags}</p>
      <div>
        <span>폭탄 수 조정 : </span>
        <input
          name="mines"
          type="number"
          value={inputMines}
          onChange={e => setInputMines(Number(e.target.value))}
        />
      </div>
      <div>
        <span>줄 : </span>
        <input
          name="rows"
          type="number"
          value={inputRows}
          onChange={e => setInputRows(Number(e.target.value))}
        />
      </div>
      <div>
        <span>열 : </span>
        <input
          name="cols"
          type="number"
          value={inputCols}
          onChange={e => setInputCols(Number(e.target.value))}
        />
      </div>
      <button onClick={onClickSetTable}> Start </button>
    </div>
  )
}
export default Tools
