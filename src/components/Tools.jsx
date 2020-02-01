import React, {Component} from 'react'
import { inject } from 'mobx-react';

@inject(stores => ({
  setSettings: stores.board.setSettings,
  rows: stores.board.rows,
  cols: stores.board.cols,
  flags: stores.board.flags,
  mines: stores.board.mines
}))
class Tools extends Component{
  constructor(props) {
    super(props)
    const {mines, cols, rows } = this.props
    this.state = {
      mines,
      cols, 
      rows
    }
    this.handleInput = this.handleInput.bind(this)
    this.onClickSetTable = this.onClickSetTable.bind(this)
  }
  handleInput(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onClickSetTable(rows, cols, mines) {
    const {setSettings} = this.props
    setSettings(rows,cols,mines)
  }
  render() {
    const {flags} = this.props
    const { mines, cols, rows} = this.state
    return (
      <div className="tool-wrapper">
        <p>폭탄 수 : {mines}</p>
        <p>깃발 수 : {flags}</p>
        <div>
          <span>폭탄 수 조정 : </span>
          <input name="mines" type="number" value={mines} onChange={this.handleInput}></input>
        </div>
        <div>
          <span>줄 : </span>
          <input name="rows" type="number" value={rows} onChange={this.handleInput}></input>
        </div>
        <div>
          <span>열 : </span>
          <input name="cols" type="number" value={cols} onChange={this.handleInput}></input>
        </div>
        <button onClick={() => this.onClickSetTable(rows, cols, mines)}> Start </button>
      </div>
    )
  }
}
export default Tools