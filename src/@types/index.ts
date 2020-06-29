export interface BoardConfig {
  setSettings?: (rows: number, cols: number, mines: number) => void
  rows?: number
  cols?: number
  mines?: number
  flags?: number
  increaseFlags?: () => void
  decreaseFlags?: () => void
  increaseMines?: () => void
  decreaseMines?: () => void
}
