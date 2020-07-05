import { action, computed, observable } from 'mobx'

export interface BoardStoreType {
  rows?: number
  cols?: number
  mines?: number
  flags?: number
  rootStore?: any
  increaseFlags?: () => void
  decreaseFlags?: () => void
  setSettings?: (rows: number, cols: number) => void
}

export default class BoardStore {
  @observable rows: number
  @observable cols: number
  @observable flags: number
  rootStore: any
  constructor(rootStore: any) {
    this.rootStore = rootStore
    this.initSettings()
  }

  @computed get mines() {
    return Math.floor((this.rows * this.cols) / 3)
  }

  @action
  increaseFlags = (): void => {
    this.flags += 1
  }

  @action
  decreaseFlags = (): void => {
    this.flags -= 1
  }

  @action
  setSettings = (rows: number, cols: number): void => {
    this.rows = rows
    this.cols = cols
  }

  @action
  initSettings = (): void => {
    this.rows = 8
    this.cols = 8
    this.flags = 0
  }
}
