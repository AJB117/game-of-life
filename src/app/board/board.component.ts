import { Component, OnInit } from '@angular/core';
import { Board } from './Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;

  constructor() {
    this.board = new Board(50, 50);
  }
  ngOnInit(): void {}

  color(row: number, col: number): void {
    console.log(`${row}, ${col}`)
    this.board.color(col, row);
  }

  start() {
    this.board.start();
  }

  stop() {
    this.board.stop();
  }

  clear() {
    const newBoard = new Board(50, 50);
    this.board = newBoard;
  }
}
