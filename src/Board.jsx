import React, {Component} from 'react'
import Cell from './Cell'
import { inject  } from 'mobx-react';

@inject(stores => ({
  rows: stores.board.rows,
  cols: stores.board.cols,
  mines: stores.board.mines
}))
class Board extends Component {
  constructor(props) {
    super(props)

    this.setHasMine = this.setHasMine.bind(this)
    this.setAroundMineCount = this.setAroundMineCount.bind(this)

    this.setRandomArray = this.setRandomArray.bind(this)
    this.setMines = this.setMines.bind(this)
    this.setCellIdTable = this.setCellIdTable.bind(this)
    this.setBoard = this.setBoard.bind(this)
  }

  componentDidMount() {
    this.setBoard()
  }

  setRandomArray(min, max){
    const rowIndex = Math.floor(Math.random()*(max-min+1)) + min
    const colIndex = Math.floor(Math.random()*(max-min+1)) + min
    return [rowIndex, colIndex]
  }
  
  setMines(rows=8, cols=8, mines=8){
    if(rows * cols <= mines) return alert("Number of mines exceed total cells")
  
    let mineSet = new Set()
    let mineArray = []
    
    for(let i=0;i<mines;i++) {
      while(true) {
        const newMine = this.setRandomArray(1, cols)
        const newMineString = JSON.stringify(newMine)
        if(mineSet.has(newMineString)) continue
        mineSet.add(newMineString)
        mineArray.push(newMine)
        break
      }
    }
    return mineArray
  }

  setCellIdTable(rows, cols, mines) {
    const minesArray = this.setMines(rows,cols,mines)
    let cellIdMap = new Map() 
    minesArray.forEach((mine) => {
      const origin = JSON.stringify(mine)
      cellIdMap.set(origin, true)

      const up = JSON.stringify([mine[0], mine[1]+1])
      const upRight = JSON.stringify([mine[0]+1, mine[1]+1])
      const upLeft = JSON.stringify([mine[0]-1, mine[1]+1])
      const left = JSON.stringify([mine[0]-1, mine[1]])
      const right = JSON.stringify([mine[0]+1, mine[1]])
      const down = JSON.stringify([mine[0], mine[1]-1])
      const downRight = JSON.stringify([mine[0]+1, mine[1]-1])
      const downleft = JSON.stringify([mine[0]-1, mine[1]-1])
      const aroundMine = [
        up,
        upRight,
        upLeft,
        left,
        right,
        down,
        downRight,
        downleft,
      ]
      aroundMine.forEach(am => {
        if(typeof(cellIdMap.get(am)) === 'number') cellIdMap.set(am, cellIdMap.get(am) + 1)
        else if(cellIdMap.get(am) === undefined) cellIdMap.set(am, 1)
      })
    })
    return cellIdMap
  }

  setHasMine(value) {
    if(value === true) return true
    else return false
  }
  
  setAroundMineCount(value) {
    if(typeof(value) === 'number') return value
  }

  setBoard(rows, cols, mines) {
    const cellIdTable = this.setCellIdTable(rows, cols, mines)
    let elements = []
    for(let i=0;i<rows;i++) {
      for(let j=0;j<cols;j++) {
        const id = `[${j},${i}]`
        const value = cellIdTable.get(id)
        elements.push(
          <Cell id={id} 
                hasMine={this.setHasMine(value)} 
                aroundMineCount={this.setAroundMineCount(value)} 
                key={id + Math.random()} 
          />)
      }
      elements.push(<div className="clear" key={i}></div>)
    }
    return elements
  }

  render() {
    const {rows,cols,mines} = this.props
    return (
      <div>{this.setBoard(rows,cols,mines)}</div>
    )
  }
}
export default Board