interface Piece {
  kinged: boolean;
  color: 'black' | 'red';
}

interface Square {
  piece?: Piece;
  playable: boolean;
}

interface MoveInfo {
  moveType: 'jump' | 'noJump';
  move: [number, number];
  jumpedSquare?: [number, number];
}

interface GameState {
  turn: 'black' | 'red';
  doubleJump: 'black' | 'red' | null;
  pieceSelected: [number, number] | null;
  movesForSelectedPiece: MoveInfo[] | null;
}

const gameState: GameState = {
  turn: 'black',
  pieceSelected: null,
  movesForSelectedPiece: null,
  doubleJump: null,
};

const board: Square[][] = [[], [], [], [], [], [], [], []];

const $board = document.querySelector('.board');
const $turnDisplay = document.querySelector('#turn-display');
const $gameOver = document.querySelector('dialog');
const $playAgain = document.querySelector('#play-again');

if (!$board) throw new Error('$board query failed');
if (!$turnDisplay) throw new Error('$turnDisplay query failed');
if (!$gameOver) throw new Error('$gameOver query failed');
if (!$playAgain) throw new Error('$playAgain query failed');

setUpBoard();
renderBoard();

$board.addEventListener('click', handleClick);
$playAgain.addEventListener('click', reset);

$board.addEventListener('mouseover', handleMouseover);

// sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// only checks for existence of piece to be moved doesn't care about rules
function movePiece(
  startLocation: [number, number],
  endLocation: [number, number]
): void {
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

  const $piece = $startSquare.children[0] as HTMLDivElement;
  if (!$piece) throw new Error('$piece query failed');

  board[endLocation[0]][endLocation[1]].piece = piece;

  $endSquare.appendChild($piece);
  delete board[startLocation[0]][startLocation[1]].piece;
}

// deletes piece at given location and removes the matching coords from the array for the color of the piece in gameState
function takePiece(location: [number, number]): void {
  const piece = board[location[0]][location[1]].piece;
  if (!piece) return;

  const $takenSquare = document.getElementById(`${location[0]},${location[1]}`);

  if (!$takenSquare) throw new Error('$takenSquare query failed');
  const $takenPiece = $takenSquare.children[0];

  delete board[location[0]][location[1]].piece;
  $takenPiece.remove();

  checkForWin();
}

// sets piece at given location to kinged
function kingPiece(location: [number, number]): void {
  const piece = board[location[0]][location[1]].piece;
  if (piece) {
    piece.kinged = true;
  }

  const $piece = document.getElementById(`${location[0]},${location[1]}`);
  if (!$piece) throw new Error('$piece query failed');

  const $crown = document.createElement('i');
  $crown.className = 'fa-solid fa-crown';

  $piece.firstChild?.appendChild($crown);
}

// returns an array with all valid moves for a piece at provided coords
function getValidMoves(coords: [number, number]): MoveInfo[] {
  if (coords[0] > 7 || coords[1] > 7)
    throw new Error(
      `Cannot get moves for ${coords} because square does not exist`
    );

  const square = board[coords[0]][coords[1]];
  const piece = square.piece;

  if (!square.playable) throw new Error(`Square at ${coords} is not playable`);
  if (!piece) return [];

  let directionAllowed;
  if (piece.color === 'red') {
    directionAllowed = 1;
  } else if (piece.color === 'black') {
    directionAllowed = -1;
  } else {
    throw new Error(`${piece.color} is not a valid piece color`);
  }

  const jumpColumns: number[] = [];
  if (coords[1] + 2 <= 7) {
    jumpColumns.push(coords[1] + 2);
  }
  if (coords[1] - 2 >= 0) {
    jumpColumns.push(coords[1] - 2);
  }

  const jumpRows: number[] = [];

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

  const allMoves: MoveInfo[] = [];

  jumpRows.forEach((x) => {
    jumpColumns.forEach((y) => {
      const endCoords: [number, number] = [x, y];

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
        allMoves.push({
          moveType: 'jump',
          move: endCoords,
          jumpedSquare: middleSquare,
        });
      }
    });
  });

  const columns: number[] = [];

  if (coords[1] + 1 <= 7) {
    columns.push(coords[1] + 1);
  }
  if (coords[1] - 1 >= 0) {
    columns.push(coords[1] - 1);
  }

  const rows: number[] = [];

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

  rows.forEach((x) => {
    columns.forEach((y) => {
      const endCoords: [number, number] = [x, y];

      if (!board[endCoords[0]][endCoords[1]]) return;
      if (board[endCoords[0]][endCoords[1]].piece) return;

      allMoves.push({ moveType: 'noJump', move: endCoords });
    });
  });

  return allMoves;
}

// takes coords of two squares that are diagonal to each other with one square in between
// returns the coords of the square in between
// has a chance of returning a non existent square if passed squares that aren't two over in either direction
function findMiddleSquare(
  startLocation: [number, number],
  endLocation: [number, number]
): [number, number] {
  const distanceGoing = [
    startLocation[0] - endLocation[0],
    startLocation[1] - endLocation[1],
  ];
  const directionGoing = distanceGoing.map((x) => x / 2);
  const middleSquare: [number, number] = [
    startLocation[0] - directionGoing[0],
    startLocation[1] - directionGoing[1],
  ];
  return middleSquare;
}

