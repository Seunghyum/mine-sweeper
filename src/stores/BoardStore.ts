import { action, computed, observable } from 'mobx'

export interface BoardStoreType {
  rows?: number
  cols?: number
  mines?: number
  flags?: number
  isGameFailed?: boolean
  isLoading?: boolean
  rootStore?: any
  increaseFlags?: () => void
  decreaseFlags?: () => void
  setSettings?: (rows: number, cols: number) => { rows: number; cols: number; mines: number }
  setIsGameFailed?: (boolean: boolean) => void
}

export default class BoardStore {
  @observable rows: number
  @observable cols: number
  @observable flags: number
  @observable isGameFailed = false
  @observable isLoading = false
  rootStore: any
  constructor(rootStore: any) {
    this.rootStore = rootStore
    this.initSettings()
  }

  @computed get mines(): number {
    return Math.floor((this.rows * this.cols) / 4)
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
  setSettings = (rows: number, cols: number): { rows: number; cols: number; mines: number } => {
    this.rows = rows
    this.cols = cols

    return {
      rows,
      cols,
      mines: this.mines,
    }
  }

  @action
  initSettings = (): void => {
    this.rows = 8
    this.cols = 8
    this.flags = 0
  }

  @action
  setIsGameFailed = (boolean: boolean): void => {
    this.isGameFailed = boolean
  }
}
