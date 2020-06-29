function setRandomArray(row: number, col: number) {
  const arr = Math.floor(Math.random() * (row * col + 1)) + 0
  const rowIndex = arr % row
  const colIndex = arr / row

  return [rowIndex, colIndex]
}

function setMines(rows = 8, cols = 8, mines = 8): number[][] | void {
  if (rows * cols < mines) return alert('Number of mines exceed total cells')

  const mineSet = new Set()
  const mineArray = []

  for (let i = 0; i < mines; i += 1) {
    while (true) {
      const newMine = setRandomArray(1, cols)
      const newMineString = JSON.stringify(setRandomArray(1, cols))
      if (!mineSet.has(newMineString)) {
        mineSet.add(newMineString)
        mineArray.push(newMine)
        break
      }
    }
  }

  return mineArray
}

export default { setMines }
