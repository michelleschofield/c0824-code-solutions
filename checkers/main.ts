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
const $victoryMessage = document.querySelector('#victory-message');

if (!$board) throw new Error('$board query failed');
if (!$turnDisplay) throw new Error('$turnDisplay query failed');
if (!$gameOver) throw new Error('$gameOver query failed');
if (!$playAgain) throw new Error('$playAgain query failed');
if (!$victoryMessage) throw new Error('$victoryMessage query failed');

setUpBoard();
renderBoard();

$board.addEventListener('click', handleClick);
$playAgain.addEventListener('click', reset);

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

  checkForWin();
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
  if (coords[0] > 7 || coords[1] > 7 || coords[0] < 0 || coords[1] < 0) {
    throw new Error(
      `Cannot get moves for ${coords} because square does not exist`
    );
  }

  const square = board[coords[0]][coords[1]];
  const piece = square.piece;

  if (!square.playable) throw new Error(`Square at ${coords} is not playable`);
  if (!piece) return [];

  const jumpColumns = getColumns(coords, 2);
  const jumpRows = getRows(coords, 2);

  const allMoves: MoveInfo[] = [];

  jumpRows.forEach((x) => {
    jumpColumns.forEach((y) => {
      if (!board[x][y] || board[x][y].piece) return;

      const middleSquare = findMiddleSquare(coords, [x, y]);
      const attackedPiece = board[middleSquare[0]][middleSquare[1]].piece;

      let attackedColor;
      if (attackedPiece) {
        attackedColor = attackedPiece.color;
      } else {
        return;
      }

      if (attackedColor && attackedColor !== piece.color) {
        allMoves.push({
          moveType: 'jump',
          move: [x, y],
          jumpedSquare: middleSquare,
        });
      }
    });
  });

  const regColumns = getColumns(coords, 1);
  const regRows = getRows(coords, 1);

  regRows.forEach((x) => {
    regColumns.forEach((y) => {
      if (!board[x][y] || board[x][y].piece) return;

      allMoves.push({ moveType: 'noJump', move: [x, y] });
    });
  });

  return allMoves;
}

// returns the numbers for the rows that are the distance away from the piece that are still on the board that the piece is allowed to move to based on whether it's kinged or it's color
function getRows(coords: [number, number], distance: number): number[] {
  const piece = board[coords[0]][coords[1]].piece;
  if (!piece) return [];

  const rows: number[] = [];
  const directionAllowed = piece.color === 'red' ? 1 : -1;

  if (piece.kinged) {
    if (coords[0] + distance <= 7) {
      rows.push(coords[0] + distance);
    }
    if (coords[0] - distance >= 0) {
      rows.push(coords[0] - distance);
    }
  } else {
    const x = coords[0] + directionAllowed * distance;
    if (x >= 0 && x <= 7) {
      rows.push(x);
    }
  }

  return rows;
}

