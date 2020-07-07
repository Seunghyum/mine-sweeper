import { observable } from 'mobx'

import Node from '~utils/Node'
import NodeIndexMapClass, { NodeIndexMapType } from '~utils/NodeIndexMap'

interface initCellIdTableProps {
  rows: number
  cols: number
  mines: number
}
export interface NodeStoreType {
  NodeIndexMap: NodeIndexMapType
  rootStore?: any
  initCellIdTable: (options: initCellIdTableProps) => any
}

export default class NodeStore {
  @observable NodeIndexMap: NodeIndexMapType = new NodeIndexMapClass()
  rootStore: any
  constructor(rootStore: any) {
    this.rootStore = rootStore
    const { rows, cols, mines } = this.rootStore.boardStore
    this.initCellIdTable({ rows: rows, cols: cols, mines: mines })
  }

  initCellIdTable = ({ rows, cols, mines }: initCellIdTableProps): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.NodeIndexMap = new NodeIndexMapClass()
      const mineStringArr: Set<any> | void = this.NodeIndexMap.initMineSet({ rows, cols, mines })
      if (!mineStringArr) return
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const index: [number, number] = [i, j]
          const node = new Node({
            index,
            hasMine: !!mineStringArr.has(`${i},${j}`),
          })
          this.NodeIndexMap.setIndexes({
            index,
            node,
            isCurrentRowFirstNode: j === cols - 1,
          })
        }
      }
      this.NodeIndexMap.updateMinesInIndexMap()
      resolve()
    })
    // this.NodeIndexMap = new NodeIndexMapClass()
    // const mineStringArr: Set<any> | void = this.NodeIndexMap.initMineSet({ rows, cols, mines })
    // if (!mineStringArr) return
    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     const index: [number, number] = [i, j]
    //     const node = new Node({
    //       index,
    //       hasMine: !!mineStringArr.has(`${i},${j}`),
    //     })
    //     this.NodeIndexMap.setIndexes({
    //       index,
    //       node,
    //       isCurrentRowFirstNode: j === cols - 1,
    //     })
    //   }
    // }
    // this.NodeIndexMap.updateMinesInIndexMap()
  }
}
