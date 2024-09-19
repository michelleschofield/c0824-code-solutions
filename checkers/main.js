'use strict';
const gameState = {
  turn: 'black',
  pieceSelected: null,
  movementInfo: null,
  red: [],
  black: [],
};
const board = [[], [], [], [], [], [], [], []];
const $board = document.querySelector('.board');
if (!$board) throw new Error('$board query failed');
setUpBoard();
renderBoard();
$board.addEventListener('click', handleClick);
$board.addEventListener('mouseover', handleMouseover);
// sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// only checks for existence of piece to be moved doesn't care about rules
function movePiece(startLocation, endLocation) {
  const piece = board[startLocation[0]][startLocation[1]].piece;
  if (!piece) return;
  const $startSquare = document.getElementById(
    `${startLocation[0]},${startLocation[1]}`
  );
  const $endSquare = document.getElementById(
    `${endLocation[0]},${endLocation[1]}`
  );
  if (!$startSquare) throw new Error('$startSquare query failed');
  if (!$endSquare) throw new Error('$endSquare query failed');
  const $piece = $startSquare.children[0];
  if (!$piece) throw new Error('$piece query failed');
  board[endLocation[0]][endLocation[1]].piece = piece;
  $endSquare.appendChild($piece);
  delete board[startLocation[0]][startLocation[1]].piece;
}
// deletes piece at given location and removes the matching coords from the array for the color of the piece in gameState
function takePiece(location) {
  const piece = board[location[0]][location[1]].piece;
  if (!piece) return;
  const $takenSquare = document.getElementById(`${location[0]},${location[1]}`);
  if (!$takenSquare) throw new Error('$takenSquare query failed');
  const $takenPiece = $takenSquare.children[0];
  const color = piece.color;
  const stringifiedLocation = JSON.stringify(location);
  let index;
  if (color === 'red' || color === 'black') {
    gameState[color].forEach((coords, i) => {
      if (JSON.stringify(coords) === stringifiedLocation) {
        index = i;
      }
    });
  }
  if (index) {
    gameState[color].splice(index, 1);
  }
  delete board[location[0]][location[1]].piece;
  $takenPiece.remove();
  checkForWin();
}
// sets piece at given location to kinged
function kingPiece(location) {
  const piece = board[location[0]][location[1]].piece;
  if (piece) {
    piece.kinged = true;
  }
}
console.log(kingPiece);
// returns an array with all valid moves for a piece at provided coords
function getValidMoves(coords) {
  if (coords[0] > 7 || coords[1] > 7)
    throw new Error(
      `Cannot get moves for ${coords} because square does not exist`
    );
  const square = board[coords[0]][coords[1]];
  const piece = square.piece;
  if (!square.playable) throw new Error(`Square at ${coords} is not playable`);
  if (!piece) return { moveType: '', moves: [] };
  let directionAllowed;
  if (piece.color === 'red') {
    directionAllowed = 1;
  } else if (piece.color === 'black') {
    directionAllowed = -1;
  } else {
    throw new Error(`${piece.color} is not a valid piece color`);
  }
  const jumpColumns = [];
  if (coords[1] + 2 <= 7) {
    jumpColumns.push(coords[1] + 2);
  }
  if (coords[1] - 2 >= 0) {
    jumpColumns.push(coords[1] - 2);
  }
  const jumpRows = [];
  if (piece.kinged) {
    if (coords[0] + 2 <= 7) {
      jumpRows.push(coords[0] + 2);
    }
    if (coords[0] - 2 >= 0) {
      jumpRows.push(coords[0] - 2);
    }
  } else {
    const x = coords[0] + directionAllowed * 2;
    if (x >= 0 && x <= 7) {
      jumpRows.push(x);
    }
  }
  const jumpMoves = [];
  jumpRows.forEach((x) => {
    jumpColumns.forEach((y) => {
      const endCoords = [x, y];
      if (!board[endCoords[0]][endCoords[1]]) return;
      const middleSquare = findMiddleSquare(coords, endCoords);
      const attackedPiece = board[middleSquare[0]][middleSquare[1]].piece;
      let attackedColor;
      if (attackedPiece) {
        attackedColor = attackedPiece.color;
      } else {
        return;
      }
      if (board[endCoords[0]][endCoords[1]].piece) return;
      if (attackedColor && attackedColor !== piece.color) {
        jumpMoves.push(endCoords);
      }
    });
  });
  if (jumpMoves.length) {
    return {
      moveType: 'jump',
      moves: jumpMoves,
    };
  }
  const columns = [];
  if (coords[1] + 1 <= 7) {
    columns.push(coords[1] + 1);
  }
  if (coords[1] - 1 >= 0) {
    columns.push(coords[1] - 1);
  }
  const rows = [];
  if (piece.kinged) {
    if (coords[0] + 1 <= 7) {
      rows.push(coords[0] + 1);
    }
    if (coords[0] - 1 >= 0) {
      rows.push(coords[0] - 1);
    }
  } else {
    const x = coords[0] + directionAllowed;
    if (x >= 0 && x <= 7) {
      rows.push(x);
    }
  }
  const moves = [];
  rows.forEach((x) => {
    columns.forEach((y) => {
      const endCoords = [x, y];
      if (!board[endCoords[0]][endCoords[1]]) return;
      if (board[endCoords[0]][endCoords[1]].piece) return;
      moves.push(endCoords);
    });
  });
  if (moves.length) {
    return {
      moveType: 'noJump',
      moves,
    };
  } else {
    return {
      moveType: '',
      moves: [],
    };
  }
}
// takes coords of two squares that are diagonal to each other with one square in between
// returns the coords of the square in between
// has a chance of returning a non existent square if passed squares that aren't two over in either direction
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
function renderBoard() {
  if (!$board) throw new Error('$board query failed');
  board.forEach((row, x) => {
    const $row = document.createElement('div');
    $row.className = 'row';
    row.forEach((square, y) => {
      const $column = document.createElement('div');
      const $square = document.createElement('div');
      const squareColor = square.playable ? 'black' : 'red';
      $square.className = `square ${squareColor}`;
      $square.id = `${x},${y}`;
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
function handleClick(event) {
  const $eventTarget = event.target;
  const className = $eventTarget.className;
  if (className.includes('square')) {
    const movementInfo = gameState.movementInfo;
    const pieceSelected = gameState.pieceSelected;
    if (!movementInfo || !pieceSelected) return;
    const squareCoords = getCoords($eventTarget);
    const validMoves = movementInfo.moves;
    const stringifiedCoords = JSON.stringify(squareCoords);
    let squareIsValidMove = false;
    validMoves.forEach((move) => {
      if (JSON.stringify(move) === stringifiedCoords) {
        squareIsValidMove = true;
      }
    });
    if (!squareIsValidMove) return;
    if (movementInfo.moveType === 'noJump') {
      movePiece(pieceSelected, squareCoords);
      toggleTurn();
    } else if (movementInfo.moveType === 'jump') {
      movePiece(pieceSelected, squareCoords);
      takePiece(findMiddleSquare(pieceSelected, squareCoords));
      toggleTurn();
    }
  } else if (
    className.includes(gameState.turn) &&
    className.includes('piece')
  ) {
    const $square = $eventTarget.parentElement;
    const pieceCoords = getCoords($square);
    const movementInfo = getValidMoves(pieceCoords);
    gameState.pieceSelected = pieceCoords;
    gameState.movementInfo = movementInfo;
  }
}
function handleMouseover(event) {
  const $eventTarget = event.target;
  if (!$eventTarget.className.includes('piece')) return;
  const $square = $eventTarget.parentElement;
  const pieceCoords = getCoords($square);
  const validMoves = getValidMoves(pieceCoords);
  console.log('validMoves', validMoves);
}
function getCoords($square) {
  const stringCoords = $square?.id;
  const coords = stringCoords.split(',');
  return coords.map((x) => +x);
}
function toggleTurn() {
  if (gameState.turn === 'black') {
    gameState.turn = 'red';
  } else if (gameState.turn === 'red') {
    gameState.turn = 'black';
  } else {
    throw new Error('turn is neither black nor red');
  }
}
// if either black or red have no pieces in gameState, the other is declared winner
function checkForWin() {
  if (!gameState.red) {
    console.log('Black Wins!');
  } else if (!gameState.black) {
    console.log('Red Wins!');
  }
}
