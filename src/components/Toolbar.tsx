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
      <table className="tool-wrapper__dashboard">
        <tbody>
          <tr>
            <td>
              <img src="https://img.icons8.com/emoji/48/000000/bomb-emoji.png" />
            </td>
            <td>{mines}</td>
          </tr>
          <tr>
            <td>
              <img src="https://img.icons8.com/office/40/000000/filled-flag.png" />
            </td>
            <td>{flags}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p>Map Config (N X N)</p>
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
