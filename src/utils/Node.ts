export interface NodeType {
  index: [number, number] | null
  adjacent: number
  hasMine: boolean
  right: NodeType | null
  left: NodeType | null
  top: NodeType | null
  bottom: NodeType | null
  incrementAdjacent: () => void
}

class Node {
  index: [number, number] | null
  adjacent: number
  hasMine: boolean
  right: NodeType | null
  left: NodeType | null
  top: NodeType | null
  bottom: NodeType | null

  constructor(props: { hasMine: boolean; index: [number, number] }) {
    const { hasMine = false, index } = props
    this.index = index
    this.adjacent = 0
    this.hasMine = hasMine
    this.right = null
    this.left = null
    this.top = null
    this.bottom = null
  }

  incrementAdjacent(): void {
    this.adjacent += 1
  }

  // updateAdjacentZeroNodes() {
  //   if(this.adjacent === 0)
  // }
}

export default Node
