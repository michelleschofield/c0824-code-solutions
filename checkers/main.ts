interface Piece {
  kinged: boolean;
  color: string;
}

interface Square {
  piece?: Piece;
  playable: boolean;
}

interface GameState {
  turn: string;
  pieceSelected: [number, number] | null;
  red: number;
  black: number;
}

const gameState: GameState = {
  turn: 'black',
  pieceSelected: null,
  red: 12,
  black: 12,
};
const board: Square[][] = [[], [], [], [], [], [], [], []];

const $board = document.querySelector('.board');

if (!$board) throw new Error('$board query failed');

setUpBoard();
buildBoardInDom();

$board.addEventListener('click', handleClick);

// sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// only checks for existence of piece to be moved doesn't care about rules
function movePiece(startLocation: number[], endLocation: number[]): void {
  const piece = board[startLocation[0]][startLocation[1]].piece;
  if (piece) {
    const $startSquare = document.getElementById(
      `${startLocation[0]},${startLocation[1]}`
    );
    const $endSquare = document.getElementById(
      `${endLocation[0]},${endLocation[1]}`
    );

    if (!$startSquare) throw new Error('$startSquare query failed');
    if (!$endSquare) throw new Error('$endSquare query failed');

    const $piece = $startSquare.children[0] as HTMLDivElement;
    if (!$piece) throw new Error('$piece query failed');
    console.log('$endSquare', $endSquare);

    console.log();
    board[endLocation[0]][endLocation[1]].piece = piece;

    $endSquare.appendChild($piece);
    delete board[startLocation[0]][startLocation[1]].piece;
  }
}

// deletes piece at given location and reduces according number in pieces
function takePiece(location: number[]): void {
  const piece = board[location[0]][location[1]].piece;
  if (piece) {
    const $takenSquare = document.getElementById(
      `${location[0]},${location[1]}`
    );

    if (!$takenSquare) throw new Error('$takenSquare query failed');
    const $takenPiece = $takenSquare.children[0];

    const color = piece.color;
    if (color === 'red' || color === 'black') gameState[color] -= 1;

    delete board[location[0]][location[1]].piece;
    $takenPiece.remove();

    checkForWin();
  }
}

// sets piece at given location to kinged
function kingPiece(location: number[]): void {
  const piece = board[location[0]][location[1]].piece;
  if (piece) {
    piece.kinged = true;
  }
}

// lots and lots of tests
function canMoveWithoutTaking(
  startLocation: number[],
  endLocation: number[]
): boolean {
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
  const rows: number[] = [];

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
function canMoveIfTaking(
  startLocation: number[],
  endLocation: number[]
): boolean {
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
function findMiddleSquare(
  startLocation: number[],
  endLocation: number[]
): number[] {
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
function setUpBoard(): void {
  for (let i = 0; i < 8; i++) {
    if (i % 2) {
      board[i] = oddRow(i < 3 ? 'red' : i > 4 ? 'black' : '');
    } else {
      board[i] = evenRow(i < 3 ? 'red' : i > 4 ? 'black' : '');
    }
  }
}

// returns array to go in board with pieces of color provided, no pieces if empty string provided
function oddRow(pieceColor: string): Square[] {
  const row = [];

  for (let i = 0; i < 8; i++) {
    const playable = !(i % 2);
    const square: Square = { playable };

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
function evenRow(pieceColor: string): Square[] {
  const row = [];

  for (let i = 0; i < 8; i++) {
    let playable;
    if (i % 2) {
      playable = true;
    } else {
      playable = false;
    }

    const square: Square = { playable };

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
function buildBoardInDom(): void {
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

function handleClick(event: Event): void {
  const $eventTarget = event.target as HTMLDivElement;
  const className = $eventTarget.className;

  if (className.includes('square')) {
    const pieceSelected = gameState.pieceSelected;
    if (!pieceSelected) return;

    const squareCoords = getCoords($eventTarget);
    if (canMoveWithoutTaking(pieceSelected, squareCoords)) {
      movePiece(pieceSelected, squareCoords);
      toggleTurn();
    } else if (canMoveIfTaking(pieceSelected, squareCoords)) {
      movePiece(pieceSelected, squareCoords);
      takePiece(findMiddleSquare(pieceSelected, squareCoords));
    }
  } else if (
    className.includes(gameState.turn) &&
    className.includes('piece')
  ) {
    const $square = $eventTarget.parentElement as HTMLDivElement;
    const pieceCoords = getCoords($square);
    gameState.pieceSelected = pieceCoords;
  }
}

function getCoords($square: HTMLDivElement): [number, number] {
  const stringCoords = $square?.id;

  const coords = stringCoords.split(',');
  return coords.map((x) => +x) as [number, number];
}

// temporary solution to get typescript to quit giving me errors for not calling the functions
function getTypescriptOffMyBack(): void {
  movePiece([0, 0], [0, 0]);
  takePiece([0, 0]);
  kingPiece([0, 0]);
  canMoveWithoutTaking([0, 0], [0, 0]);
  canMoveIfTaking([0, 0], [0, 0]);
  findMiddleSquare([0, 0], [0, 0]);
  setUpBoard();
  buildBoardInDom();
}

function toggleTurn(): void {
  if (gameState.turn === 'black') {
    gameState.turn = 'red';
  } else if (gameState.turn === 'red') {
    gameState.turn = 'black';
  } else {
    throw new Error('turn is neither black nor red');
  }
}

function checkForWin(): void {
  if (!gameState.red) {
    console.log('Black Wins!');
  } else if (!gameState.black) {
    console.log('Red Wins!');
  }
}

console.log(getTypescriptOffMyBack);
