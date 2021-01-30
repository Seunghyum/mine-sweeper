import * as React from 'react'
import { useEffect, useState } from 'react'

import { useStores } from '~helpers/useStores'
import { BoardStoreType } from '~stores/BoardStore'

function BoardToolbar(props: BoardStoreType): React.ReactElement {
  const {
    rows,
    flags,
    mines,
    setSettings,
    isGameFailed,
    isGameSuccessed,
    setIsGameFailed,
    initSettings,
  } = props
  const { initCellIdTable } = useStores().nodeStore
  const { setIsCellLoading } = useStores().boardStore
  const [defaultNumber, setDefaultNumber] = useState(rows)

  const onClickSetTable = () => {
    const options = setSettings(defaultNumber, defaultNumber)
    setIsGameFailed(false)
    setIsCellLoading(true)
    initSettings()

    initCellIdTable(options).then(() =>
      setTimeout(() => {
        setIsCellLoading(false)
      }, 500),
    )
  }

  const renderFaceIcon = () => {
    if (isGameFailed) return 'https://img.icons8.com/emoji/48/000000/loudly-crying-face.png'
    if (isGameSuccessed) return 'https://img.icons8.com/emoji/48/000000/partying-face.png'

    return 'https://img.icons8.com/emoji/48/000000/slightly-smiling-face.png'
  }

  return (
    <div className="tool-wrapper">
      <p>Map Config (N X N)</p>
      <div>
        <input
          className="number-pick"
          name="rows"
          type="number"
          value={defaultNumber}
          onChange={e => setDefaultNumber(Number(e.target.value))}
        />
        <button className="btn-start" onClick={onClickSetTable}>
          {<img src={renderFaceIcon()} />}
        </button>
      </div>
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
    </div>
  )
}

export default BoardToolbar
