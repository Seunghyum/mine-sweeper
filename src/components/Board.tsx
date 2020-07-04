// import { useBoardStore } from 'stores'
import 'mobx-react-lite/batchingForReactDom'

import { useObserver } from 'mobx-react-lite'
import * as React from 'react'
import { ReactElement, useEffect } from 'react'

import { useStores } from '~helpers/useStores'
import { NodeType } from '~utils/Node'

import Cell from './BoardCell'

interface Store {
  renderElement: ReactElement[] | void
}

const Board = (): ReactElement<void, any> => {
  const { boardStore, nodeStore } = useStores()

  // useEffect((): void => {
  //   console.log('nodeStore : ', nodeStore)
  //   nodeStore.NodeIndexMap.indexes.forEach(row => {
  //     row.forEach(el => {

  //     })
  //   });
  // }, [])

  // const initMines = (rows: number, cols: number, mines: number): number[][] | void => {
  //   if (rows * cols < mines) return alert('Number of mines exceed total cells')
  //   const numSet = new Set()
  //   const mineArr = []
  //   for (let i = 0; i < mines; i++) {
  //     while (true) {
  //       const min = 1
  //       const max = rows * cols
  //       const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  //       if (numSet.has(randomNum)) continue
  //       numSet.add(randomNum)
  //       const rowTmp = randomNum % rows
  //       const rowIndex = rowTmp === 0 ? rows : rowTmp
  //       const colTmp = Math.floor(randomNum / cols)
  //       const colIndex = colTmp === 0 ? cols : colTmp
  //       const newMineIndex = [rowIndex - 1, colIndex - 1]
  //       mineArr.push(newMineIndex)
  //       break
  //     }
  //   }

  //   return mineArr
  // }

  // const initCellIdTable = (rows: number, cols: number, mines: number) => {
  //   const mineArray = initMines(rows, cols, mines)
  //   const cellIndexMap = new Map()
  //   mineArray &&
  //     mineArray.forEach(mine => {
  //       cellIndexMap.set(mine, true)

  //       const up = [mine[0], mine[1] + 1]
  //       const upRight = [mine[0] + 1, mine[1] + 1]
  //       const upLeft = [mine[0] - 1, mine[1] + 1]
  //       const left = [mine[0] - 1, mine[1]]
  //       const right = [mine[0] + 1, mine[1]]
  //       const down = [mine[0], mine[1] - 1]
  //       const downRight = [mine[0] + 1, mine[1] - 1]
  //       const downleft = [mine[0] - 1, mine[1] - 1]
  //       const aroundMine = [up, upRight, upLeft, left, right, down, downRight, downleft]
  //       aroundMine.forEach(am => {
  //         const val = cellIndexMap.get(am)
  //         if (am[0] < 0 || am[1] < 0) return false
  //         if (typeof val === 'boolean') return false
  //         if (typeof val === 'number') return cellIndexMap.set(am, val + 1)
  //         if (val === undefined) return cellIndexMap.set(am, 1)
  //       })
  //     })

  //   return cellIndexMap
  // }

  // const setAroundMineCount = (value: number | void): number | void => {
  //   if (typeof value === 'number') return value

  //   return null
  // }

  // const initBoard = (props: any) => {
  //   const { rows, cols, mines } = props
  //   const cellIdTable = initCellIdTable(rows, cols, mines)
  //   const elements = []
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       const id = [i, j]
  //       const value = cellIdTable.get(id)
  //       elements.push(
  //         <Cell
  //           id={id}
  //           hasMine={value === true}
  //           aroundMineCount={setAroundMineCount(value)}
  //           key={`cell-${i}-${j}`}
  //         />,
  //       )
  //     }
  //     elements.push(<div className="clear" key={i + Math.random()} />)
  //   }

  //   return elements
  // }
  const renderBoard = () => {
    const renderElements: any = []
    nodeStore.NodeIndexMap.indexes.forEach((row: [], i: number) => {
      row.forEach((node: NodeType, j: number) => {
        renderElements.push(
          <Cell
            id={`cell-${i}-${j}`}
            hasMine={node.hasMine}
            aroundMineCount={node.adjacent}
            key={`cell-${i}-${j}`}
          />,
        )
      })
      renderElements.push(<div className="clear" key={`divider-${i}`} />)
    })

    return renderElements
  }

  // return useObserver(() => <>{initBoard(boardStore)}</>)
  return useObserver(() => <>{renderBoard()}</>)
}
export default Board
