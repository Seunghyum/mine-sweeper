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
    this.setBoard = this.setBoard.bind(this)

    this.setAroundMineCount = this.setAroundMineCount.bind(this)
    this.setIsMine = this.setIsMine.bind(this)
  }

  setMines(rows=8, cols=8, mines=8) {
    if(rows * cols < mines) return alert("Number of mines exceed total cells")
    let numSet = new Set()
    let mineArray = []
    for(let i=0;i<mines;i++) {
      while(true) {
        const min = 1
        const max = rows * cols
        const randomNum = Math.floor( Math.random()*(max-min+1)) + min
        if(numSet.has(randomNum)) continue
        numSet.add(randomNum)
        const rowTmp = randomNum % rows
        const rowIndex = rowTmp === 0 ? rows : rowTmp
        const colTmp = Math.floor(randomNum/cols)
        const colIndex = colTmp === 0 ? cols : colTmp
        const newMineIndex = [rowIndex-1, colIndex-1]
        mineArray.push(newMineIndex)
        break
      }
    }
    return mineArray
  }

  setCellIdTable(rows, cols, mines) {
    const mineArray = this.setMines(rows,cols,mines)
    let cellIdMap = new Map() 
    mineArray.forEach(mine => {
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
      // console.log(`======${origin}======`)
      aroundMine.forEach(am => {
        const val = cellIdMap.get(am)
        if(am[0] < 0 || am[1] < 0) return false
        else if(typeof(val) === 'boolean') return false
        else if(typeof(val) === 'number') cellIdMap.set(am, val + 1)
        else if(val === undefined) cellIdMap.set(am, 1)
        // console.log(`${am} : ${val}`)
      })
    })
    return cellIdMap
  }
  
  setAroundMineCount(value) {
    if(typeof(value) === 'number') return value
  }

  setIsMine(value) {
    return value === true ? true : false
  }

  setBoard(rows, cols, mines) {
    const cellIdTable = this.setCellIdTable(rows, cols, mines)
    console.log('cellIdTable : ', cellIdTable)
    let elements = []
    for(let i=0;i<rows;i++) {
      for(let j=0;j<cols;j++) {
        const id = `[${i},${j}]`
        const value = cellIdTable.get(id)
        elements.push(
          <Cell id={id} 
                hasMine={this.setIsMine(value)} 
                aroundMineCount={this.setAroundMineCount(value)} 
                key={id + Math.random()} 
          />
        )
      }
      elements.push(<div className="clear" key={i + Math.random()}></div>)
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