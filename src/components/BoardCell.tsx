import * as React from 'react'
import { useEffect, useState } from 'react'

import { useStores } from '~helpers/useStores'
interface Props {
  id: string
  hasMine: boolean
  aroundMineCount: number | void
  increaseFlags?: () => void
  decreaseFlags?: () => void
}

function BoardCell(props: Props): React.ReactElement<Props> {
  const { id, hasMine, aroundMineCount } = props
  const { increaseFlags, decreaseFlags } = useStores().boardStore

  const [isOpened, setIsOpened] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)
  const [mineCount, setMineCount] = useState(0)

  const setCellText = () => {
    if (isFlagged) return <i className="fas fa-flag" />
    if (isOpened) return aroundMineCount || '0'

    return ' '
  }

  const handleClick = (e: any) => {
    if (isOpened) return false
    e.preventDefault()
    if (e.type === 'click') {
      console.log('=====!!!')
      // left click
      if (!hasMine) setIsOpened(true)
      else {
        alert('마인 건드림!')
      }
    } else if (e.type === 'contextmenu') {
      // right click
      if (!isOpened) {
        if (!isFlagged) increaseFlags()
        else decreaseFlags()
        setIsFlagged(prev => !prev)
      }
    }
    // this.props.setZeroMineBoxes(id)
    setCellText()
  }

  useEffect(() => {
    setMineCount(aroundMineCount || 0)
  }, [aroundMineCount])

  return (
    <div
      id={id}
      className={`cell ${hasMine ? 'bomb' : ''}`}
      onClick={e => handleClick(e)}
      onContextMenu={e => handleClick(e)}
    >
      {isFlagged && <i className="fas fa-flag" />}
      {isOpened ? mineCount : undefined}
    </div>
  )
}
export default BoardCell
