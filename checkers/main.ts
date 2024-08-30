interface Piece {
  kinged: boolean;
  color: string;
}

interface Square {
  piece?: Piece;
  playable: boolean;
}

const board: Square[][] = [
  [
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
  ],
  [
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
  ],
  [
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'red', kinged: false } },
  ],
  [
    { playable: true },
    { playable: false },
    { playable: true },
    { playable: false },
    { playable: true },
    { playable: false },
    { playable: true },
    { playable: false },
  ],
  [
    { playable: false },
    { playable: true },
    { playable: false },
    { playable: true },
    { playable: false },
    { playable: true },
    { playable: false },
    { playable: true },
  ],
  [
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
  ],
  [
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
  ],
  [
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
    { playable: true, piece: { color: 'black', kinged: false } },
    { playable: false },
  ],
];

function movePiece(currentPlace: number[], goingTo: number[]): void {
  const piece: Piece | undefined =
    board[currentPlace[0]][currentPlace[1]].piece;
  board[goingTo[0]][goingTo[1]].piece = piece;
  delete board[currentPlace[0]][currentPlace[1]].piece;
}

movePiece([1, 2], [2, 1]);
