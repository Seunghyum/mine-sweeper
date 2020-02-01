import React from 'react'

/*
 *  Board Status contstant
 */
var BoardStatus = {
    COMPLETED: "completed",
    FAILURE: "failure"
};

/** 
 * Class to defined board cell model
 */
class Cell {
    /**
     * cellId is required.
     * cellOptions param has properties as hasMine, mineCount, isFlagged, isClicked, isOpened.
     * Cell only holds info related to cell.
     */
    constructor(cellId, cellOptions) {
        this._id = cellId;
        if (cellOptions) {
            this._hasMine = cellOptions.hasMine;
            this._isFlagged = cellOptions.isOpened;
            this._isClicked = cellOptions.isClicked;
            this._isOpened = cellOptions.isOpened;
            this._mineCount = cellOptions.mineCount;
        }
    }

    getId() {
        return this._id;
    }
    hasMine() {
        return this._hasMine;
    }
    isOpened() {
        return this._isOpened;
    }
    isClicked() {
        return this._isClicked;
    }
    isFlagged() {
        return this._isFlagged;
    }
    getMineCount() {
        return this._mineCount;
    }
    setMineCount(mineCount) {
        this._mineCount = mineCount;
    }
    setAsFlagged(isFlagged) {
        this._isFlagged = isFlagged;
    }
    setAsOpened() {
        this._isOpened = true;
    }
    setAsClicked() {
        this._isClicked = true;
    }
};

/** 
 * Class to defined mine sweeper board model
 */
class Board {
    /**
     * Board is initialized by adding cells which has mines to _boardCells property
     * Board holds information about cells placed in board, total mines, flags, board size. 
     * Cell can be retrieved by row and column position in board.
     */
    constructor(rows, columns, totalMines) {
        // Setting defaults.
        rows = rows || 12;
        columns = columns || 10;
        totalMines = totalMines || 50;
        var totalCells = rows * columns,
            boardCells = {},
            cellKey, cellVal;
        // Total mines can not be more than total board cells.
        totalMines = Math.min(totalCells, totalMines);

        this._rows = rows;
        this._columns = columns;
        this._remainingFlags = totalMines;
        this._totalMines = totalMines;

        // Add cells with mines untill totalMines is 0. 
        /* OLD
        while(totalMines > 0){
            cellKey = Math.floor(Math.random() * totalCells)
            if(!boardCells[cellKey]){
                boardCells[cellKey] = new Cell(cellKey, {hasMine: true});
                totalMines--;
            }
        }
        */
        // NEW
        var cellKeys = new Array(totalCells);
        for (let i = 0; i < totalMines; i++) {
            cellKey = Math.floor(Math.random() * totalCells);
            cellVal = cellKeys[cellKey] === undefined ? cellKey : cellKeys[cellKey];
            cellKeys[cellKey] = cellKeys[i] === undefined ? i : cellKeys[i];
            cellKeys[i] = cellVal;
        }
        for (let i = 0; i < totalMines; i++) {
            cellKey = cellKeys[i];
            boardCells[cellKey] = new Cell(cellKey, {
                hasMine: true
            });
        }
        // END NEW
        this._boardCells = boardCells;
        this._openCells = 0;
    }

    getRows() {
        return this._rows;
    }

    getColumns() {
        return this._columns;
    }

    getCell(row, column) {
        var cellId = row * this._columns + column;
        return this._getCellById(cellId);
    }

    getRemainingFlags() {
        return this._remainingFlags;
    }

    getStatus() {
        return this._status;
    }

    /** 
     * Callback funtion for onRightClick
     * Toggle flag and increase or decrease remaining flag count
     * Update status if board is completed
     */
    toggleCellFlag(cellRow, cellColumn) {
        var cell = this.getCell(cellRow, cellColumn);
        if (cell.isFlagged()) {
            cell.setAsFlagged(false);
            this._remainingFlags++;
        } else {
            cell.setAsFlagged(true);
            this._remainingFlags--;
            this._updateStatusIfBoardCompleted()
        }
        this._addCellToBoard(cell);
    }

    /**
     * Callback function for cell onClick
     * If cell has mine, set board status to falure.
     * Else look for neighbor cells to find mine counts and update status if board is completed
     * 
     */
    clickCell(cellRow, cellColumn) {
        var cell = this.getCell(cellRow, cellColumn);
        cell.setAsClicked();
        if (cell.hasMine()) {
            this._status = BoardStatus.FAILURE;
            this._markAllMineCellsOpened()
        } else {
            this._lookForCellNeighborsAndOpen(cellRow, cellColumn);
            this._updateStatusIfBoardCompleted()
        }
    }

    /**
     * get cell from _boardCell object by cellId as key.
     * If cell is not present for the given key, return new cell.
     */
    _getCellById(cellId) {
        return this._boardCells[cellId] || new Cell(cellId);
    }