// returns the numbers for the columns that are the distance away from the piece that are still on the board
function getColumns(coords: [number, number], distance: number): number[] {
  const columns = [];
  if (coords[1] + distance <= 7) {
    columns.push(coords[1] + distance);
  }
  if (coords[1] - distance >= 0) {
    columns.push(coords[1] - distance);
  }
  return columns;
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

// determines whether a square or piece was clicked and calls according functions
function handleClick(event: Event): void {
  const $eventTarget = event.target as HTMLDivElement;
  const className = $eventTarget.className;
  const { turn } = gameState;

  if (className.includes('square')) {
    squareClicked($eventTarget);
    return;
  }

  let $piece;
  if (className.includes(turn) && className.includes('piece')) {
    $piece = $eventTarget;
  } else if ($eventTarget.tagName === 'I') {
    $piece = $eventTarget.parentElement as HTMLDivElement;
    if (!$piece.className.includes(turn)) {
      $piece = null;
    }
  }

  if ($piece) {
    selectPiece($piece);
  }
}

// Deselects previous piece and sets selectedPiece and movesForSelectedPiece in gameState and activates visual selected effect
function selectPiece($piece: HTMLDivElement): void {
  const $square = $piece.parentElement as HTMLDivElement;
  const pieceCoords = getCoords($square);
  const movementInfo = getValidMoves(pieceCoords);

  if (movementInfo.length) {
    deselect();

    $piece.className += ' selected';

    gameState.pieceSelected = pieceCoords;
    gameState.movesForSelectedPiece = movementInfo;
    gameState.doubleJump = null;
  }
}

// sets selectPiece and MovesForSelectedPiece to null and removes selected visual effect
function deselect(): void {
  const $selectedPiece = document.querySelector('.selected');
  if ($selectedPiece) {
    $selectedPiece.className = $selectedPiece.className.slice(0, -8);
  }

  gameState.pieceSelected = null;
  gameState.movesForSelectedPiece = null;
  gameState.doubleJump = null;
}

// If moving the select piece to the clicked square is a valid move it will call the function to make that move
function squareClicked($square: HTMLDivElement): void {
  const { movesForSelectedPiece: possibleMoves, pieceSelected } = gameState;

  if (!possibleMoves || !pieceSelected) return;

  const squareCoords = getCoords($square);
  const stringifiedCoords = JSON.stringify(squareCoords);

  let squareIsValidMove = false;
  let moveInfo: MoveInfo | undefined;

  possibleMoves.forEach((movement) => {
    if (JSON.stringify(movement.move) === stringifiedCoords) {
      squareIsValidMove = true;
      moveInfo = movement;
    }
  });

  if (squareIsValidMove && moveInfo) {
    if (moveInfo.moveType === 'noJump') {
      playNoJump(pieceSelected, squareCoords);
    } else if (moveInfo.moveType === 'jump') {
      if (!moveInfo.jumpedSquare)
        throw new Error(`${pieceSelected} cannot jump without a jumped square`);
      playJump(pieceSelected, squareCoords, moveInfo.jumpedSquare);
    }
  }
}

// moves the piece, checks if it should be kinged, toggles the turn, and deselects the piece
function playNoJump(
  startCoords: [number, number],
  endCoords: [number, number]
): void {
  movePiece(startCoords, endCoords);
  checkToKing(endCoords);
  toggleTurn();
  deselect();
}

// moves the piece, checks if that piece should be kinged, checks if that piece can jump and allows for a double jump if so and if not it deselects the piece
function playJump(
  startCoords: [number, number],
  endCoords: [number, number],
  jumpedCoords: [number, number]
): void {
  takePiece(jumpedCoords);

  movePiece(startCoords, endCoords);
  checkToKing(endCoords);

  const pieceColor = board[endCoords[0]][endCoords[1]].piece?.color;
  if (!pieceColor)
    throw new Error(`piece at ${endCoords} doesn't have a color`);

  const allMoves = getValidMoves(endCoords);
  const jumpMoves = allMoves.filter((moveInfo) => moveInfo.moveType === 'jump');

  if (jumpMoves.length) {
    gameState.movesForSelectedPiece = jumpMoves;
    gameState.pieceSelected = endCoords;
    gameState.doubleJump = `${pieceColor}`;

    toggleTurn(pieceColor);
  } else {
    toggleTurn();
    deselect();
  }
}

// retrieves the coords from a square element
function getCoords($square: HTMLDivElement): [number, number] {
  const stringCoords = $square?.id;

  const coords = stringCoords.split(',');
  return coords.map((x) => +x) as [number, number];
}

// toggles the turn in gameState and updates the turn display
function toggleTurn(dblJump?: 'red' | 'black'): void {
  if (!$turnDisplay) throw new Error('$turnDisplay non-existent');

  gameState.turn = otherColor(gameState.turn);
  $turnDisplay.textContent = `${gameState.turn}s turn`;

  if (dblJump) {
    gameState.turn = otherColor(dblJump);
    $turnDisplay.textContent = `${dblJump} can jump again or ${otherColor(
      dblJump
    )} can play`;
  } else if (gameState.doubleJump) {
    gameState.turn = otherColor(gameState.turn);
    $turnDisplay.textContent = `${gameState.turn}s turn`;
  }
}

// return the color opposite the color provided
function otherColor(color: 'red' | 'black'): 'red' | 'black' {
  if (color === 'red') return 'black';
  if (color === 'black') return 'red';
  else throw new Error(`cannot get opposite color of ${color}`);
}

// if either black or red have no pieces in gameState, the other is declared winner
function checkForWin(): void {
  const redPieces = getPieces('red');

  if (!redPieces.length) {
    win('black');
    return;
  }

  const blackPieces = getPieces('black');

  if (!blackPieces.length) {
    win('red');
    return;
  }

  const redMovesNested: MoveInfo[][] = [];
  redPieces.forEach((piece) => {
    redMovesNested.push(getValidMoves(piece));
  });
  const redMovesFlat = redMovesNested.flat();

  if (!redMovesFlat.length) {
    win('black');
    return;
  }

  const blackMovesNested: MoveInfo[][] = [];
  blackPieces.forEach((piece) => {
    blackMovesNested.push(getValidMoves(piece));
  });
  const blackMovesFlat = blackMovesNested.flat();

  if (!blackMovesFlat.length) {
    win('red');
    return;
  }
}

// the game over modal is shown and the message on it is set to display the winner
function win(color: 'red' | 'black'): void {
  if (!$gameOver) throw new Error('$gameOver does not exist');
  if (!$victoryMessage) throw new Error('$victoryMessage does not exist');

  const capitalizedColor = color[0].toUpperCase() + color.slice(1);
  $victoryMessage.textContent = `${capitalizedColor} Wins!`;
  $gameOver.showModal();
}

// retrieves all pieces that are currently on the board or that match the provided color
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

// checks if a piece qualifies to be kinged and kings it if so
function checkToKing(coords: [number, number]): void {
  const piece = board[coords[0]][coords[1]].piece;
  if (!piece || piece.kinged) return;

  if (piece.color === 'black' && coords[0] === 0) {
    kingPiece(coords);
  } else if (piece.color === 'red' && coords[0] === 7) {
    kingPiece(coords);
  }
}

// resets the board and gamestate and rerenders the board in the dom
function reset(): void {
  setUpBoard();
  gameState.turn = 'black';
  gameState.pieceSelected = null;
  gameState.movesForSelectedPiece = null;

  $board?.replaceChildren();
  renderBoard();
  $gameOver?.close();
}
