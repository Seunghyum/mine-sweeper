import React, {Component} from 'react'
import {inject} from 'mobx-react'

@inject(stores => ({
  increaseFlags: stores.board.increaseFlags,
  decreaseFlags: stores.board.decreaseFlags
}))
class Cell extends Component {
  constructor(props) {
    super(props);
    const {id, hasMine} = this.props
    this.state = {
      id: id,
      hasMine: hasMine,
      isOpened: false,
      isFlagged: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.setCellText = this.setCellText.bind(this)
  }
  handleClick(e) {
    if (e.type === 'click') { // left click
      if(!this.state.hasMine) this.setState({isOpened: true})
      else {
        alert('마인 건드림!')
      }
    } else if (e.type === 'contextmenu') { // right click
      if(!this.state.isOpened) {
        if(!this.state.isFlagged) this.props.increaseFlags()
        else this.props.decreaseFlags()
        this.setState({isFlagged: !this.state.isFlagged})
      }
    }
    this.setCellText()
  }

  setCellText() {
    if(this.state.isFlagged) return (<i className="fas fa-flag"></i>)
    else if(this.state.isOpened) return this.props.aroundMineCount || '0'
    else return ' '
  }

  render() {
    return (
      <div 
        className="cell" 
        onClick={(e) => this.handleClick(e)}
        onContextMenu={(e) => this.handleClick(e)}
      >
        {this.setCellText()}
      </div>
    )
  }
}
export default Cell