    /**
     * Add cell to board
     */
    _addCellToBoard(cell) {
        this._boardCells[cell.getId()] = cell;
    }

    /**
     * Loop through all cell and check if all cells are flagged or opened. 
     * If yes then set status to 'completed'
     */
    _updateStatusIfBoardCompleted() {
        if (this._status) {
            return;
        }
        var boardCompleted = (this._openCells + this._totalMines) === this._rows * this._columns && this._remainingFlags === 0;
        if (boardCompleted) {
            this._status = BoardStatus.COMPLETED;
        }

    }

    /**
     * Loop through board and set as opened if cell has mine.
     * Funtion is called to display all mine's positions when board status is failure.
     */
    _markAllMineCellsOpened() {
        for (var cellKey in this._boardCells) {
            this._boardCells[cellKey].setAsOpened();
        }
    }

    /**
     * For a cell loop through all neighbor cells and update mine count.
     * If none of the neighbor cell has mine, loop through neighbor cells and update minecount.
     * Recursively follow the process for not opened cells untill find neighors with mine count.
     */
    _lookForCellNeighborsAndOpen(cellRow, cellColumn) {
        var cell = this.getCell(cellRow, cellColumn),
            cellNeighbors = this._findCellNeighbors(cellRow, cellColumn),
            mineCount = cellNeighbors.filter(function (cellNeighbor) {
                return cellNeighbor.cell.hasMine();
            }).length;
        cell.setAsOpened();;
        this._addCellToBoard(cell)
        this._openCells++;
        if (mineCount > 0) {
            cell.setMineCount(mineCount);
        } else if (!cell.hasMine()) {
            cellNeighbors.forEach(function (cellNeighbor) {
                if (!cellNeighbor.cell.isOpened()) {
                    this._lookForCellNeighborsAndOpen(cellNeighbor.row, cellNeighbor.column);
                }
            }.bind(this));
        }
    }

    /**
     * Find valid neighbor cells
     */
    _findCellNeighbors(cellRow, cellColumn) {
        var cellNeighbors = [],
            neighborCell;
        if (cellColumn - 1 >= 0) {
            neighborCell = this._createNeighborCell(cellRow, cellColumn - 1);
            neighborCell && cellNeighbors.push(neighborCell);
        }
        if (cellColumn + 1 < this._columns) {
            neighborCell = this._createNeighborCell(cellRow, cellColumn + 1);
            neighborCell && cellNeighbors.push(neighborCell);
        }
        if (cellRow - 1 >= 0) {
            neighborCell = this._createNeighborCell(cellRow - 1, cellColumn);
            neighborCell && cellNeighbors.push(neighborCell);
            if (cellColumn - 1 >= 0) {
                neighborCell = this._createNeighborCell(cellRow - 1, cellColumn - 1);
                neighborCell && cellNeighbors.push(neighborCell);
            }
            if (cellColumn + 1 < this._columns) {
                neighborCell = this._createNeighborCell(cellRow - 1, cellColumn + 1);
                neighborCell && cellNeighbors.push(neighborCell);
            }
        }
        if (cellRow + 1 < this._rows) {
            neighborCell = this._createNeighborCell(cellRow + 1, cellColumn);
            neighborCell && cellNeighbors.push(neighborCell);
            if (cellColumn - 1 >= 0) {
                neighborCell = this._createNeighborCell(cellRow + 1, cellColumn - 1);
                neighborCell && cellNeighbors.push(neighborCell);
            }
            if (cellColumn + 1 < this._columns) {
                neighborCell = this._createNeighborCell(cellRow + 1, cellColumn + 1);
                neighborCell && cellNeighbors.push(neighborCell);
            }
        }
        return cellNeighbors;
    }

    _createNeighborCell(row, column) {
        var cell = this.getCell(row, column);
        if (this._validNeighborCell(cell)) {
            return {
                cell: cell,
                row: row,
                column: column
            }
        }
    }
    _validNeighborCell(cell) {
        return cell.hasMine() || !cell.isOpened();
    }
}

/**
 * Cell React Component, renders cell and handles cell click events 
 */
