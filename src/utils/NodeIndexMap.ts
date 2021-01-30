import { NodeType } from './Node'

interface NodeMapType {
  index: [number, number]
  node: NodeType
}
interface initMineSetProps {
  rows: number
  cols: number
  mines: number
}

export interface NodeIndexMapType {
  indexes: [NodeType][] | [] | null
  mineSet: Set<string> | undefined
  setIndexes: (props: NodeMapType) => void
  initMineSet: (props: { rows: number; cols: number; mines: number }) => Set<string> | void
  initIndexes: () => void
  getNodeByIndex: (index: [number, number]) => any[]
  updateMinesInIndexMap: () => void
  openAdjacentNode: (index: NodeType) => void
  revealAllNodes: () => void
}

class NodeIndexMapClass implements NodeIndexMapType {
  indexes: any[] = []
  mineSet: Set<string> | undefined

  initMineSet = ({ rows, cols, mines }: initMineSetProps): Set<string> | void => {
    if (rows * cols < mines) return alert('Number of mines exceed total cells')

    this.mineSet = new Set()
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

  setIndexes({ index, node }: NodeMapType): void {
    const x = index[0]
    const y = index[1]
    if (!this.indexes[x]) this.indexes.push([])
    this.indexes[x][y] = node
  }

  initIndexes(): void {
    this.indexes = []
  }

  getNodeByIndex(index: [number, number]): [number, number] {
    const x = index[1]
    const y = index[0]

    return this.indexes[x][y]
  }

  updateMinesInIndexMap(): void {
    this.indexes.forEach(row => {
      row.forEach((node: NodeType) => {
        const [x, y] = node.index
        const adjacentTop = this.indexes[x - 1] ? this.indexes[x - 1][y] : null
        const adjacentBottom = this.indexes[x + 1] ? this.indexes[x + 1][y] : null
        const adjacentleft = this.indexes[x] ? this.indexes[x][y - 1] : null
        const adjacentRight = this.indexes[x] ? this.indexes[x][y + 1] : null
        if (adjacentTop) node.setTopNode(adjacentTop)
        if (adjacentBottom) node.setBottomNode(adjacentBottom)
        if (adjacentleft) node.setLeftNode(adjacentleft)
        if (adjacentRight) node.setRightNode(adjacentRight)
        if (node.hasMine) {
          const adjacentTopRight = this.indexes[x - 1] ? this.indexes[x - 1][y + 1] : null
          const adjacentTopLeft = this.indexes[x - 1] ? this.indexes[x - 1][y - 1] : null
          const adjacentBottomRight = this.indexes[x + 1] ? this.indexes[x + 1][y + 1] : null
          const adjacentBottomLeft = this.indexes[x + 1] ? this.indexes[x + 1][y - 1] : null
          if (adjacentTopRight && !adjacentTopRight.hasMine) adjacentTopRight.incrementAdjacent()
          if (adjacentTopLeft && !adjacentTopLeft.hasMine) adjacentTopLeft.incrementAdjacent()
          if (adjacentBottomRight && !adjacentBottomRight.hasMine)
            adjacentBottomRight.incrementAdjacent()
          if (adjacentBottomLeft && !adjacentBottomLeft.hasMine)
            adjacentBottomLeft.incrementAdjacent()
          if (adjacentTop && !adjacentTop.hasMine) adjacentTop.incrementAdjacent()
          if (adjacentBottom && !adjacentBottom.hasMine) adjacentBottom.incrementAdjacent()
          if (adjacentleft && !adjacentleft.hasMine) adjacentleft.incrementAdjacent()
          if (adjacentRight && !adjacentRight.hasMine) adjacentRight.incrementAdjacent()
        }
      })
    })
  }

  openAdjacentNode(node: NodeType): void {
    if (!node || node.hasMine) return
    if (node.isOpened) return
    node.setIsOpened(true)
    if (node.adjacent === 0) {
      this.openAdjacentNode(node.top)
      this.openAdjacentNode(node.bottom)
      this.openAdjacentNode(node.right)
      this.openAdjacentNode(node.left)
      this.openAdjacentNode(node.left?.bottom)
      this.openAdjacentNode(node.left?.top)
      this.openAdjacentNode(node.right?.bottom)
      this.openAdjacentNode(node.right?.top)
    }
  }

  revealAllNodes(): void {
    this.indexes.forEach(row => {
      row.forEach((node: NodeType) => {
        node.setIsOpened(true)
      })
    })
  }
}
export default NodeIndexMapClass
