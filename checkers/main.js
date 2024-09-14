'use strict';
const board = [[], [], [], [], [], [], [], []];
const $board = document.querySelector('.board');
if (!$board) throw new Error('$board query failed');
// sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// only checks for existence of piece to be moved doesn't care about rules
function movePiece(startLocation, endLocation) {
  const piece = board[startLocation[0]][startLocation[1]].piece;
  if (piece) {
    board[endLocation[0]][endLocation[1]].piece = piece;
    delete board[startLocation[0]][startLocation[1]].piece;
  }
}
// deletes piece at given location
function takePiece(location) {
  if (board[location[0]][location[1]].piece) {
    delete board[location[0]][location[1]].piece;
  }
}
// sets piece at given location to kinged
function kingPiece(location) {
  const piece = board[location[0]][location[1]].piece;
  if (piece) {
    piece.kinged = true;
  }
}
// lots and lots of tests
function canMoveWithoutTaking(startLocation, endLocation) {
  const piece = board[startLocation[0]][startLocation[1]].piece;
  if (
    !board[endLocation[0]][endLocation[1]].playable ||
    !board[startLocation[0]][startLocation[1]].playable
  ) {
    return false;
  } else if (
    piece === undefined ||
    board[endLocation[0]][endLocation[1]].piece
  ) {
    return false;
  }
  const columns = [startLocation[1] + 1, startLocation[1] - 1];
  const rows = [];
  if (piece.kinged) {
    rows.push(startLocation[0] + 1, startLocation[0] - 1);
  } else {
    const color = piece.color;
    let direction;
    if (color === 'red') {
      direction = 1;
    } else if (color === 'black') {
      direction = -1;
    } else {
      return false;
    }
    rows.push(startLocation[0] + direction);
  }
  if (rows.includes(endLocation[0]) && columns.includes(endLocation[1])) {
    return true;
  } else {
    return false;
  }
}
// seems to be working
function canMoveIfTaking(startLocation, endLocation) {
  const piece = board[startLocation[0]][startLocation[1]].piece;
  if (
    !board[endLocation[0]][endLocation[1]].playable ||
    !board[startLocation[0]][startLocation[1]].playable
  ) {
    return false;
  } else if (
    piece === undefined ||
    board[endLocation[0]][endLocation[1]].piece
  ) {
    return false;
  }
  const columns = [startLocation[1] + 2, startLocation[1] - 2];
  const rows = [];
  const color = piece.color;
  if (piece.kinged) {
    rows.push(startLocation[0] + 2, startLocation[0] - 2);
  } else {
    let directionAllowed;
    if (color === 'red') {
      directionAllowed = 1;
    } else if (color === 'black') {
      directionAllowed = -1;
    } else {
      return false;
    }
    rows.push(startLocation[0] + directionAllowed * 2);
  }
  if (!(rows.includes(endLocation[0]) && columns.includes(endLocation[1]))) {
    return false;
  }
  const middleSquare = findMiddleSquare(startLocation, endLocation);
  const attackedPiece = board[middleSquare[0]][middleSquare[1]].piece;
  let attackedColor;
  if (attackedPiece) {
    attackedColor = attackedPiece.color;
  } else {
    return false;
  }
  if (attackedColor && attackedColor !== color) {
    return true;
  }
  return false;
}
// takes coords of two squares that are diagonal to each other with one square in between
// returns the coords of the square in between
function findMiddleSquare(startLocation, endLocation) {
  const distanceGoing = [
    startLocation[0] - endLocation[0],
    startLocation[1] - endLocation[1],
  ];
  const directionGoing = distanceGoing.map((x) => x / 2);
  const middleSquare = [
    startLocation[0] - directionGoing[0],
    startLocation[1] - directionGoing[1],
  ];
  return middleSquare;
}
// sets board with pieces to start the game
function setUpBoard() {
  for (let i = 0; i < 8; i++) {
    if (i % 2) {
      board[i] = oddRow(i < 3 ? 'red' : i > 4 ? 'black' : '');
    } else {
      board[i] = evenRow(i < 3 ? 'red' : i > 4 ? 'black' : '');
    }
  }
}
// returns array to go in board with pieces of color provided, no pieces if empty string provided
function oddRow(pieceColor) {
  const row = [];
  for (let i = 0; i < 8; i++) {
    const playable = !(i % 2);
    const square = { playable };
    if (playable && pieceColor) {
      square.piece = {
        kinged: false,
        color: pieceColor,
      };
    }
    row.push(square);
  }
  return row;
}
// returns array to go in board with pieces of color provided, no pieces if empty string provided
function evenRow(pieceColor) {
  const row = [];
  for (let i = 0; i < 8; i++) {
    let playable;
    if (i % 2) {
      playable = true;
    } else {
      playable = false;
    }
    const square = { playable };
    if (playable && pieceColor) {
      square.piece = {
        kinged: false,
        color: pieceColor,
      };
    }
    row.push(square);
  }
  return row;
}
// loops through board in JS ands builds it in the dom
function buildBoardInDom() {
  if (!$board) throw new Error('$board query failed');
  board.forEach((row) => {
    const $row = document.createElement('div');
    $row.className = 'row';
    row.forEach((square) => {
      const $column = document.createElement('div');
      const $square = document.createElement('div');
      const squareColor = square.playable ? 'black' : 'white';
      $square.className = `square ${squareColor}`;
      $column.className = 'column-eighth';
      const piece = square.piece;
      if (piece) {
        const $piece = document.createElement('div');
        $piece.className = `piece ${piece.color}`;
        $square.appendChild($piece);
      }
      $column.appendChild($square);
      $row.appendChild($column);
    });
    $board.appendChild($row);
  });
}
// temporary solution to get typescript to quit giving me errors for not calling the functions
function getTypescriptOffMyBack() {
  movePiece([0, 0], [0, 0]);
  takePiece([0, 0]);
  kingPiece([0, 0]);
  canMoveWithoutTaking([0, 0], [0, 0]);
  canMoveIfTaking([0, 0], [0, 0]);
  findMiddleSquare([0, 0], [0, 0]);
  setUpBoard();
  buildBoardInDom();
}
console.log(getTypescriptOffMyBack);
