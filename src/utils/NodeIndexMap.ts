import { NodeType } from './Node'

export interface NodeIndexMapType {
  indexes: any[]
  currentRowFirstNode: NodeType | null
  setIndexes: (props: {
    index: [number, number]
    node: NodeType
    isCurrentRowFirstNode?: boolean
  }) => void
  initMineSet: (props: { rows: number; cols: number; mines: number }) => Set<any> | void
  initIndexes: () => void
  getNodeByIndex: (index: [number, number]) => any[]
  setCurrentRowFirstNode: (node: NodeType) => void
  updateMinesInIndexMap: () => void
}

class NodeIndexMap {
  indexes: any[] = []
  mineSet: Set<any> = new Set()
  currentRowFirstNode: NodeType | null = null

  initMineSet = ({
    rows,
    cols,
    mines,
  }: {
    rows: number
    cols: number
    mines: number
  }): Set<any> | void => {
    if (rows * cols < mines) return alert('Number of mines exceed total cells')
    const checkNumSet = new Set()
    for (let i = 0; i < mines; i++) {
      while (true) {
        const min = 1
        const max = rows * cols
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        if (checkNumSet.has(randomNum)) continue
        checkNumSet.add(randomNum)
        const rowTmp = randomNum % rows
        const rowIndex = rowTmp === 0 ? rows : rowTmp
        const colTmp = Math.floor(randomNum / cols)
        const colIndex = colTmp === 0 ? cols : colTmp
        const newMineIndex = [rowIndex - 1, colIndex - 1].toString()
        this.mineSet.add(newMineIndex)
        break
      }
    }

    return this.mineSet
  }

  setIndexes(props: { index: [number, number]; node: NodeType; isCurrentRowFirstNode?: boolean }) {
    const { index, node, isCurrentRowFirstNode } = props
    if (!this.currentRowFirstNode || isCurrentRowFirstNode) this.setCurrentRowFirstNode(node)
    const x = index[0]
    const y = index[1]
    console.log('this.indexes : ', this.indexes)
    if (!this.indexes[x]) this.indexes.push([])
    this.indexes[x][y] = node
  }

  initIndexes() {
    this.indexes = []
  }

  getNodeByIndex(index: [number, number]) {
    const x = index[1]
    const y = index[0]

    return this.indexes[x][y]
  }

  setCurrentRowFirstNode(node: NodeType) {
    this.currentRowFirstNode = node
  }

  updateMinesInIndexMap() {
    this.indexes.forEach(row => {
      row.forEach((node: NodeType) => {
        const [x, y] = node.index
        if (node.hasMine) {
          const adjacentTop = this.indexes[x - 1] ? this.indexes[x - 1][y] : null
          const adjacentTopRight = this.indexes[x - 1] ? this.indexes[x - 1][y + 1] : null
          const adjacentTopLeft = this.indexes[x - 1] ? this.indexes[x - 1][y - 1] : null
          const adjacentBottom = this.indexes[x + 1] ? this.indexes[x + 1][y] : null
          const adjacentBottomRight = this.indexes[x + 1] ? this.indexes[x + 1][y + 1] : null
          const adjacentBottomLeft = this.indexes[x + 1] ? this.indexes[x + 1][y - 1] : null
          const adjacentleft = this.indexes[x] ? this.indexes[x][y - 1] : null
          const adjacentRight = this.indexes[x] ? this.indexes[x][y + 1] : null
          if (adjacentTop && !adjacentTop.hasMine) adjacentTop.incrementAdjacent()
          if (adjacentTopRight && !adjacentTopRight.hasMine) adjacentTopRight.incrementAdjacent()
          if (adjacentTopLeft && !adjacentTopLeft.hasMine) adjacentTopLeft.incrementAdjacent()
          if (adjacentBottom && !adjacentBottom.hasMine) adjacentBottom.incrementAdjacent()
          if (adjacentBottomRight && !adjacentBottomRight.hasMine)
            adjacentBottomRight.incrementAdjacent()
          if (adjacentBottomLeft && !adjacentBottomLeft.hasMine)
            adjacentBottomLeft.incrementAdjacent()
          if (adjacentleft && !adjacentleft.hasMine) adjacentleft.incrementAdjacent()
          if (adjacentRight && !adjacentRight.hasMine) adjacentRight.incrementAdjacent()
        }
      })
    })
  }
}
export default new NodeIndexMap()
