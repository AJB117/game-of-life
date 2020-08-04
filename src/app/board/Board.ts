const orientations: number[][] = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export class Board {
  rows: number;
  columns: number;
  board: number[][];
  timesChanged: number;
  started: boolean;
  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    this.timesChanged = 0;
    this.started = false;
    for (let i = 0; i < this.rows; i++) {
      this.board.push(Array(this.columns).fill(0));
    }
  }

  color(row: number, col: number) {
    let newBoard = this.board.slice();
    newBoard[row][col] = this.board[row][col] ? 0 : 1;
    this.board = newBoard;
    this.timesChanged += 1;
    console.log(this.board);
  }

  redraw() {
    console.log('redrawing...');
    if (!this.started) {
      return;
    }
    const oldBoard = this.board;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let neighbors = 0;
        orientations.forEach(([r, c]) => {
          let newI = i + r;
          let newJ = j + c;
          if (newI >= 0 && newI < this.rows && newJ >= 0 && newJ < this.columns) {
            neighbors += oldBoard[newI][newJ];
          }
        });
        if (oldBoard[i][j] && (neighbors < 2 || neighbors > 3)) {
          console.log(`killing cell with ${neighbors} neighbors at ${i},${j}`);
          this.board[i][j] = 0;
        } else if (oldBoard[i][j] === 0 && neighbors === 3) {
          console.log(`spawning cell with ${neighbors} neighbors at ${i},${j}`);
          this.board[i][j] = 1;
        }
      }
    }
    setTimeout(() => {
      this.redraw();
    }, 500);
  }

  start() {
    setTimeout(() => {
      console.log('looky here,', this.board);
      this.started = true;
      this.redraw();
    }, 1000);
  }

  stop() {
    this.started = false;
  }
}
