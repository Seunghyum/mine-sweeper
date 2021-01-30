import { action, computed, observable } from 'mobx'

import { RootStoreType } from './index'

export interface BoardStoreType {
  rows?: number
  cols?: number
  mines?: number
  opens?: number
  flags?: number
  faultFlags?: number
  isGameFailed?: boolean
  isGameSuccessed: boolean
  isCellLoading?: boolean
  isLoading?: boolean
  rootStore?: RootStoreType
  initSettings?: () => void
  increaseFlags?: () => void
  decreaseFlags?: () => void
  increaseFaultFlags?: () => void
  decreaseFaultFlags?: () => void
  initFlags?: () => void
  setSettings?: (rows: number, cols: number) => { rows: number; cols: number; mines: number }
  setIsGameFailed?: (boolean: boolean) => void
  setIsCellLoading?: (boolean: boolean) => void
}

export default class BoardStore {
  @observable rows = 8
  @observable cols = 8
  @observable flags: number
  @observable faultFlags = 0
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

  @computed get isGameSuccessed(): boolean {
    if (this.flags === this.mines && this.faultFlags === 0) return true

    return false
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
  increaseFaultFlags = (): void => {
    this.faultFlags += 1
  }

  @action
  decreaseFaultFlags = (): void => {
    this.faultFlags -= 1
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
    this.flags = 0
    this.faultFlags = 0
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
