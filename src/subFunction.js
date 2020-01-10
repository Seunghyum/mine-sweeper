function setRandomArray(min, max){
  const rowIndex = Math.floor(Math.random()*(max-min+1)) + min
  const colIndex = Math.floor(Math.random()*(max-min+1)) + min
  return [rowIndex, colIndex]
}

function setMines(rows=8, cols=8, mines=8){
  if(rows * cols <= mines) return alert("Number of mines exceed total cells")

  let mineSet = new Set()
  let mineArray = []
  
  for(let i=0;i<mines;i++) {
    while(true) {
      const newMine = setRandomArray(1, cols)
      const newMineString = JSON.stringify(setRandomArray(1, cols))
      if(mineSet.has(newMineString)) continue
      mineSet.add(newMineString)
      mineArray.push(newMine)
      break
    }
  }
  return mineArray
}

export { setMines }