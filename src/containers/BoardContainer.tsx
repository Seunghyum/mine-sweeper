import { useObserver } from 'mobx-react-lite'
import * as React from 'react'
import { ReactElement } from 'react'

import BoardCell from '~components/board/BoardCell'
import Toolbar from '~components/board/BoardToolbar'
import useForceUpdate from '~helpers/useForceUpdate'
import { useStores } from '~helpers/useStores'
import ConfettiBackground from '~src/components/ConfettiBackground'
import { NodeType } from '~utils/Node'

const Board = (): ReactElement<void, string> => {
  const { nodeStore } = useStores()
  const { boardStore } = useStores()
  const forceUpdate = useForceUpdate()

  const renderBoard = () => {
    const renderElements: JSX.Element[] = []
    nodeStore.NodeIndexMap.indexes.forEach((row: [], i: number) => {
      row.forEach((node: NodeType, j: number) => {
        renderElements.push(
          <BoardCell
            id={`cell-${i}-${j}`}
            index={[i, j]}
            node={node}
            isCellLoading={boardStore.isCellLoading}
            forceUpdate={forceUpdate}
            key={`cell-${i}-${j}`}
          />,
        )
      })
      renderElements.push(<div className="clear" key={`divider-${i}`} />)
    })

    return renderElements
  }

  return useObserver(() => (
    <>
      <Toolbar
        setSettings={boardStore.setSettings}
        isGameFailed={boardStore.isGameFailed}
        isGameSuccessed={boardStore.isGameSuccessed}
        setIsGameFailed={boardStore.setIsGameFailed}
        initSettings={boardStore.initSettings}
        opens={boardStore.opens}
        rows={boardStore.rows}
        cols={boardStore.cols}
        flags={boardStore.flags}
        mines={boardStore.mines}
      />
      <div className="board-wrapper confetti-wrapper">{renderBoard()}</div>

      <ConfettiBackground toggle={boardStore.isGameSuccessed} />
    </>
  ))
}
export default Board
