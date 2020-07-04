import { observable } from 'mobx'

import Node, { NodeType } from '~utils/Node'
import NodeIndexMapInstance, { NodeIndexMapType } from '~utils/NodeIndexMap'

export interface NodeStoreType {
  NodeIndexMap: NodeIndexMapType
  rootStore?: any
}

export default class NodeStore {
  @observable NodeIndexMap: NodeIndexMapType = NodeIndexMapInstance
  rootStore: any
  constructor(rootStore: any) {
    this.rootStore = rootStore
    const { rows, cols, mines } = this.rootStore.boardStore
    this.initCellIdTable({ rows: rows, cols: cols, mines: mines })
  }

  initCellIdTable = ({ rows, cols, mines }: { rows: number; cols: number; mines: number }): any => {
    // const mineStringArr: Set<any> | void = this.initMines({ rows, cols, mines })
    const mineStringArr: Set<any> | void = NodeIndexMapInstance.initMineSet({ rows, cols, mines })
    console.log('mineStringArr : ', mineStringArr)
    if (!mineStringArr) return
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let hasMine = false
        let isCurrentRowFirstNode = false
        const index: [number, number] = [i, j]
        if (mineStringArr.has(`${i},${j}`)) hasMine = true
        const node = new Node({
          index,
          hasMine,
        })
        if (j === cols - 1) isCurrentRowFirstNode = true
        this.NodeIndexMap.setIndexes({ index, node, isCurrentRowFirstNode })
        // tableRow.push(node)
      }
    }
    this.NodeIndexMap.updateMinesInIndexMap()
  }
}