var CellRC = React.createClass({
    // propTypes: {
    //     cell: React.PropTypes.instanceOf(Cell),
    //     row: React.PropTypes.number,
    //     column: React.PropTypes.number,
    //     onClick: React.PropTypes.func,
    //     onRightClick: React.PropTypes.func
    // },
    render: function () {
        var cell = this.props.cell,
            cellClassName = "cell",
            iconClassName, icon, mineCount, mineCountElement;
        if (cell.hasMine()) {
            cellClassName += " mine";
            if (cell.isClicked()) {
                cellClassName += " clicked";
            }
            if (cell.isOpened()) {
                iconClassName = "fa fa-bomb";
            }
        }
        if (cell.isFlagged()) {
            cellClassName += " flagged";
            iconClassName = "fa fa-flag";
        }
        if (cell.isOpened()) {
            cellClassName += " opened";
            mineCount = cell.getMineCount();
            if (mineCount && !cell.isFlagged()) {
                mineCountElement = < span className = {
                    "mine-count-" + mineCount
                } > {
                    mineCount
                } < /span>
            }
        }
        if (iconClassName) {
            icon = < i className = {
                iconClassName
            } > < /i>
        }
        return <div className = {
            cellClassName
        }
        onClick = {
            this._onClick
        }
        onContextMenu = {
                this._onRightClick
            } > {
                icon
            } {
                mineCountElement
            } <
            /div>;
    },
    _onClick: function () {
        if (!this.props.cell.isOpened() && !this.props.cell.isFlagged()) {
            this.props.onClick(this.props.row, this.props.column);
        }
    },
    _onRightClick: function (event) {
        event.preventDefault();
        if (!this.props.cell.isOpened() || this.props.cell.isFlagged()) {
            this.props.onRightClick(this.props.row, this.props.column);
        }
    }
});

/**
 * Board React component, renders the mine sweepers board
 */
var BoardRC = React.createClass({
            propTypes: {
                board: React.PropTypes.instanceOf(Board),
                onBoardCellClick: React.PropTypes.func,
                onBoardCellRightClick: React.PropTypes.func
            },
            render: function () {
                var cells = [],
                    rows, rowsCount, columnsCount;
                if (this.props.board) {
                    rowsCount = this.props.board.getRows();
                    columnsCount = this.props.board.getColumns()
                    for (var i = 0; i < rowsCount; i++) {
                        rows = [];
                        for (var j = 0; j < columnsCount; j++) {
                            rows.push( < CellRC className = "cell"
                                cell = {
                                    this.props.board.getCell(i, j)
                                }
                                onClick = {
                                    this.props.onBoardCellClick
                                }
                                onRightClick = {
                                    this.props.onBoardCellRightClick
                                }
                                row = {
                                    i
                                }
                                column = {
                                    j
                                }
                                key = {
                                    j
                                }
                                />)
                            }
                            cells.push( < div className = "rows"
                                key = {
                                    i
                                } > {
                                    rows
                                } < /div>) 
                            }
                        }
                        return <div className = "board" > {
                                cells
                            } <
                            /div>;
                    }
                });

            /**
             * Header React component, renders remaining flags, status and button to restart game.
             */
            var HeaderRC = React.createClass({
                propTypes: {
                    onButtonClick: React.PropTypes.func,
                    status: React.PropTypes.string,
                    remainingFlags: React.PropTypes.number
                },
                render: function () {
                    var statusMessage = ""
                    if (this.props.status === BoardStatus.FAILURE) {
                        statusMessage = "GAME OVER"
                    } else if (this.props.status === BoardStatus.COMPLETED) {
                        statusMessage = "COMPLETED"
                    }
                    return <div className = "header" >
                        <
                        div className = "remaining-flags" >
                        <
                        i className = "fa fa-flag" > < /i> {
                            this.props.remainingFlags
                        } <
                        /div> <
                        div className = {
                            "status-message " + this.props.status
                        } > {
                            statusMessage
                        } < /div> <
                        div className = "new-button" >
                        <
                        button onClick = {
                            this.props.onButtonClick
                        } > New Game < /button> <
                        /div> <
                        /div>;
                }
            });

            /**
             * MineSweeper React Component
             * Main react component to create board model and set callbacks to update board model
             */
            export default React.createClass({
                getInitialState: function () {
                    return {
                        board: undefined
                    };
                },
                componentWillMount: function () {
                    this._createNewBoard();
                },
                render: function () {
                    // var cells;
                    return <div className = "mine-sweeper" >
                        <
                        HeaderRC
                    remainingFlags = {
                        this.state.board.getRemainingFlags()
                    }
                    onButtonClick = {
                        this._createNewBoard
                    }
                    status = {
                        this.state.board.getStatus()
                    }
                    /> <
                    BoardRC
                    board = {
                        this.state.board
                    }
                    onBoardCellClick = {
                        this._onBoardCellClick
                    }
                    onBoardCellRightClick = {
                        this._onBoardCellRightClick
                    }
                    /> <
                    /div>;
                },
                _onBoardCellClick: function (cellRow, cellColumn) {
                    if (this.state.board.getStatus() === BoardStatus.FAILURE) {
                        return;
                    }
                    this.state.board.clickCell(cellRow, cellColumn);
                    this.setState({
                        board: this.state.board
                    });
                },
                _onBoardCellRightClick: function (cellRow, cellColumn) {
                    if (this.state.board.getStatus() === BoardStatus.FAILURE) {
                        return;
                    }
                    this.state.board.toggleCellFlag(cellRow, cellColumn);
                    this.setState({
                        board: this.state.board
                    });
                },
                _createNewBoard: function () {
                    this.setState({
                        board: new Board(12, 10, 40)
                    });
                }
            });