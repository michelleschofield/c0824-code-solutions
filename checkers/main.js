"use strict";
const gameState = {
    turn: 'black',
    pieceSelected: null,
    movesForSelectedPiece: null,
    doubleJump: null,
};
const board = [[], [], [], [], [], [], [], []];
const $board = document.querySelector('.board');
const $turnDisplay = document.querySelector('#turn-display');
const $gameOver = document.querySelector('dialog');
const $playAgain = document.querySelector('#play-again');
const $victoryMessage = document.querySelector('#victory-message');
if (!$board)
    throw new Error('$board query failed');
if (!$turnDisplay)
    throw new Error('$turnDisplay query failed');
if (!$gameOver)
    throw new Error('$gameOver query failed');
if (!$playAgain)
    throw new Error('$playAgain query failed');
if (!$victoryMessage)
    throw new Error('$victoryMessage query failed');
setUpBoard();
renderBoard();
$board.addEventListener('click', handleClick);
$playAgain.addEventListener('click', reset);
// $board.addEventListener('mouseover', handleMouseover);
// sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// only checks for existence of piece to be moved doesn't care about rules
function movePiece(startLocation, endLocation) {
    const piece = board[startLocation[0]][startLocation[1]].piece;
    if (!piece)
        return;
    const $startSquare = document.getElementById(`${startLocation[0]},${startLocation[1]}`);
    const $endSquare = document.getElementById(`${endLocation[0]},${endLocation[1]}`);
    if (!$startSquare)
        throw new Error('$startSquare query failed');
    if (!$endSquare)
        throw new Error('$endSquare query failed');
    const $piece = $startSquare.children[0];
    if (!$piece)
        throw new Error('$piece query failed');
    board[endLocation[0]][endLocation[1]].piece = piece;
    $endSquare.appendChild($piece);
    delete board[startLocation[0]][startLocation[1]].piece;
    checkForWin();
}
// deletes piece at given location and removes the matching coords from the array for the color of the piece in gameState
function takePiece(location) {
    const piece = board[location[0]][location[1]].piece;
    if (!piece)
        return;
    const $takenSquare = document.getElementById(`${location[0]},${location[1]}`);
    if (!$takenSquare)
        throw new Error('$takenSquare query failed');
    const $takenPiece = $takenSquare.children[0];
    delete board[location[0]][location[1]].piece;
    $takenPiece.remove();
}
// sets piece at given location to kinged
function kingPiece(location) {
    const piece = board[location[0]][location[1]].piece;
    if (piece) {
        piece.kinged = true;
    }
    const $piece = document.getElementById(`${location[0]},${location[1]}`);
    if (!$piece)
        throw new Error('$piece query failed');
    const $crown = document.createElement('i');
    $crown.className = 'fa-solid fa-crown';
    $piece.firstChild?.appendChild($crown);
}
// returns an array with all valid moves for a piece at provided coords
function getValidMoves(coords) {
    if (coords[0] > 7 || coords[1] > 7 || coords[0] < 0 || coords[1] < 0) {
        throw new Error(`Cannot get moves for ${coords} because square does not exist`);
    }
    const square = board[coords[0]][coords[1]];
    const piece = square.piece;
    if (!square.playable)
        throw new Error(`Square at ${coords} is not playable`);
    if (!piece)
        return [];
    let directionAllowed;
    if (piece.color === 'red') {
        directionAllowed = 1;
    }
    else if (piece.color === 'black') {
        directionAllowed = -1;
    }
    else {
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
    }
    else {
        const x = coords[0] + directionAllowed * 2;
        if (x >= 0 && x <= 7) {
            jumpRows.push(x);
        }
    }
    const allMoves = [];
    jumpRows.forEach((x) => {
        jumpColumns.forEach((y) => {
            const endCoords = [x, y];
            if (!board[endCoords[0]][endCoords[1]])
                return;
            const middleSquare = findMiddleSquare(coords, endCoords);
            const attackedPiece = board[middleSquare[0]][middleSquare[1]].piece;
            let attackedColor;
            if (attackedPiece) {
                attackedColor = attackedPiece.color;
            }
            else {
                return;
            }
            if (board[endCoords[0]][endCoords[1]].piece)
                return;
            if (attackedColor && attackedColor !== piece.color) {
                allMoves.push({
                    moveType: 'jump',
                    move: endCoords,
                    jumpedSquare: middleSquare,
                });
            }
        });
    });
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
    }
    else {
        const x = coords[0] + directionAllowed;
        if (x >= 0 && x <= 7) {
            rows.push(x);
        }
    }
    rows.forEach((x) => {
        columns.forEach((y) => {
            if (!board[x][y] || board[x][y].piece)
                return;
            allMoves.push({ moveType: 'noJump', move: [x, y] });
        });
    });
    return allMoves;
}
function getColumns(coords, distance) {
    const columns = [];
    if (coords[1] + distance <= 7) {
        columns.push(coords[1] + distance);
    }
    if (coords[1] - distance >= 0) {
        columns.push(coords[1] - distance);
    }
    return columns;
}
function getEmptySquares(rows, columns) {
    const emptySquares = [];
    rows.forEach((x) => {
        columns.forEach((y) => {
            if (!board[x][y].piece)
                emptySquares.push([x, y]);
        });
    });
    return emptySquares;
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
// sets board with pieces to start the game and populates color arrays in gameState
function setUpBoard() {
    for (let i = 0; i < 8; i++) {
        if (i % 2) {
            board[i] = oddRow(i < 3 ? 'red' : i > 4 ? 'black' : '');
        }
        else {
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
        }
        else {
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
    if (!$board)
        throw new Error('$board query failed');
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
function handleClick(event) {
    const $eventTarget = event.target;
    const className = $eventTarget.className;
    const { turn } = gameState;
    if (className.includes('square')) {
        squareClicked($eventTarget);
        return;
    }
    let $piece;
    if (className.includes(turn) && className.includes('piece')) {
        $piece = $eventTarget;
    }
    else if ($eventTarget.tagName === 'I') {
        $piece = $eventTarget.parentElement;
        if (!$piece.className.includes(turn)) {
            $piece = null;
        }
    }
    if ($piece) {
        selectPiece($piece);
    }
}
// Deselects previous piece and sets selectedPiece and movesForSelectedPiece in gameState and activates visual selected effect
function selectPiece($piece) {
    const $square = $piece.parentElement;
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
function deselect() {
    const $selectedPiece = document.querySelector('.selected');
    if ($selectedPiece) {
        $selectedPiece.className = $selectedPiece.className.slice(0, -8);
    }
    gameState.pieceSelected = null;
    gameState.movesForSelectedPiece = null;
    gameState.doubleJump = null;
}
// If moving the select piece to the clicked square is a valid move it will call the function to make that move
function squareClicked($square) {
    const { movesForSelectedPiece: possibleMoves, pieceSelected } = gameState;
    if (!possibleMoves || !pieceSelected)
        return;
    const squareCoords = getCoords($square);
    const stringifiedCoords = JSON.stringify(squareCoords);
    let squareIsValidMove = false;
    let moveInfo;
    possibleMoves.forEach((movement) => {
        if (JSON.stringify(movement.move) === stringifiedCoords) {
            squareIsValidMove = true;
            moveInfo = movement;
        }
    });
    if (squareIsValidMove && moveInfo) {
        if (moveInfo.moveType === 'noJump') {
            playNoJump(pieceSelected, squareCoords);
        }
        else if (moveInfo.moveType === 'jump') {
            if (!moveInfo.jumpedSquare)
                throw new Error(`${pieceSelected} cannot jump without a jumped square`);
            playJump(pieceSelected, squareCoords, moveInfo.jumpedSquare);
        }
    }
}
// moves the piece, checks if it should be kinged, toggles the turn, and deselects the piece
function playNoJump(startCoords, endCoords) {
    movePiece(startCoords, endCoords);
    checkToKing(endCoords);
    toggleTurn();
    deselect();
}
// moves the piece, checks if that piece should be kinged, checks if that piece can jump and allows for a double jump if so and if not it deselects the piece
function playJump(startCoords, endCoords, jumpedCoords) {
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
    }
    else {
        toggleTurn();
        deselect();
    }
}
// // useless
// function handleMouseover(event: Event): void {
//   const $eventTarget = event.target as HTMLElement;
//   if ($eventTarget.className.includes(`piece ${gameState.turn}`)) {
//     console.log('is piece of turn color');
//     // const $square = $eventTarget.parentElement as HTMLDivElement;
//     // const pieceCoords = getCoords($square);
//     // const validMoves = getValidMoves(pieceCoords);
//     // console.log('validMoves', validMoves);
//   }
// }
// retrieves the coords from a square element
function getCoords($square) {
    const stringCoords = $square?.id;
    const coords = stringCoords.split(',');
    return coords.map((x) => +x);
}
// toggles the turn in gameState and updates the turn display
function toggleTurn(dblJump) {
    if (!$turnDisplay)
        throw new Error('$turnDisplay non-existent');
    gameState.turn = otherColor(gameState.turn);
    $turnDisplay.textContent = `${gameState.turn}s turn`;
    if (dblJump) {
        gameState.turn = otherColor(dblJump);
        $turnDisplay.textContent = `${dblJump} can jump again or ${otherColor(dblJump)} can play`;
    }
    else if (gameState.doubleJump) {
        gameState.turn = otherColor(gameState.turn);
        $turnDisplay.textContent = `${gameState.turn}s turn`;
    }
}
// return the color opposite the color provided
function otherColor(color) {
    if (color === 'red')
        return 'black';
    if (color === 'black')
        return 'red';
    else
        throw new Error(`cannot get opposite color of ${color}`);
}
// if either black or red have no pieces in gameState, the other is declared winner
function checkForWin() {
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
    const redMovesNested = [];
    redPieces.forEach((piece) => {
        redMovesNested.push(getValidMoves(piece));
    });
    const redMovesFlat = redMovesNested.flat();
    if (!redMovesFlat.length) {
        win('black');
        return;
    }
    const blackMovesNested = [];
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
function win(color) {
    if (!$gameOver)
        throw new Error('$gameOver does not exist');
    if (!$victoryMessage)
        throw new Error('$victoryMessage does not exist');
    const capitalizedColor = color[0].toUpperCase() + color.slice(1);
    $victoryMessage.textContent = `${capitalizedColor} Wins!`;
    $gameOver.showModal();
}
// retrieves all pieces that are currently on the board or that match the provided color
function getPieces(pieceType) {
    const allCoords = [];
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
function checkToKing(coords) {
    const piece = board[coords[0]][coords[1]].piece;
    if (!piece || piece.kinged)
        return;
    if (piece.color === 'black' && coords[0] === 0) {
        kingPiece(coords);
    }
    else if (piece.color === 'red' && coords[0] === 7) {
        kingPiece(coords);
    }
}
// resets the board and gamestate and rerenders the board in the dom
function reset() {
    setUpBoard();
    gameState.turn = 'black';
    gameState.pieceSelected = null;
    gameState.movesForSelectedPiece = null;
    $board?.replaceChildren();
    renderBoard();
    $gameOver?.close();
}
