import BoardStore, { BoardStoreType } from './BoardStore'
import NodeStore, { NodeStoreType } from './NodeStore'

export interface RootStoreType {
  boardStore: BoardStoreType
  nodeStore: NodeStoreType
}

class RootStore {
  boardStore: BoardStoreType
  nodeStore: NodeStoreType
  constructor() {
    this.boardStore = new BoardStore(this)
    this.nodeStore = new NodeStore(this)
  }
}

export default RootStore
