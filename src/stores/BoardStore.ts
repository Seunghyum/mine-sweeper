import { action, computed, observable } from 'mobx'

import { RootStoreType } from './index'

export interface BoardStoreType {
  rows?: number
  cols?: number
  mines?: number
  flags?: number
  isGameFailed?: boolean
  isCellLoading?: boolean
  isLoading?: boolean
  rootStore?: RootStoreType
  increaseFlags?: () => void
  decreaseFlags?: () => void
  initFlags?: () => void
  setSettings?: (rows: number, cols: number) => { rows: number; cols: number; mines: number }
  setIsGameFailed?: (boolean: boolean) => void
  setIsCellLoading?: (boolean: boolean) => void
}

export default class BoardStore {
  @observable rows: number
  @observable cols: number
  @observable flags: number
  @observable isGameFailed = false
  @observable isLoading = false
  @observable isCellLoading = false
  rootStore: RootStoreType
  constructor(rootStore: RootStoreType) {
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
  initFlags = (): void => {
    this.flags = 0
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

  @action
  setIsCellLoading = (boolean: boolean): void => {
    this.isCellLoading = boolean
  }
}
