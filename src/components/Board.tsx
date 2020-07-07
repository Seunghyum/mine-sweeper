import { useObserver } from 'mobx-react-lite'
import * as React from 'react'
import { ReactElement } from 'react'

import useForceUpdate from '~helpers/useForceUpdate'
import { useStores } from '~helpers/useStores'
import { NodeType } from '~utils/Node'

import BoardCell from './BoardCell'

const Board = (): ReactElement<void, any> => {
  const { nodeStore } = useStores()
  const forceUpdate = useForceUpdate()

  const renderBoard = () => {
    const renderElements: any = []
    nodeStore.NodeIndexMap.indexes.forEach((row: [], i: number) => {
      row.forEach((node: NodeType, j: number) => {
        renderElements.push(
          <BoardCell
            id={`cell-${i}-${j}`}
            index={[i, j]}
            node={node}
            forceUpdate={forceUpdate}
            key={`cell-${i}-${j}`}
          />,
        )
      })
      renderElements.push(<div className="clear" key={`divider-${i}`} />)
    })

    return renderElements
  }

  return useObserver(() => <div className="board-wrapper">{renderBoard()}</div>)
}
export default Board
