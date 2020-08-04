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

let toChange: number[][] = [];

export class Board {
  rows: number;
  columns: number;
  board: number[][];
  started: boolean;
  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    this.started = false;
    for (let i = 0; i < this.rows; i++) {
      this.board.push(Array(this.columns).fill(0));
    }
  }

  color(row: number, col: number) {
    this.board[row][col] = this.board[row][col] ? 0 : 1;
  }

  redraw() {
    if (!this.started) {
      return;
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let neighbors = 0;
        orientations.forEach(([r, c]) => {
          const newI = i + r;
          const newJ = j + c;
          if (newI >= 0 && newI < this.rows && newJ >= 0 && newJ < this.columns) {
            neighbors += this.board[newI][newJ];
          }
        });
        if (this.board[i][j] && (neighbors < 2 || neighbors > 3)) {
          toChange.push([i, j, 0]);
        } else if (this.board[i][j] === 0 && neighbors === 3) {
          toChange.push([i, j, 1]);
        }
      }
    }
    toChange.forEach(([i, j, value]) => {
      this.board[i][j] = value;
    });
    toChange = [];
    setTimeout(() => {
      this.redraw();
    }, 50);
  }

  start() {
    setTimeout(() => {
      this.started = true;
      this.redraw();
    }, 1000);
  }

  stop() {
    this.started = false;
  }
}
