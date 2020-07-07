import * as React from 'react'
import { useEffect, useState } from 'react'

import { useStores } from '~helpers/useStores'
import { NodeType } from '~utils/Node'
interface Props {
  id: string
  node: NodeType
  index: [number, number]
  isCellLoading: boolean
  forceUpdate: () => void
  increaseFlags?: () => void
  decreaseFlags?: () => void
}

function BoardCell(props: Props): React.ReactElement<Props> {
  const { id, node, index, forceUpdate, isCellLoading } = props
  const [x, y] = index
  const { boardStore } = useStores()
  const { nodeStore } = useStores()
  const { hasMine, adjacent, isOpened } = nodeStore.NodeIndexMap.indexes[x][y]
  const [isFlagged, setIsFlagged] = useState(false)

  const setCellText = () => {
    if (isFlagged) return <i className="fas fa-flag" />
    if (isOpened) return adjacent || '0'

    return ' '
  }

  const handleClick = (e: any) => {
    if (isOpened) return false
    e.preventDefault()
    if (e.type === 'click') {
      // left click
      if (!hasMine) {
        if (adjacent === 0) nodeStore.NodeIndexMap.openAdjacentNode(node)
        else node.setIsOpened()
      } else {
        nodeStore.NodeIndexMap.revealAllNodes()
        boardStore.setIsGameFailed(true)
      }
      forceUpdate()
    } else if (e.type === 'contextmenu') {
      // right click
      if (!isOpened) {
        if (!isFlagged) boardStore.increaseFlags()
        else boardStore.decreaseFlags()
        setIsFlagged(prev => !prev)
      }
    }
    setCellText()
  }

  const renderText = (): string | number => {
    return isCellLoading ? ' ' : node.isOpened ? node.adjacent || ' ' : ' '
  }

  useEffect(() => {
    if (isCellLoading) {
      setIsFlagged(false)
      boardStore.initFlags()
    }
  }, [isCellLoading])

  return (
    <div className="cell-wrapper">
      <div
        id={id}
        className={`
          cell 
          ${(isCellLoading && 'skeleton-cell') || ''}
          ${(isFlagged && !node.isOpened && 'flaged') || ''} 
          ${(hasMine && node.isOpened && 'bomb') || ''} 
          ${(node.isOpened && 'opened') || ''}
        `}
        onClick={e => handleClick(e)}
        onContextMenu={e => handleClick(e)}
      >
        {renderText()}
      </div>
    </div>
  )
}
export default BoardCell