// sets board with pieces to start the game and populates color arrays in gameState
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
function oddRow(pieceColor: 'black' | 'red' | ''): Square[] {
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
function evenRow(pieceColor: 'black' | 'red' | ''): Square[] {
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
function renderBoard(): void {
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
    const moves = gameState.movesForSelectedPiece;
    const pieceSelected = gameState.pieceSelected;

    if (!moves || !pieceSelected) return;

    const squareCoords = getCoords($eventTarget);
    const stringifiedCoords = JSON.stringify(squareCoords);

    let squareIsValidMove = false;
    let moveInfo: MoveInfo | undefined;

    moves.forEach((move) => {
      if (JSON.stringify(move.move) === stringifiedCoords) {
        squareIsValidMove = true;
        moveInfo = move;
      }
    });

    if (!squareIsValidMove || !moveInfo) return;

    if (moveInfo.moveType === 'noJump') {
      movePiece(pieceSelected, squareCoords);
      checkToKing(squareCoords);

      const $piece = $eventTarget.firstChild as HTMLDivElement;
      if ($piece) {
        $piece.className = `piece ${gameState.turn}`;
      }

      toggleTurn();

      gameState.pieceSelected = null;
      gameState.movesForSelectedPiece = null;
      gameState.doubleJump = null;
    } else if (moveInfo.moveType === 'jump') {
      const jumpedSquare = moveInfo.jumpedSquare;
      if (jumpedSquare) takePiece(jumpedSquare);

      movePiece(pieceSelected, squareCoords);
      checkToKing(squareCoords);

      const pieceColor = board[squareCoords[0]][squareCoords[1]].piece?.color;
      if (!pieceColor)
        throw new Error(`piece at ${pieceSelected} doesn't have a color`);

      const allMoves = getValidMoves(squareCoords);
      const jumpMoves = allMoves.filter(
        (moveInfo) => moveInfo.moveType === 'jump'
      );

      if (jumpMoves.length) {
        gameState.movesForSelectedPiece = jumpMoves;
        gameState.pieceSelected = squareCoords;
        gameState.doubleJump = `${pieceColor}`;

        toggleTurn('dblJump');
      } else {
        const $piece = $eventTarget.firstChild as HTMLDivElement;
        if ($piece) {
          $piece.className = `piece ${pieceColor}`;
        }

        toggleTurn();

        gameState.pieceSelected = null;
        gameState.movesForSelectedPiece = null;
        gameState.doubleJump = null;
      }
    }
  } else if (
    className.includes(gameState.turn) &&
    className.includes('piece')
  ) {
    const $square = $eventTarget.parentElement as HTMLDivElement;
    const pieceCoords = getCoords($square);
    const movementInfo = getValidMoves(pieceCoords);

    $eventTarget.className += ' selected';

    gameState.pieceSelected = pieceCoords;
    gameState.movesForSelectedPiece = movementInfo;
  }
}

function handleMouseover(event: Event): void {
  const $eventTarget = event.target as HTMLElement;

  if ($eventTarget.className.includes(`piece ${gameState.turn}`)) {
    console.log('is piece of turn color');

    // const $square = $eventTarget.parentElement as HTMLDivElement;
    // const pieceCoords = getCoords($square);
    // const validMoves = getValidMoves(pieceCoords);
    // console.log('validMoves', validMoves);
  }
}

function getCoords($square: HTMLDivElement): [number, number] {
  const stringCoords = $square?.id;

  const coords = stringCoords.split(',');
  return coords.map((x) => +x) as [number, number];
}

function toggleTurn(dblJump?: string): void {
  if (!$turnDisplay) throw new Error('$turnDisplay non-existent');

  gameState.turn = otherColor(gameState.turn);
  $turnDisplay.textContent = `${gameState.turn}s turn`;

  if (dblJump) {
    $turnDisplay.textContent = `${otherColor(
      gameState.turn
    )} can double jump or ${gameState.turn} can play`;
  } else if (gameState.doubleJump) {
    gameState.turn = otherColor(gameState.turn);
    $turnDisplay.textContent = `${gameState.turn}s turn`;
  }
}

function otherColor(color: 'red' | 'black'): 'red' | 'black' {
  if (color === 'red') return 'black';
  if (color === 'black') return 'red';
  else throw new Error(`cannot get opposite color of ${color}`);
}

// if either black or red have no pieces in gameState, the other is declared winner
function checkForWin(): void {
  const $victoryMessage = document.createElement('h2');
  if (!$gameOver) throw new Error('$gameOver does not exist');
  const blackPieces = getPieces('black');

  const redPieces = getPieces('red');
  if (!redPieces.length) {
    $victoryMessage.textContent = 'Black Wins!';
    console.log('black wins!');

    $gameOver.prepend($victoryMessage);
    $gameOver.showModal();
  } else if (!blackPieces.length) {
    $victoryMessage.textContent = 'Red Wins!';
    console.log('red wins!');

    $gameOver.prepend($victoryMessage);
    $gameOver.showModal();
  }
}

function getPieces(pieceType: 'red' | 'black' | 'all'): [number, number][] {
  const allCoords: [number, number][] = [];
  board.forEach((row, x) => {
    row.forEach((square, y) => {
      const piece = square.piece;
      if (piece) {
        if (piece.color === pieceType || pieceType === 'all') {
          allCoords.push([x, y]);
        }
      }
    });
  });
  return allCoords;
}

function checkToKing(coords: [number, number]): void {
  const piece = board[coords[0]][coords[1]].piece;
  if (!piece || piece.kinged) return;

  if (piece.color === 'black' && coords[0] === 0) {
    kingPiece(coords);
  } else if (piece.color === 'red' && coords[0] === 7) {
    kingPiece(coords);
  }
}

// function forceGameOver(loser: 'black' | 'red'): void {
//   const pieces = getPieces(loser);
//   pieces.forEach((piece) => {
//     takePiece(piece);
//   });
// }

function reset(): void {
  setUpBoard();
  gameState.turn = 'black';
  gameState.pieceSelected = null;
  gameState.movesForSelectedPiece = null;

  $board?.replaceChildren();
  renderBoard();
  $gameOver?.close();
}
