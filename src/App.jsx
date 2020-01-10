import React, {Component} from 'react';
import './App.css';
import Board from './Board'
import Tools from './Tools'
import { inject } from 'mobx-react';

@inject(stores => ({
  rows: stores.board.rows,
  cols: stores.board.cols,
  mines: stores.board.mines,
}))
class App extends Component {
  render() {
    const {rows, cols, mines} = this.props
    return (
      <div className="mine-sweeper-table">
        <Tools rows={rows} cols={cols} mines={mines} />
        <Board rows={rows} cols={cols} mines={mines} /> 
      </div>
    )
  }
}

export default App