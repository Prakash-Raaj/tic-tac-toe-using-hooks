import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    nextSquares[i] = xIsNext ? "X" : "O";
    setXisNext(!xIsNext);
    setSquares(nextSquares);
  }
  function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
  }
  function resetBoard(squares) {
    squares = Array(9).fill(null);
    setSquares(squares);
    setXisNext(true);
  }
  function calcWinner(squares) {
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibilities.length; i++) {
      const [a, b, c] = possibilities[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = calcWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isBoardFull(squares)) {
    status = "Draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div>
        <button className="reset" onClick={() => resetBoard(squares)}>
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default Board;
