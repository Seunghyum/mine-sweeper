// import { useBoardStore } from 'stores'
import 'mobx-react-lite/batchingForReactDom'

import { useObserver } from 'mobx-react-lite'
import * as React from 'react'
import { ReactElement, useEffect } from 'react'

import useForceUpdate from '~helpers/useForceUpdate'
import { useStores } from '~helpers/useStores'
import { NodeType } from '~utils/Node'

import BoardCell from './BoardCell'

interface Store {
  renderElement: ReactElement[] | void
}

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
            // hasMine={node.hasMine}
            // isOpened={node.isOpened}
            // adjacent={node.adjacent}
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

  return useObserver(() => <>{renderBoard()}</>)
}
export default Board
