// interface Piece {
//   kinged: boolean;
//   color: string;
// }

// interface Square {
//   piece?: Piece;
//   playable: boolean;
// }

// const board: Square[][] = [
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//   ],
//   [
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'red', kinged: false } },
//   ],
//   [
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//     { playable: false },
//     { playable: true },
//   ],
//   [
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//   ],
//   [
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//   ],
//   [
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//     { playable: true, piece: { color: 'black', kinged: false } },
//     { playable: false },
//   ],
// ];

// // sets piece at endLocation to piece at startLocation, and deletes piece at startLocation
// function movePiece(startLocation: number[], endLocation: number[]): void {
//   const piece = board[startLocation[0]][startLocation[1]].piece;
//   if (piece) {
//     board[endLocation[0]][endLocation[1]].piece = piece;
//     delete board[startLocation[0]][startLocation[1]].piece;
//   }
// }

// function takePiece(location: number[]): void {
//   if (board[location[0]][location[1]].piece) {
//     delete board[location[0]][location[1]].piece;
//   }
// }

// function kingPiece(location: number[]): void {
//   const piece = board[location[0]][location[1]].piece;
//   if (piece) {
//     piece.kinged = true;
//   }
// }

// // lots and lots of tests
// function canMoveWithoutTaking(
//   startLocation: number[],
//   endLocation: number[]
// ): boolean {
//   const piece = board[startLocation[0]][startLocation[1]].piece;
//   if (
//     !board[endLocation[0]][endLocation[1]].playable ||
//     !board[startLocation[0]][startLocation[1]].playable
//   ) {
//     return false;
//   } else if (
//     piece === undefined ||
//     board[endLocation[0]][endLocation[1]].piece
//   ) {
//     return false;
//   }
//   const columns = [startLocation[1] + 1, startLocation[1] - 1];
//   const rows: number[] = [];
//   if (piece.kinged) {
//     rows.push(startLocation[0] + 1, startLocation[0] - 1);
//   } else {
//     const color = piece.color;
//     let direction;
//     if (color === 'red') {
//       direction = 1;
//     } else if (color === 'black') {
//       direction = -1;
//     } else {
//       console.log('ERROR: piece is neither black nor red');
//       return false;
//     }
//     rows.push(startLocation[0] + direction);
//   }
//   if (rows.includes(endLocation[0]) && columns.includes(endLocation[1])) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // work in progress
// function canMoveIfTaking(
//   startLocation: number[],
//   endLocation: number[]
// ): boolean {
//   const piece = board[startLocation[0]][startLocation[1]].piece;

//   if (
//     !board[endLocation[0]][endLocation[1]].playable ||
//     !board[startLocation[0]][startLocation[1]].playable
//   ) {
//     return false;
//   } else if (
//     piece === undefined ||
//     board[endLocation[0]][endLocation[1]].piece
//   ) {
//     return false;
//   }

//   const columns = [startLocation[1] + 2, startLocation[1] - 2];
//   const rows = [];
//   const color = piece.color;

//   if (piece.kinged) {
//     rows.push(startLocation[0] + 2, startLocation[0] - 2);
//   } else {
//     let directionAllowed;
//     if (color === 'red') {
//       directionAllowed = 1;
//     } else if (color === 'black') {
//       directionAllowed = -1;
//     } else {
//       console.log('ERROR: piece is neither black nor red');
//       return false;
//     }
//     rows.push(startLocation[0] + directionAllowed * 2);
//   }

//   if (!(rows.includes(endLocation[0]) && columns.includes(endLocation[1]))) {
//     return false;
//   }

//   return false;
// }

// // work in progress
// function findMiddlePiece(startLocation: number[], endLocation: number[]) {
//   const distanceGoing = [
//     startLocation[0] - endLocation[0],
//     startLocation[1] - endLocation[1],
//   ];
//   const directionGoing = distanceGoing.map((x) => x / 2);
//   const locationAttacked = [
//     startLocation[0] - directionGoing[0],
//     startLocation[1] - directionGoing[1],
//   ];
//   const color = board[locationAttacked[0]][locationAttacked[1]].piece.color;
//   return { location: locationAttacked, color };
// }
