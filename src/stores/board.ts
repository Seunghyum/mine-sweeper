import { action, computed, observable } from 'mobx'

export default class BoardStore {
  @observable rows = 8

  @observable cols = 8

  @observable mines = 8

  @observable flags = 0

  @computed
  get getBoardConfig() {
    const { rows, cols, mines, flags } = this

    return { rows, cols, mines, flags }
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
  increaseMines = (): void => {
    this.mines += 1
  }

  @action
  decreaseMines = (): void => {
    this.mines -= 1
  }

  @action
  setSettings = (rows: number, cols: number, mines: number): void => {
    this.mines = mines
    this.rows = rows
    this.cols = cols
  }
}
