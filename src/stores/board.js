import { observable, action } from 'mobx';

export default class BoardStore {
  @observable rows = 8;
  @observable cols = 8;
  @observable mines = 8;
  @observable flags = 0;

  @action increaseFlags = () => {
    this.flags++;
  }

  @action decreaseFlags = () => {
    this.flags--;
  }

  @action increaseMines = () => {
    this.mines++;
  }

  @action decreaseMines = () => {
    this.mines--;
  }

  @action setSettings = (rows, cols, mines) => {
    console.log("setSettings rows : ", rows)
    console.log("setSettings cols : ", cols)
    console.log("setSettings mines : ", mines)
    this.mines = mines
    this.rows = rows
    this.cols = cols
  }
}