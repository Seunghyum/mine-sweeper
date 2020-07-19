export interface NodeType {
  index: [number, number] | null
  adjacent: number
  hasMine: boolean
  isOpened: boolean
  right: NodeType | null
  left: NodeType | null
  top: NodeType | null
  bottom: NodeType | null
  incrementAdjacent: () => void
  setTopNode: (node: NodeType) => void
  setBottomNode: (node: NodeType) => void
  setLeftNode: (node: NodeType) => void
  setRightNode: (node: NodeType) => void
  setIsOpened: (boolean: boolean) => void
}

class Node implements NodeType {
  index: [number, number] | null
  adjacent: number
  hasMine: boolean
  isOpened: boolean
  right: NodeType | null
  left: NodeType | null
  top: NodeType | null
  bottom: NodeType | null

  constructor({ hasMine = false, index }: { hasMine: boolean; index: [number, number] }) {
    this.index = index
    this.adjacent = 0
    this.hasMine = hasMine
    this.isOpened = false
    this.right = null
    this.left = null
    this.top = null
    this.bottom = null
  }

  incrementAdjacent(): void {
    this.adjacent += 1
  }

  setLeftNode(node: NodeType): void {
    this.left = node
  }
  setTopNode(node: NodeType): void {
    this.top = node
  }
  setRightNode(node: NodeType): void {
    this.right = node
  }
  setBottomNode(node: NodeType): void {
    this.bottom = node
  }
  setIsOpened(boolean: boolean): void {
    this.isOpened = boolean
  }
}

export default Node
