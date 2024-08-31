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
//   if (board[startLocation[0]][startLocation[1]].piece !== undefined) {
//     const piece = board[startLocation[0]][startLocation[1]].piece;
//     board[endLocation[0]][endLocation[1]].piece = piece;
//     delete board[startLocation[0]][startLocation[1]].piece;
//   }
// }

// function takePiece(location: number[]): void {
//   if (board[location[0]][location[1]].piece !== undefined) {
//     delete board[location[0]][location[1]].piece;
//   }
// }

// function kingPiece(location: number[]): void {
//   if (board[location[0]][location[1]].piece !== undefined) {
//     board[location[0]][location[1]].piece.kinged = true;
//   }
// }

// // lots and lots of tests
// function canMoveWithoutTaking(
//   startLocation: number[],
//   endLocation: number[]
// ): boolean {
//   if (
//     !board[endLocation[0]][endLocation[1]].playable ||
//     !board[startLocation[0]][startLocation[1]].playable
//   ) {
//     return false;
//   } else if (
//     board[startLocation[0]][startLocation[1]].piece === undefined ||
//     board[endLocation[0]][endLocation[1]].piece !== undefined
//   ) {
//     return false;
//   }
//   const color = board[startLocation[0]][startLocation[1]].piece?.color;
//   let direction;
//   if (color === 'red') {
//     direction = 1;
//   } else if (color === 'black') {
//     direction = -1;
//   } else {
//     console.log('ERROR: piece is neither black nor red');
//     return false;
//   }
//   const row = startLocation[0] + direction;
//   const columns = [startLocation[1] + 1, startLocation[1] - 1];
//   if (endLocation[0] !== row) {
//     return false;
//   } else if (columns.includes(endLocation[1])) {
//     return true;
//   } else {
//     console.log('Unknown error in canMoveWithoutTaking()');
//     return false;
//   }
// }

// // // work in progress
// // function canMoveIfTaking(
// //   startLocation: number[],
// //   endLocation: number[]
// // ): boolean {
// //   if (
// //     startLocation[0] - endLocation[0] !== 2 &&
// //     startLocation[0] - endLocation[0] !== -2
// //   ) {
// //     console.log('false because wrong row');
// //     return false;
// //   } else if (
// //     startLocation[1] - endLocation[1] !== 2 &&
// //     startLocation[1] - endLocation[1] !== -2
// //   ) {
// //     console.log('false because wrong column');
// //     return false;
// //   } else if (
// //     board[startLocation[0]][startLocation[1]].piece === undefined ||
// //     board[endLocation[0]][endLocation[1]].piece !== undefined
// //   ) {
// //     console.log('false because of empty start or full end');
// //     return false;
// //   } else {
// //     const pieceTaking = board[startLocation[0]][startLocation[1]].piece;
// //     const locationAttacked = [
// //       startLocation[0] + (startLocation[0] - endLocation[0]),
// //       startLocation[1] + (startLocation[1] - endLocation[1]),
// //     ];
// //     console.log('location attacked:', locationAttacked);
// //   }
// // }
